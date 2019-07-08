const express = require("express");

const Data = require("./data/db.js");

const server = express();

server.use(express.json());

//C-R-U-D

//Read - display the array of users
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

//display users by their ID
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  Data.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//Create
server.post("/api/users", (req, res) => {
  const userData = req.body;

  Data.insert(userData)
    .then(user => {
      if (user) {
        res.status(201).json(user);
      } else {
        res
          .status(400)
          .json({ errorMessage: "Please Provide name and bio for user" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//Delete
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  Data.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ err: "The user could not be removed" });
    });
});

// //Update
// server.put("/", (req, res) => {});

const port = 5000;
server.listen(port, () =>
  console.log(`\n*** server is listening on port ${port} *** \n`)
);
