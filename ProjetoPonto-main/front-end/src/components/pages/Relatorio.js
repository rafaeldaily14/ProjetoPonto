import React, { useState, useEffect } from 'react';
import { Form, Container, Col, Button } from 'react-bootstrap';
import CaixaValidacao from './CaixaValidacao'
import CaixaLogin from './CaixaLogin'
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';


const axios = require('axios')

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
}

function Relatorio(props) {

    const [listaFaltas, setListaFaltas] = useState([])
    const [ultima, setUltima] = useState()
    const [TabelaFaltas, setFaltas] = useState([])
    const [carregaVetor, setCarregaVetor] = useState(0)
    const [showCaixaEntrada, setShowCaixaEntrada] = useState(false)
    const [showCaixaLogin, setShowCaixaLogin] = useState(true)



    const alteraMembro = (e) => {
        setShowCaixaEntrada(true)
    }
    const showCaixaNovamente = () => {
        setShowCaixaEntrada(false)
    }
    const showLoginNovamente = () => {
        setShowCaixaLogin(false)
    }

    useEffect(() => {
        async function getListaFaltas() { 
            try {
                const data = await axios.get('http://localhost:3000/api/lastCheck/');
                setListaFaltas(data.data)
            }
            catch (error) {
                alert("Ocorreu um erro aqui")
            }
        }
        getListaFaltas()
    },[])

    async function getListaFaltas() { 
        try {
            const data = await axios.get('http://localhost:3000/api/lastCheck/');
            setListaFaltas(data.data)
        }
        catch (error) {
            alert("Ocorreu um erro aqui")
        }
    }
    
    useEffect(() => {
        function getUltima() { 
            try {
                const monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro")
                let data = new Date(listaFaltas[0].verificacao)
                setUltima(data.getDate()+" de "+monName[data.getMonth()]+" de "+data.getFullYear())
            }
            catch (error) {
            }
        }
        getUltima()
    },[listaFaltas])

    async function limpaFaltas() { 
        try {
            const data = await axios.delete('http://localhost:3000/api/faltas', axiosConfig);
            setCarregaVetor(carregaVetor + 1)
            let now = new Date()
            let hojeMes = parseInt(now.getMonth())+1
            hojeMes=hojeMes.toString()
            let faltaInserida = {}
            faltaInserida =  {               
                faltaVerificacao:  now.getFullYear()+"-"+hojeMes+"-"+now.getDate()+" "+"00"+":"+"00"+":"+"00"+"."+"000"
            }
            addFaltas(faltaInserida)
        }
        catch (error) {
            alert("Ocorreu um erro")
        }
    }

    async function addFaltas(dado) { 
        try {
            const data = await axios.post('http://localhost:3000/api/faltas', dado, axiosConfig)
            gerarRelatorio()
            getListaFaltas()
        }
        catch (error) {
            alert("Ocorreu um erro")
        }
    }

    // const teste = () => {
    //     let now = new Date()
    //     let hojeMes = parseInt(now.getMonth())+1
    //     hojeMes=hojeMes.toString()

    //     let faltaInserida = {}
    //     faltaInserida =  {               
    //         faltaVerificacao:  now.getFullYear()+"-"+hojeMes+"-"+"20"+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"."+now.getMilliseconds()
    //     }

    //     axios.post('http://localhost:3000/api/faltas', faltaInserida, axiosConfig)
    //         .then((res) => {
    //             setCarregaVetor(carregaVetor + 1)
    //         })
    //         .catch((err) => {
    //             console.log("Problema ao inserir o membro: ", err);
    //         })
    // }

    async function gerarRelatorio() { 
        try {
            const data = await axios.get('http://localhost:3000/api/faltas/All');
            setFaltas(data.data)
        }
        catch (error) {
            alert("Ocorreu um erro aqui")
        }
    }

    const columns = [{
        dataField: 'nome',
        text: 'Nome'
      },{
        dataField: 'dia',
        text: 'Dia'
      }, {
        dataField: 'horario',
        text: 'Horário'
      }, {
        dataField: 'tipo',
        text: 'Tipo'
      }];

    return (
        <Container style={{ marginTop: '50px' }}>
            <h1>Relatório de Faltas</h1>
            <br>
            </br>
            <br>
            </br>

            <Button style={{ width: '150px', margin: '10px', float: 'left' }} 
                onClick={gerarRelatorio}>Gerar Relatório</Button>

            <Button style={{ width: '150px', margin: '10px', float: 'left' }} 
               variant="danger" onClick={alteraMembro}>Limpar Faltas</Button>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            {                
                showCaixaEntrada && <CaixaValidacao isOpen={showCaixaEntrada}
                showCaixaNovamente={showCaixaNovamente} saveMembro={limpaFaltas}
                />
            }
            {                
                showCaixaLogin && <CaixaLogin isOpen={showCaixaLogin}
                showCaixaNovamente={showLoginNovamente}
                />
            }

            O relatório apresentará as faltas a partir do dia: <u>{ultima}</u>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
            <BootstrapTable keyField='nome' data={ TabelaFaltas } columns={ columns } />
            
            

            

        </Container>

    )
}

export default Relatorio;