//  CRUD operations -> create, read, update, delete
//  mongodb/bin/mongod.exe --dbpath mongodb-data
const {MongoClient, ObjectID } = require('mongodb')

const connectionURl = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"


MongoClient.connect(
    connectionURl, { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
        if (error) {
          return console.log(error)
        }

        const db = client.db(databaseName)

        // db.collection('users').deleteMany({
        //   age: 27
        // }).then(result => {
        //   console.log(result)
        // }).catch((error) => {
        //   console.log(error)
        // })

        db.collection('tasks').deleteOne({
          _id: ObjectID("60e1f07058da594424af4011")
        }).then((result) => {
          console.log(result)
        }).catch((error) => {
          console.log(error)
        })
    }
)
