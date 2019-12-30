const Express =require('express')
const server = Express()
const app = require('../data/database')
const cors = require('cors')
server.use(Express.json())
server.use(cors())

server.listen(4000,async ()=>{
    // console.log(await app.connection())
    console.log("Ready in Port 4000")
})

server.get('/',async (req, res) => {
    // const results = app.read()
    
    res.send(await app.read())
})

server.get('/:type',async (req, res) => {
    // const results = app.read()
    res.send(await app.readFilter(req.params.type))
    console.log(req.params.type)
})
server.get('/List',async (req, res) => {
    // const results = app.read()
    res.send(await app.readList())
    // console.log(req.params.type)
})
server.get('/Task',async (req, res) => {
    // const results = app.read()
    res.send(await app.readTask())
    // console.log(req.params.type)
})
server.post('/',async function(req,res){
    await app.create(req.body)
    console.log(req.body)
    res.send('success')
})

server.patch('/:_id',async function(req,res){
    res.send(await app.update(req.body,req.params._id))
})

server.delete('/:_id',async function(req,res){
    let result = await app.erase(req.params._id)
    // console.log(req.params)
    console.log(result)
    res.send('removed : '+ req.params._id )
})
