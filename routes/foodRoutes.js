const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/');
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});
const upload = multer({storage: storage});

const {
    all_food,
    add_food,
    particular_food,
    Food_updated,
    Food_Deleted,
    getFoodTitle
  } = require("../controllers/foodController");

router.get('/', all_food);

router.post('/add_food',upload.single('image_url'),add_food);

router.get('/:foodId',particular_food);

router.patch('/:foodId',Food_updated);

router.delete('/:foodId',Food_Deleted);

router.get('/menu/title',getFoodTitle);

module.exports = router;