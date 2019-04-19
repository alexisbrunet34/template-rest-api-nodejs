module.exports =  {

    "200": {
        saveSuccess : "Entity successfuly added !",
        deleteSucess : "Entity successfuly deleted !",
        updateSuccess : "Entity successfuly updated !",
        searchSucess: "Entity(s) found nearby!"
    },
    
    "400": {
        missformedRessource : "the ressource you sent is incorrectly formed",
        missformedId : "incorrect Entity id, check the id property",
        incorrectQueryParam : "incorrect or missing parameters in the http request you sent"
    },
    
    "404": {
        EntityNotFound : "No Entity found, multiple causes : no Entity in the database, id missing or missformed, Entity deleted",
        noEntityAround: "no Entity found, try again with a larger perimeter",
        idNotFound : ""
    },
    
    "500" : {
        somethingWrong : "something wen wrong on our side... sorry duuuuude"
    }


}