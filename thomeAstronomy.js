//Lidando com o input
// document.querySelector('#busca').addEventListener('click', function( )
// {
//     //criando uma requisicao
//     let requisicao = new  XMLHttpRequest();
//     //o que fazer quando a requisicao chegar
//     requisicao.addEventListener( "load", function()
//     {
//         // se o status é ok
//         if ( requisicao.status == 200) {
//             // processamos os dados
//             let dados = JSON.parse( requisicao.responseText );
//             console.log(dados);
//             //criamos um usuario com data, descrição, midia_midia e titulo
//             let usuario = {
//                 data: dados.date,
//                 descricao: dados.explanation,
//                 media: dados.hdurl,
//                 titulo: dados.title,
//             };
//             //criamos uma div
//             let post = document.createElement("div");
//             //colocamos os dados do usuario dentro
//             post.innerHTML = `
//                 <img src=${usuario.media}>
//                 <p>${ usuario.descricao }</p>
//                 <h1>${ usuario.titulo }</h1>
//                 <h2>${ usuario.data }</h2>
//             `
//             //adicionamos a div ao nosso documento
//             document.body.appendChild( post );
//         }
//     });
//     //configuramos a requisicao para buscar de forma síncrona os dados da API
//     requisicao.open('GET', 'https://api.nasa.gov/planetary/apod?api_key=Z1sTyjXyIlh4jVoeGWFAk7BLunzKw5CHeMibo9RE',false);
//     //mandamos a requisicao 
//     requisicao.send();
// });



    // Modelo (Model) de dados de um usuário
    //
    // Sua função é lidar com a busca, armazenamento e processamento de dados.
    class UserModel
    {
        // Definimos as propriedades do nosso objeto
        constructor() 
        { 
            console.log("Model: Fui criada!");

            this._titulo = "";
            this._midia = "";
        }

        // Buscamos um usuário na API
        buscaUsuario()
        {
            console.log("Model: Buscando um usuário...");

            // Criamos uma requisição
            let requisicao = new  XMLHttpRequest();
            
            // Dizemos o que fazer quando a resposta chegar
            requisicao.addEventListener( "load", () =>
            {
                // Se o status da resposta é 200 OK...
                if ( requisicao.status == 200 )
                {
                    // Processamos os dados da resposta
                    let dados = this._processaResposta( requisicao.responseText );
                    // e atualizamos as propriedades dessa model
                    this._atualiza( dados );
                }
            })

            // Configuramos a requisicao para buscar de forma
            // síncrona os dados da API
            requisicao.open( "GET", "https://api.nasa.gov/planetary/apod?api_key=Z1sTyjXyIlh4jVoeGWFAk7BLunzKw5CHeMibo9RE", false );

            // Mandamos a requisicao
            requisicao.send();
        }

        // Como a resposta vem como uma string, nós precisamos
        // processar esses dados para que possamos trabalhar
        // com eles
        _processaResposta( responseString )
        {
            console.log("Model: Processando response...");

            let resposta = JSON.parse( responseString );
            return resposta;
        }

        // Atualizamos os dados da nossa model de acordo com os
        // dados da resposta da API
        _atualiza( dados )
        {
            console.log( "Model: Atualizando os meus dados" );

            this._midia = dados.hdurl;
            this._dataTitulo = dados.date;
            this._descricao = dados.explanation;
            this._titulo = dados.title;
        }

        // Método para devolver o titulo do usuário
        getTitulo()
        {
            return this._titulo;
        }

        // Método para devolver a midia_midia do usuário
        getMidia()
        {
            return this._midia;
        }
        getDia()
        {
            return this._dataTitulo;
        }
        getDescricao()
        {
            return this._descricao;
        }
    }
    
    // Visualização (View) de um usuário
    //
    // Sua função é lidar com a disponibilização de dados para o usuário final.
    class UserView
    {
        // Construtor vazio: nossa view não tem atributos!
        constructor() { console.log("View: Fui criada!"); }

        // Método encarregado de pegar os dados da model de usuário
        // e mostrar na tela de alguma forma
        render( model )
        {
            console.log( "View: Recebi um usuário e vou criar uma visualização" );

            // Criamos uma div
            let card = document.createElement( "div" );
            
            // Colocamos foto e nome
            card.innerHTML = `
                <h1>${ model.getDia() }</h1>
                <img src=${ model.getMidia() }>
                <h2>${ model.getTitulo() }</h2>
                <p>${ model.getDescricao() }</p>
            `
            // Adicionamos a div ao nosso documento
            document.body.appendChild( card );
        }
    }

    // Controlador (Controller) de um usuário
    //
    // Sua função é ser o ponto de entrada da plataforma e mediar as models e as views.
    class UserController
    {
        // Também não precisamos de propriedades nessa controller
        constructor() { console.log("Controller: Fui criada!"); }

        // Função chamada quando queremos adicionar um usuário
        adicionaUsuario()
        {
            console.log( "Controller: Vou adicionar um usuário..." );

            // Criamos uma model e buscamos dados
            let user = new UserModel();
            user.buscaUsuario();

            // Passamos os dados para a view
            let view = new UserView();
            view.render( user );
        }
    }
    
    // Criamos a nossa controller (precisamos de um ponto de entrada)
    let controller = new UserController();
    
    // Lidamos com o input do lado de fora:
    document.getElementById( "busca" ).addEventListener( "click", controller.adicionaUsuario );

