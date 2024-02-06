const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const getEvents = async () => {
  const databaseId = 'bc6e4c91-1618-49a6-86a6-628ba676acad';
  
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  console.log(response);
}
