var map;
var panel;
var initialize;
var calculate;
var direction;

initialize = function(){
//<<<<<<< HEAD
    
    if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
var myOptions = {
    zoom      : 14, // Zoom par défaut
    center    : pos, // Coordonnées de départ de la carte de type latLng 
    mapTypeId : google.maps.MapTypeId.TERRAIN, // Type de carte, différentes valeurs possible HYBRID, ROADMAP, SATELLITE, TERRAIN
    maxZoom   : 20
  };
  map      = new google.maps.Map(document.getElementById('map'), myOptions);
  panel    = document.getElementById('panel');
      
      var marker = new google.maps.Marker({
    position : pos,
    map      : map,
    title    : "myPosition"
      });

      map.setCenter(pos);
      
      var watch = navigator.geolocation.watchPosition(currentPosition);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    var latLng = new google.maps.LatLng(50.6371834, 3.063017400000035); // Correspond au coordonnées de Lille
  var myOptions = {
    zoom      : 14, // Zoom par défaut
    center    : latLng, // Coordonnées de départ de la carte de type latLng 
    mapTypeId : google.maps.MapTypeId.TERRAIN, // Type de carte, différentes valeurs possible HYBRID, ROADMAP, SATELLITE, TERRAIN
    maxZoom   : 20
  };
  
  map      = new google.maps.Map(document.getElementById('map'), myOptions);
  panel    = document.getElementById('panel');
  
    handleNoGeolocation(false);
  }
    

  var latLng = new google.maps.LatLng(50.6371834, 3.063017400000035); // Correspond au coordonnées de Lille
  var myOptions = {
    zoom      : 14, // Zoom par défaut
    center    : latLng, // Coordonnées de départ de la carte de type latLng 
    mapTypeId : google.maps.MapTypeId.TERRAIN, // Type de carte, différentes valeurs possible HYBRID, ROADMAP, SATELLITE, TERRAIN
    maxZoom   : 20
  };
  
  map      = new google.maps.Map(document.getElementById('map'), myOptions);
  panel    = document.getElementById('panel');
  
  
  
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.open(map,marker);
  });
  
  google.maps.event.addListener(infoWindow, 'domready', function(){ // infoWindow est biensûr notre info-bulle
    jQuery("#tabs").tabs();
  });
  
  
  direction = new google.maps.DirectionsRenderer({
    map   : map,
    panel : panel // Dom element pour afficher les instructions d'itinéraire
  });

};

calculate = function(){
    document.getElementById('responseTime').innerHTML = "";
    var timeStart = (new Date()).getTime();
    var origin      = document.getElementById('origin').value; // Le point départ
    var destination = document.getElementById('destination').value; // Le point d'arrivée
    //var waypoints   = document.getElementById('waypoints');
    
    var waypts = [];
    var waypointsArray = document.getElementById('waypoints');
    for (var i = 0; i < waypointsArray.length; i++) {
            waypts.push({
            location:waypoints[i].value,
            stopover:true});
    }

    if(origin && destination && waypoints){
        var request = {
            origin      : origin,
            destination : destination,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode  : google.maps.DirectionsTravelMode.WALKING// Mode de conduite
        }
        var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
        directionsService.route(request, function(response, status){ // Envoie de la requête pour calculer le parcours
            if(status == google.maps.DirectionsStatus.OK){
                direction.setDirections(response); // Trace l'itinéraire sur la carte et les différentes étapes du parcours
    }
        });
        var timeStop = (new Date().getTime());
        var totalTime = timeStop - timeStart;
        var destinationForm = document.getElementById('destinationForm');
        destinationForm.innerHTML += '<br /> Response Time: ' + totalTime + ' ms<br />'; 
   

};
}


