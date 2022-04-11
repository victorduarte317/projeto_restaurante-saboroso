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
    title: 'Contato - Restaurante saboroso!'
  });
    

});

router.get('/menus', function(req, res, next){

  res.render('menus', {
    title: 'Menu - Restaurante saboroso!'
  });
  

});

router.get('/reservations', function(req, res, next){

  res.render('reservations', {
    title: 'Reservas - Restaurante saboroso!'
  });

});

router.get('/services', function(req, res, next){

  res.render('services', {
    title: 'Serviços - Restaurante saboroso!'
  });

});

module.exports = router;
