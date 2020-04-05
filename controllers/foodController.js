const Food = require("../models/food");

module.exports = {
all_food(req,res,next){

    Food
        .find()
        .then(food => {
            const response = {
                count: food.length,
                recepies: food.map(food_dekho =>{
                    return {
                        // _id:food_dekho._id,
                        // publisher: food_dekho.publisher,
                        Title: food_dekho.title,
                        // source_url: food_dekho.source_url,
                        // recipe_id: food_dekho.recipe_id,
                        Image_url: food_dekho.image_url,
                        // social_rank: food_dekho.social_rank,
                        // publisher_url: food_dekho.publisher_url,
                        Request : {
                            TYPE: "GET",
                            MORE_DETAILS : 'http://localhost:1234/food/' + food_dekho._id
                        }
                    }
                })
            } 
            res.status(200).json(response)
        })
        .catch(err => next(err))
        },

async add_food(req,res,next){
    console.log(req.file)
    try {
        const { publisher, title, source_url, recipe_id, image_url, social_rank, publisher_url} = req.body;
        // if(!publisher || !title || !source_url || !recipe_id || !image_url || !social_rank || !publisher_url) {
        //     return res
        //     .send({ 
        //         statusCode: 400,
        //         message: "Bad request"             
        //     })
        // }
        const recepie = await Food.create({
            publisher: req.body.publisher_name,
            title: req.body.title,
            source_url: req.body.source_url,
            recipe_id: req.body.recipe_id,
            image_url: `http://localhost:1234/` +req.file.path,
            social_rank: req.body.social_rank,
            publisher_url: req.body.publisher_url,
            isThirdPartyUser: false
        })
        recepie
        .save()
        .then(food => {
            console.log(food);
            res.status(201).json({
             Message: "food stored successfully",   
             Result:food});
        })
    }
        catch (err) {
            console.log(err),
            res.status(500).json({
                error:err
             });
         };
},

async particular_food(req,res,next){
    const id = req.params.foodId;
    if(id){
    Food
        .findById(id)
        .exec()
        .then(food => {
            console.log(food),
            res.status(200).json(food)} )
        .catch(err => next(err));
}else{
        res.status(400).json({
            message: 'sorry! Bad Request'
        });
    }
},

async Food_updated(req,res,next){
    const id = req.params.foodId;
    if(id){
    Food
    .findByIdAndUpdate(id, req.body)
        .exec()
        .then(food => 
            res.status(200).json(food) )
        .catch(err => next(err));
}else{
        res.status(400).json({
            message: 'sorry! Bad Request'
        });
    }
},

async Food_Deleted(req,res,next){
    const id = req.params.foodId;
    if(id){
    Food
    .findByIdAndRemove(id, req.body)
        .exec()
        .then(food => 
            res.status(200).json(food) )
        .catch(err => next(err));
}else{
        res.status(400).json({
            message: 'sorry! Bad Request'
        });
    }
},

async getFoodTitle(req, res, next) {
    Food
      .find()
      .distinct('title')
      .exec()
      .then(title => res.json(title))
      .catch(err => next(err));
  }
} 
