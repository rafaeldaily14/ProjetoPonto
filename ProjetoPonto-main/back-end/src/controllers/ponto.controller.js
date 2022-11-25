/**
 * CRUD da tabela de Pontos
 */

 const db = require('../config/database');

 exports.createPonto = async (req, res) => {
     const { pontoNome, 
             pontoHora, 
             pontoTipo,
             pontoAtraso,
             membroID
         } = req.body;
     const response = await db.query(
         'INSERT INTO pontos (nome, hora, tipo, atraso,membroID) VALUES ($1, $2, $3, $4,$5)',
         [pontoNome, pontoHora, pontoTipo, pontoAtraso,membroID],
     );
 
     res.status(201).send({
         message: 'Ponto inserido com sucesso',
         body: {
             ponto: {pontoNome, pontoHora, pontoTipo, pontoAtraso,membroID},
         },
     });
 };

 exports.listAllPontos =  async (req, res) => {
    const response = await db.query(
        'SELECT * FROM pontos ORDER BY nome ASC',
    );
    res.status(200).send(response.rows);
};
 