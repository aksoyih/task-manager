//CRUD operations -> create, read, update, delete

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURl, { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
  if (error) {
    return console.log(error);
  }
  
    const db = client.db(databaseName);

    // db.collection("users").insertOne(
    //   {
    //     name: "Haluk",
    //     age: 23,
    //   },
    //   (error, result) => {
        // if (error) {
        //   return console.log("Unable to insert user");
        // }

        // console.log(result.ops);
    //   }
    // );

    // db.collection("users").insertMany([
    //   {
    //     name: "Jen",
    //     age: 28,
    //   },
    //   {
    //     name: "Donald",
    //     age: 27,
    //   },
    // ], (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user");
    //     }

    //     console.log(result.ops);
    // });

      db.collection("tasks").insertMany([
      {
        description: "Task 1",
        completed: true,
      },
      {
        description: "Task 2",
        completed: false,
      },
      {
        description: "Task 3",
        completed: true,
      },
      ], (error, result) => {
          if (error) {
            return console.log("Unable to insert tasks");
          }

          console.log(result.ops);
      });


  }
);
