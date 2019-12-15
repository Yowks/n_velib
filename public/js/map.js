mapboxgl.accessToken = 'pk.eyJ1IjoibWlraGV1bGwiLCJhIjoiY2ppa24wbnVmMjAxZzNxcXAzbGxvcHdwcSJ9.PRr0Bp0Y-i2xUrJ5cBvbPw';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/light-v10', //hosted style id
    center: [2.3797426, 48.8960154], // starting position
    zoom: 10 // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
}));



map.on("load", function () {
    map.addLayer({
        "id": "places",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {
                            "description": "Vous êtes ici",
                            "icon": "town-hall"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [2.3797426, 48.8960154]
                        }
                    }
                ]
            }
        },
        "layout": {
        "icon-image": "{icon}-15",
        "icon-allow-overlap": true
        }
    });
    
});