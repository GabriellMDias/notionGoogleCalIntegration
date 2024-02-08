import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import notionApi from "./api/notionApi";
import googleApi from "./api/googleApi"

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/google/getEventsLastTenMin", async (req: Request, res: Response) => {
  const result = await googleApi.getEventsLastTenMin();
  res.send(result)
})

app.get("/notion/getEventsLastTenMin", async (req: Request, res: Response) => {
  const result = await notionApi.getEventsLastTenMin()
  res.send(result);
});

app.post("/notion/getEventByCalID", async (req: Request, res: Response) => {
  const { calID } = req.body
  const result = await notionApi.getEventByCalID(calID)
  res.send(result)
})

app.post("/notion/insertEvent", async (req: Request, res: Response) => {
  const {calID, title, dateStart, dateEnd} = req.body

  const result = await notionApi.insertEvent(calID, title, dateStart, dateEnd)
  res.send(result)
})

app.patch("/notion/updateEvent", async (req:Request, res: Response) => {
  const {calID, title, dateStart, dateEnd} = req.body

  const result = await notionApi.updateEvent(calID, title, dateStart, dateEnd)
  res.send(result)
  
})

app.delete("/notion/deleteEvent", async (req: Request, res: Response) => {
  const { calID } = req.body
  const result = await notionApi.deleteEvent(calID)
  res.send(result)
})



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});