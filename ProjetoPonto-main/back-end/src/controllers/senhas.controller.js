/**
 * CRUD da tabela de Pontos
 */

const db = require('../config/database');

exports.createSenha = async (req, res) => {
    const { senhaNome, 
            senhaSenha
        } = req.body;
    const response = await db.query(
        'INSERT INTO senhas (nome, senha) VALUES ($1, $2)',
        [senhaNome, senhaSenha],
    );

    res.status(201).send({
        message: 'Senha inserido com sucesso',
        body: {
            ponto: {senhaNome, senhaSenha},
        },
    });
};

exports.readSenha = async (req, res) => {
    const { user, 
        password
    } = req.body;
    const response = await db.query(
        'SELECT * FROM senhas WHERE nome = $1',
        [user]
    );
    login = response.rows
    console.log(user)
    
    if(login[0]!=undefined){
        
        if(login[0].senha==password){
            resposta={'login' : "True"}
        }else{
            resposta={'login' : "False"}
        }
    }else{
        resposta={'login' : "False"}
    }

    res.status(200).send(resposta);
};

exports.listAllSenha =  async (req, res) => {
    const response = await db.query(
        'SELECT * FROM senhas ORDER BY nome ASC',
    );
    res.status(200).send(response.rows);
};

exports.updateSenha = async (req, res) => {
    const {senhaNome, 
            senhaSenha
            } = req.body;

    const response = await db.query(
        'UPDATE senhas SET senha = $2 WHERE nome = $1',
        [senhaNome, senhaSenha],
    );

    console.log(response)
    if(response.rowCount > 0) {
        res.status(201).send({
            message: 'Membro alterado com sucesso!',
            body: {
                membro: {senhaNome, senhaSenha},
            },
        });  
    }
    else {
        res.status(201).send({
            message: 'Membro não alterado',
            body: {
                membro: {senhaNome, senhaSenha},
            },
        });    
    }
    
}