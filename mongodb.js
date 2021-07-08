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

        // db.collection('users').updateOne({
        //   _id: new ObjectID("60e1e341b1d5953740277193")
        // },{
        //   $set: {
        //     name: 'Mehmet'
        //   }
        // }).then((result)=>{
        //   console.log(result)
        // }).catch((error)=>{
        //   console.log(error)
        // })

        // db.collection('tasks').updateMany({
        //   completed: false
        // },{
        //   $set: {
        //     completed:true
        //   }
        // }).then((result)=>{
        //   console.log(result)
        // }).catch((error)=>{
        //   console.log(error)
        // })


    }
)
