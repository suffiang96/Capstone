var map = L.map('map').setView([47.207404, -121.507328], 11);


$.getJSON("WatersEdge.geojson",function (waterEdge) {
  L.geoJson (waterEdge, {
    style: function(feature){
      return {
        color: 'blue',
        fillOpacity: 0.5,
      }
    }
  }).addTo(map);
});

$.getJSON("All_Thalweg.geojson",function (allThalweg) {
  L.geoJson (allThalweg, {
    style: function(feature){
      return {
        color: 'green',
        weight: 2,
        fillOpacity: 1,
      }
    }
  }).addTo(map);
});

$.getJSON("WetChanXS.geojson",function (wetChan) {
  L.geoJson (wetChan, {
    style: function(feature){
      return {
        color: 'black',
        weight: 1,
        fillOpacity: 1,
      }
    }
  }).addTo(map);
});


var layer = L.esri.basemapLayer('Topographic').addTo(map);
var layerLabels;

function setBasemap (basemap) {
  if (layer) {
    map.removeLayer(layer);
  }

  layer = L.esri.basemapLayer(basemap);

  map.addLayer(layer);

  if (layerLabels) {
    map.removeLayer(layerLabels);
  }

  if (
    basemap === 'ShadedRelief' ||
    basemap === 'Oceans' ||
    basemap === 'Gray' ||
    basemap === 'DarkGray' ||
    basemap === 'Terrain'
  ) {
    layerLabels = L.esri.basemapLayer(basemap + 'Labels');
    map.addLayer(layerLabels);
  } else if (basemap.includes('Imagery')) {
    layerLabels = L.esri.basemapLayer('ImageryLabels');
    map.addLayer(layerLabels);
  }
}

document
  .querySelector('#basemaps')
  .addEventListener('change', function (e) {
    var basemap = e.target.value;
    setBasemap(basemap);
  });
