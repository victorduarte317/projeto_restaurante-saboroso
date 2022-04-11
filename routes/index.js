var conn = require('./../inc/db');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  conn.query(`
    SELECT * FROM tb_menus ORDER BY title   
  `, (err, results)=>{

    if (err) {
      console.log(err);
    } 
    res.render('index', {
      title: 'Restaurante saboroso!',
      menus: results
    });

  })
});

// criando a rota pra renderizar os outros arquivos

router.get('/contacts', function(req, res, next){

  res.render('contacts', {
    title: 'Contato - Restaurante saboroso!',
    background: 'images/img_bg_3.jpg',
    h1: 'Diga um oi!'
  });
    

});

router.get('/menus', function(req, res, next){

  res.render('menus', {
    title: 'Menu - Restaurante saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: 'Saboreie nosso menu!'
  });
  

});

router.get('/reservations', function(req, res, next){

  res.render('reservations', {
    title: 'Reservas - Restaurante saboroso!',
    background: 'images/img_bg_2.jpg',
    h1: 'Reserve uma Mesa!'
  });

});

router.get('/services', function(req, res, next){

  res.render('services', {
    title: 'Serviços - Restaurante saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!'
  });

});

module.exports = router;
