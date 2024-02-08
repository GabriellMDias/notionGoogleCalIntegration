import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.CALENDAR_DATABASE_ID || "";

const getEventByICalUID = async (iCalUID: string) => {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      property: "iCalUID",
      rich_text: 
        {
            equals: iCalUID
        }
    }
  });
  return response;
}

const getEventsLastTenMin = async () => {
  const now = new Date()
  const tenMinutesAgo = new Date(now.getTime() - (10 * 60000));
  
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      timestamp: "last_edited_time",
      last_edited_time: {
        after: tenMinutesAgo.toISOString()
      }
    }
  });
  return response;
}

const insertEvent = async (iCalUID: string, title:string, dateStart: string, dateEnd?: string) => {
  const response = await notion.pages.create({
    parent: {
        type: "database_id",
        database_id: DATABASE_ID
    },
    properties: {
        Name: {
            title: [
                {
                    text: {
                        content: title
                    }
                }
            ]
        },
        Deadline:{
          date: {
            start: dateStart,
            end: dateEnd ?? null
          }
        },
        iCalUID: {
          rich_text: [
            {
                text: {
                    content: iCalUID
                }
            }
        ]
        }
    },
});
  return response;
}

const deleteEvent = async (ICalUID: string) => {
  const eventBlock = await getEventByICalUID(ICalUID)
  const blockId = eventBlock.results[0].id;
  const response = await notion.blocks.delete({
    block_id: blockId,
  });
  return response;
}

const updateEvent = async (iCalUID: string, title:string, dateStart: string, dateEnd?: string) => {
  const eventBlock = await getEventByICalUID(iCalUID)
  const pageId = eventBlock.results[0].id;
  const response = await notion.pages.update({
    page_id: pageId,
    properties: {
      Name: {
          title: [
              {
                  text: {
                      content: title
                  }
              }
          ]
      },
      Deadline:{
        date: {
          start: dateStart,
          end: dateEnd ?? null
        }
      },
      iCalUID: {
        rich_text: [
          {
              text: {
                  content: iCalUID
              }
          }
      ]
      }
    },
  });
  return response;
}

export default {
  getEventsLastTenMin,
  getEventByICalUID,
  insertEvent,
  deleteEvent,
  updateEvent
}