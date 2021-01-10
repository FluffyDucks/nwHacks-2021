const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const https = require('https');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";

app.get('/api/test', (req,res) => {
    let testObject = [{id:0, description: "idk something or other"}, {id:1, description: "Another one"}];
    res.json(testObject);
    console.log("Sent Items");
});

//--- call covid-19 api ---//
// async function covidData(){
//     return new Promise((resolve, reject) => {
//         var data = '';
//         https.get('https://api.covid19api.com/summary', (resp) => {
//             // A chunk of data has been received.
//             resp.on('data', (chunk) => {
//                 data += chunk;
//             });
//             // The whole response has been received. Print out the result.
//             resp.on('end', () => {
//                 console.log(JSON.parse(data));
//                 data = JSON.parse(data);
//             });
//         }).on("error", (err) => {
//             console.log("Error: ", err.message);
//         });
//             console.log(`[SERVER]: covid data loaded`);
//             console.log("[SERVER]:", data);
//             resolve(data);
//     });
// }


// //=== MongoDB Connection ===//
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });


// //--- create mongoDB collection ---//
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     let dbo = db.db("mydb");
//     dbo.listCollections({name: "data"})
//         .next(function(err, collinfo) {
//             if (!collinfo) {
//                 dbo.createCollection("data", function(err, res) {
//                     if (err) throw err;
//                     console.log("Collection [data] created");
//                     db.close();
//                 });
//             }
//         });
// });


// MongoClient.connect(url, async function(err, db) {
//     if (err) throw err;
//     let dbo = db.db("mydb");
//     console.log("before")
//     let dataset = await covidData();
//     console.log(`[SERVER]: after ${dataset}`);

//     dbo.collection("data").insertMany(dataset.Countries, function(err, res) {
//         if (err) throw err;
//         console.log("Number of documents inserted: " + res.insertedCount);
//         db.close();
//     });
// });




app.listen(PORT, () => console.log(`Listening on ${PORT}`));