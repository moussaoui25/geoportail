const express = require("express");

const pg = require("pg");
const cors = require("cors")
const data = require('./Bureau_TOPO.json')
const bodyParser = require("body-parser");




const connectionString =
  "postgresql://postgres:eZeu5iDt5OvhjTnjACcM@containers-us-west-95.railway.app:6273/railway";
const pool = new pg.Pool({
    connectionString,
});

const app = express()
app.use(cors())
const port = process.env.PORT || 5000
const mydata = data.features




app.get('/', (req, res)=>{
  console.log(`${req} is asking for connection`)
  res.send("success")
})

app.get('/db', async (req, res)=>{
  var data_res = await (await pool.query("SELECT id, name,  offre_ing, offre_tech FROM data")).rows
  res.json({data_res})
})

app.post('/add_all', (req, res)=>{
    mydata.forEach((feature)=>{
        var geom = `POINT(${feature.geometry.coordinates[0]} ${feature.geometry.coordinates[1]});`
        var offre_ing = feature.properties.Offre_ing;
        var offre_tech = feature.properties.Offre_tech;
        var nom = feature.properties.Nom;
        var query_string = `INSERT INTO bureau_topo(nom, offre_ing, offre_tech, geom) VALUES('${nom}', '${offre_ing}', '${offre_tech}', ST_GeomFromText('${geom}', 4326));`;
        pool.query(query_string);
    })
    res.send('done')
})

  app.listen(port, console.log('app running'));
