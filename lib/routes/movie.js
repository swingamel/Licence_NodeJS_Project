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
            const { moviesService } = request.services();
            return await moviesService.getAll();
        },
    },

    {
        method: 'post',
        path: '/movie.js',
        options: {
            auth: {
                scope: ['admin'],
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    title: Joi.string().min(1).example('Harry Potter à l école des sorciers').description('Titre du film'),
                    discription: Joi.string().min(5).example('Science fiction : Harry Potter, un jeune garçon, découvre qu il est un sorcier. Il est envoyé à Poudlard, une école de sorcellerie.').description('Description du film'),
                    releaseDate: Joi.string().example('2001-11-16').description('Date de sortie du film'),
                    director: Joi.string().min(3).example("Chris Columbus").description("Nom du réalisateur"),
                })
            }
        },
        handler: async (request, h) => {
            const { moviesService } = request.services();
            const response = await moviesService.create(request.payload);
            return response;
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
            const { moviesService } = request.services();
            await moviesService.update(request.payload);
            return 'Le film a bien été modifié';
        }
    },

    {
        method: 'delete',
        path: '/movies/{id}',
        options: {
            auth: {
                scope: ['admin'],
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    id: Joi.number().integer().required().example(1).description('Id de l\'user'),
                })
            },
        },
        handler: async (request, h) => {
            const { moviesService } = request.services();
            await moviesService.delete(request.payload);
            return 'Le film a bien été supprimé';
        },
    }
];
