'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Movies extends Model {
    static get tableName() {
        return 'movies';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(1).example('Harry Potter à l\'école des sorciers').description('Titre du film'),
            discription: Joi.string().min(5).example('Science fiction : Histoire d\'un jeune sorcier').description('Description du film'),
            releaseDate: Joi.date(),
            director: Joi.string().min(3).example("Chris Columbus").description("Nom du réalisateur"),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        })
    }

    $beforeInsert(queryContext) {
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }
}