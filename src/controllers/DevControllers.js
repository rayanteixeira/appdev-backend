const axios = require('axios');
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
/*  index: Mostrar uma lista
    show: Mostrar um
    store: Criar
    update: Alterar
    destroy: Deletar 
*/

module.exports = {
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response){
    
    const {github_username, techs, latitude, longitude} = request.body;
    
    let dev = await Dev.findOne({github_username});

    if(!dev) {
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
    const {name = login, avatar_url, bio} = apiResponse.data;

    const techsArray = parseStringAsArray(techs);

    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }



    dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
    });
    }

    
    
    return response.json(dev);
    },

    async update(request, response) {
        const { github_username, techs, bio, latitude, longitude} = request.body
        console.log(request.body)
        const devFilter = github_username;
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
        const techsArray = parseStringAsArray(techs);

        let devUpdate = {bio, techs: techsArray, location};
        
        let dev = await Dev.findOneAndUpdate(
            devFilter,
            devUpdate,
            {new: true} // retorna o dev após atualização.
        );
        return response.json(dev);
    },

    async destroy(request, response) {

    }


};


