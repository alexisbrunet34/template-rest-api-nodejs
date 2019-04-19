process.env.NODE_ENV = 'test';

const httpMessage = require('../init/httpMessages');
const chaiHttp = require ('chai-http');
const app = require ('../bin/app');
const helloMockup = require('./helloMockup.json');
const helloModel = require('../models/helloModel');
const routes = require('../init/routes');

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

chai.use(chaiHttp);

describe("get all entities", () => {

    before(() => {
        helloModel.deleteMany();
        var model = new helloModel(helloMockup);
        model.save();
    });

    it("200 ok", (done) => {

        chai.request(app)
            .get( routes.baseUrl + routes.entities)
            .end((err, res, body) => {

                if(err){

                    done(err);

                }else{
                    
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('message');    
                    done();

                }

            });

    });

    it('404 not found', (done) => {

        chai.request(app)
        .get(routes.baseUrl +  "/404")
        .end((err, res,  body) => {

            if(err){

                done(err);

            }else{

                res.should.have.status(404);
                res.body.should.be.a('object');

                done();

            }
            
        });
        

    });

    after(() => {

        helloModel.deleteMany({});

    });

});

describe("get entity by id", () => {

    before(() => {
        helloModel.deleteMany({});
        var model = new helloModel(helloMockup);
        model.save();
    });

    it("200 ok", (done) => {

        //get all entities to extract one id in order to test getPharmacieById
        var entityId = "";
        chai.request(app)
            .get(routes.baseUrl + routes.entities)
            .end((err, res, body) => {

                if(err) {

                    done(err);

                } else {
                    entityId = res.body[0]._id;

                    chai.request(app)
                    .get( routes.baseUrl + routes.entities + "/" + entityId)
                    .end((err, res, body) => {

                        if(err){

                            done(err);

                        }else{
                            
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message');
            
                            done();

                        }

                    });
                }
            })

    });

    it('404 not found', (done) => {

        chai.request(app)
        .get(routes.baseUrl + "/404")
        .end((err, res,  body) => {

            if(err){

                done(err);

            }else{

                res.should.have.status(404);
                res.body.should.be.a('object');

                done();

            }
            
        });
    });

    after(() => {

        helloModel.deleteMany({});

    });


    it("404 unknow id", (done) => {

        //get all entities to extract one id in order to test getEntityById
        var entityId = "";
        chai.request(app)
            .get(routes.baseUrl + routes.entities)
            .end((err, res, body) => {
                
                if(err) {

                    done(err);

                } else {

                    entityId = "4c964557bf0bc7332da8b8ef"

                    chai.request(app)
                    .get( routes.baseUrl + routes.entities + "/" + entityId)
                    .end((err, res, body) => {

                        if(err){

                            done(err);

                        }else{
                            
                            res.should.have.status(404);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql(httpMessage["404"].EntityNotFound);

                            done();

                        }

                    });
                }
            })

    });

    it('404 no pharmacie found with this id', (done) => {

        var entityId = "";

        //get all entities to extract one id to delete
        chai.request(app)
        .get(routes.baseUrl + routes.entities)
        .end((err, res,  body) => {

            if(err){

                done(err);

            }else{

                //delete the id to be sure to test an unknow id
                entityId = res.body[0]._id;

                chai.request(app)
                .delete(routes.baseUrl + routes.entities + "/" + entityId)
                .send(helloMockup)
                .end((err, res,  body) => {
        
                    if(err){
        
                        done(err);
        
                    }else{
        
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql(httpMessage["200"].deleteSucess);

                        //check that no entity have been found with this id
                        chai.request(app)
                            .get(routes.baseUrl + routes.entities)
                            .end((err, res, body) => {
                
                                if(err) {
                
                                    done(err);
                
                                } else {
                
                                    chai.request(app)
                                    .get( routes.baseUrl + routes.entities + "/" + entityId)
                                    .end((err, res, body) => {
                
                                        if(err){
                
                                            done(err);
                
                                        }else{
                                            
                                            res.should.have.status(404);
                                            res.body.should.be.a('object');
                                            res.body.should.have.property('message').eql(httpMessage["404"].EntityNotFound)
                            
                                            done();
                
                                        }
                
                                    });
                                }
                            })
        
        
                    }
                    
                });

            }
            
        });       

    });

    it("400 id malformed", (done) => {

        entityId = "zrezrefzf"

        chai.request(app)
        .get( routes.baseUrl + routes.entities + "/" + entityId)
        .end((err, res, body) => {

            if(err){

                done(err);

            }else{
                
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql(httpMessage["400"].missformedId);
                
                done();

            }

        });

    });


});