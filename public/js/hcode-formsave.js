// prototype = adiciona métodos (recursos) à objetos DOM

HTMLFormElement.prototype.save = function() {
        
        let form = this;

        return new Promise((resolve, reject)=>{
            form.addEventListener('submit', (e) => {

            e.preventDefault();
    
            let formData = new FormData(form); // método nativo do js
    
            fetch(form.action, {
                method: form.method,
                body: formData
            })  
            .then(response => response.json())
            .then(json => { // json de resposta dos dados acima
    
                resolve(json);
    
            }).catch(err=>{
                
                reject(err);
            });
    
        });
         
    });
}