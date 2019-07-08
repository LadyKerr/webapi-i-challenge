const express = require("express");

const Data = require("./data/db.js");

const server = express();

server.use(express.json());

//C-R-U-D

//Read - show the list of users
server.get("/api/users", (req, res) => {
  Data.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user's information could not be retrieved" });
    });
});

const port = 5000;
server.listen(port, () => console.log(`\n*** running on port ${port} *** \n`));
