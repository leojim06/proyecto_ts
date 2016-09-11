'use strict'

process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const express = require('../../dist/config/express');
const config = require('../../dist/config/config');

const Hero = require('../../dist/app/models/schemas/hero-schema');

var server = new express.App();
const serverURL = `http://localhost:${config.Config.PORT_TEST}`;
const heroURL = `/api/heroes`;

chai.use(chaiHttp);
server.startServer(config.Config.PORT_TEST);



describe('CRUD de Heroes -> Casos ideales', () => {
    Hero.collection.drop();
    beforeEach((done) => {
        const newHero = ({
            name: 'Goku',
            power: 500,
            amountPeopleSaved: 0
        });
        Hero.create(newHero);
        done();
    });
    afterEach((done) => {
        Hero.collection.drop();
        done();
    });

    it('Debe listar todos los heroes en /heroes GET', (done) => {
        chai.request(serverURL)
            .get(heroURL)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.have.property('_id');
                expect(res.body[0]).to.have.property('name');
                expect(res.body[0]).to.have.property('power');
                expect(res.body[0]).to.have.property('amountPeopleSaved');
                expect(res.body[0].name).to.equal('Goku');
                expect(res.body[0].power).to.equal(500);
                expect(res.body[0].amountPeopleSaved).to.equal(0);
                done();
            });
    });

    it('Debe agregar un heroe en /heroes POST', (done) => {
        chai.request(serverURL)
            .post(heroURL)
            .send({
                name: 'Trunks',
                power: 2566,
                amountPeopleSaved: 1000
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('CREATED');
                expect(res.body.CREATED).to.have.property('name');
                expect(res.body.CREATED).to.have.property('power');
                expect(res.body.CREATED).to.have.property('amountPeopleSaved');
                expect(res.body.CREATED.name).to.equal('Trunks');
                expect(res.body.CREATED.power).to.equal(2566);
                expect(res.body.CREATED.amountPeopleSaved).to.equal(1000);
                done();
            });
    });

    it('Debe listar un heroe en /heroes/:_id GET', (done) => {
        chai.request(serverURL)
            .get(heroURL)
            .end((error, response) => {
                chai.request(serverURL)
                    .get(`${heroURL}/${response.body[0]._id}`)
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('_id');
                        expect(res.body).to.have.property('name');
                        expect(res.body).to.have.property('power');
                        expect(res.body).to.have.property('amountPeopleSaved');
                        expect(res.body.name).to.equal('Goku');
                        expect(res.body.power).to.equal(500);
                        expect(res.body.amountPeopleSaved).to.equal(0);
                        expect(res.body._id).to.equal(response.body[0]._id);
                        done();
                    });
            });
    });

    it('Debe actualizar un heroe en /heroes/:_id PUT', (done) => {
        chai.request(serverURL)
            .get(heroURL)
            .end((error, response) => {
                chai.request(serverURL)
                    .put(`${heroURL}/${response.body[0]._id}`)
                    .send({ 'power': 666, 'amountPeopleSaved': 5 })
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('UPDATED');
                        expect(res.body.UPDATED).to.be.an('object');
                        expect(res.body.UPDATED).to.have.property('power');
                        expect(res.body.UPDATED).to.have.property('amountPeopleSaved');
                        expect(res.body.UPDATED.power).to.equal(666);
                        expect(res.body.UPDATED.amountPeopleSaved).to.equal(5);
                        done();
                    });
            });
    });

    it('Debe borrar un heroe en /heroes/:_id DELETE', (done) => {
        chai.request(serverURL)
            .get(heroURL)
            .end((error, response) => {
                chai.request(serverURL)
                    .delete(`${heroURL}/${response.body[0]._id}`)
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.have.property('DELETED');
                        expect(res.body.DELETED).to.be.an('string');
                        expect(res.body.DELETED).to.equal(response.body[0]._id);
                        done();
                    });
            });
    });
});


describe('CRUD de Heroes -> Error en la solicitud', () => {
    Hero.collection.drop();
    beforeEach((done) => {
        const newHero = ({
            name: 'Goku',
            power: 500,
            amountPeopleSaved: 0
        });
        Hero.create(newHero);
        done();
    });
    afterEach((done) => {
        Hero.collection.drop();
        done();
    });
    it('No debe agregar un heroe en /heroes POST: faltan campos', (done) => {
        chai.request(serverURL)
            .post(heroURL)
            .send({
                name: 'Trunks'
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
    it('No debe listar un heroe en /heroes/:_id GET: _id incorrecto', (done) => {
        chai.request(serverURL)
            .get(`${heroURL}/_id_sin_identificar`)
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
    it('No debe listar un heroe en /heroes/:_id GET: _id manipulado', (done) => {
        chai.request(serverURL)
            .get(heroURL)
            .end((error, response) => {
                let _idManipulado = response.body[0]._id;
                _idManipulado =
                    (1 + parseInt(_idManipulado.charAt(0))) +
                    _idManipulado.substring(1, _idManipulado.length);
                chai.request(serverURL)
                    .get(`${heroURL}/${_idManipulado}`)
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        expect(res).to.be.json;
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('ERROR');
                        expect(res.body.ERROR).to.equal('Heroe no encontrado');
                        done();
                    });
            });
    });
    it('No debe actualizar un heroe en /heroes/:_id PUT: _id incorrecto', (done) => {
        chai.request(serverURL)
            .put(`${heroURL}/_id_sin_identificar`)
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
    it('No debe actualizar un heroe en /heroes/:_id PUT: _id manipulado', (done) => {
        chai.request(serverURL)
            .get(heroURL)
            .end((error, response) => {
                let _idManipulado = response.body[0]._id;
                _idManipulado =
                    (1 + parseInt(_idManipulado.charAt(0))) +
                    _idManipulado.substring(1, _idManipulado.length);
                chai.request(serverURL)
                    .put(`${heroURL}/${_idManipulado}`)
                    .send({ '_otroCampo': 'Otro Valor' })
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        expect(res).to.be.json;
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('ERROR');
                        expect(res.body.ERROR).to.equal('Heroe no encontrado - no se puede actualizar')
                        done();
                    });
            });
    });
    it('No debe actualizar un heroe en /heroes/:_id PUT: campos incorrectos', (done) => {
        chai.request(serverURL)
            .get(heroURL)
            .end((error, response) => {
                chai.request(serverURL)
                    .put(`${heroURL}/${response.body[0]._id}`)
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
    it('No debe borrar un heroe en /heroes/:_id DELETE: _id incorrecto', (done) => {
        chai.request(serverURL)
            .delete(`${heroURL}/_id_sin_identificar`)
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
    it('No debe borrar un heroe en /heroes/:_id DELETE: _id manipulado', (done) => {
        chai.request(serverURL)
            .get(heroURL)
            .end((error, response) => {
                let _idManipulado = response.body[0]._id;
                _idManipulado =
                    (1 + parseInt(_idManipulado.charAt(0))) +
                    _idManipulado.substring(1, _idManipulado.length);
                chai.request(serverURL)
                    .delete(`${heroURL}/${_idManipulado}`)
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        expect(res).to.be.json;
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('ERROR');
                        expect(res.body.ERROR).to.equal('Heroe no encontrado - no se puede eliminar');
                        done();
                    });
            });
    });
});

describe('Base de datos vacía -> no existen registros', () => {
    Hero.collection.drop();
    it('No debe listar heroes en /heroes GET', (done) => {
        chai.request(serverURL)
            .get(heroURL)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('ERROR');
                expect(res.body.ERROR).to.equal('No existen heroes');
                done();
            });
    });
    it('Debe agregar un heroe en /heroes POST', (done) => {
        chai.request(serverURL)
            .post(heroURL)
            .send({
                name: 'Goku',
                power: 500,
                amountPeopleSaved: 0
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('CREATED');
                expect(res.body.CREATED).to.have.property('name');
                expect(res.body.CREATED).to.have.property('power');
                expect(res.body.CREATED).to.have.property('amountPeopleSaved');
                expect(res.body.CREATED.name).to.equal('Goku');
                expect(res.body.CREATED.power).to.equal(500);
                expect(res.body.CREATED.amountPeopleSaved).to.equal(0);
                done();
            });
    });
});

describe('Error en el servidor - servidor desconectado', () => {
    Hero.collection.drop();
    beforeEach((done) => {
        const newHero = ({
            name: 'Goku',
            power: 500,
            amountPeopleSaved: 0
        });
        Hero.create(newHero);
        server.stopServer();
        done();
    });
    afterEach((done) => {
        Hero.collection.drop();
        server.startServer(config.Config.PORT_TEST);
        done();
    });
    it('No debe listar heroes en /heroes GET', (done) => {
        chai.request(serverURL)
            .get(heroURL)
            .end((err, res) => {
                expect(res).to.be.a('undefined');
                done();
            });
    });
});



// 'use strict'

// process.env.NODE_ENV = 'test';

// const chai = require('chai');
// const expect = require('chai').expect;
// const chaiHttp = require('chai-http');
// const express = require('../../dist/config/express');
// const config = require('../../dist/config/config');

// const Hero = require('../../dist/app/models/schemas/hero-schema');

// chai.use(chaiHttp);

// var server = new express.App();
// server.startServer(config.Config.PORT_TEST);
// const serverURL = `http://localhost:${config.Config.PORT_TEST}`;
// const heroesURL = `/api/heroes`;

// describe('CRUD de Heroes -> Casos ideales', () => {
//     Hero.collection.drop();
//     beforeEach((done) => {
//         const newHero = ({
//             name: 'Trunks',
//             power: 500,
//             amountPeopleSaved: 0
//         });
//         Hero.create(newHero);
//         done();
//     });
//     afterEach((done) => {
//         Hero.collection.drop();
//         done();
//     });

//     it('Debe listar todos los heroes en /heroes GET', (done) => {
//         chai.request(serverURL)
//             .get(heroesURL)
//             .end((err, res) => {
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(200);
//                 expect(res).to.be.json;
//                 expect(res.body).to.be.an('array');
//                 expect(res.body[0]).to.have.property('_id');
//                 expect(res.body[0]).to.have.property('name');
//                 expect(res.body[0]).to.have.property('power');
//                 expect(res.body[0]).to.have.property('amountPeopleSaved');
//                 expect(res.body[0].name).to.equal('Trunks');
//                 expect(res.body[0].power).to.equal(500);
//                 expect(res.body[0].amountPeopleSaved).to.equal(0);
//                 done();
//             });
//     });

//     it('Debe agregar un heroe en /heroes POST', (done) => {
//         chai.request(serverURL)
//             .post(heroesURL)
//             .send({
//                 name: 'Mai',
//                 power: 100,
//                 amountPeopleSaved: 2000
//             })
//             .end((err, res) => {
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(201);
//                 expect(res).to.be.json;
//                 expect(res.body).to.be.a('object');
//                 expect(res.body).to.have.property('CREATED');
//                 expect(res.body.CREATED).to.have.property('name');
//                 expect(res.body.CREATED).to.have.property('power');
//                 expect(res.body.CREATED).to.have.property('amountPeopleSaved');
//                 expect(res.body.CREATED.name).to.equal('Mai');
//                 expect(res.body.CREATED.power).to.equal(100);
//                 expect(res.body.CREATED.amountPeopleSaved).to.equal(2000);
//                 done();
//             });
//     });

//     it('Debe listar un heroe en /heroes/:_id GET', (done) => {
//         chai.request(serverURL)
//             .get(heroesURL)
//             .end((error, response) => {
//                 chai.request(serverURL)
//                     .get(`${heroesURL}/${response.body[0]._id}`)
//                     .end((err, res) => {
//                         expect(err).to.be.null;
//                         expect(res).to.have.status(200);
//                         expect(res).to.be.json;
//                         expect(res.body).to.be.a('object');
//                         expect(res.body).to.have.property('_id');
//                         expect(res.body).to.have.property('name');
//                         expect(res.body).to.have.property('power');
//                         expect(res.body).to.have.property('amountPeopleSaved');
//                         expect(res.body.name).to.equal('Trunks');
//                         expect(res.body.power).to.equal(500);
//                         expect(res.body.amountPeopleSaved).to.equal(0);
//                         expect(res.body._id).to.equal(response.body[0]._id);
//                         done();
//                     });
//             });
//     });

//     it('Debe actualizar un heroe en /heroes/:_id PUT', (done) => {
//         chai.request(serverURL)
//             .get(heroesURL)
//             .end((error, response) => {
//                 chai.request(serverURL)
//                     .put(`${heroesURL}/${response.body[0]._id}`)
//                     .send({ 'power': 25000, 'amountPeopleSaved': 555 })
//                     .end((err, res) => {
//                         expect(err).to.be.null;
//                         expect(res).to.have.status(200);
//                         expect(res).to.be.json;
//                         expect(res.body).to.be.a('object');
//                         expect(res.body).to.have.property('UPDATED');
//                         expect(res.body.UPDATED).to.be.a('object');
//                         expect(res.body.UPDATED).to.have.property('power');
//                         expect(res.body.UPDATED).to.have.property('amountPeopleSaved');
//                         expect(res.body.UPDATED.power).to.equal(25000);
//                         expect(res.body.UPDATED.amountPeopleSaved).to.equal(555);
//                         done();
//                     });
//             });
//     });

//     it('Debe borrar un heroes en /heroes/:_id DELETE', (done) => {
//         chai.request(serverURL)
//             .get(heroesURL)
//             .end((error, response) => {
//                 chai.request(serverURL)
//                     .delete(`${heroesURL}/${response.body[0]._id}`)
//                     .end((err, res) => {
//                         expect(err).to.be.null;
//                         expect(res).to.have.status(200);
//                         expect(res).to.be.json;
//                         expect(res.body).to.be.a('object');
//                         expect(res.body).to.have.property('DELETED');
//                         expect(res.body.DELETED).to.be.a('object');
//                         expect(res.body.DELETED).to.have.property('_id');
//                         expect(res.body.DELETED._id).to.equal(response.body[0]._id);
//                         done();
//                     });
//             });
//     });
// });

// describe('CRUD de Heroes -> Error en la solicitud', () => {
//     Hero.collection.drop();
//     beforeEach((done) => {
//         const newHero = ({
//             name: 'Trunks',
//             power: 500,
//             amountPeopleSaved: 0
//         });
//         Hero.create(newHero);
//         done();
//     });
//     afterEach((done) => {
//         Hero.collection.drop();
//         done();
//     });

//     it('No debe agregar un heroe en /heroes POST: faltan campos', (done) => {
//         chai.request(serverURL)
//             .post(heroesURL)
//             .send({
//                 name: 'Mai'
//             })
//             .end((err, res) => {
//                 expect(res).to.have.status(400);
//                 expect(res).to.be.json;
//                 expect(res.body).to.be.a('object');
//                 expect(res.body).to.have.property('ERROR');
//                 expect(res.body.ERROR).to.have.property('name');
//                 expect(res.body.ERROR.name).to.equal('ValidationError');
//                 done();
//             });
//     });

//     it('No debe listar un heroe en /heroes/:_id GET: _id incorrecto', (done) => {
//         chai.request(serverURL)
//             .get(`${heroesURL}/_id_sin_identificar`)
//             .end((err, res) => {
//                 expect(res).to.have.status(400);
//                 expect(res).to.be.json;
//                 expect(res.body).to.be.a('object');
//                 expect(res.body).to.have.property('ERROR');
//                 done();
//             });
//     });

//     it('No debe listar un heroe en /heroes/:_id GET: _id manipulado', (done) => {
//         chai.request(serverURL)
//             .get(heroesURL)
//             .end((error, response) => {
//                 let _idManipulado = response.body[0]._id;
//                 _idManipulado =
//                     (1 + parseInt(_idManipulado.charAt(0))) +
//                     _idManipulado.substring(1, _idManipulado.length);
//                 chai.request(serverURL)
//                     .get(`${heroesURL}/${_idManipulado}`)
//                     .end((err, res) => {
//                         expect(res).to.have.status(404);
//                         expect(res).to.be.json;
//                         expect(res.body).to.be.a('object');
//                         expect(res.body).to.have.property('ERROR');
//                         expect(res.body.ERROR).to.equal('Heroe no encontrado');
//                         done();
//                     });
//             });
//     });

//     it('No debe actualizar un heroe en /heroes/:_id PUT: _id incorrecto', (done) => {
//         chai.request(serverURL)
//             .put(`${heroesURL}/_id_sin_identificar`)
//             .send({ 'power': 5000 })
//             .end((err, res) => {
//                 expect(res).to.have.status(400);
//                 expect(res).to.be.json;
//                 expect(res.body).to.be.a('object');
//                 expect(res.body).to.have.property('ERROR');
//                 done();
//             });
//     });

//     it('No debe actualizar un heroe en /heroes/:_id PUT: _id manipulado', (done) => {
//         chai.request(serverURL)
//             .get(heroesURL)
//             .end((error, response) => {
//                 let _idManipulado = response.body[0]._id;
//                 _idManipulado =
//                     (1 + parseInt(_idManipulado.charAt(0))) +
//                     _idManipulado.substring(1, _idManipulado.length);
//                 chai.request(serverURL)
//                     .put(`${heroesURL}/${_idManipulado}`)
//                     .send({ 'power': 5000 })
//                     .end((err, res) => {
//                         expect(res).to.have.status(404);
//                         expect(res).to.be.a.json;
//                         expect(res.body).to.be.a('object');
//                         expect(res.body).to.have.property('ERROR');
//                         expect(res.body.ERROR).to.equal('Heroe no encontrado - no se puede actualizar');
//                         done();
//                     });
//             });
//     });

//     it('No debe actualizar un heroe en /heroes/:_id PUT: campos incorrectos', (done) => {
//         chai.request(serverURL)
//             .get(heroesURL)
//             .end((error, response) => {
//                 chai.request(serverURL)
//                     .put(`${heroesURL}/${response.body[0]._id}`)
//                     .send({ '_otroCampo': 'Otro Valor' })
//                     .end((err, res) => {
//                         expect(res).to.have.status(400);
//                         expect(res).to.be.a.json;
//                         expect(res.body).to.be.an('object');
//                         expect(res.body).to.have.property('ERROR');
//                         done();
//                     });
//             });
//     });

//     it('No debe borrar un heroe en /heroes/:_id DELETE: _id incorrecto', (done) => {
//         chai.request(serverURL)
//             .delete(`${heroesURL}/_id_sin_identificar`)
//             .end((err, res) => {
//                 expect(res).to.have.status(400);
//                 expect(res).to.be.json;
//                 expect(res.body).to.be.an('object');
//                 expect(res.body).to.have.property('ERROR');
//                 done();
//             });
//     });

//     it('No debe borrar un heroe en /heroes/:_id DELETE: _id manipulado', (done) => {
//         chai.request(serverURL)
//             .get(heroesURL)
//             .end((error, response) => {
//                 let _idManipulado = response.body[0]._id;
//                 _idManipulado =
//                     (1 + parseInt(_idManipulado.charAt(0))) +
//                     _idManipulado.substring(1, _idManipulado.length);
//                 chai.request(serverURL)
//                     .delete(`${heroesURL}/${_idManipulado}`)
//                     .end((err, res) => {
//                         expect(res).to.have.status(404);
//                         expect(res).to.be.json;
//                         expect(res.body).to.be.an('object');
//                         expect(res.body).to.have.property('ERROR');
//                         expect(res.body.ERROR).to.equal('Heroe no encontrado - no se puede borrar')
//                         done();
//                     });
//             });
//     });
// });