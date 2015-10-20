

Array.prototype.frequencies  = function () {
    var freqs = {sum: 0}; 
    this.map( function (a){ 
        if (!(a in this)) { this[a] = 1; } 
        else { this[a] += 1; }
        this.sum += 1;
        return a; }, freqs
    );
    return freqs;
  }

var months = ['','janvier', 'février', 'mars', 'avril', 'mai', 'juin','juillet','août', 'septembre','octobre','novembre','décembre'];
var source = null;
var corresSorted = [];
var corres = [];
var oldState = null;
var histoInsert  = [];
var data = [];
var total = 0;
var pointArray = null;
function initMap() {
  var circle ={
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'red',
    fillOpacity: .4,
    scale: 4.5,
    strokeColor: 'white',
    strokeWeight: 1
  };

  pointArray =  new google.maps.MVCArray([]);
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 48.859747, lng:  2.341887},
    zoomControl: true
  });
  
  var myControl = document.getElementById('monthLabel');
  map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(myControl);
  
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray
  });

  heatmap.setMap(map);
}
  function update(id){
    $("#moisSlider").html(corres[corresSorted[id]]);
    
    if(id >= oldState){
      if((id-oldState)==1 || oldState == null){
        var provId = [];
        total +=source[corres[corresSorted[id]]].length;

        $.each(source[corres[corresSorted[id]]], function(key,val){
          if(val.lat.length == 0 || val.lon.length == 0) { /* lat/lng valued are missing? */
            console.log('Incorect lat/lon: (' + val.lat + ',' + val.lon + ')');
          }
          else {
            var curLat = Number(val.lat);
            var curLng = Number(val.lon);
            var retour = pointArray.push(new google.maps.LatLng(curLat, curLng));   
            provId.push(retour);
          }
        });
        histoInsert[id] = provId;
        
      } else {

        for(var x = (oldState+1) ; x<=id ; x++){
          var provId = [];

          $.each(source[corres[corresSorted[x]]], function(key,val){
            if(val.lat.length == 0 || val.lon.length == 0) { /* lat/lng valued are missing? */
              console.log('Incorect lat/lon: (' + val.lat + ',' + val.lon + ')');
            }
            else {
              var curLat = Number(val.lat);
              var curLng = Number(val.lon);
              var retour = pointArray.push(new google.maps.LatLng(curLat, curLng)); 
              provId.push(retour);
            }
          });
         
          histoInsert[x] = provId;
        }
      } 
    } else {
        
        if(oldState-id == 1){
          histoInsert[oldState].reverse();
          $.each(histoInsert[oldState],function(key, val){
            pointArray.removeAt(val-1);
          });
          
          histoInsert.splice( oldState, 1 );
        } else {
          for (var k = oldState; k>id; k--){
            histoInsert[k].reverse();
            $.each(histoInsert[k],function(key, val){
              pointArray.removeAt(val-1);
            });
            }
        }
    }
    
    $("#totalOffer").html(pointArray.length);
    oldState = id;
}

$( document ).ready(function() {


$('head').append('<meta property="og:title" content="Evolution de l\'offre Airbnb à Paris entre 2008 et 2009." />');
$('head').append('<meta property="og:url" content="http://www.simonblum.me/post/hacks/airbnb-paris/" />');
$('head').append('<meta property="og:image" content="http://www.simonblum.me/images/airbnb.png" />');

  var rangeSlider = document.getElementById('slider');

  noUiSlider.create(rangeSlider, {
    start: [ 0 ],
    step: 1,
    range: {
        'min': [ 0 ],
        'max': [ 79 ]
    }
  });


rangeSlider.noUiSlider.on('slide', function(){
    update(parseInt(rangeSlider.noUiSlider.get()));
});
rangeSlider.noUiSlider.on('change', function(){
    update(parseInt(rangeSlider.noUiSlider.get()));
});
$.ajaxSetup({cache: true});
  $.getJSON("/js/final.json", function( data ) {

      source = data;
      $.each(source, function(key,val){
        
        var split = key.split(" ");
        var mois = ("0" + months.indexOf(split[0])).slice(-2);
       
        corres[split[1]+""+mois] = key;
        corresSorted.push(parseInt(split[1]+""+mois));

      });
      corresSorted.sort();
      update(0);
      $('#loaderAnim').hide();
      $('#waitLoadArea').show();

});
$.getJSON("/js/dataairbnb.json", function( data ) {
       var dataAirbnb = data.FIELD1;
        var frequencies = dataAirbnb.frequencies();
        
        $.each(frequencies, function(key,val){
            if(key!='sum'){
                $('#tbody').append('<tr><td>'+key+'</td><td>'+val+'</td></tr>');
            }
            
        });
});



$("#action").click(function(){
  var funcs = [];
  var x=0;

  setInterval(function() {

    if (x < 79) {
      update(x);
      rangeSlider.noUiSlider.set(x);  
    }

    else return;

    x++;
}, 500);

});


});




