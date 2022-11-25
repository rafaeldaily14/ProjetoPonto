/**
 * CRUD da tabela de Faltas
 */

const db = require('../config/database');

exports.createFalta = async (req, res) => {
    const {
        faltaVerificacao
        } = req.body;
    const response = await db.query(
        'INSERT INTO faltas (verificacao) VALUES ($1)',
        [faltaVerificacao],
    );

    res.status(201).send({
        message: 'Ponto inserido com sucesso',
        body: {
            falta: {faltaVerificacao},
        },
    });
};

exports.ultimaVerificacao =  async (req, res) => {
    const response = await db.query(
        'SELECT * FROM faltas ORDER BY verificacao ASC',
    );
    res.status(200).send(response.rows);
};

exports.removeAllFaltas = async (req, res) => {
    const response1 = await db.query(
        'TRUNCATE TABLE faltas;',
    );
    const response2 = await db.query(
        'TRUNCATE TABLE pontos;',
    );
    res.status(200).send({message: 'Faltas removidas com sucesso'}); 
}

exports.listAllFaltas = async (req, res) => {
    
    const response1 = await db.query(
        'SELECT * FROM faltas ORDER BY verificacao ASC',
    );
    verificacoes = response1.rows
    const response2 = await db.query(
        'SELECT * FROM membros ORDER BY nome ASC',
    );
    listaMembros = response2.rows
    const response3 = await db.query(
        'SELECT * FROM pontos ORDER BY nome ASC',
    );
    listaPontos = response3.rows


    const dayName = new Array ("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado")
    const monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro")
    let ultimaVerificacao = new Date(verificacoes[0].verificacao) //Talvez tenha erro aqui
    var dateArray = getDates(ultimaVerificacao, new Date());
    let faltas = []
    let now = new Date()
    let hojeMes = parseInt(now.getMonth())+1
    hojeMes=hojeMes.toString()

    for(let i=0; i<dateArray.length;i++){
            
        for(let j=0; j<listaMembros.length;j++){
            if(listaMembros[j].diasemana==dayName[dateArray[i].getDay()]){
                var entrada=0
                var saida=0
                var tipo = ""
                
                for(let k=0; k<listaPontos.length;k++){
                    let horaPonto = new Date(listaPontos[k].hora)
                    let diaPonto = horaPonto.getFullYear()+"-"+horaPonto.getMonth()+"-"+  horaPonto.getDate()
                    let diaDateArray = dateArray[i].getFullYear()+"-"+dateArray[i].getMonth()+"-"+  dateArray[i].getDate()
                    if(diaPonto==diaDateArray && listaPontos[k].membroid==listaMembros[j].membroid){
                        
                        if(listaPontos[k].tipo=="entrada"){
                            entrada=1
                        }
                        if(listaPontos[k].tipo=="saida"){
                            saida=1
                        }
                    }

                }
                if(entrada==0||saida==0){
                    if(entrada==0&&saida==1){
                        tipo = "entrada"
                    }else if(entrada==1){
                        tipo = "saida"
                    }else{
                        tipo = "entrada e saida"
                    }
                    if(req.params.nome == "All"){
                        let dic ={}
                            dic = {
                                nome: listaMembros[j].nome,
                                dia : dateArray[i].getDate()+" de "+monName[dateArray[i].getMonth()]+" de "+dateArray[i].getFullYear(),
                                horario: listaMembros[j].entrada+"-"+listaMembros[j].saida,
                                tipo: tipo
                            }
                            faltas.push(dic)
                    }else{
                        if(listaMembros[j].nome==req.params.nome){
                            let dic ={}
                            dic = {
                                nome: listaMembros[j].nome,
                                dia : dateArray[i].getDate()+" de "+monName[dateArray[i].getMonth()]+" de "+dateArray[i].getFullYear(),
                                horario: listaMembros[j].entrada+"-"+listaMembros[j].saida,
                                tipo: tipo
                            }
                            faltas.push(dic)
                        }
                    }
                }
            }
        }
    }
    res.status(200).send(faltas); 
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}