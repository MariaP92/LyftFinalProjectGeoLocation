//MAIN.JS
function initMap() {
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: { lat: -9.1191427, lng: -77.0349046 },
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false
    });

    let geocoder = new google.maps.Geocoder;

    function find() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(functionExito, functionError);

        }
    }
    document.getElementById("findMe").addEventListener("click", find);
    let latit, longi;
    let functionExito = function (position1) {
        latit = position1.coords.latitude;
        longi = position1.coords.longitude;
        let myUbication = new google.maps.Marker({
            position: { lat: latit, lng: longi },
            animation: google.maps.Animation.DROP,
            map: map
        });
        let myDirection = new google.maps.LatLng(latit, longi);
        geocodeLatLng(geocoder, map, latit, longi);
        map.setZoom(15);
        map.setCenter({ lat: latit, lng: longi });
    }
    let functionError = function (error) {
        alert("Tenemos un inconveniente con encontrar tu ubicación");
    }
    directionsDisplay.setMap(map);

    //AUTOCOMPLETE TEXTBOX DESTINY
    let inputOrigin = document.getElementById("origin");
    let autocompleteOrigin = new google.maps.places.Autocomplete(inputOrigin);
    //AUTOCOMPLETE TEXTBOX DESTINY
    let input = document.getElementById("destination");
    let autocomplete = new google.maps.places.Autocomplete(input);

    //TRACE ROUTE
    let onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.getElementById('origin').addEventListener('change', onChangeHandler);
    document.getElementById('destination').addEventListener('change', onChangeHandler);
}

//function to change coordinates to address
function geocodeLatLng(geocoder, map, latit, longi) {
    let latlng = { lat: parseFloat(latit), lng: parseFloat(longi) };
    geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === 'OK') {
            if (results[1]) {
                map.setZoom(11);
                let marker = new google.maps.Marker({
                    position: latlng,
                    map: map
                });
                document.getElementById('origin').value = results[1].formatted_address;
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

//Function that traces de route
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
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
        let price_stimated = response.routes[0].overview_path.length / 10  + ' USD';
        generarPrecio(price_stimated);
    });
    
}

function generarPrecio(price_stimated){
    document.getElementById("setPickup").addEventListener("click", function(){
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
}


//COUNTRIES.JS
$(document).ready(function () {
    let peru = document.getElementById("peru");
    let mexico = document.getElementById("mexico");
    let chile = document.getElementById("chile");
    let textbox = document.getElementById("cod");
    let modalBody= document.getElementById("modalBody");
    let textboxPhone = document.getElementById("telC");

    peru.addEventListener("click", function () {
        textbox.value = "+51";
    });
    mexico.addEventListener("click", function () {
        textbox.value = "+52";
    });
    chile.addEventListener("click", function () {
        textbox.value = "+56";
    });

    function makeid() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (let i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    }

    $("#generateCode").click(function () {
        if (textboxPhone.value != "") {
            modalBody.innerHTML = "";
            let randomCode = makeid();
            let code = document.createTextNode("your code is: " + randomCode);
            let pa = document.createElement("p");
            pa.appendChild(code);
            modalBody.appendChild(pa);
            $("#modalCode").modal();
            $("#next").show();

        }
        else {
            $("#modalError").modal();
        }
    });

    
});


//register.js
var btnagree = document.getElementById("agreeButton");
btnagree.addEventListener("click", function(){
    $("#nextBTN").show();
});




