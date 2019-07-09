const express = require("express");
const cors = require("cors");

const Data = require("./data/db.js");

const server = express();

server.use(express.json());
server.use(cors());

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
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

//Create - require name & bio;
server.post("/api/users", (req, res) => {
  const newUser = req.body;

  Data.insert(newUser)
    .then(user => {
      if (newUser.name && newUser.bio) {
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
        res.status(200).json(deleted);
      } else {
        res.status(404).json({
          errorMessage: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err, message: "The user could not be removed" });
    });
});

//Update - require bio & name; check for ID
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const { name, bio } = req.body;

  Data.update(id, changes)
    .then(updated => {
      if (!updated) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else if (!name || !bio) {
        res
          .status(400)
          .json({ message: "Please provide name and bio for the user." });
      } else {
        res.status(200).json(updated);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The user information could not be modified." });
    });
});

//server listening
const port = 5000;
server.listen(port, () =>
  console.log(`\n*** server is listening on port ${port} *** \n`)
);
