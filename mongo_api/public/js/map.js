
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//         let lat = position.coords.latitude;
//         let long = position.coords.longitude;
//         var mymap = L.map('mapid').setView([lat, long], 13);
//         L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//             attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//             maxZoom: 18,
//             id: 'mapbox/streets-v11',
//             tileSize: 512,
//             zoomOffset: -1,
//             accessToken: 'pk.eyJ1Ijoic2ltZ3VkaW0iLCJhIjoiY2toOXVheXMwMGFlYzJycGZ6a3oxYTlycSJ9.F69d-XI1k8KvwwZKN_dRNw'
//             }).addTo(mymap);
//     }, (err) => {
//             var mymap = L.map('mapid').setView([43.65, -79.34], 13);
//             L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//             attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//             maxZoom: 18,
//             id: 'mapbox/streets-v11',
//             tileSize: 512,
//             zoomOffset: -1,
//             accessToken: 'pk.eyJ1Ijoic2ltZ3VkaW0iLCJhIjoiY2toOXVheXMwMGFlYzJycGZ6a3oxYTlycSJ9.F69d-XI1k8KvwwZKN_dRNw'
//             }).addTo(mymap);
//             alert("Geolocation is not supported for your browser or please accept the geolocation request")
//     })
// }

var mymap = L.map('mapid').setView([43.65, -79.34], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic2ltZ3VkaW0iLCJhIjoiY2toOXVheXMwMGFlYzJycGZ6a3oxYTlycSJ9.F69d-XI1k8KvwwZKN_dRNw'
}).addTo(mymap);

// var marker = L.marker([51.5, -0.09]).addTo(mymap);

// var circle = L.circle([51.508, -0.11], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(mymap);

// var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(mymap);

// module.exports = mymap;