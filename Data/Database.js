const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('objectid');
require('dotenv').config()

const uri = process.env.ATLAS_CONNECTION;

const connection=()=>{
  const prom = new Promise((resolve,reject)=>{
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true },function(err,client){
      if(err){
        reject(err)
      }
      else{
        // const collection = client.db("Proyect").collection("MyProyect");
        console.log("conected")
        client.close();
        resolve('conected')
      }
    })  
  })
  return prom
}
const createTask =(insert)=>{
  const prom =new Promise((resolve,reject)=>{
    MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true }, function(err,client){
      if(err){
        reject(err)
      }
      else{
        console.log('create')
        const collection = client.db("assigment").collection("ToDos");

        collection.insertOne(insert,function(err,result){
            if(err){
              reject(err)
            }
            else{
              client.close()
              resolve('inserted')
            }
          })
      }
    })
  })
  return prom
}
const createList =(insert)=>{
    const prom =new Promise((resolve,reject)=>{
      MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true }, function(err,client){
        if(err){
          reject(err)
        }
        else{
          console.log('create')
          const collection = client.db("assigment").collection("Lists");
  
          collection.insertOne(insert,function(err,result){
              if(err){
                reject(err)
              }
              else{
                client.close()
                resolve('inserted')
              }
            })
        }
      })
    })
    return prom
}
const readTask=()=>{
  const prom = new Promise((resolve,reject)=>{
    MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true }, function(err,client){
      if(err){
        reject(err)
      }
      else{
        console.log('read')
        const collection = client.db("assigment").collection("ToDos");
      
        collection.find({}).toArray(function(err, docs) {
          if(err){
            reject(err)
          }
          else{
          console.log("Found the following records");
          console.log(docs)
          client.close()
          resolve(docs)
          }
        });
      }
   })
  })
  return prom
}
const readList=()=>{
    const prom = new Promise((resolve,reject)=>{
      MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true }, function(err,client){
        if(err){
          reject(err)
        }
        else{
          console.log('read')
          const collection = client.db("assigment").collection("Lists");
        
          collection.find({}).toArray(function(err, docs) {
            if(err){
              reject(err)
            }
            else{
            console.log("Found the following records");
            console.log(docs)
            client.close()
            resolve(docs)
            }
          });
        }
     })
    })
    return prom
  }
const readFilter=(type)=>{
  const prom = new Promise((resolve,reject)=>{
    MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true }, function(err,client){
      if(err){
        reject(err)
      }
      else{
        console.log('read')
        const collection = client.db("Proyect").collection("MyProyect");
      
        collection.find({"Type": type}).toArray(function(err, docs) {
          if(err){
            reject(err)
          }
          else{
          console.log("Found the following records");
          console.log(docs)
          client.close()
          resolve(docs)
          }
        });
      }
   })
  })
  return prom
}
const update=(insert,_id)=>{
  const prom = new Promise((resolve, reject)=>{
    MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true }, function(err,client){
      if(err){
        reject(err)
      }
      else{
        const collection = client.db("Proyect").collection("MyProyect");
        console.log("update")
        collection.updateOne({"_id":ObjectId(_id)},{$set: insert},function(err,result){
          if(err){
            reject(err)
          }
          else{
            client.close()
            resolve('updated')
          }
        })
        
      }
    })
  })
  return prom
}


module.exports ={
  connection,
  createTask,
  createList,
  readTask,
  readList,
  update,
} 