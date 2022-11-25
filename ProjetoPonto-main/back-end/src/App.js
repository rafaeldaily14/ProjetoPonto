/*

Arquivo de configuração da aplicação
*/

const express = require('express');
const cors = require('cors');

const app = express();

const index = require('./routes/index')
const membroRoute = require('./routes/membro.routes');
const pontoRoute = require('./routes/ponto.routes');
const faltaRoute = require('./routes/falta.routes');
const senhasRoute = require('./routes/senhas.routes');
// const produtoRoute = require('./routes/produtos.routes');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.json({type: 'application/vnd.api+json'}));
app.use(cors());

app.use(index);
app.use('/api/', membroRoute);
app.use('/api/', pontoRoute);
app.use('/api/', faltaRoute);
app.use('/api/', senhasRoute);

module.exports = app;