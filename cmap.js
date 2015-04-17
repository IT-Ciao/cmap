//runInit
function runInit(){
	directionsDisplay = new google.maps.DirectionsRenderer();
	var mapOptions = {
		zoom:zoom,
		center:new google.maps.LatLng(centerLat,centerLng)
	};
	
	map = new google.maps.Map(document.getElementById('cmap'), mapOptions);
	directionsDisplay.setMap(map);
}

//addMarker
var locations = [];
function addMarker(){
	var infowindow = new google.maps.InfoWindow();
	var marker, i;

	for(i=0; i<locations.length; i++){
		marker = new google.maps.Marker({
			position : new google.maps.LatLng(locations[i][1],locations[i][2]) ,
			map:map,
			icon:markerImg
		});

		google.maps.event.addListener(marker,"click",(function(marker,i){
			return function(){
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
}


//calRoute
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
function calRoute(){
	var request = {
		origin:start,
		destination:end,
		travelMode: google.maps.TravelMode[mode],
		avoidHighways:avoidHighways
	};

	directionsService.route(request, function(response, status) {
		if(status == google.maps.DirectionsStatus.OK){
			directionsDisplay.setDirections(response);
		}
	});
}

$.fn.initMap = function(options){
	var bodyWidth = $("body").width();
	
	var settings = $.extend({
		borderColor:"gray",
		borderWeight:"1px",
		borderStyle:"solid",
		borderRadius:"0",
		W:"100%",
		H:"400px",		
		moblieW:"100%",
		moblieH:"400px",
		centerLat:24.150462, 
		centerLng:120.683379,
		zoom:10
	},options);

	if(bodyWidth < 768){
		$("#cmap").css({
			"width":settings.moblieW,
			"height":settings.moblieH,
			"border-radius":settings.borderRadius,
			"border-style":settings.borderStyle,
			"border-width":settings.borderWeight,
			"border-color":settings.borderColor
		});
	}

	else{
		$("#cmap").css({
			"width":settings.W,
			"height":settings.H,
			"border-radius":settings.borderRadius,
			"border-style":settings.borderStyle,
			"border-width":settings.borderWeight,
			"border-color":settings.borderColor
		});
	}
	
	centerLat = settings.centerLat;
	centerLng = settings.centerLng;
	zoom = settings.zoom;

	runInit();
}

$.fn.addMarker = function(options){
	var settings = $.extend({
		markerImg:"",
		locations:locations
	},options);

	markerImg = settings.markerImg;
	locations = settings.locations;

	addMarker();
}

$.fn.nav = function(options){
	var settings = $.extend({
		start:"",
		end:"",
		mode:"DRIVING",
		avoidHighways:false
	},options);

	start = settings.start;
	end = settings.end;
	mode = settings.mode;
	avoidHighways = settings.avoidHighways;
	calRoute();
}