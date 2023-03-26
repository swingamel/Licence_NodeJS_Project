'use strict';

const { Service } = require('@hapipal/schmervice');
const request = require('request');

module.exports = class MoviesService extends Service {

    async list() {
        const { Movie } = this.server.models();

        return await Movie.query().execute();
    }
    async create(movie) {
        const { Movies } = this.server.models();

        return Movies.query().insertAndFetch(movie);
    }

    async update(movie) {
        const { Movie } = this.server.models();

        return await Movie.query().updateAndFetchById(id, movie).throwIfNotFound();
    }

    async delete(id) {
        const { Movie } = this.server.models();
        const { movieService } = request.services();

        await movieService.deleteAll(id);


        return await Movie.query().delete().where('id', id);
    }
};
