const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const cors = require("cors");

var fs = require("fs");

const file = "pescePilota.json";

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/read", (req, res) => {
  res.json(readFile());
});

app.put("/write", (req, res) => {
  let obj = readFile();

  for (let i in obj.pesci) {
    if (obj.pesci[i].nome === req.body.nome) {
      obj.pesci[i] = req.body;
    }
  }
  fs.writeFileSync(file, JSON.stringify(obj, null, 2));
  res.sendStatus(200);
});

app.delete("/delete", (req, res) => {
  let obj = readFile();

  for (let i in obj.pesci) {
    obj.pesci[i].peso = 0;
    obj.pesci[i].pezzi = 0;
    obj.pesci[i].pezzature = [];
  }

  fs.writeFileSync(file, JSON.stringify(obj, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`PescePilotaService listening on ${PORT}`);
});

function readFile() {
  let json = fs.readFileSync(file);
  return JSON.parse(json);
}
