import { initMocUp, getEvents, getMentors, getChats } from "./db";

const express = require("express");
const app = express();
const port = 8080; // default port to listen

initMocUp()
  .catch((e) => {
    console.log("error while creating moc ups")
  })

app.get("/home", (req: any, res: any) => {
  res.data = "Hello world!";
});

app.get("/events"), (req: any, res: any) => { res.data.events = getEvents(); }
app.get("/mentors"), (req: any, res: any) => { res.data.mentors = getMentors; }
app.get("/mentors"), (req: any, res: any) => { res.data.chats = getChats(); }

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

