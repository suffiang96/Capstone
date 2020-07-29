var map = L.map('map').setView([47.207404, -121.507328], 11);

var waterPoly= $.getJSON("WatersEdge.geojson",function (waterEdge) {
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

var thalwegAll = $.getJSON("All_Thalweg.geojson",function (allThalweg) {
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

var wetChan = $.getJSON("WetChanXS.geojson",function (wetChan) {
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
var sideHab = $.getJSON("SideChanHab1718.geojson",function (sideChan) {
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

var regJams = $.getJSON("Jams1718.geojson",function (jams) {
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

var markWood = $.getJSON("MarkedWood1718.geojson",function (mWood) {
  L.geoJson (mWood, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, wood )
  },
      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>This is " + feature.properties.WoodSize + " sized wood</p>")
      }
    }).addTo(map);
});

//Engineered Log Jams
var eljMark = {
  radius: 5,
  fillColor: "#331a00",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

var engJams= $.getJSON("ELJs.geojson",function (eljam) {
  L.geoJson (eljam, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, eljMark )
  },
      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>This is a " + feature.properties.JamSize + " sized jam</p>")
      }
    }).addTo(map);
});

//Pebble Counts
var pebbleMark= {
  radius: 3,
  fillColor: "#757570",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

var pebbleCount = $.getJSON("PebbleCount1718.geojson",function (pebcnt) {
  L.geoJson (pebcnt, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, pebbleMark )
  },
      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>Counts for D80: " + feature.properties.D80 + " </p>")
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

//Geocoder
var osmGeocoder = new L.Control.OSMGeocoder();
map.addControl(osmGeocoder);


//Layer controls from https://github.com/davicustodio/Leaflet.StyledLayerControl
var overlays = [
					 {
						groupName : "Field Surveys",
						expanded  : true,
						layers    : {
							"Pebble Counts" : pebbleCount,
              "ELJs" : engJams,
              "Marked Wood" : markWood,
              "Jams" : regJams,
						}
					 },
           {
            groupName : "LiDAR Data",
            expanded  : true,
            layers    : {
              "Water Surface" : waterPoly,
            }
           },
         ];

      pebbleCount.StyledLayerControl = {
     	removable : true,
     	visible : false,
     	}
      engJams.StyledLayerControl = {
        removable: true,
        visilbe: false,
      }
      markWood.StyledLayerControl = {
        removable: true,
        visilbe: false,
      }
      regJams.StyledLayerControl = {
        removable: true,
        visilbe: false,
      }
      waterPoly.StyledLayerControl = {
        removable: true,
        visilbe: false,
      }
var options = {
  container_width 	: "300px",
  container_maxHeight : "350px",
  group_maxHeight     : "80px",
  exclusive       	: false
};

var control = L.Control.styledLayerControl(overlays, options);
	map.addControl(control);
