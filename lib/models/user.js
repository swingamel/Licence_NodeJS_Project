'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('Melanie').description('Prénom'),
            lastName: Joi.string().min(3).example('Debeaulieu').description('Nom'),
            userName: Joi.string().min(3).example('mel').description('Username'),
            password: Joi.string().min(8).example('toto').description('Mot de passe'),
            role: Joi.string().valid('user', 'admin').example('user').description('Role').default('user').optional(),
            mail: Joi.string().email({tlds: {allow: false}}).example('melanie.debeaulieu@gmail.com').description('Email'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
        if (!this.role) {
            this.role = 'user';
        }
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};