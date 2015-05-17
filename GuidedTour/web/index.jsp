<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
  <style type="text/css">
    html { height: 100% }
    body { height: 100%; margin: 0px; padding: 0px }
    #map_canvas { height: 100% ; width:100%;}
  </style>
  <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script> 
  <script type="text/javascript">
 
    var previousPosition = null;
   
    function initialize() {
        
      map = new google.maps.Map(document.getElementById("map_canvas"), {
            zoom: 19,
            center: new google.maps.LatLng(48.858565, 2.347198),
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
      
    
    }
       google.maps.event.addListener(m,'click',placeMarker(event));
        
    if (navigator.geolocation)
      var watchId = navigator.geolocation.watchPosition(successCallback, null, {enableHighAccuracy:true});
    else
      alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");
  
  function placeMarker(event){
      var m = new google.maps.Marker({
            position: new google.maps.LatLng(event.latlng.lat,event.latlng.lng),
            map: map
        });
        
    
  };
       
    function successCallback(position){
      map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 
        map: map
      });  
      if (previousPosition){
        var newLineCoordinates = [
           new google.maps.LatLng(previousPosition.coords.latitude, previousPosition.coords.longitude),
           new google.maps.LatLng(position.coords.latitude, position.coords.longitude)];
         
        var newLine = new google.maps.Polyline({
          path: newLineCoordinates,        
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        newLine.setMap(map);
      }
      previousPosition = position;
    };    
    
    calculate = function(){
    origin      = document.getElementById('origin').value; // Le point départ
    destination = document.getElementById('destination').value; // Le point d'arrivé
    if(origin && destination){
        var request = {
            origin      : origin,
            destination : destination,
            travelMode  : google.maps.DirectionsTravelMode.DRIVING // Type de transport
        }
        var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
        directionsService.route(request, function(response, status){ // Envoie de la requête pour calculer le parcours
            if(status == google.maps.DirectionsStatus.OK){
                direction.setDirections(response); // Trace l'itinéraire sur la carte et les différentes étapes du parcours
            }
        });
    } //http://code.google.com/intl/fr-FR/apis/maps/documentation/javascript/reference.html#DirectionsRequest
};
  </script>
</head>
 
<body onload="initialize()">
  <div style="width:800px; height:600px; overflow:auto" id="map_canvas"></div>
  <div id="destinationForm">
     <form action="" method="get" name="direction" id="direction">
         <label>Origin :</label>
         <input type="text" name="origin" id="origin">
         <label>Destination :</label>
         <input type="text" name="destination" id="destination">
         <input type="button" value="Calculate" onclick="javascript:calculate()">
     </form>
 
 </div>
<div id="panel"></div>
</body>
 
</html>