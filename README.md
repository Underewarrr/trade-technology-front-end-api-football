# Sobre o Projeto
[Create React App](https://github.com/facebook/create-react-app).

## Scripts disponiveis

Nesse projeto você pode rodar os seguintes comandos.

### `npm start`

Para rodar o projeto na sua maquina local.
Entre [http://localhost:3000](http://localhost:3000) Para ver em seu navegador.


### `npm test`

Para rodar os testes.
[Jest](https://jestjs.io/pt-BR/) Para saber mais.

### `npm run build`

Para transpilar o app.

Veja mais sobre [deployment](https://facebook.github.io/create-react-app/docs/deployment).

## API

### Exemplo Axios Request 
```
var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://v3.football.api-sports.io/{endpoint}',
  headers: {
    'x-rapidapi-key': 'XxXxXxXxXxXxXxXxXxXxXxXx',
    'x-rapidapi-host': 'v3.football.api-sports.io'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Acessando a API
Para acessar o app o usuario deve possuir uma chave de autorização.

Para conseguir sua chave acesse :
[DashBoard API FootBall](https://dashboard.api-football.com/)

### [API Doc](https://www.api-football.com/documentation-v3#section/Sample-Scripts/Java)


## Front-End

### High Order Componente
O sistema de proteção de rotas funciona com uma [(hoc)](), esse componente é recarregado apenas nas rotas que o usuario tem permissão então algumas verificações e dados podem ser salvos e usados nesse componente quando necessario!
Para proteger uma rota inicie o componente `<ProtectedRoute />`

## Melhorias
- [ ] criar um custom Hook para manipular o LocalStorage.
- [ ] Adicionar Services para os requests.
- [ ] Criar funções dinmaicas que se repetem em varias partes do códigos.

#### Rotas
| Method | Path                       |                            PAGE                |
| ------ | -------------------------- | -------------------------------------------------- |
| FRONT    | user/login |      LOGIN WITH KEY            |
| FRONT    | user/panel/ |  LIST ALL COUNTRIES AVALIABLE LEAGUES            |
| FRONT    | user/panel/ |  LIST ALL LEAGUES            |
| FRONT    | user/panel/ |  LIST ALL SEASONS            |
| FRONT    | user/panel/    |  LIST ALL TEAMS            |
 CHARACTER ON ACCOUNT |
# Rotas Back-end

### Linguagem
- Typescript/Javascript
### Libs/Frameworks
- Axios
- React
- React-Bootstrap
- React-Router-Dom