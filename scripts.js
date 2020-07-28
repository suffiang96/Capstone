
var map = L.map('map').setView([47.207404, -121.507328], 11);

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


$.getJSON("SideChanHab1718.json",function(sideChan){
  L.geoJson (sideChan, {
 style: function(feature){
   return { color: 'black',
          dashArray: '6',
          weight: 2.5 ,
          fillOpacity: 0.7 };
 },
 onEachFeature: function( feature, layer ){
   layer.bindPopup( feature.properties.ChannelTyp + " type channel" )
 }
  }).addTo(map);
});
