require('dotenv').config();
const { default: axios } = require('axios');
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const circularJSON = require('circular-json');
const PORT = process.env.PORT
const IP_ADDRESS = process.env.IP_ADDRESS
const API_KEY = process.env.API_KEY;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/run',async (req,res)=>{
    try{
        var resp = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/INR`);
        resp = JSON.parse(circularJSON.stringify(resp));
        console.log(resp);
        res.status(200).json(resp?.data?.conversion_rates);
    }catch(error){console.log(error);res.status(404).json({"message":"error occur"})}
})

httpServer.listen(PORT,IP_ADDRESS,()=>{
    console.log('server is running')
})