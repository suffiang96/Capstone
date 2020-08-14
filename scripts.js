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
        weight: 0.5,
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
        fillOpacity: 1,
      }
    },
    onEachFeature: function (feature, layer){
        thalwegAll.addLayer(layer)
    },
  })
});

//GR thalweg
var thalwegGR = L.layerGroup()
$.getJSON("ThalGR.json",function (grThalweg) {
  L.geoJson (grThalweg, {
    style: function(feature){
      return {
        color: '#001a33',
        weight: 2,
        fillOpacity: 1,
      }
    },
    onEachFeature: function (feature, layer){
        thalwegGR.addLayer(layer)
    },
  })
});
//Smay thalweg
var thalwegSmay = L.layerGroup()
$.getJSON("ThalSmay.json",function (smayThalweg) {
  L.geoJson (smayThalweg, {
    style: function(feature){
      return {
        color: '#001a33',
        weight: 1.5,
        fillOpacity: 1,
      }
    },
    onEachFeature: function (feature, layer){
        thalwegSmay.addLayer(layer)
    },
  })
});
//Sunday thalweg
var thalwegSun = L.layerGroup()
$.getJSON("ThalSunday.json",function (sunThalweg) {
  L.geoJson (sunThalweg, {
    style: function(feature){
      return {
        color: '#001a33',
        weight: 1.5,
        fillOpacity: 1,
      }
    },
    onEachFeature: function (feature, layer){
        thalwegSun.addLayer(layer)
    },
  })
});

//StrmNW,
var strmNW = L.layerGroup()
$.getJSON("StrmNW (4).json",function (strm) {
  L.geoJson (strm, {
    style: function(feature){
      return {
        weight: 1,
        color: "#99d6ff",
        fillOpacity: 1,
      }
    },
      onEachFeature: function( feature, layer ){
        layer.bindPopup( "<b> Unit type:</b> " + feature.properties.UnitType )
        strmNW.addLayer(layer)
      },
  })
});
//major strm
var majStrm = L.layerGroup()
$.getJSON("MajorStrmNW.json",function (strmMaj) {
  L.geoJson (strmMaj, {
    style: function(feature){
      var color,
        slope = feature.properties.SlopeAngela;
      if ( slope <= "0" ) color = '#004d00';
      else if ( slope <= '3' ) color = '#228b22';
      else if ( slope <= '6' ) color = '#ffff00';
      else if ( slope <= '13' ) color = '#e68a00';
      else if ( slope >= '13' ) color = '#cc3300';
      else color = '#FFFFFF';

      return {weight: 2, color: color, fillOpacity: 1 };
      },
      onEachFeature: function( feature, layer ){
        layer.bindPopup( "<b> Slope:</b> " + feature.properties.SlopeAngela )
        majStrm.addLayer(layer)
      },
  })
});

//wet channel xs, purple
var wetChannel = L.layerGroup()
$.getJSON("WetChanXS.geojson",function (wetChan) {
  L.geoJson (wetChan, {
    style: function(feature){
      return {
        color: '#6600cc',
        weight: 2,
        fillOpacity: 1,
      }
    },
    onEachFeature: function (feature, layer){
      wetChannel.addLayer(layer)
    },
  })
});

//bankfull Surveys, green
var bankfull = L.layerGroup()
$.getJSON("BFXS.geojson",function (bfxs) {
  L.geoJson (bfxs, {
    style: function(feature){
      return {
        color: '#003300',
        weight: 2,
        fillOpacity: 1,
      }
    },
    onEachFeature: function (feature, layer){
      bankfull.addLayer(layer)
    },
  })
});

//Large Channel Habitat, rainbow
var largeHab = L.layerGroup()
$.getJSON("LargeChanHab1718.geojson",function (largeChan) {
  L.geoJson (largeChan, {
    style: function(feature){
      var color,
        type = feature.properties.UnitType;
      if ( type === "RI" ) color = '#ff6600';
      else if ( type === 'CA' ) color = '#0000ff';
      else if ( type === 'GL' ) color = '#008000';
      else if ( type === 'RU' ) color = '#9900cc';
      else color = '#FFFFFF';
      return {weight: 2.5, color: color, fillOpacity: 1 };
      },

      onEachFeature: function( feature, layer ){
        layer.bindPopup( "<b> Unit type:</b> " + feature.properties.UnitType )
        largeHab.addLayer(layer)
      }
  })
});

//SideChannel habitat, Style by habitat type gren to red
var sideHab = L.layerGroup()
$.getJSON("SideChanHab1718.geojson",function (sideChan) {
  L.geoJson (sideChan, {
    style: function(feature){
      var dashArray,
        type = feature.properties.ChannelTyp;
      if ( type === "D" ) dashArray = '5';
      else if ( type === 'I' ) dashArray = '4, 1, 4';
      else if ( type === 'F' ) dashArray = '1';
      else color = '#FFFFFF';
      return {weight: 2, color: 'gray', fillOpacity: 1, dashArray: dashArray };
      },

      onEachFeature: function( feature, layer ){
        layer.bindPopup( "<b>Channel type:</b> " + feature.properties.ChannelTyp  )
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
          layer.bindPopup( "<p><b>Bankfull width: </b>" + feature.properties.BankfullWi + "</p>" +
                           "<p><b>Bankfull width: </b>" + feature.properties.BankfullWi + "</p>" +
                           "<p><b>Wetted width: </b>" + feature.properties.WettedWidt + "</p>" +
                           "<p><b>Canopy cover: </b>" + feature.properties.CanopyClos + "</p>" )
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
          layer.bindPopup( "<b>Jam size: </b>" + feature.properties.JamSize + "<br>" + "<b>Jam type:</b> " + feature.properties.JamType )
          regJams.addLayer(layer)
        },
      })
    });
//marked wood
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
          layer.bindPopup( "<b>Wood size: </b>" + feature.properties.WoodSize + "<br>"+
                          "<b>Wood orientation: </b>" + feature.properties.WoodOrient  )
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
          layer.bindPopup( "<b>Jam size: </b>" + feature.properties.JamSize )
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
          layer.bindPopup( "<b>Wood size: </b>" + feature.properties.WoodSize + " <br>" +
                           "<b>Wood orientation: </b>" + feature.properties.WoodOrientation )
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
          iconSize: [12, 22],
          popupAnchor: [-3, -10],
      });
      return L.marker(latlng, {icon: myIcon} )
  },
      onEachFeature: function( feature, layer ){
          layer.bindPopup( "<b>Counts for D16: </b>" + feature.properties.D16 + " </p>" +
                           "<b>Counts for D50: </b>" + feature.properties.D50 + " </p>" +
                           "<b>Counts for D84: </b>" + feature.properties.D84 + " </p>" )
          pebbleCount.addLayer(layer)
      }
    })
});
//Pools, dep blue
var poolPoly = L.layerGroup()
$.getJSON("Pools1718.geojson",function (pools1718) {
  L.geoJson (pools1718, {
    style: function(feature){
      return {
        weight: 1,
        fillColor: '#000066',
        fillOpacity: 1,
        color: '#000066'
      }
    },
      onEachFeature: function( feature, layer ){
        layer.bindPopup( "<b>Max depth: <b/>" + feature.properties.PoolMaxDep + "<br>" +
                         "<b>Residual depth: <b/>" + feature.properties.PoolResidu + "<br>"+
                         "<b>Pool type: <b/>" + feature.properties.PoolType + "<br>" +
                         "<b>Pool formation: <b/>" + feature.properties.PoolFormin + " <br>" +
                         "<b>Pool area: <b/>" + feature.properties.Shape_Area + " <br>" +
                         "<b>Graveltail? : <b/>" + feature.properties.GravelTail + " <br>" )
        poolPoly.addLayer(layer)
      }
  })
});

//Powerlines, yellow
var powerLines= L.layerGroup()
$.getJSON("TransLinesWS.json",function (pLines) {
  L.geoJson (pLines, {
    style: function(feature){
      return {
        color: '#cccc00',
        weight: 1.5,
        opacity: 0.4,
      }
    },
    onEachFeature: function (feature, layer){
      layer.bindPopup( "<b>Owner: </b>" + feature.properties.OWNER + " </p>" )

        powerLines.addLayer(layer)
    },
  })
});

//Raillines
var railLines= L.layerGroup()
$.getJSON("RailWS.json",function (rLines) {
  L.geoJson (rLines, {
    style: function(feature){
      var color,
        type = feature.properties.Status;
      if ( type === "Abandoned" ) color = 'gray';
      else if ( type === 'Active' ) color = 'black';
      return {
        color: color,
        weight: 2,
        opacity: 1,
        dashArray: 2.5,
      }
    },
    onEachFeature: function (feature, layer){
      layer.bindPopup( "<b>Owner: </b>" + feature.properties.RailOwner + " </p>" )

        railLines.addLayer(layer)
    },
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
              "Large channel habitat" : largeHab,
              "Side channel habitat" : sideHab,
              "Pools " : poolPoly,
              "ELJs" : engJams,
              "Jams" : regJams,
              "ILWD" : ilwdLayer,
              "Marked wood" : markWood,
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
              "Green River Thalweg": thalwegGR,
              "Smay Creek Thalweg" : thalwegSmay,
              "Sunday Creek Thalweg" : thalwegSun,
              "Stream network" : strmNW,
              "Major stream network" : majStrm
            }
           },
           {
            groupName : "Structural Layers",
            expanded  : false,
            layers    : {
              "Power lines" : powerLines,
              "Rail lines" : railLines,
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

      thalwegGR.StyledLayerControl = {
        removable: false,
        visilbe: false,
      }
      thalwegSmay.StyledLayerControl = {
        removable: false,
        visilbe: false,
      }
      thalwegSun.StyledLayerControl = {
        removable: false,
        visilbe: false,
      }
      strmNW.StyledLayerControl = {
        removable: false,
        visilbe: false,
      }
      majStrm.StyledLayerControl = {
        removable: false,
        visilbe: false,
      }
      railLines.StyledLayerControl = {
        removable: false,
        visilbe: false,
      }
      powerLines.StyledLayerControl = {
        removable: false,
        visilbe: false,
      }

var options = {
  container_width 	: "100%",
  container_maxHeight : "350px",
  group_maxHeight     : "80px",
  exclusive       	: false
};

var Legend =  new L.Control.Legend({
        position: 'bottomright',
        collapsed: true,
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
