import { resolve } from "path/posix";
import { initMocUp, getEvents, getMentors, getChats, getInfo } from "./db";
import { createMentor, createImmigrant, createOrga } from "./db"

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
app.get("/chats"), (req: any, res: any) => { res.data.chats = getChats(); }
app.get("/information"), (req: any, res: any) => { res.data.info = getInfo(); }

// create profiles
app.post("/mentor"), (req: any, res: any) => {
  createMentor(req)
  res.redirect('/home');
}
app.post("/immigrant"), (req: any, res: any) => {
  createImmigrant(req)
  res.redirect('/home');
}
app.post("/orga"), (req: any, res: any) => {
  createOrga(req)
  res.redirect('/home');
}

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

