import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import notionApi from "./api/notionApi";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/getEventsLastTenMin", async (req: Request, res: Response) => {
  const result = await notionApi.getEventsLastTenMin()
  res.send(result);
});

app.post("/insertEvent", async (req: Request, res: Response) => {
  const {title, dateStart, dateEnd, iCalUID} = req.body

  const result = await notionApi.insertEvent(title, iCalUID, dateStart, dateEnd)
  res.send(result)
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});