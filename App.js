const express=require('express');
const mongoose=require('mongoose');
const cors = require('cors')

const Events =require('./models/Event');
const Sun=require('./models/NesDat');
const moment=require('moment');

const app=express()

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('hi');
});

app.get('/add',async(req,res)=>{
    await Sun.insertMany([
        {
            "_id": "60c1aa262379d60b88b67757",
            "trackTitle": "sunrise",
            "publishAt": "2021-06-10T06:00:33.797Z",
        },
        {
            "_id": "60c1aa262379d60b88b67758",
            "trackTitle": "sunset",
            "publishAt": "2021-06-10T06:00:33.797Z"
        },
        {
            "_id": "60c19aeacb657f1c9a9370fe",
            "trackTitle": "white puffy clouds",
            "publishAt": "2021-06-10T04:57:34.826Z"
        },
        {
            "_id": "60c19aeacb657f1c9a9370ff",
            "trackTitle": "The coconut trees",
            "publishAt": "2021-06-10T04:57:34.826Z"
        },
        {
            "_id": "60c19aeacb657f1c9a937100",
            "trackTitle": "Darkest before the dawn",
            "publishAt": "2021-06-10T04:57:34.826Z"
        },
        {
            "_id": "60a760a618283f74e83280bc",
            "trackTitle": "comedy",
            "publishAt": "2021-05-20T18:30:00.000Z",
        },
        {
            "_id": "60758eaf8488297b5a5cc6f2",
            "trackTitle": "rockimg",
            "publishAt": "2021-04-15T18:30:00.000Z",
        },
        {
            "_id": "60758eaf8488297b5a5cc6f3",
            "trackTitle": "zenmusic",
            "publishAt": "2021-04-15T18:30:00.000Z",
        }
    ]);
    res.send('done');
})

app.post('/',async(req,res)=>{
    console.log(req.body);
    const event= new Events({name:req.body.name});
    await event.save()
    res.send(event)
});

app.get('/list',async(req,res)=>{
    const event=await Sun.aggregate([
        {$addFields: { "creationDate":  {$dateToString:{format: "%Y-%m-%d", date: "$publishAt"}}}}
    ]);
    res.send(event);
})

app.post('/data',async(req,res)=>{
    const {dateFrom ,dateTo}=req.body;
    console.log('date from ',dateFrom,'moment date from ',moment(dateFrom).format("YYYY-MM-DD"),'date to ',dateTo,'moment date to ',moment(dateTo).format("YYYY-MM-DD"))
    // const events =await Sun.find({  publishAt:{ $gte: dateFrom, $lte: dateTo }})
    const events=await Sun.aggregate([
        {$addFields: { "creationDate":  {$dateToString:{format: "%Y-%m-%d", date: "$publishAt"}}}},
        {$match :  { creationDate:  {$gte:moment(dateFrom).format("YYYY-MM-DD"),$lte:moment(dateTo).format("YYYY-MM-DD")}}}
    ])
    res.json(events);
})


mongoose.connect('mongodb://127.0.0.1:27017/events',{ useUnifiedTopology: true , useNewUrlParser: true  }).then(()=>{
    app.listen(4000,()=>{
        console.log('app is runing');
    })

    }
).catch(err=>console.log(err));