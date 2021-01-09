const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();

app.get('/api/test', (req,res) => {
    let testObject = [{id:0, description: "idk something or other"}, {id:1, description: "Another one"}];
    res.json(testObject);
    console.log("Sent Items");
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));