'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'get',
        path: '/movies',
        options: {
            auth: {
                scope: ['user', 'admin'],
            },
            tags: ['api'],
        },
        handler: async (request, h) => {
            const { movieService } = request.services();

            try {
                return await movieService.list();
            } catch (err) {
                return 'Erreur !!!';
            }
        }
    },

    {
        method: 'post',
        path: '/movie',
        options: {
            auth: {
                scope: ['admin'],
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    title: Joi.string().min(1).example('Harry Potter à l école des sorciers').description('Titre du film'),
                    description: Joi.string().min(5).example('Science fiction : Harry Potter, un jeune garçon, découvre qu il est un sorcier. Il est envoyé à Poudlard, une école de sorcellerie.').description('Description du film'),
                    releaseDate: Joi.string().example('2001-11-16').description('Date de sortie du film'),
                    director: Joi.string().min(3).example("Chris Columbus").description("Nom du réalisateur"),
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            const { movieService } = request.services();
            const { mailService } = request.services();

            try {
                const usersEmail = await userService.getMail();
                const msg = 'Nouveau film à l\'affiche : "' + request.payload.title + '"!"';
                await mailService.sendMail(usersEmail, request.payload.title, msg);
                return await movieService.create(request.payload);
            } catch (err) {
                return 'Erreur !!!';
            }
        }
    },

    {
        method: 'patch',
        path: '/movie.js/{id}',
        options: {
            auth: {
                scope: ['admin'],
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                }),
                payload: Joi.object({
                    id: Joi.number().integer().required().example(1).description('Id du film'),
                    title: Joi.string().min(1).example('Harry Potter à l école des sorciers').description('Titre du film'),
                    discription: Joi.string().min(5).example('Science fiction : Harry Potter, un jeune garçon, découvre qu il est un sorcier. Il est envoyé à Poudlard, une école de sorcellerie.').description('Description du film'),
                    releaseDate: Joi.string().example('2001-11-16').description('Date de sortie du film'),
                    director: Joi.string().min(3).example("Chris Columbus").description("Nom du réalisateur"),
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            const { userService } = request.services();
            const { mailService } = request.services();

            try {
                const usersEmail = await userService.getMovie()
                const msg = 'Film modifié : "' + request.payload.title + '"."';
                await mailService.sendMail(usersEmail, request.payload.title, msg);
                return await movieService.update(request.params.id, request.payload);
            } catch (err) {
                return 'Erreur !!!';
            }
        }
    },

    {
        method: 'get',
        path: '/movie/{id}',
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
            const { movieService } = request.services();

            try {
                return await movieService.read(request.params.id);
            } catch (err) {
                return 'Erreur !!!';
            }
        }
    },

    {
        method: 'delete',
        path: '/movie/{id}',
        options: {
            auth: {
                scope: ['admin'],
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    id: Joi.number().integer().required()
                })
            },
        },
        handler: async (request, h) => {
            const {movieService} = request.services();

            try {
                await movieService.delete(request.params.id);
                return 'Le film a bien été supprimé';
            } catch (err) {
                return 'Erreur !!!';
            }
        }
    }
];
