'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'get',
        path: '/users',
        options: {
            tags: ['api'],
            auth: {
                scope: ['user', 'admin']
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();

            try {
                return await userService.list();
            } catch (err) {
                return 'Erreur !!!';
            }
        },
    },

    {
        method: 'post',
        path: '/user',
        options: {
            auth: false,
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('Melanie').description('Prénom'),
                    lastName: Joi.string().required().min(3).example('Debeaulieu').description('Nom'),
                    username: Joi.string().required().min(3).example('mel').description('Username'),
                    password: Joi.string().required().min(8).example('toto').description('Mot de passe'),
                    mail: Joi.string().email({tlds: {allow: false}}).example('melanie.debeaulieu@gmail.com').description('Email'),
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();
            const { mailService } = request.services();

            try {
                await mailService.sendMail([request.payload.mail], 'Bienvenue', 'Bienvenue ' + request.payload.firstName + ' ' + request.payload.lastName + ' sur notre magnifique site web');
                return await userService.create(request.payload);
            } catch (err) {
                return 'Erreur !!!';
            }
        }
    },

    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            auth: {
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();

            try {
                await userService.delete(request.params.id);
                return '';
            } catch (err) {
                return 'Erreur !!!';
            }
        }
    },

    {
        method: 'get',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                })
            },
            auth: {
                scope: ['user', 'admin']
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();

            try {
                return await userService.read(request.params.id);
            } catch (err) {
                return 'Erreur !!!';
            }
        }
    },

    {
        method: 'post',
        path: '/user/login',
        options: {
            auth: false,
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    username: Joi.string().example('mel').description('Username'),
                    password: Joi.string().required().min(8).description('Mot de passe').example('toto')
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();

            try {
                return await userService.login(request.payload);
            } catch (err) {
                return 'Erreur !!!';
            }
        }
    },

    {
        method: 'patch',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                }),
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('Melanie').description('Prénom'),
                    lastName: Joi.string().required().min(3).example('Debeaulieu').description('Nom'),
                    username: Joi.string().required().min(3).example('mel').description('Username'),
                    password: Joi.string().required().min(8).example('toto').description('Mot de passe'),
                    mail: Joi.string().email({tlds: {allow: false}}).example('melanie.debeaulieu@gmail.com').description('Email'),
                })
            },
            auth: {
                scope: ['admin']
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();

            try {
                return await userService.update(request.params.id, request.payload);
            } catch (err) {
                return 'Erreur !!!';
            }
        }
    }

];