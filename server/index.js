const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const cors = require("cors");

var fs = require("fs");

const file23 = "pescePilota23.json";
const file24 = "pescePilota24.json";

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/read23", (req, res) => {
  res.json(readFile23());
});

app.get("/read24", (req, res) => {
  res.json(readFile24());
});

app.put("/write23", (req, res) => {
  let obj = readFile23();

  for (let i in obj.pesci) {
    if (obj.pesci[i].nome === req.body.nome) {
      obj.pesci[i] = req.body;
    }
  }
  fs.writeFileSync(file23, JSON.stringify(obj, null, 2));
  res.sendStatus(200);
});

app.put("/write24", (req, res) => {
  let obj = readFile24();

  for (let i in obj.pesci) {
    if (obj.pesci[i].nome === req.body.nome) {
      obj.pesci[i] = req.body;
    }
  }
  fs.writeFileSync(file24, JSON.stringify(obj, null, 2));
  res.sendStatus(200);
});

app.delete("/delete23", (req, res) => {
  let obj = readFile23();

  for (let i in obj.pesci) {
    obj.pesci[i].peso = 0;
    obj.pesci[i].pezzi = 0;
    obj.pesci[i].pezzature = [];
  }

  fs.writeFileSync(file23, JSON.stringify(obj, null, 2));
  res.sendStatus(200);
});

app.delete("/delete24", (req, res) => {
  let obj = readFile24();

  for (let i in obj.pesci) {
    obj.pesci[i].peso = 0;
    obj.pesci[i].pezzi = 0;
    obj.pesci[i].pezzature = [];
  }

  fs.writeFileSync(file24, JSON.stringify(obj, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`PescePilotaService listening on ${PORT}`);
});

function readFile23() {
  let json = fs.readFileSync(file23);
  return JSON.parse(json);
}

function readFile24() {
  let json = fs.readFileSync(file24);
  return JSON.parse(json);
}
