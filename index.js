const express = require("express");
const pg = require("pg");
const cors = require("cors")
const mydata = require('./Bureau_TOPO.json')
const bodyParser = require("body-parser");
const app = express();
const {Client} = require('pg')

const DATABASE_URL = "postgresql://postgres:eZeu5iDt5OvhjTnjACcM@containers-us-west-95.railway.app:6273/railway";
const client = new Client({
    DATABASE_URL,
});

module.exports = client;
app.use(cors())
app.use(bodyParser.json());



app.get('/', (req, res)=>{
  console.log(`${req} is asking for connection`)
  res.send("success")
})

app.post('/add_all', (req, res)=>{
    mydata.features.forEach((feature)=>{
        var geom = `POINT(${feature.geometry.coordinates[0]} ${feature.geometry.coordinates[1]})`
        var offre_ing = feature.properties.Offre_ing;
        var offre_tech = feature.properties.Offre_tech;
        var nom = feature.properties.Nom;
        var query_string = `INSERT INTO bureau_topo(nom, offre_ing, offre_tech, geom) VALUES('${nom}', '${offre_ing}', '${offre_tech}', ST_GeomFromText('${geom}', 4326));`;
        client.query(query_string);
    })
    res.send('done')
})
  const PORT = process.env.PORT || 3500;

  app.listen(PORT, console.log('app running'));
