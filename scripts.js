var map = L.map('map',{zoomControl:false}).setView([47.207404, -121.507328], 11);
var zoomHome = L.Control.zoomHome();
  zoomHome.addTo(map);
var layerControl = L.control.layers(null, null, {position: 'topleft', collapsed: false});
  layerControl.addTo(map);
// water surface, light blue
var waterPoly = $.getJSON("WatersEdge.geojson",function (waterEdge) {
L.geoJson (waterEdge, {
    style: function(feature){
      return {
        color: '#3399ff',
        fillOpacity: 0.5,
        weight: 1,
      }
    }
  }).addTo(map);
  layerControl.addOverlay(waterPoly, "Water Surface");
});

//Thalweg, dark blue
$.getJSON("All_Thalweg.geojson",function (allThalweg) {
  var thalwegAll =L.geoJson (allThalweg, {
    style: function(feature){
      return {
        color: '#001a33',
        weight: 3,
        fillOpacity: 1,
      }
    }
  }).addTo(map);
  layerControl.addOverlay(thalwegAll, "River thalweg")
});

//wet channel xs, dark blue
$.getJSON("WetChanXS.geojson",function (wetChan) {
  var wetChannel = L.geoJson (wetChan, {
    style: function(feature){
      return {
        color: '#003366',
        weight: 1,
        fillOpacity: 1,
      }
    }
  }).addTo(map);
  layerControl.addOverlay(wetChannel, "Wetted channel cross sections")
});

//bankfull Surveys, dark blue
$.getJSON("BFXS.geojson",function (bfxs) {
  var bankfull = L.geoJson (bfxs, {
    style: function(feature){
      return {
        color: '#003366',
        weight: 1,
        fillOpacity: 1,
      }
    }
  }).addTo(map);
  layerControl.addOverlay(bankfull, "Bankfull cross sections")
});

//Large Channel Habitat, styled by shades of blue
$.getJSON("LargeChanHab1718.geojson",function (largeChan) {
  var largeHab = L.geoJson (largeChan, {
    style: function(feature){
      var color,
        type = feature.properties.UnitTyp;
      if ( type === "RI" ) color = '#668cff';
      else if ( type === 'CA' ) color = '#1a53ff';
      else if ( type === 'GL' ) color = '#002080';
      else if ( type === 'RU' ) color = '#0033cc';
      else color === '#FFFFFF';
      return {weight: 2, color: color, fillOpacity: 1 };

      },

      onEachFeature: function( feature, layer ){
        layer.bindPopup( feature.properties.UnitTyp + " type channel" )
      }
  }).addTo(map);
  layerControl.addOverlay(largeHab, "Large Channel habitat")
});

//SideChannel habitat, Style by habitat type gren to red
$.getJSON("SideChanHab1718.geojson",function (sideChan) {
  var sideHab = L.geoJson (sideChan, {
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
  layerControl.addOverlay(sideHab, "Side Channel habitat")
});

//BF survey points, Dark green
var bankfullMark = {
  radius: 3,
  fillColor: "#006600",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

$.getJSON("BFSurveyPts.geojson",function (bankXS) {
  var bfPoints = L.geoJson (bankXS, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, bankfullMark )
  },
      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>Canopy cover: " + feature.properties.CanopyClos + "</p>" + "<p>Bankfull width: " + feature.properties.BankfullWi + "</p>" + "<p>Wetted width: " + feature.properties.WettedWidt + "</p>")
      }
    }).addTo(map);
    layerControl.addOverlay(bfPoints, "Bankfull survey points")
});

//Regular Jams, Use conditional styling to refelct size of the jam, default dark brown
var defaultMark = {
  radius: 1,
  fillColor: "#604020",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

$.getJSON("Jams1718.geojson",function (jams) {
  var regJams = L.geoJson (jams, {
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
      layerControl.addOverlay(regJams, "Jams")
    });

//Marked Wood, medium brown
var wood = {
  radius: 5,
  fillColor: "#996633",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

$.getJSON("MarkedWood1718.geojson",function (mWood) {
  var markWood = L.geoJson (mWood, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, wood )
  },
      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>Wood size: " + feature.properties.WoodSize + "</p>")
      }
    }).addTo(map);
    layerControl.addOverlay(markWood, "Marked wood")
});

//Engineered Log Jams, black, style by size eventually
var eljMark = {
  radius: 5,
  fillColor: "#000000",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

$.getJSON("ELJs.geojson",function (eljam) {
  var engJams= L.geoJson (eljam, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, eljMark )
  },
      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>This is a " + feature.properties.JamSize + " sized jam</p>")
      }
    }).addTo(map);
    layerControl.addOverlay(engJams, "Engineered log jams")
});

//ILWD, light brown
var ilwdMark= {
  radius: 3,
  fillColor: "#d9b38c",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

$.getJSON("ILWD1718.geojson",function (ilwd) {
  var ilwdLayer = L.geoJson (ilwd, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, ilwdMark )
  },
      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>Wood size: " + feature.properties.WoodSize + " </p>")
      }
    }).addTo(map);
    layerControl.addOverlay(ilwdLayer, "Individual large woody debris")
});
//Pebble Counts, dark gray
// var pebbleMark= {
//   radius: 3,
//   fillColor: "#4d4d4d",
//   color: "#000",
//   weight: 1,
//   opacity: 1,
//   fillOpacity: 0.8,
// };
var myIcon = L.icon({
    iconUrl: '<i class="fas fa-hashtag"></i>',

});
$.getJSON("PebbleCount1718.geojson",function (pebcnt) {
  var pebbleCount = L.geoJson (pebcnt, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {icon: myIcon} )
  },
      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>Counts for D80: " + feature.properties.D80 + " </p>")
      }
    }).addTo(map);
    layerControl.addOverlay(pebbleCount, "Pebble counts")
});

//Pools, shades of blue
$.getJSON("Pools1718.geojson",function (pools1718) {
  var poolPoly = L.geoJson (pools1718, {
    style: function(feature){
      var fillColor,
        depth = feature.properties.PoolMaxDep;
      if ( depth => '6' ) fillColor = '#7d8bb8';
      else if ( depth => '12' ) fillColor = '#5265a1';
      else if ( depth =>'20' ) fillColor = '#273f8a';
      else fillColor === '#FFFFFF';
      return {weight: 2, fillColor: fillColor, fillOpacity: 1 };

      },

      onEachFeature: function( feature, layer ){
        layer.bindPopup( "<p>Max depth is: " + feature.properties.PoolMaxDep + " </p>")
      }
  }).addTo(map);
  layerControl.addOverlay(poolPoly, "Pools")
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

var overlays = [
         {
          groupName : "Lidar",
          expanded  : true,
          layers    : {
            "water surface" : waterPoly,
          }
        }];

var options = {
  container_width 	: "300px",
  container_maxHeight : "350px",
  group_maxHeight     : "80px",
  exclusive       	: false
};
//Layer controls from https://github.com/davicustodio/Leaflet.StyledLayerControl
var control = L.Control.styledLayerControl(null, overlays, options);
	map.addControl(control);
