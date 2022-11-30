const Dev = require('../models/Dev');
const parseArrayAsString = require('../utils/parseStringAsArray')
module.exports = {
    async index(request, response){
        
        //Buscar todos os dev em um raio de 10 km
        //Filtar por tecnologia do dev

        const {latitude, longitude, techs} = request.query;
        const techsArray = parseArrayAsString(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near:{
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000, //10 km
                }
            }
        });
        
        return response.json({devs})
    }
}