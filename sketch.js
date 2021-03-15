// Source code credit Goes to Mark, Franz
const key = 'pk.eyJ1IjoicG9zdHBsYXN0aWMiLCJhIjoiY2tpamJyNm1zMDE0OTJ0czU5cDkyNjE3ciJ9.VRXSaQR1sQoWudM3Bgp9Lg';

const options = {
  lat: 39.329239,
  lng: -92.101257,
  zoom: 4.5,
  style: 'mapbox://styles/mapbox/dark-v10',
  pitch: 0
};

const mappa = new Mappa('MapboxGL', key);
let myMap;
let canvas;
//let restaurants;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  restaurants = loadTable('restaurants.csv', 'csv', 'header')
}


function draw() {
  clear();
  //noFill();
  stroke(0);
  strokeWeight(5);
  const zoom = myMap.zoom();

  for (let i = 0; i < restaurants.getRowCount(); i++) {
    // Get the lat/lng of each meteorite 
    const latitude = Number(restaurants.getString(i, 'latitude'));
    const longitude = Number(restaurants.getString(i, 'longitude'));
    const pos = myMap.latLngToPixel(latitude, longitude);
    const place = restaurants.getString(i, 'name');
    let size = 15;
    size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
    fill(255, 105, 105);
    noStroke();
    ellipse(pos.x, pos.y, size, size);
    if (dist(pos.x, pos.y, mouseX, mouseY) < size) {
      textSize(32);
      text(place, pos.x, pos.y);
    }

  }

}

$(window).bind('resize', function(e) {
  if (window.RT) clearTimeout(window.RT);
  window.RT = setTimeout(function() {
    this.location.reload(false); /* false to get page from cache */
  }, 200);
});