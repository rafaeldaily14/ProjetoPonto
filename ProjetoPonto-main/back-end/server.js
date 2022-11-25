/*
Servidor backend 
Fonte: https://github.com/glaucia86
*/

const app = require('./src/app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Servidor de aplicação rodando na porta ", port);
})