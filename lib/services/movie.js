'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class MoviesService extends Service {
    async create(movie) {
        const { Movies } = this.server.models();
        movie.releaseDate = new Date(movie.releaseDate);
        return Movies.query().insertAndFetch(movie);
    }

    async update(movie) {
        const { Movies } = this.server.models();
        if (movie.releaseDate) {
            movie.releaseDate = new Date(movie.releaseDate);
        }
        return Movies.query().patch(movie).findById(movie.id);
    }

    async delete(movie) {
        const { Movies } = this.server.models();
        await Movies.query().deleteById(movie.id);
    }
};
