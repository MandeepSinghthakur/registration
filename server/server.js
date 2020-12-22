const express = require("express");
const app = express(); // create express app
const path = require("path");
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var bodyParser = require('body-parser')



app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use(bodyParser.json({limit: '100000000kb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10000000kb', extended: true}))
 

const uri = 'mongodb+srv://newuser:m1UiEoI101s94fp1@cluster0.onscz.mongodb.net/test?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true });

app.post('/register', function (req, res) {
  var myobj = { firstName: req.body.formdata.firstName, lastName: req.body.formdata.lastName , phoneNumber: req.body.formdata.phoneNumber,email:req.body.formdata.email ,password: req.body.formdata.password ,imageData:req.body.imageData};
  client.connect(err => {
   client.db("test").collection("users").insertOne(myobj, function(err, res) {
    if (err) res.send(err);
    console.log("1 document inserted");
   // client.close();
  });
})
  res.send({message:"SuccessFully Created"})
})


app.post('/login',function(req,res){
var query = { email:req.body.formdata.email};
var password = req.body.formdata.password
var currentUser = ''
client.connect(err=> {
  client.db("test").collection("users").find(query).toArray(function(err,result){
    if(err) res.send({'error':"No user found"});
      currentUser = result.find(user => user.password === password)
      if(currentUser != '') {
         res.send({user:currentUser})
      } else {
      res.send({'error':"No user found"})
      }
  })
});
})

app.get('/users',function(req,res){
  client.connect(err=>{
    client.db("test").collection("users").find({}).toArray(function(err,result){
      if(err) res.send(err);
      res.send({users:result})
    })
  })
})

app.post('/delete', function (req, res) {
  var objectId = req.body.formdata.id;
  client.connect(err => {
   client.db("test").collection("users").deleteOne({'_id': ObjectID(objectId)}, function(err, res) {
    if (err) res.send(err);
    console.log("1 document deleted");
   // client.close();
  });
})
  res.send({message:"SuccessFully Deleted"})
})

app.put('/update', function (req, res) {
 var myobj = { firstName: req.body.formdata.firstName, lastName: req.body.formdata.lastName , phoneNumber: req.body.formdata.phoneNumber,password: req.body.formdata.password ,imageData:req.body.imageData};
 var objectId = req.body.formdata.id
 console.log(objectId)
 client.connect(err => {
  client.db("test").collection("users").updateOne({'_id': ObjectID(objectId)},{ $set: myobj},function(err,res){
    if(err) res.send(err);
    console.log("1 document updated")
  })
})
   res.send({message:"SuccessFully Updated"})
})



app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});