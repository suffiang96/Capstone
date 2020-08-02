//icons from FONT AWESOME https://fontawesome.com/
var map = L.map('map',{zoomControl:false}).setView([47.207404, -121.507328], 11);
var zoomHome = L.Control.zoomHome();
  zoomHome.addTo(map);


  // water surface, light blue
var waterPoly= L.layerGroup().addTo(map)

$.getJSON("WatersEdge.geojson",function (waterEdge) {
  L.geoJson (waterEdge, {
    style: function(feature){
      return {
        color: '#3399ff',
        fillColor:"#3399ff",
        fillOpacity: 0.5,
        weight: 1,
      }
    },
    onEachFeature: function (feature, layer){
      waterPoly.addLayer(layer)
    },
  })
});

//Thalweg, dark blue
var thalwegAll = L.layerGroup().addTo(map)
$.getJSON("All_Thalweg.geojson",function (allThalweg) {
  L.geoJson (allThalweg, {
    style: function(feature){
      return {
        color: '#001a33',
        weight: 1.5,
        dashArray: 4,
        fillOpacity: 1,
      }
    },
    onEachFeature: function (feature, layer){
        thalwegAll.addLayer(layer)
    },
  })
});

//wet channel xs, dark blue
var wetChannel = L.layerGroup()
$.getJSON("WetChanXS.geojson",function (wetChan) {
  L.geoJson (wetChan, {
    style: function(feature){
      return {
        color: '#003366',
        weight: 1,
        fillOpacity: 1,
      }
    },
    onEachFeature: function (feature, layer){
      wetChannel.addLayer(layer)
    },
  })
});

//bankfull Surveys, dark blue
var bankfull = L.layerGroup()
$.getJSON("BFXS.geojson",function (bfxs) {
  L.geoJson (bfxs, {
    style: function(feature){
      return {
        color: '#003366',
        weight: 1,
        fillOpacity: 1,
      }
    },
    onEachFeature: function (feature, layer){
      bankfull.addLayer(layer)
    },
  })
});

//Large Channel Habitat, styled by shades of blue
var largeHab = L.layerGroup()
$.getJSON("LargeChanHab1718.geojson",function (largeChan) {
  L.geoJson (largeChan, {
    style: function(feature){
      var color,
        type = feature.properties.UnitTyp;
      if ( type === "RI" ) color = '#668cff';
      else if ( type === 'CA' ) color = '#1a53ff';
      else if ( type === 'GL' ) color = '#002080';
      else if ( type === 'RU' ) color = '#0033cc';
      else color = '#FFFFFF';
      return {weight: 2, color: color, fillOpacity: 1 };
      },

      onEachFeature: function( feature, layer ){
        layer.bindPopup( "This is a: " + feature.properties.UnitType )
        largeHab.addLayer(layer)
      }
  })
});

//SideChannel habitat, Style by habitat type gren to red
var sideHab = L.layerGroup()
$.getJSON("SideChanHab1718.geojson",function (sideChan) {
  L.geoJson (sideChan, {
    style: function(feature){
      var color,
        type = feature.properties.ChannelTyp;
      if ( type === "D" ) color = '#990000';
      else if ( type === 'I' ) color = '#e68a00';
      else if ( type === 'F' ) color = '#00802b';
      else color = '#FFFFFF';
      return {weight: 2, color: color, fillOpacity: 1 };
      },

      onEachFeature: function( feature, layer ){
        layer.bindPopup( feature.properties.ChannelTyp + " type channel" )
        sideHab.addLayer(layer)
      }
  })
});

//BF survey points, Dark green
var bfPoints = L.layerGroup()
$.getJSON("BFSurveyPts.geojson",function (bankXS) {
  L.geoJson (bankXS, {
    pointToLayer: function (feature, latlng) {
      var bankfullMark = {
        radius: 3,
        fillColor: "#006600",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      }

      return L.circleMarker(latlng, bankfullMark )
  },
      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>Bankfull width: " + feature.properties.BankfullWi + "</p>" +
                           "<p>Bankfull width: " + feature.properties.BankfullWi + "</p>" +
                           "<p>Wetted width: " + feature.properties.WettedWidt + "</p>" +
                           "<p>Canopy cover: " + feature.properties.CanopyClos + "</p>" )
          bfPoints.addLayer(layer)
      }
    })
});

//Regular Jams, Use conditional styling to refelct size of the jam, default dark brown
var regJams = L.layerGroup()
$.getJSON("Jams1718.geojson",function (jams) {
  L.geoJson (jams, {
    pointToLayer: function (feature, latlng) {
      var iconSize;
        var size = feature.properties.JamSize;
          if ( size === "Small" ) {iconSize = [8,18]}
          else if ( size === 'Medium' ) {iconSize = [10,20]}
          else if ( size === 'Large' ) {iconSize = [12,22]}
          else {iconSize = [6,16]};

      var myIcon = L.icon({
        iconUrl: 'certificate-solid.svg',
        iconSize: iconSize,
        popupAnchor: [-3, -10],

      });
      return L.marker(latlng, {icon: myIcon})
    },
    onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>This is a " + feature.properties.JamSize + " sized jam</p>" + "<p>It is a " + feature.properties.JamType + " type of jam</p>")
          regJams.addLayer(layer)
        },
      })
    });
var markWood = L.layerGroup()
$.getJSON("MarkedWood1718.geojson",function (mWood) {
  L.geoJson (mWood, {
    pointToLayer: function (feature, latlng) {
      var radius,
        size = feature.properties.JamSize;
      if ( size === "RW" ) {iconSize = [10,20]}
      else if ( size === 'ML' ) {iconSize = [12,22]}
      else if ( size === 'MLR' ) {iconSize = [14,24]}
      else if ( size === 'LL' ) {iconSize = [16,26]}
      else if ( size === 'LLR' ) {iconSize = [18,28]}
      else {iconSize = [10,20]}

      var myIcon = L.icon({
        iconUrl: 'asterisk-solid.svg',
        iconSize: iconSize,
        popupAnchor: [-3, -10],

      });
      return L.marker(latlng, {icon: myIcon})
    },
      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>Wood size: " + feature.properties.WoodSize + "</p>"+
                          "<p>Wood orientation: " + feature.properties.WoodOrient + " </p>" )
          markWood.addLayer(layer)
          }
        })
    });

//Engineered Log Jams, black, style by size eventually

var engJams =  L.layerGroup()
$.getJSON("ELJs.geojson",function (eljam) {
  L.geoJson (eljam, {
    pointToLayer: function (feature, latlng) {
      var radius;
       var size = feature.properties.JamSize;
      if ( size === "Small" ) {iconSize = [10,20]}
      else if ( size === 'Medium' ) {iconSize = [12,22]}
      else if ( size === 'Large' ) {iconSize = [14,24]}
      else {iconSize = [10,20]};

      var myIcon = L.icon({
        iconUrl: 'bahai-solid.svg',
        iconSize: iconSize,
        popupAnchor: [-3, -10],

      });
      return L.marker(latlng, {icon: myIcon})
  },
      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>Jam size: " + feature.properties.JamSize + "</p>")
          engJams.addLayer(layer)
      }
    })
});

//ILWD, light brown

var ilwdLayer = L.layerGroup()
$.getJSON("ILWD1718.geojson",function (ilwd) {
  L.geoJson (ilwd, {
    pointToLayer: function (feature, latlng) {
        var radius,
          size = feature.properties.WoodSize;
        if ( size === "ML" )  {iconSize = [10,20]}
        else if ( size === 'MLR' )  {iconSize = [12,22]}
        else if ( size === 'KP' )  {iconSize = [14,24]}
        else if ( size === 'KPR' )  {iconSize = [16,26]}
        else if ( size === 'RW' ) {iconSize = [18,28]}
        else if ( size === 'LL' )  {iconSize = [20,30]}
        else if ( size === 'LLR' )  {iconSize = [22,32]}
        else  {iconSize = [10,20]};

        var myIcon = L.icon({
          iconUrl: 'diaspora-brands.svg',
          iconSize: iconSize,
          popupAnchor: [-3, -10],

        });
        return L.marker(latlng, {icon: myIcon})
      },
      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>Wood size: " + feature.properties.WoodSize + " </p>" +
                           "<p>Wood orientation: " + feature.properties.WoodOrientation + " </p>")
          ilwdLayer.addLayer(layer)
      }
    })
});

//Thanks to fontawesome
var pebbleCount = L.layerGroup()
$.getJSON("PebbleCount1718.geojson",function (pebcnt) {
  L.geoJson (pebcnt, {
    pointToLayer: function (feature, latlng) {
      var myIcon = L.icon({
          iconUrl: 'hashtag-solid.svg',
          iconSize: [15, 25],
          popupAnchor: [-3, -10],
      });
      return L.marker(latlng, {icon: myIcon} )
  },
      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<p>Counts for D16: " + feature.properties.D16 + " </p>" +
                           "<p>Counts for D50: " + feature.properties.D50 + " </p>" +
                           "<p>Counts for D84: " + feature.properties.D84 + " </p>" )
          pebbleCount.addLayer(layer)
      }
    })
});

//Pools, shades of blue
var poolPoly = L.layerGroup()
$.getJSON("Pools1718.geojson",function (pools1718) {
  L.geoJson (pools1718, {
    style: function(feature){
      var fillColor,
        depth = feature.properties.PoolMaxDep;
      if ( depth <= '6' ) fillColor = '#80b3ff';
      else if ( depth <= '12' ) fillColor = '#0066ff';
      else if ( depth <='20' ) fillColor = '#002966';
      else fillColor = '#FFFFFF';
      return {weight: 1, fillColor: fillColor, fillOpacity: 1, color: fillColor};
      },
      onEachFeature: function( feature, layer ){
        layer.bindPopup( "<p>Max depth: " + feature.properties.PoolMaxDep + " </p>" +
                         "<p>Residual depth: " + feature.properties.PoolResidu + " </p>" +
                         "<p>Pool type: " + feature.properties.PoolType + " </p>" +
                         "<p>Pool formation: " + feature.properties.PoolFormin + " </p>" +
                         "<p>Pool area: " + feature.properties.Shape_Area + " </p>" +
                         "<p>Graveltail? : " + feature.properties.GravelTail + " </p>" )
        poolPoly.addLayer(layer)
      }
  })
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
              "Pools" : poolPoly,
              "ELJs" : engJams,
              "ILWD" : ilwdLayer,
              "Marked wood" : markWood,
              "Jams" : regJams,
              "Large channel habitat" : largeHab,
              "Side channel habitat" : sideHab,
              "Wet channel cross sections" : wetChannel,
              "Bankfull survey cross sections" : bankfull,
              "Bankfull points data": bfPoints,
              "Pebble counts" : pebbleCount,
						}
					 },
           {
            groupName : "LiDAR Derived Data",
            expanded  : true,
            layers    : {
              "Water Surface" : waterPoly,
              "River Thalweg" : thalwegAll,
            }
           },
         ];

      pebbleCount.StyledLayerControl = {
     	removable : false,
     	visible : false,

     	}
      engJams.StyledLayerControl = {
        removable: false,
        visilbe: false,
      }
      ilwdLayer.StyledLayerControl = {
        removable: false,
        visilbe: false,
      }
      markWood.StyledLayerControl = {
        removable: false,
        visilbe: false,
      }
      regJams.StyledLayerControl = {
        removable: false,
        visilbe: false,
      }
      largeHab.StyledLayerControl = {
        removable: false,
        visilbe: false,
      }
      sideHab.StyledLayerControl = {
        removable: false,
        visilbe: false,
      }
      wetChannel.StyledLayerControl = {
        removable: false,
        visilbe: false,
      }
      bankfull.StyledLayerControl = {
        removable: false,
        visilbe: false,
      }
      bfPoints.StyledLayerControl = {
        removable: false,
        visilbe: false,
      }
      poolPoly.StyledLayerControl = {
        removable: false,
        visilbe: false,
      }
      waterPoly.StyledLayerControl = {
        removable: false,
        visilbe: false,
      }
      thalwegAll.StyledLayerControl = {
        removable: false,
        visilbe: false,
      }

var options = {
  container_width 	: "300px",
  container_maxHeight : "350px",
  group_maxHeight     : "80px",
  exclusive       	: false
};

var Legend =  new L.Control.Legend({
        position: 'bottomleft',
        collapsed: false,
        controlButton: {
            title: "Legend"
        }
});


// legend
map.addControl(Legend);

$(".legend-container").append( $("#legend") );
$(".legend-toggle").append( "<i class='legend-toggle-icon fa fa-info-circle fa-2x' style='color: #000'></i>" );

var control = L.Control.styledLayerControl(null, overlays, options);
	map.addControl(control);
