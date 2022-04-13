var express = require("express");
var users = require("./../inc/users");
var admin = require("./../inc/admin");
var router = express.Router();

router.use((req, res, next)=>{ // criando o middleware

    if (['/login'].indexOf(req.url) === -1 && !req.session.user) { // se req.url nao estiver dentro do index de /login && nao tiver uma sessao com user
        res.redirect("/admin/login") // redireciona o usuário pra tela de login
    } else {
        next();
    }

}); 

router.use((req, res, next)=>{

    req.menus= admin.getMenus();

    next();

});

router.get("/logout", (req, res, next)=>{

    delete req.session.user;

    res.redirect("/admin/login");

});

router.get("/", ((req, res, next) => {  

        res.render("admin/index", {
            menus: req.menus
        });
}));

router.post("/login", ((req, res, next) => {
    
if(!req.body.email) {
    users.render(req, res, "Insira o email.");
} else if (!req.body.password) {
    users.render(req, res, "Insira a senha.");
} else {
    
    users.login(req.body.email, req.body.password).then(user =>{

        req.session.user = user;

        res.redirect("/admin");

    }).catch(err=>{
        users.render(req, res, err.message || err);
    })
}

}));

router.get("/login", ((req, res, next) => {

    users.render(req, res, null);

}));

router.get("/contacts", ((req, res, next) => {

    res.render("admin/contacts", {
        menus: req.menus
    });

}));

router.get("/emails", ((req, res, next) => {

    res.render("admin/emails", {
        menus: req.menus
    });

}));

router.get("/menus", ((req, res, next) => {

    res.render("admin/menus"), {
        menus: req.menus
    };

}));

router.get("/reservations", ((req, res, next) => {

    res.render("admin/reservations", {
        date: {},
        menus: req.menus 
    });

}));

router.get("/users", ((req, res, next) => {

    res.render("admin/users", {
        menus: req.menus
    });

}));

module.exports = router;