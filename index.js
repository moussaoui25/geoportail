const express = require("express");
const client = require("./connection.js");
const pg = require("pg");
const cors = require("cors")
const data = require('./Bureau_TOPO.json')
const bodyParser = require("body-parser");
require("dotenv").config();




const connectionString =
  "postgresql://postgres:BLsWHcahT5ZglrAxHSvH@containers-us-west-84.railway.app:6529/railway";
const pool = new pg.Pool({
    connectionString,
});

const app = express()
app.use(cors())
const port = process.env.PORT || 5000
const mydata = data.features
var search_result = []



app.get('/', (req, res)=>{
  console.log(`${req} is asking for connection`)
  res.send("success")
})

app.get('/db', async (req, res)=>{
  var data_res = await (await pool.query("SELECT id, name,  offre_ing, offre_tech, st_x(geom) as lng, st_y(geom) as lat FROM data")).rows
  res.json({data_res})
})

app.post('/add_all', (req, res)=>{
    mydata.features.forEach((feature)=>{
        var geom = `POINT(${feature.geometry.coordinates[0]} ${feature.geometry.coordinates[1]})`
        var offre_ing = feature.properties.Offre_ing;
        var offre_tech = feature.properties.Offre_tech;
        var nom = feature.properties.Nom;
        var query_string = `INSERT INTO bureau_topo(nom, offre_ing, offre_tech, geom) VALUES('${nom}', '${offre_ing}', '${offre_tech}', ST_GeomFromText('${geom}', 4326));`;
        pool.query(query_string);
    })
    res.send('done')
})
  const PORT = process.env.PORT || 3300;

  app.listen(PORT, console.log('app running'));
