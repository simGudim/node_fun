const mongoose = require('mongoose');

// User Schema
const geoSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    coordinates: {
        type: Array,
        required: true
    },
    name : {
        type: String,
        required: true
    }
});

const geoJsonLayers = module.exports = mongoose.model('geoJsonLayers', geoSchema);