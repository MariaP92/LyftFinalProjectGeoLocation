"use strict";

let appMap = {
    map: undefined,
    geocoder: undefined,
    markerOrigin: undefined,
    init: function () {
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;
        appMap.map = new google.maps.Map(document.getElementById("map"), {
            zoom: 5,
            center: { lat: -9.1191427, lng: -77.0349046 },
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false
        });

        appMap.geocoder = new google.maps.Geocoder;

        document.getElementById("findMe").addEventListener("click", appMap.find);
        directionsDisplay.setMap(appMap.map);
        let input = document.getElementById("destination");
        let autocomplete = new google.maps.places.Autocomplete(input);
        appMap.markerOrigin = appMap.createMarker(appMap.map);
        appMap.datosUsuario();
        //TRACE ROUTE
        let onChangeHandler = function () {
            appMap.calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
        document.getElementById('origin').addEventListener('change', onChangeHandler);
        document.getElementById('destination').addEventListener('change', onChangeHandler);

    },

    find: function () {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(appMap.functionSuccess, appMap.functionError);

        }

    },

    functionSuccess: function (position1) {
        let latit = position1.coords.latitude;
        let longi = position1.coords.longitude;
        let myUbication = new google.maps.Marker({
            position: { lat: latit, lng: longi },
            //animation: google.maps.Animation.DROP,
            map: appMap.map
        });
        appMap.markerOrigin.setPosition(new google.maps.LatLng(latit, longi));
        appMap.geocodeLatLng(appMap.geocoder, appMap.map, latit, longi);
        appMap.map.setZoom(15);
        appMap.map.setCenter({ lat: latit, lng: longi });
    },
    functionError: function (error) {
        alert("Tenemos un inconveniente con encontrar tu ubicación");
    },


    geocodeLatLng: function (geocoder, map, latit, longi) {
        let latlng = { lat: parseFloat(latit), lng: parseFloat(longi) };
        geocoder.geocode({ 'location': latlng }, function (results, status) {
            if (status === 'OK') {
                if (results[1]) {
                    map.setZoom(11);
                    let marker = new google.maps.Marker({
                        position: latlng,
                        map: map
                    });
                    document.getElementById('origin').value = results[0].formatted_address;
                    console.log(results[0].formatted_address);
                    console.log(results[1].formatted_address);
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    },
    createMarker: function (map) {
        let icono = {
            url: 'img/Artdesigner-Urban-Stories-Car.ico',
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        };

        let marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            icon: icono,
            anchorPoint: new google.maps.Point(0, -29)
        });

        return marker;
    },
    //Function that traces de route
    calculateAndDisplayRoute: function (directionsService, directionsDisplay) {
        directionsService.route({
            origin: document.getElementById('origin').value,
            destination: document.getElementById('destination').value,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
            let price_stimated = response.routes[0].overview_path.length / 10 + ' USD';
            appMap.generarPrecio(price_stimated);
        });
    },
    generarPrecio: function (price_stimated) {
        document.getElementById("setPickup").addEventListener("click", function () {
            modalBody.innerHTML = "";
            let image = document.createElement("img");
            image.setAttribute("id", "carLyft");
            image.src = "img/Artdesigner-Urban-Stories-Car.ico";
            let code = document.createTextNode("You'll pay aproximatly: " + price_stimated);
            let pa = document.createElement("p");
            pa.appendChild(code);
            modalBody.appendChild(image);
            modalBody.appendChild(pa);
            $("#modalCode").modal();
        });


    },
    datosUsuario: function () {
        $("#usuario").click(function(){
            $('#UsermodalBody').val("");
            for (let i in localStorage) {
                let code = localStorage[i];
                let phone = localStorage.key(i);
                //console.log(comment+"dsadas"+ name);
                $('#UsermodalBody').append(`<div">\
                                    <p>\ 
                                     ${code}\
                                    </p>\
                                    <p>\ 
                                    ${phone}\
                                   </p>\
                            </div>`);
                $("#modalUser").modal();
            }
        });
    }

}

function initMap() {
    appMap.init();
}
