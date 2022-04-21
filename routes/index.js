var conn = require('./../inc/db');
var express = require('express');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations');
var contacts = require('./../inc/contacts');
var emails = require('./../inc/emails');
var router = express.Router();

module.exports = function(io) {
  
  /* GET home page. */
router.get('/', ((req, res, next) => {

  menus.getMenus().then(results => {

    res.render('index', {
      title: 'Restaurante Saboroso!',
      menus: results,
      isHome: true
    });

  });

}));

// criando a rota pra renderizar os outros arquivos

router.get('/contacts', ((req, res, next) => {

  contacts.render(req, res);

}));

router.post('/contacts', ((req, res, next) => {

  if (!req.body.name) {
    contacts.render(req, res, "Digite o nome.");
  } else if (!req.body.email) {
    contacts.render(req, res, "Digite o email.");
  } else if (!req.body.message) {
    contacts.render(req, res, "Insira sua mensagem.")
  } else {
    contacts.save(req.body).then(results => {

      req.body = {};

      io.emit('dashboard update');

      contacts.render(req, res, null, "Mensagem enviada! Retornaremos assim que possível.")
    
    }).catch(err =>{
      
      contacts.render(req, res, err.message);
    });
  }

}));



router.get('/menus', ((req, res, next) => {

  menus.getMenus().then(results => {

    res.render('menus', {
      title: 'Menus - Restaurante Saboroso!',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!',
      menus: results
    });

  }); 

}));

router.get('/reservations', ((req, res, next) => {

  reservations.render(req, res);

}));

router.post('/reservations', ((req, res, next) => {

  if(!req.body.name) {
    reservations.render(req, res, "Digite o nome.");
  } else if(!req.body.email) {
    reservations.render(req, res, "Digite o email.");
  } else if(!req.body.people) {
    reservations.render(req, res, "Informe o número de pessoas.");
  } else if(!req.body.date) {
    reservations.render(req, res, "Informe a data.");
  } else if(!req.body.time) {
    reservations.render(req, res, "Por favor, informe o horário desejado para a reserva.");
  } else {
    
    reservations.save(req.body).then(results =>{

      req.body = {};

      io.emit('dashboard update');

      reservations.render(req, res, null, "Reserva efetuada, esperamos por você!");

    }).catch(err=>{
        reservations.render(req, res, err.message);
    });
  }

}));

router.get('/services', ((req, res, next) => {

  res.render('services', {
    title: 'Serviços - Restaurante saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!',
  });

}));

router.post("/subscribe", function(req, res, next) {

  emails.save(req).then(results =>{
    res.send(results);

  }).catch(err=>{

    res.send(err);
  });

});


  return router;
};
