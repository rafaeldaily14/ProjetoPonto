/**
 * CRUD da tabela de Membros
 */

const db = require('../config/database');

exports.createMembro = async (req, res) => {
    const { membroNome, 
            membroCargo, 
            membroDiaSemana,
            membroEntrada,
            membroSaida
        } = req.body;
    const response = await db.query(
        'INSERT INTO membros (nome, cargo, diasemana, entrada, saida) VALUES ($1, $2, $3, $4, $5)',
        [membroNome, membroCargo, membroDiaSemana, membroEntrada, membroSaida],
    );

    res.status(201).send({
        message: 'Membro inserido com sucesso',
        body: {
            membro: {membroNome, membroCargo, membroDiaSemana, membroEntrada, membroSaida},
        },
    });
};

exports.listAllMembros =  async (req, res) => {
    const response = await db.query(
        'SELECT * FROM membros ORDER BY nome ASC',
    );
    res.status(200).send(response.rows);
};


exports.findMembroById = async (req, res) => {
    const membroId = parseInt(req.params.id);
    const response = await db.query(
        'SELECT * FROM membros WHERE membroid = $1',
        [membroId]
    );
    res.status(200).send(response.rows);
};

exports.updateMembro = async (req, res) => {
    const membroID = parseInt(req.body.membroID);
    const { membroNome, 
            membroCargo, 
            membroDiaSemana,
            membroEntrada,
            membroSaida} = req.body;

    const response = await db.query(
        'UPDATE membros SET nome = $2, cargo = $3, diasemana = $4, entrada = $5, saida = $6 WHERE membroid = $1',
        [membroID, membroNome, membroCargo, membroDiaSemana, membroEntrada,membroSaida],
    );
    
    console.log(response)
    if(response.rowCount > 0) {
        res.status(201).send({
            message: 'Membro alterado com sucesso!',
            body: {
                membro: {membroID, membroNome, membroCargo, membroDiaSemana, membroEntrada, membroSaida},
            },
        });  
    }
    else {
        res.status(201).send({
            message: 'Membro não alterado',
            body: {
                membro: {membroID, membroNome, membroCargo, membroDiaSemana, membroEntrada, membroSaida},
            },
        });    
    }
};

exports.removeMembroById = async (req, res) => {
    const membroID = parseInt(req.params.id);

    const response = await db.query(
        'DELETE FROM membros WHERE membroid = $1',
        [membroID],
    );
    
    console.log(response)
    if(response.rowCount > 0) {
        res.status(201).send({
            message: 'Membro removido com sucesso!',
            body: {
                membro: {membroID},
            },
        });  
    }
    else {
        res.status(201).send({
            message: 'Membro não removido',
            body: {
                membro: {membroID},
            },
        });    
    } 
}