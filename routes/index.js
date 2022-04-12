var conn = require('./../inc/db');
var express = require('express');
var menus = require('./../inc/menus');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  menus.getMenus().then(results => {

    res.render('index', {
      title: 'Restaurante Saboroso!',
      menus: results,
      isHome: true
    });

  });

});

// criando a rota pra renderizar os outros arquivos

router.get('/contacts', function(req, res, next){

  menus.getMenus().then(results => {

  res.render('contacts', {
    title: 'Contato - Restaurante saboroso!',
    background: 'images/img_bg_3.jpg',
    h1: 'Diga um oi!',
    menus: results, 
  });
});

});

router.get('/menus', function(req, res, next){

  menus.getMenus().then(results => {

    res.render('menus', {
      title: 'Menus - Restaurante Saboroso!',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!',
      menus: results
    });

  }); 

});

router.get('/reservations', function(req, res, next){

  menus.getMenus().then(results => {

  res.render('reservations', {
    title: 'Reservas - Restaurante saboroso!',
    background: 'images/img_bg_2.jpg',
    h1: 'Reserve uma Mesa!',
    menus: results
  });
  });

});

router.get('/services', function(req, res, next){

  menus.getMenus().then(results => {

  res.render('services', {
    title: 'Serviços - Restaurante saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!',
    menus: results
  });
});

});

module.exports = router;
