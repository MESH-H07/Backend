import { resolve } from "path/posix";
import { getEvents, getMentors, getChatFromUser, getInfo, getLocationById, getLocationsOfOrgas } from "./db";
import { createMentor, createImmigrant, createOrga } from "./db"

import { initMocUp, removeAll } from "./mock";

const express = require("express");
const app = express();
const port = 8080; // default port to listen

//removeAll();
initMocUp();

app.get("/home", (req: any, res: any) => {
  res.end("Hello world!");
});

app.get("/events", async (req: any, res: any) => {
  const events = await getEvents();
  res.send({ events: events });
})
app.get("/mentors", async (req: any, res: any) => {
  const mentors = await getMentors();
  res.send({ mentors: mentors });
})
app.get("/chats/:userid", async (req: any, res: any) => {
  const chats = await getChatFromUser(parseInt(req.params.userid));
  res.send({ chats: chats });
})

app.get("/location/:locationid", async (req: any, res: any) => {
  const location = await getLocationById(parseInt(req.params.locationid));
  res.send({ location: location });
})

app.get("/locations", async (req: any, res: any) => {
  const locations = await getLocationsOfOrgas();
  res.send({ locations: locations });
})

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

