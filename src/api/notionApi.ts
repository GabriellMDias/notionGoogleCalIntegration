import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.CALENDAR_DATABASE_ID || "";

const getEventsLastTenMin = async () => {
  const databaseId = DATABASE_ID;

  const now = new Date()
  const tenMinutesAgo = new Date(now.getTime() - (10 * 60000));
  
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      timestamp: "last_edited_time",
      last_edited_time: {
        after: tenMinutesAgo.toISOString()
      }
    }
  });
  return response;
}

const insertEvent = async (title:string, iCalUID: string, dateStart: string, dateEnd?: string) => {
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

export default {
  getEventsLastTenMin,
  insertEvent
}