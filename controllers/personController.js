'use strict';

var mongoose = require('mongoose'),
    ObjectId = require('mongodb').ObjectID,
    Person = mongoose.model('Persons');

exports.find_all = (req, res) => {
    Person.find({}, (err, person) => {
        if (err) {
            res.send(err);
        } else {
            res.json(person);
        }
    });
};

exports.add_person = (req, res) => {
    let new_person = new Person(req.body);

    new_person.save((err, person) => {
        if (err) {
            res.send(err);
        } else {
            res.json(person);
            console.log("New person is successfully added: " + person);
        }
    });
};

exports.find_person = (req, res) => {
    Person.findById(req.params.id, (err, person) => {
        if (err) {
            res.send(err);
        } else {
            res.json(person);
        }
    });
};

exports.update_person = (req, res) => {
    Person.findOneAndUpdate({ _id: ObjectId(req.params.id) }, req.body, { new: true }, (err, person) => {
        if (err) {
            res.send(err);
        } else {
            res.json(person);
        }
    });
};

exports.delete_person = (req, res) => {
    Person.findOneAndDelete({ _id: req.params.id }, (err, person) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Successfully deleted.' });
        }
    });
};