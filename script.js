const Main = {
    
    init: function(){
        this.cacheSelectors()
        this.bindEvents()
    },

    cacheSelectors: function(){

        this.$inputCep = document.querySelector('#cep')
        this.$inputStreet = document.querySelector('#street')
        this.$inputCity = document.querySelector('#city')
        this.$inputState = document.querySelector('#state')
        this.$inputNumber = document.querySelector('#number')
        this.$spanError = document.querySelector('#spanError')

    },

    bindEvents: function(){
        const self = this

        this.$inputCep.onblur = (e) => {
            Main.cepNumber = e.target.value
            self.EventsFn.cepRequisition()    
        }


        this.$inputCep.onkeyup = (e) => {
            Main.cepNumber = e.target.value
           
            if(Main.cepNumber.length === 8){
                self.EventsFn.cepRequisition()
            }                 
        }       
    },

    EventsFn: {
        cepRequisition: () => {
            fetch(`https://viacep.com.br/ws/${Main.cepNumber}/json/`)
                .then(response => response.json())
                .then(Main.EventsFn.verificaDados)
                .catch(Main.EventsFn.erroSpan)
        },

        verificaDados: (obj) => {

            if(obj.erro){
                reject()
            }

            Main.EventsFn.atualizaDados(obj)
        },

        erroSpan: () => {
            Main.EventsFn.atualizaDados('')
        },

        atualizaDados: obj => {

            if(!obj){
                Main.$inputStreet.value = ''
                Main.$inputCity.value = ''
                Main.$inputState.value = ''
                Main.$inputNumber.value = ''
                Main.$spanError.classList.add('erro')
            } else {
                Main.$inputStreet.value = obj.logradouro
                Main.$inputCity.value = obj.localidade
                Main.$inputState.value = obj.uf
                Main.$inputNumber.value = obj.ddd
                Main.$spanError.classList.remove('erro')
            }
        }
    }
}

Main.init()
