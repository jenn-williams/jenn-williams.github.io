  var isMapLoaded = false
  var isDataLoaded = false

//   // Your Javascript code here
  // SAMPLE: Grab earthquake data from USGS feed
  var EARTHQUAKE_API = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson'
  $.get(EARTHQUAKE_API)
    .done(function(res) {
      console.log(res);
      earthquakes = res;
      // simpleEarthquakeDisplay(res.features);
      isDataLoaded = true
      setInterval(displayEarthquakes(), 10000);
    })
    .fail(function(error) {
      // Do something with the error
    })

  function initMap() {
    isMapLoaded = true
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: new google.maps.LatLng(34,-118),
        mapTypeId: 'terrain'
      });
    displayEarthquakes();
  }

  function displayEarthquakes(){
    if (!isMapLoaded || !isDataLoaded){
      return 
    }
  eqfeed_callback(earthquakes);
  map.data.setStyle(function(feature) {
  var magnitude = feature.getProperty('mag');
  return {
    icon: getCircle(magnitude)
  };
});

  }
  function eqfeed_callback(results) {
        map.data.addGeoJson(results);
  }
  

  function getCircle(magnitude) {
      return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: .2,
        scale: Math.pow(2, magnitude) / 2,
        strokeColor: 'white',
        strokeWeight: .5
        };
  }

  // SAMPLE: Display the earthquake titles on the page
  // function simpleEarthquakeDisplay(quakes) {
  //   var container = $('#sample').empty();
  //   quakes.forEach(function(quake) {
  //     var quakeEl = $('<li></li>')
  //       .text(quake.properties.title)
  //       .appendTo(container);
  //   });
  // }

