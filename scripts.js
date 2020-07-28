$.getJSON("SideChanHab1718.json",function(sideChan){
  L.geoJson (sideChan, {
 pane: "linePane",
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
