class UserModel {
    constructor() {
        console.log("Model: Fui criada!");
        this._titulo = "";
        this._midia = "";
    }

    buscaUsuario() {
        console.log("Model: Buscando um usuário...");

        let requisicao = new XMLHttpRequest();

        requisicao.addEventListener("load", () => {            
            if(requisicao.status == 200) {
                let dados = this._processaResposta(requisicao.responseText);
                this._atualiza(dados);
            }
        })

        requisicao.open("GET", "https://api.nasa.gov/planetary/apod?api_key=Z1sTyjXyIlh4jVoeGWFAk7BLunzKw5CHeMibo9RE", false);

        requisicao.send();
    }

    _processaResposta(responseString) {
        console.log("Model: Processando response...");
        let resposta = JSON.parse(responseString);
        return resposta;
    }

    _atualiza(dados) {
        console.log("Model: Atualizando os meus dados");
        this._midia = dados.hdurl;
        this._dataTitulo = dados.date;
        this._descricao = dados.explanation;
        this._titulo = dados.title;
    }

    getDia() {
        return this._dataTitulo;
    }
    getMidia() {
        return this._midia;
    } 
    getTitulo() {
        return this._titulo;
    }
    getDescricao() {
        return this._descricao;
    }
}

class UserView {

    constructor() {
        console.log("View: Fui criada!");
    }

    render(model) {
        console.log("View: Recebi um usuário e vou criar uma visualização");

        let card = document.createElement("div");

        card.innerHTML = `
            <div class="conteudo">
                <div class="foto">
                    <img id="img" src=${ model.getMidia() }>
                </div>
                <div class="info">
                    <h1>${ model.getDia() }</h1>
                    <h2>${ model.getTitulo() }</h2>
                    <p>${ model.getDescricao() }</p>
                </div>
            </div>
        `

        document.body.appendChild(card);
    }
}
    
class UserController {

    constructor() {
        console.log("Controller: Fui criada!");
    }

    adicionaUsuario() {
        console.log("Controller: Vou adicionar um usuário...");

        let user = new UserModel();
        user.buscaUsuario();
        let view = new UserView();
        view.render(user);
    }
}

    let controller = new UserController();
    document.getElementById("busca").addEventListener("click", controller.adicionaUsuario);