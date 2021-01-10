const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const https = require('https');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";

app.get('/api/test', async (req, res) => {
    res.json(await getCountriesFromDB());
});

//--- call covid-19 api ---//
async function covidData() {
    return new Promise((resolve, reject) => {
        let data = '';
        let jsonData = [];
        https.get('https://api.covid19api.com/summary', (resp) => {
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                jsonData = JSON.parse(data);
                resolve(jsonData);
            });
        }).on("error", (err) => {
            console.log("Error: ", err.message);
        });
    });
}


//===== MongoDB Setup =====//

//--- MongoDB Connection
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database Connected");
    db.close();
});


//--- create mongoDB collection
async function createTable(tableName = null) {
    return new Promise((resolve, reject) => {


        if (tableName == null) {
            console.log(`[SERVER]: no name for collection provided`);
            resolve(-1);
        }

        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            dbo.listCollections({ name: tableName })
                .next(function (err, collInfo) {
                    if (collInfo) {
                        console.log(`[SERVER]: collection [${tableName}] already exists`);
                        resolve(-1);
                    }
                    else {
                        dbo.createCollection(`${tableName}`, function (err, res) {
                            if (err) throw err;
                            console.log(`Collection [${tableName}] created`);
                            db.close();
                            resolve(0);
                        });
                    }
                });
        });
    });

}


//--- insert into mongoDB
async function insertDB() {
    let today = new Date();

    let name = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    //if the table exists, insert covid data into said table
    if (await createTable(name) == 0) {
        MongoClient.connect(url, async function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            console.log("[SERVER]: before")
            let dataset = await covidData();
            console.log(`[SERVER]: after ${dataset}`);

            dbo.collection(`${name}`).insertMany(dataset.Countries, function (err, res) {
                if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
                db.close();
            });
        });
    }
}

insertDB();

async function getCountriesFromDB() {
    return new Promise(async (resolve, reject) => {


        let today = new Date();
        let name = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

        if (await createTable(name)) {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                let dbo = db.db("mydb");
                dbo.collection(`${name}`).find({}, { projection: { _id: 0, Country: 1 } }).toArray(function (err, res) {
                    if (err) throw err;
                    db.close();
                    resolve(res);
                });
            });
        }
    });
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));