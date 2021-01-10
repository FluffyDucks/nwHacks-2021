const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const https = require('https');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";
const {spawn} = require("child_process");

app.get('/api/countries', async (req, res) => {
    res.json(await getCountriesFromDB());
});

app.get('/api/cases/:country', async (req,res) => {
    if(req.params.country) {
        res.json(await getCasesFromDB(req.params.country));
    } else {
        res.json({Message: "Country Not Found"});
    }
})

app.get('/api/MLmodel/insert/:country', async (req,res) => {
    console.log("model before");
    countryName = req.params.country;
    let data = await modelPredictions(countryName)
    console.log("model after")
    
    res.json(JSON.parse(data));
    insertModelData(data, countryName);
    console.log("data inserted");
});

app.get('/api/MLmodel/:country', async (req,res) => {
    console.log("model before");
    country = req.params.countryName;
    if(req.params.country) {
        res.json(await getModelPredictions(req.params.country));
    } else {
        res.json({Message: "Country Not Found"});
    }
});



async function modelPredictions(country){
    return new Promise((resolve, reject) => {
        const python = spawn('python3', ["ML/ML-model.py", country]);
        
        let response = [];
        python.stdout.on('data', function (data) {
            console.log('Pipe data from python script ...');
            response.push(data);
        });
        
        python.on('exit', (code) => {
            console.log(code)
            // console.log(`returning result ${response[0]}`)
            resolve(response[0]);
        });
    });
}



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

async function insertModelData(data, country) {
    console.log(data);
    let today = new Date();

    let name = `${country}-${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    //if the table exists, insert covid data into said table
    if (await createTable(name) == 0) {
        MongoClient.connect(url, async function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");

            dbo.collection(`${name}`).insertOne(data, function (err, res) {
                if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
                db.close();
            });
        });
    }
}

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

async function getCasesFromDB(country) {
    return new Promise(async (resolve, reject) => {
        let today = new Date();
        let name = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

        if (await createTable(name)) {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                let dbo = db.db("mydb");
                dbo.collection(`${name}`).findOne({Country: country}, { projection: {_id: 0, CountryCode: 0, Slug: 0, Premium: 0, Date: 0} }, function (err, res) {
                    if (err) throw err;
                    db.close();
                    resolve(res);
                });
            });
        }
    });
}

async function getModelPredictions(country){
    return new Promise(async (resolve, reject) => {
        let today = new Date();
        let name = `${country}-${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

        if (await createTable(name)) {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                let dbo = db.db("mydb");
                dbo.collection(`${name}`).find(function (err, res) {
                    if (err) throw err;
                    db.close();
                    resolve(res);
                });
            });
        }
    });
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));