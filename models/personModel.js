'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({

    name:{
        type: String,
        require: 'Enter your name, please'
    },

    age:{
        type: Number,
        require: 'Enter your age, please'
    },

    job:{
        type: String,
        require: 'Enter your job, please'
    }
});

module.exports = mongoose.model('Persons', PersonSchema);