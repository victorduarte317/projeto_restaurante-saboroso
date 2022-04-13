module.exports = {
    
    getMenus() {
        
        // retorna um array com cada um dos itens do menu
        return [
            {
                text: "Tela inicial",
                href:"/admin",
                icon:"home",
                active: false
            }, 
            
            {
                text: "Menu",
                href:"/admin/menus",
                icon:"cutlery",
                active: false
            }, 

            {
                text: "Reservas",
                href:"/admin/reservations",
                icon:"calendar-check-o",
                active: false
            }, 

            {
                text: "Contatos",
                href:"/admin/contacts",
                icon:"comments",
                active: false
            }, 

            {
                text: "Usuários",
                href:"/admin/users",
                icon:"users",
                active: false
            },

            {
                text: "E-mails",
                href:"/admin/emails",
                icon:"envelope",
                active: false
            }
        ];

    }
};