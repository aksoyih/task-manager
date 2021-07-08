db.collection("users").insertOne(
  {
    name: "Haluk",
    age: 23,
  },
  (error, result) => {
  if (error) {
    return console.log("Unable to insert user");
  }
  console.log(result.ops);
  }
);

db.collection("users").insertMany([
  {
    name: "Jen",
    age: 28,
  },
  {
    name: "Donald",
    age: 27,
  },
], (error, result) => {
    if (error) {
      return console.log("Unable to insert user");
    }
    console.log(result.ops);
});

////////////


db.collection('users').findOne({
  /*name: 'Donald',*/ 
  _id: new ObjectID('60e1eff62764dd4f3ca4c11f')}, (error, user) => {
  if(error){
    return console.log(error)
  }

  if(user === null){
    return console.log('no document found')
  } 
  console.log(user)
})


db.collection('users').find({ age: 27}).toArray((error,users) => {
  if(error){
      return console.log(error)
  }
  console.log(users)
})


///////////////////


db.collection('users').updateOne({
  _id: new ObjectID("60e1e341b1d5953740277193")
  },{
    $set: {
      name: 'Mehmet'
    }
  }).then((result)=>{
    console.log(result)
  }).catch((error)=>{
    console.log(error)
})


db.collection('tasks').updateMany({
  completed: false
  },{
    $set: {
      completed:true
    }
  }).then((result)=>{
    console.log(result)
  }).catch((error)=>{
    console.log(error)
})