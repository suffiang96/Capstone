var map = L.map('map').setView([47.207404, -121.507328], 11);

$.getJSON("WatersEdge.geojson",function (waterEdge) {
  L.geoJson (waterEdge, {
    style: function(feature){
      return {
        color: '#3399ff',
        fillOpacity: 0.5,
        weight: 1,
      }
    }
  }).addTo(map);
});

$.getJSON("All_Thalweg.geojson",function (allThalweg) {
  L.geoJson (allThalweg, {
    style: function(feature){
      return {
        color: '#001a33',
        weight: 3,
        fillOpacity: 1,
      }
    }
  }).addTo(map);
});

$.getJSON("WetChanXS.geojson",function (wetChan) {
  L.geoJson (wetChan, {
    style: function(feature){
      return {
        color: '#400080',
        weight: 1,
        fillOpacity: 1,
      }
    }
  }).addTo(map);
});

//Style by habitat type
$.getJSON("SideChanHab1718.geojson",function (sideChan) {
  L.geoJson (sideChan, {
    style: function(feature){
      var color,
        type = feature.properties.ChannelTyp;
      if ( type === "D" ) color = '#990000';
      else if ( type === 'I' ) color = '#e68a00';
      else if ( type === 'F' ) color = '#00802b';
      else color === '#FFFFFF';
      return {weight: 2, color: color, fillOpacity: 1 };

      },

      onEachFeature: function( feature, layer ){
        layer.bindPopup( feature.properties.ChannelTyp + " type channel" )
      }
  }).addTo(map);
});

//Use conditional styling to refelct size of the jam
var defaultMark = {
  radius: 1,
  fillColor: "#996633",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

$.getJSON("Jams1718.geojson",function (jams) {
  L.geoJson (jams, {
    pointToLayer: function (feature, latlng) {
      var radius,
        size = feature.properties.JamSize;
      if ( size == "Small" ) radius = 5;
      else if ( size == 'Medium' ) radius = 10;
      else if ( size == 'Large' ) radius = 15;
      else radius == 1;

      return L.circleMarker(latlng, radius, defaultMark)
  },

      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>This is a " + feature.properties.JamSize + " sized jam</p>" + "<p>It is a " + feature.properties.JamType + " type of jam</p>")
        }
      }).addTo(map);
    });

//Marked Wood
var wood = {
  radius: 5,
  fillColor: "#996633",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

$.getJSON("MarkedWood1718.geojson",function (mWood) {
  L.geoJson (mWood, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, wood )
  },
      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>This is " + feature.properties.WoodSize + " sized wood</p>")
      }
    }).addTo(map);
});



//Basemaps
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

var osmGeocoder = new L.Control.OSMGeocoder();
map.addControl(osmGeocoder);
