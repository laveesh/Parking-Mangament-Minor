const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let locationSchema = new Schema({
    lotID: {
        type: String
    },
    parkingLotName: {
        type: String
    },
    address: {
        type: String
    },
    coordinates: [],
    fineAmount: {
        type: String
    },
    noOfLots: []
},{
    collection: 'Location'
});

const Location = mongoose.model('location', locationSchema );

module.exports = Location;
