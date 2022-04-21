// componente - abstração e dinamização de códigos usados de forma repetida.

class HcodeGrid {

    constructor(configs){

        configs.listener = Object.assign({
            afterUpdateClick: (e) => {
                $('#modal-update').modal('show');
        
              }, 

            afterDeleteClick: (e) => {
                window.location.reload();
        
            },

            afterFormCreate: (e) => {
                window.location.reload();

            },

            afterFormUpdate: (e) => {
                window.location.reload();

            },

            afterFormCreateError: (e) => {
                alert('Não foi possível enviar o formulário.')

            },

            afterFormUpdateError: (e) => {
                alert('Não foi possível enviar o formulário.')
            }

        }, configs.listener);

        this.options = Object.assign({}, {
            formCreate: '#modal-create form',
            formUpdate: '#modal-update form',
            btnUpdate: 'btn-update',
            btnDelete:'btn-delete',
            onUpdateLoad : (form, name, data) => {
                let input = form.querySelector('[name=' + name + ']');
                if (input) input.value = data[name];
            }
        }, configs);

        this.rows = [...document.querySelectorAll('table tbody tr')];

        this.initForms();
        this.initButtons();
    }

    initForms() {

            this.formCreate = document.querySelector(this.options.formCreate);

            if (this.formCreate) {
                this.formCreate.save({
                    success:()=>{
                        this.triggerEvent('afterFormCreate');
                    },

                    failure:()=>{
                        this.triggerEvent('afterFormCreateError') 
                    }   
            });
        }

                this.formUpdate = document.querySelector(this.options.formUpdate);

                if (this.formUpdate) {

                    this.formUpdate.save({
                        success:()=>{
                            this.triggerEvent('afterFormUpdate');   
                        },
                        
                        failure:()=>{
                            this.triggerEvent('afterFormUpdateError')   
                    }
                });                 
            }
        }

            triggerEvent(name, args) {

                if (typeof this.options.listener[name] === 'function') { this.options.listener[name].apply(this, args)}

            }
    
    getTrData(e) {

        let tr = e.composedPath().find(el => { // vai passar elemento por elemento procurando

            return(el.tagName.toUpperCase() === 'TR');

        });
            return JSON.parse(tr.dataset.row);
    }

    btnUpdateClick(e) {

        this.triggerEvent('beforeUpdateClick', [e]);

        let data = this.getTrData(e);

        for (let name in data) {

            this.options.onUpdateLoad(this.formUpdate, name, data);
        }

        this.triggerEvent('afterUpdateClick', [e]);
    }

    btnDeleteClick(e) {

        this.triggerEvent('beforeDeleteClick');

        let data = this.getTrData(e);

        if (confirm(eval('`' + this.options.deleteMsg + '`'))) { 

            fetch(eval('`' + this.options.deleteUrl + '`'), {
                method:"DELETE"
            })
                .then(response => response.json())
                .then(json => {
                    this.triggerEvent('afterDeleteClick');
                }); 
        }
    }

    initButtons() {
        
        // objeto com todas as colunas, faz uma pesquisa por coluna
        this.rows.forEach(row => {

            [...row.querySelectorAll('.btn')].forEach(btn => { // pega todos os elementos com a classe btn, faz um spread e forEach a cada botão

                btn.addEventListener('click', e => {

                    if (e.target.classList.contains(this.options.btnUpdate)) {
                        this.btnUpdateClick(e);
                    } else if (e.target.classList.contains(this.options.btnDelete)) {
                        this.btnDeleteClick(e);
                    } else {
                        this.triggerEvent('buttonClick', [e.target, this.getTrData(e), e]);
                    // a lógica desse bloco é checar se o botão é de edit ou delete. Se não for nenhum dos dois,
                    // passa pro usuário os dados do botão clicado, pra ajudar na identificação do mesmo.
                    }

                });

            });
        });
    }
}   