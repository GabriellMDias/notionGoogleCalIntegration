import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { getEvents } from "./api/notionApi";



const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  await getEvents()
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});