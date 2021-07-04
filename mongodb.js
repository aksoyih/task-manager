//CRUD operations -> create, read, update, delete
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

        // db.collection('users').findOne({/*name: 'Donald'*/ _id: new ObjectID('60e1eff62764dd4f3ca4c11f')}, (error, user) => {
        //     if(error){
        //         return console.log(error)
        //     }

        //     if(user === null){
        //         return console.log('no document found')
        //     }

        //     console.log(user)
        // })

        // db.collection('users').find({ age: 27}).toArray((error,users) => {
        //     if(error){
        //         return console.log(error)
        //     }

        //     console.log(users)
        // })
    }
)
