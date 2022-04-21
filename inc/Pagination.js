let conn = require('./db');

class Pagination {
    constructor(
        query,
        params = [],
        itemsPerPage = 10
    ){
        // globalizando os parametros

        this.query = query;
        this.params = params;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
    }

    getPage(page) {

        this.currentPage = page - 1;

        this.params.push(  
            this.currentPage * this.itemsPerPage,         
            this.itemsPerPage 
        );  

        return new Promise((resolve, reject)=> {
            
            conn.query([this.query, "SELECT FOUND_ROWS() AS FOUND_ROWS"].join(";"), this.params, (err, results)=>{
                
                if (err) { 

                    reject(err);

                } else {
                    this.data = results[0];
                    this.total = results[1][0].FOUND_ROWS;
                    this.totalPages = Math.ceil(this.total / this.itemsPerPage);
                    this.currentPage++;

                    resolve(this.data);
                }
            });  
        })
    }

    getTotal() {
        return this.total;
    }

    getCurrentPage() {
        return this.currentPage;
    }

    getTotalPages() {
        return this.totalPages;
    }

    getNav(params) {

        let limitPages = 5; 
        let links = [];
        let navStartNumber = 0;
        let navEndNumber = 0;

        if (this.getTotalPages() < limitPages) limitPages = this.getTotalPages();

        // Primeiras páginas da navegação
        // limitPages / 2 pra deixar sempre a página atual no meio da navbar

        if ((this.getCurrentPage() - parseInt(limitPages / 2)) < 1) {
            navStartNumber = 1;
            navEndNumber = limitPages;
        } 

        // chegando perto das últimas páginas

        else if ((this.getCurrentPage() + parseInt(limitPages / 2)) > this.getTotalPages()) {
            navStartNumber = this.getTotalPages() - limitPages;
            navEndNumber = this.getTotalPages();
        } 

        // No meio da navegação

        else {
            navStartNumber = this.getCurrentPage() - parseInt(limitPages / 2);
            navEndNumber = this.getCurrentPage() + parseInt(limitPages / 2);
        }

        if (this.getCurrentPage() > 1) {
            links.push({
                text:'<',
                href:'?' + this.getQueryString(Object.assign({}, params, {
                    page: this.getCurrentPage() - 1
                }))
            });
        }
        
        for (let i = navStartNumber; i <= navEndNumber; i++) {

            links.push({
                text: i,
                href: '?' + this.getQueryString(Object.assign({}, params, {page: i})),
                active: (i === this.getCurrentPage())
            });
        }

        if (this.getCurrentPage() < this.getTotalPages()) {
            links.push({
                text:'>',
                href:'?' + this.getQueryString(Object.assign({}, params, {
                    page: this.getCurrentPage() + 1
                }))
            });
        }

        return links;
    }

    getQueryString(params) {

        let queryString = [];

        for (let name in params) {

            queryString.push(`${name}=${params[name]}`);
        }  

        return queryString.join("&");   
        // Convertendo JSON em formato queryString

    }
}

module.exports = Pagination;