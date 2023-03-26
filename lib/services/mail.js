'use strict';

require('dotenv').config();
const { Service } = require('@hapipal/schmervice');
const Nodemailer = require("nodemailer");
const Dotenv = require('dotenv');

module.exports = class MailServices extends Service {
    async transporter() {
        const account = await Nodemailer.createTestAccount();
        Dotenv.config({ path: `${__dirname}\\..\\..\\.env` });
        return await Nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER ?? account.user,
                pass: process.env.SMTP_PASS ?? account.pass
            }
        });
    }
    async sendMail(to, subject, text) {
        const transporter = await this.transporter();
        const from = 'melanie.debeaulieu@gmail.com'
        return await transporter.sendMail({
            from,
            to: to.join(', '),
            subject,
            text
        });
    }
};
