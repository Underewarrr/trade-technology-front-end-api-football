# Sobre o Projeto
[Create React App](https://github.com/facebook/create-react-app).

- Para usar o sistema é necessário antes atualizar o localstorage antes de pesquisar qual quer time, isso para evitar que muitas requisições sejam feitais já que o máximo de requisição é de 1k por dia.

- Paginas estilizadas com Bootstrap-css/React-Bootstrap.

### AuthSytem
Para autenticar as rotas após login usamos o axios para pegar e valida a key fornecida direamente na API, se o status da conta não for valido então redireciona para o login.
![image](https://github.com/Underewarrr/trade-technology-front-end-api-football/assets/74227915/768b2c41-3d77-4a43-98d8-821840033d2a)
* O sistema de autenticação foi construido em Typescript e Javascript.
Rota  /user/panel
![image](https://github.com/Underewarrr/trade-technology-front-end-api-football/assets/74227915/70f5f016-31d8-4c34-ad2c-1cc53df22e2c)
Atualizando o LocalStorage
![image](https://github.com/Underewarrr/trade-technology-front-end-api-football/assets/74227915/ac8e9a40-5e69-482c-bc2b-85c21f424e22)
Times Listados :  

>Primeiro selecione um pais -> Selecione uma Season -> Selecione uma liga -> Selecione um time

![image](https://github.com/Underewarrr/trade-technology-front-end-api-football/assets/74227915/03180ba8-f5dc-4614-bff8-b41bf210f329)

Ja é possivel ver o Time selecionado usando o localStorage 
![image](https://github.com/Underewarrr/trade-technology-front-end-api-football/assets/74227915/87b2cccc-f03f-4e29-810a-530293f2b219)
Profile View apartir da chave
![image](https://github.com/Underewarrr/trade-technology-front-end-api-football/assets/74227915/7a3d8885-ef31-4b82-bd54-e13e09c7316f)




### [League -> Team Information -> Team Statistics -> PlayerInformation + AuthSystem ](https://github.com/Underewarrr/trade-technology-front-end-api-football/pull/2)
![image](https://github.com/Underewarrr/trade-technology-front-end-api-football/assets/74227915/7b9ac410-ad10-4de7-b432-d5c2adcde630)

# IMG's
<details>
  <summary>Front-End</summary>
  <img src="https://github.com/Underewarrr/trade-technology-front-end-api-football/assets/74227915/cd6d95d3-445e-434a-b13d-79e35d699195" />
  <img src="https://github.com/Underewarrr/trade-technology-front-end-api-football/assets/74227915/c18511ea-0b0f-4ac3-8deb-d2fea2a3309c"/>
   <img src="https://github.com/Underewarrr/trade-technology-front-end-api-football/assets/74227915/0a833ac5-1990-4bdc-b49a-2dc34fb9c5b5"/>
  <img src="https://github.com/Underewarrr/trade-technology-front-end-api-football/assets/74227915/487213ca-5087-4a90-a271-9870fcd7710d" />
  <img src="https://github.com/Underewarrr/trade-technology-front-end-api-football/assets/74227915/be63f016-0e49-49f1-9666-7230d281d101" />
  <img src="https://github.com/Underewarrr/trade-technology-front-end-api-football/assets/74227915/a38249ac-38f4-4154-b1ab-9ea80df17ea2" />
 <img src="https://github.com/Underewarrr/trade-technology-front-end-api-football/assets/74227915/b8925bf9-fbfb-4054-a6b3-a89d97fe8772" />
</details>

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

### AuthSystem
Para autenticar as rotas após login usamos o axios para pegar e valida a key fornecida direamente na API, se o status da conta não for valido então redireciona para o login.

### Armazenamento
Não é possivel manter diversas requisições (No plano free) todos os dados são salvos no local storages e manipulados de la.

## Melhorias
- [ ] Criar um custom Hook para manipular o LocalStorage.
- [ ] Adicionar Services para os requests.
- [ ] Criar funções dinmaicas para reduzir as funções que se repetem em varias partes do códigos.
- [ ] Usar o useMemo() para criar alertas nas rotas da pagina.

#### Rotas
| Method | Path                       |                            PAGE                |
| ------ | -------------------------- | -------------------------------------------------- |
| FRONT    | user/login |      LOGIN WITH KEY            |
| FRONT    | user/panel/ |  LISTA ALL TEAMS RELATED TO CONTRIES AND LEAGUES           |
| FRONT    | user/view/profile-key |  SEE ALL INFORMTION ABOUT YOUR KEY SUCH AS MAXIMUM REQUEST AND ACTUAL REQUEST          |
| FRONT    | user/panel/team:id |  SEEL ALL TEAM INFORMATION SUCH AS PLAYERS            |

### Linguagem
- Typescript/Javascript
### Libs/Frameworks
- Axios
- React
- React-Bootstrap
- React-Router-Dom
