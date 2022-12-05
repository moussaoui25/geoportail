let myquery;

const button = document.getElementById("btngetQuery");
button.addEventListener("click", async (event) => {
  const data = { q: document.getElementById("searchTxt").value };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch("/api", options);
  const json = await response.json();
  console.log(json);

  let response2 = await fetch("/api");
  let json2 = await response2.json();
 
  console.log(json2);
  json2.forEach((i) => {

    console.log(i)
    L.geoJSON(JSON.parse(i.geom)).bindPopup(i.geom).addTo(map);
 
  });
});
