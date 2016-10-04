'use strict'

process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const express = require('../../dist/config/express');
const config = require('../../dist/config/config');

const User = require('../../dist/app/models/schemas/UsuarioModel');

var server = new express.App();
const serverURL = `http://localhost:${config.Config.PORT_TEST}`;
const userURL = `/api/usuarios`;

chai.use(chaiHttp);
server.startServer(config.Config.PORT_TEST);

describe('CRUD de Usuarios -> Casos ideales', () => {
    User.Usuarios.collection.drop();

    it('Debe agregar un usuario en /usuarios POST', (done) => {
        chai.request(serverURL)
            .post(userURL)
            .send({
                username: 'Leo',
                password: 'miPassword',
                email: 'Leo@sample.com'
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('CREATED');
                expect(res.body.CREATED).to.have.property('username');
                expect(res.body.CREATED).to.have.property('password');
                expect(res.body.CREATED).to.have.property('email');
                expect(res.body.CREATED.username).to.equal('Leo');
                expect(res.body.CREATED.email).to.equal('Leo@sample.com');
                done();
            });
    });

    it('Debe listar todos los usuarios en /usuarios GET', (done) => {
        chai.request(serverURL)
            .get(userURL)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.have.property('_id');
                expect(res.body[0]).to.have.property('username');
                expect(res.body[0]).to.have.property('password');
                expect(res.body[0]).to.have.property('email');
                expect(res.body[0].username).to.equal('Leo');
                expect(res.body[0].email).to.equal('Leo@sample.com');
                done();
            });
    });

    it('Debe listar un villano en /villanos/:_id GET');

    it('Debe actualizar un villano en /villanos/:_id PUT');

    it('Debe borrar un villano en /villanos/:_id DELETE');
});