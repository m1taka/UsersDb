'use strict';

module.exports = (app) =>{

    var personController = require('../controllers/personController');

    app.route('/api/persons')
        .get(personController.find_all)
        .post(personController.add_person);

    app.route('/api/persons/:id')
        .get(personController.find_person)
        .put(personController.update_person)
        .delete(personController.delete_person);
};