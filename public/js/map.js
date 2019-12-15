$(document).on('change', '.mapboxgl-ctrl-geocoder--input', function() {
    
    let query = $(this).val();
    socket.emit('search_velib', type = 'adress', value = query);
    
});




mapboxgl.accessToken = 'pk.eyJ1IjoibWlraGV1bGwiLCJhIjoiY2ppa24wbnVmMjAxZzNxcXAzbGxvcHdwcSJ9.PRr0Bp0Y-i2xUrJ5cBvbPw';

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/light-v10', //hosted style id
    center: [2.3797426, 48.8960154], // starting position
    zoom: 10 // starting zoom
});
 
// initialize the map canvas to interact with later
var canvas = map.getCanvasContainer();


// Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);
map.addControl(
    new mapboxgl.NavigationControl()
);
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);




map.on('click', function(e) {
    socket.emit('search_velib', type = 'coordones', value = e.lngLat);

    var coordsObj = e.lngLat;
    canvas.style.cursor = '';
    var coords = Object.keys(coordsObj).map(function(key) {
        return coordsObj[key];
    });
    var end = {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            properties: {},
            geometry: {
            type: 'Point',
            coordinates: coords
            }
        }]
    };
    if (map.getLayer('end')) {
        map.getSource('end').setData(end);
    } else {
        map.addLayer({
            id: 'end',
            type: 'circle',
            source: {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [{
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'Point',
                    coordinates: coords
                }
                }]
            }
            },
            paint: {
                'circle-color': 'rgba(34, 139, 230, 0.2)',
                'circle-radius': 100,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#4c6ef5',
            }
        });
    }
});
  


$(document).ready(function () {
    socket.on('search_velib_response', function(response)  {
        
        let resp_coords = response.data[0].geo.split(',');
        map.flyTo({
            center: [
                resp_coords[1],
                resp_coords[0]
            ],
            zoom:10,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });

        let coordsObj = {lng:resp_coords[1], lat:resp_coords[0]}; 
        canvas.style.cursor = '';
        var coords = Object.keys(coordsObj).map(function(key) {
            return coordsObj[key];
        });
        var end = {
            type: 'FeatureCollection',
            features: [{
                type: 'Feature',
                properties: {},
                geometry: {
                type: 'Point',
                coordinates: coords
                }
            }]
        };
        if (map.getLayer('end')) {
            map.getSource('end').setData(end);
        } else {
            map.addLayer({
                id: 'end',
                type: 'circle',
                source: {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [{
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: coords
                    }
                    }]
                }
                },
                paint: {
                    'circle-color': 'rgba(224, 49, 49, 0.2)',
                    'circle-radius': 5,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#e03131',
                }
            });
        }
    });
});
