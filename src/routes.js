const {Router} = require('express');
const DevController = require('./controllers/DevControllers');
const SearchController = require('./controllers/SearchController');

const routes = Router();
//Métodos HTTP: get, post, put, delete
/* Tipo de parâmetros:
    > Query Params: request.query (filtros, ordenação, paginação, ...)
        -> Geralmente usado com get
    > Route Params: request.params (identificar um recurso na alteração ou remoção)
        -> Geralmente usado com PUT ou DELETE
    > Body: request.body (Dados para criação ou alteração de um registro)
        -> Geralmente usado com POST, mas também com PUT
*/

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs', DevController.update);


routes.get('/search', SearchController.index)
module.exports = routes;