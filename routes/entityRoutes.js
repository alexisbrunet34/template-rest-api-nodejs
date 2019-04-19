const express = require('express');
const router = express.Router();
const route = require('../init/routes');
const entityController = require('../controller/entityController');

/**
 * save entity
 * POST request
 * @body (req.body) : JSON object
 * @return JSON object 
 */
router.post(route.entities, (req, res) => {
   
    var body = req.body;
    entityController.saveEntity(body, res);

});

/**
 * get all entities
 * GET request
 * @return Json object with all entities in database
 */
router.get(route.entities, (req, res) => {
    
    entityController.getAllEntities(res);

});

/**
 * get entity by id
 * GET request
 * @PathParameter id of the targeted entity
 * @Return JSON object with entity targeted
 */
router.get(route.entities + "/:id", (req, res) => {
    
    var id = req.params.id;
    entityController.getEntityById(id, res);

});

/**
 * update entity
 * PUT request
 * @PathParam id of the targeted entity to update
 * @return JSON object with the updated entity
 */
router.put(route.entities + "/:id", (req, res) => {

    var id = req.params.id
    entityController.updateEntity(id, req, res);

})

/**
 * delete entity
 * DELETE request
 * @PathParam id of the targeted entity to delete
 * @return JSON object with confirmation message
 */
router.delete(route.entities + "/:id", (req,res) => {

    var id = req.params.id;
    entityController.deleteEntity(id, res);

});


module.exports = router;