const Entity = require('../models/helloModel');
const httpMessage = require('../init/httpMessages');
const entityMockup = require('../test/helloTest')
const contentTypeJson = {"Content-Type": "application/json"};


module.exports = {


    /**
     * save entity to database
     * @body JSON object following EntitySchema
     * @res express http response object
     * @return JSON object 
     */
    saveEntity : (body, res) => {
        
        try {
            
            var entity = new Entity(body);
        
            entity.save((error, doc) => {
        
                if(error){
        
                    if(error.name){

                        var msg = httpMessage["400"].missformedRessource;
                        res.status(400, contentTypeJson).send({message :msg});
                        
                    }
        
                }else{

                    var msg = httpMessage["200"].saveSuccess;
                    res.status(200, contentTypeJson).send({message : msg, doc});
        
                }
        
            });

        } catch (error) {
            
            var msg = httpMessage["500"].somethingWrong;
            res.status(500, contentTypeJson).send( { message : msg } );
            console.log({error:{msg: error.message, stack: error.stack}});


        }
        
    },


    /**
     * send back all entities in database
     * @res express http response object
     * @return Json object
     */
    getAllEntities : (res) => {

        try {
            
            Entity.find({}, (error, doc) => {

                if(error){
        
                    var msg = httpMessage["500"].somethingWrong;
                    res.status(500, contentTypeJson).send( { message : msg } );
                    console.log({error:{msg: error.message, stack: error.stack}});
        
                }else{
                    
                    if(doc){
                        
                        res.status(200, contentTypeJson).send(doc)
                        
                    }else{
        
                        var msg = httpMessage["404"].EntityNotFound;
                        res.status(404, contentTypeJson).send({message :msg});
        
                    }
                }
        
            })

        } catch (error) {

            var msg = httpMessage["500"].somethingWrong;
            res.status(500, contentTypeJson).send( { message : msg } );
            console.log({error:{msg: error.message, stack: error.stack}});

        }

    },


    /**
     * send back the entity targeted by the id 
     * @id String : id of the entity
     * @Return JSON object
     */
    getEntityById : (id, res) => {


        try {
            
            Entity.findById(id, (error,doc) => {

                if(error){
    
                    var msg = httpMessage["400"].missformedId;
                    res.status(400, contentTypeJson).send({message :msg});
    
                }else{
    
                    if(doc){
    
                        res.status(200, contentTypeJson).send(doc);
    
                    }else{
    
                        var msg = httpMessage["404"].EntityNotFound;
                        res.status(404, contentTypeJson).send({message :msg});
    
                    }
    
                }
    
            });
            
        } catch (error) {

            var msg = httpMessage["500"].somethingWrong;
            res.status(500, contentTypeJson).send( { message : msg } );
            console.log({error:{msg: error.message, stack: error.stack}});        

        }
        
    },

    /**
    * update entity targeted by the id 
    * @id id of the targeted entity to update
    * @return JSON object (updated entity)
    */
    updateEntity : (id, req, res) =>{

        try {
            
            //first check if the id exist on database
            Entity.findById(id, (error,doc) => {

                if(error){

                    var msg = httpMessage["400"].missformedId;
                    res.status(400, contentTypeJson).send({message :msg});

                }else if(!doc){

                    var msg = httpMessage["404"].EntityNotFound;
                    res.status(404, contentTypeJson).send({message :msg});
                    
                } else {

                    //if the id exist, it's updated
                    Entity.findOneAndUpdate(id, req.body,{new: true}, (error, doc) => {

                        if(error){
            
                            var msg = httpMessage["500"].somethingWrong;
                            res.status(500, contentTypeJson).send({message :msg});
            
                        } else {

                            var bodyCorrespondingToSchema = true;
                            
                            //check if the properties of the json object sent in req.body correspond to the entityMockup
                            //if not : bodyCorrespondingToSchema => false
                            for(var property in req.body){
                                if( !entityMockup.hasOwnProperty(property) ){

                                    bodyCorrespondingToSchema = false;

                                }
                                
                            }

                            if(bodyCorrespondingToSchema == false){

                                var msg = httpMessage["400"].missformedRessource;
                                res.status(400, contentTypeJson).send({ message :msg });

                            } else {

                                var msg = httpMessage["200"].updateSuccess;
                                res.status(200, contentTypeJson).send({message :msg, newDocument: doc});

                            }
                            
                        }
            
                    });

                }

            });

        } catch (error) {

            var msg = httpMessage["500"].somethingWrong;
            res.status(500, contentTypeJson).send( { message : msg } );
            console.log({error:{msg: error.message, stack: error.stack}});  
            
        }
    },

    /**
    * delete entity targeted by the id
    * @id id of the targeted entity
    * @return JSON object (confirmation message)
    */
    deleteEntity : (id, res) => {

        try {
            
            Entity.findOneAndDelete({_id: id}, (error, doc) => {

                if(error) {
        
                    var msg = httpMessage["400"].missformedId;
                    res.status(400, contentTypeJson).send({message :msg, error : error});
        
                } else {
        
                    if(doc) { 
        
                        var msg = httpMessage["200"].deleteSucess;
                        res.status(200, contentTypeJson).send({message :msg});
        
                    } else {
        
                        var msg = httpMessage["404"].EntityNotFound;
                        res.status(404, contentTypeJson).send({message :msg});
        
                    }
        
                }
            });

        } catch (error) {
            
            var msg = httpMessage["500"].somethingWrong;
            res.status(500, contentTypeJson).send( { message : msg } );
            console.log({error:{msg: error.message, stack: error.stack}});  
            
        }

    },


}

    