'use strict'

process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const express = require('../../dist/config/express');
const config = require('../../dist/config/config');

const Villano = require('../../dist/app/models/schemas/VillanoModel');

var server = new express.App();
const serverURL = `http://localhost:${config.Config.PORT_TEST}`;
const villanosURL = `/api/villanos`;

chai.use(chaiHttp);
server.startServer(config.Config.PORT_TEST);



describe('CRUD de Villanos -> Casos ideales', () => {
    Villano.Villanos.collection.drop();
    beforeEach((done) => {
        const newVillano = ({
            name: 'Magneto',
            power: 500,
            amountPeopleKilled: 0
        });
        Villano.Villanos.create(newVillano);
        done();
    });
    afterEach((done) => {
        Villano.Villanos.collection.drop();
        done();
    });

    it('Debe listar todos los villanos en /villanos GET', (done) => {
        chai.request(serverURL)
            .get(villanosURL)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.have.property('_id');
                expect(res.body[0]).to.have.property('name');
                expect(res.body[0]).to.have.property('power');
                expect(res.body[0]).to.have.property('amountPeopleKilled');
                expect(res.body[0].name).to.equal('Magneto');
                expect(res.body[0].power).to.equal(500);
                expect(res.body[0].amountPeopleKilled).to.equal(0);
                done();
            });
    });

    it('Debe agregar un villano en /villanos POST', (done) => {
        chai.request(serverURL)
            .post(villanosURL)
            .send({
                name: 'Joker',
                power: 2566,
                amountPeopleKilled: 1000
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('CREATED');
                expect(res.body.CREATED).to.have.property('name');
                expect(res.body.CREATED).to.have.property('power');
                expect(res.body.CREATED).to.have.property('amountPeopleKilled');
                expect(res.body.CREATED.name).to.equal('Joker');
                expect(res.body.CREATED.power).to.equal(2566);
                expect(res.body.CREATED.amountPeopleKilled).to.equal(1000);
                done();
            });
    });

    it('Debe listar un villano en /villanos/:_id GET', (done) => {
        chai.request(serverURL)
            .get(villanosURL)
            .end((error, response) => {
                chai.request(serverURL)
                    .get(`${villanosURL}/${response.body[0]._id}`)
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('_id');
                        expect(res.body).to.have.property('name');
                        expect(res.body).to.have.property('power');
                        expect(res.body).to.have.property('amountPeopleKilled');
                        expect(res.body.name).to.equal('Magneto');
                        expect(res.body.power).to.equal(500);
                        expect(res.body.amountPeopleKilled).to.equal(0);
                        expect(res.body._id).to.equal(response.body[0]._id);
                        done();
                    });
            });
    });

    it('Debe actualizar un villano en /villanos/:_id PUT', (done) => {
        chai.request(serverURL)
            .get(villanosURL)
            .end((error, response) => {
                chai.request(serverURL)
                    .put(`${villanosURL}/${response.body[0]._id}`)
                    .send({ 'power': 666, 'amountPeopleKilled': 5 })
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('UPDATED');
                        expect(res.body.UPDATED).to.be.an('object');
                        expect(res.body.UPDATED).to.have.property('power');
                        expect(res.body.UPDATED).to.have.property('amountPeopleKilled');
                        expect(res.body.UPDATED.power).to.equal(666);
                        expect(res.body.UPDATED.amountPeopleKilled).to.equal(5);
                        done();
                    });
            });
    });

    it('Debe borrar un villano en /villanos/:_id DELETE', (done) => {
        chai.request(serverURL)
            .get(villanosURL)
            .end((error, response) => {
                chai.request(serverURL)
                    .delete(`${villanosURL}/${response.body[0]._id}`)
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('DELETED');
                        expect(res.body.DELETED).to.be.a('string');
                        expect(res.body.DELETED).to.equal(response.body[0]._id);
                        done();
                    });
            });
    });
});

describe('CRUD de Villanos -> Error en la solicitud', () => {
    Villano.Villanos.collection.drop();
    beforeEach((done) => {
        const newVillano = ({
            name: 'Magneto',
            power: 500,
            amountPeopleKilled: 0
        });
        Villano.Villanos.create(newVillano);
        done();
    });
    afterEach((done) => {
        Villano.Villanos.collection.drop();
        done();
    });
    it('No debe agregar un villano en /villanos POST: faltan campos', (done) => {
        chai.request(serverURL)
            .post(villanosURL)
            .send({
                name: 'Joker'
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('ERROR');
                expect(res.body.ERROR).to.have.property('name');
                expect(res.body.ERROR.name).to.equal('ValidationError');
                done();
            });
    });
    it('No debe listar un villano en /villanos/:_id GET: _id incorrecto', (done) => {
        chai.request(serverURL)
            .get(`${villanosURL}/_id_sin_identificar`)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('ERROR');
                expect(res.body).to.have.property('MSG');
                expect(res.body.MSG).to.equal('error en su solicitud');
                done();
            });
    });
    it('No debe listar un villano en /villanos/:_id GET: _id manipulado', (done) => {
        chai.request(serverURL)
            .get(villanosURL)
            .end((error, response) => {
                let _idManipulado = response.body[0]._id;
                _idManipulado =
                    (1 + parseInt(_idManipulado.charAt(0))) +
                    _idManipulado.substring(1, _idManipulado.length);
                chai.request(serverURL)
                    .get(`${villanosURL}/${_idManipulado}`)
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        expect(res).to.be.json;
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('ERROR');
                        expect(res.body.ERROR).to.equal('Villano no encontrado');
                        done();
                    });
            });
    });
    it('No debe actualizar un villano en /villanos/:_id PUT: _id incorrecto', (done) => {
        chai.request(serverURL)
            .put(`${villanosURL}/_id_sin_identificar`)
            .send({ 'power': 6565 })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('ERROR');
                expect(res.body).to.have.property('MSG');
                expect(res.body.MSG).to.equal('error en su solicitud');
                done();
            });
    });
    it('No debe actualizar un villano en /villanos/:_id PUT: _id manipulado', (done) => {
        chai.request(serverURL)
            .get(villanosURL)
            .end((error, response) => {
                let _idManipulado = response.body[0]._id;
                _idManipulado =
                    (1 + parseInt(_idManipulado.charAt(0))) +
                    _idManipulado.substring(1, _idManipulado.length);
                chai.request(serverURL)
                    .put(`${villanosURL}/${_idManipulado}`)
                    .send({ '_otroCampo': 'Otro Valor' })
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        expect(res).to.be.json;
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('ERROR');
                        expect(res.body.ERROR).to.equal('Villano no encontrado - no se puede actualizar')
                        done();
                    });
            });
    });
    it('No debe actualizar un villano en /villanos/:_id PUT: campos incorrectos', (done) => {
        chai.request(serverURL)
            .get(villanosURL)
            .end((error, response) => {
                chai.request(serverURL)
                    .put(`${villanosURL}/${response.body[0]._id}`)
                    .send({ '_otroCampo': 'Otro Valor' })
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        expect(res).to.be.a.json;
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('ERROR');
                        expect(res.body).to.have.property('MSG');
                        expect(res.body.MSG).to.equal('error en su solicitud');
                        done();
                    });
            });
    });
    it('No debe borrar un villano en /villanos/:_id DELETE: _id incorrecto', (done) => {
        chai.request(serverURL)
            .delete(`${villanosURL}/_id_sin_identificar`)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('ERROR');
                expect(res.body).to.have.property('MSG');
                expect(res.body.MSG).to.equal('error en su solicitud');
                done();
            });
    });
    it('No debe borrar un villano en /villanos/:_id DELETE: _id manipulado', (done) => {
        chai.request(serverURL)
            .get(villanosURL)
            .end((error, response) => {
                let _idManipulado = response.body[0]._id;
                _idManipulado =
                    (1 + parseInt(_idManipulado.charAt(0))) +
                    _idManipulado.substring(1, _idManipulado.length);
                chai.request(serverURL)
                    .delete(`${villanosURL}/${_idManipulado}`)
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        expect(res).to.be.json;
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('ERROR');
                        expect(res.body.ERROR).to.equal('Villano no encontrado - no se puede eliminar');
                        done();
                    });
            });
    });
});

describe('Base de datos vacía -> no existen registros', () => {
    Villano.Villanos.collection.drop();
    it('No debe listar villanos en /villanos GET', (done) => {
        chai.request(serverURL)
            .get(villanosURL)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('ERROR');
                expect(res.body.ERROR).to.equal('No existen villanos');
                done();
            });
    });
    it('Debe agregar un villano en /villanos POST', (done) => {
        chai.request(serverURL)
            .post(villanosURL)
            .send({
                name: 'Joker',
                power: 500,
                amountPeopleKilled: 0
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('CREATED');
                expect(res.body.CREATED).to.have.property('name');
                expect(res.body.CREATED).to.have.property('power');
                expect(res.body.CREATED).to.have.property('amountPeopleKilled');
                expect(res.body.CREATED.name).to.equal('Joker');
                expect(res.body.CREATED.power).to.equal(500);
                expect(res.body.CREATED.amountPeopleKilled).to.equal(0);
                done();
            });
    });
});

describe('Error en el servidor - servidor desconectado', () => {
    Villano.Villanos.collection.drop();
    beforeEach((done) => {
        const newVillano = ({
            name: 'Magneto',
            power: 500,
            amountPeopleKilled: 0
        });
        Villano.Villanos.create(newVillano);
        server.stopServer();
        done();
    });
    afterEach((done) => {
        Villano.Villanos.collection.drop();
        server.startServer(config.Config.PORT_TEST);
        done();
    });
    it('No debe listar villanos en /villanos GET', (done) => {
        chai.request(serverURL)
            .get(villanosURL)
            .end((err, res) => {
                expect(res).to.be.a('undefined');
                done();
            });
    });
});