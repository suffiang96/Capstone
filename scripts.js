var map = L.map('map').setView([47.615428, -122.334145], 11);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 100,
    id: 'mapbox.streets',
    accessToken:'pk.eyJ1Ijoic3VmZmlhbmc5NiIsImEiOiJjazJqb3V4cXAwbXN1M2N0cmNlMDB0ODdyIn0.bSVgjiBLodS46nfCU1cKMw'
}).addTo(map);
