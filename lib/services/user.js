'use strict';

const { Service } = require('@hapipal/schmervice');
const Jwt = require('@hapi/jwt');

module.exports = class UserService extends Service {

    create(user){

        const { User } = this.server.models();

        user.password = Encrypt.sha1(user.password);

        return User.query().insertAndFetch(user);
    }

    async list() {
        const { User } = this.server.models();

        return await User.query().execute();
    }

    async update(id, user) {
        const { User } = this.server.models();

        return await User.query().updateAndFetchById(id, user).throwIfNotFound();
    }

    async delete(id) {
        const { User } = this.server.models();

        return await User.query().delete().where('id', id);
    }

    async getMail() {
        const { User } = this.server.models();

        return await User.query().pluck('mail').execute();
    }
    async getMovie(id_movie) {
        const { User } = this.server.models();

        return await User.query().pluck('mail').whereIn( 'id', users).execute();
    }

}
