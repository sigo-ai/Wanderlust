// const { console } = require("inspector");

const map = new maplibregl.Map({
    container: 'map',
    // style:
    //     'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    style: 'https://demotiles.maplibre.org/style.json',
    center: list.geometry.coordinates,
    zoom: 10 ,
    attributionControl: false,
});
map.addControl(new maplibregl.AttributionControl(), 'top-left');

// console.log(coordinates);

const marker = new maplibregl.Marker({ color: 'red' })
.setLngLat(list.geometry.coordinates)
.setPopup(new maplibregl.Popup({offset:25}).setHTML(`<h4>${list.location}</h4><p>Exact location provided after booking!</p>`))
.addTo(map);
