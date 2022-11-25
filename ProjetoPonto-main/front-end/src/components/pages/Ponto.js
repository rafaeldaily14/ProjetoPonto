import React, { useState, useEffect } from 'react';
import { Form, Container, Col, Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import CaixaEntrada from './CaixaEntrada'
import TabelaMembros from './TabelaMembros'
import ListaMembros from './ListaMembros'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'

const axios = require('axios')

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
}

function Ponto(props) {

    const [showMensagem, setShowMensagem] = useState(false)
    const [mensagem, setMensagem] = useState('')
    const [tipoMensagem, setTipoMensagem] = useState('')
    const [listaMembros, setListaMembros] = useState([])
    const [nomes, setNomes] = useState([])
    const [dados, setDados] = useState("");
    const [id, setId] = useState(0)
    const [membroNome, setMembroNome] = useState("")
    const [membroEntrada, setMembroEntrada] = useState("XX:XX")
    const [membroSaida, setMembroSaida] = useState("XX:XX")
    const [membroSemana, setMembroSemana] = useState("")

    

    useEffect(() => {
        async function getListaMembros() { 
            try {
                const data = await axios.get('http://localhost:3000/api/membros/');
                console.log(data.data)
                setListaMembros(data.data)
            }
            catch (error) {
                alert("Ocorreu um erro")
            }
        }
        getListaMembros()
    },[])
    useEffect(() => {

        function getNomes() {
            let lista = [] 
            try {
                for(let i=0;i<listaMembros.length;i++){
                    lista.push(listaMembros[i].membroid+"  "+listaMembros[i].nome+" || "+listaMembros[i].diasemana+" : "+listaMembros[i].entrada+" - "+listaMembros[i].saida)
                }
                setNomes(lista)
            }
            catch (error) {
                alert("Ocorreu um erro")
            }
        }
        getNomes()
    },[listaMembros])


    const inserePontoEntrada = () => {
        let now = new Date()
        const dayName = new Array ("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado")
        let hojeSemana = dayName[now.getDay()]
        let hojeHora = parseInt(now.getHours())
        let hojeMes = parseInt(now.getMonth())+1
        hojeMes=hojeMes.toString()
        let hojeMinutos = parseInt(now.getMinutes())
        let parseHojeMinutos = hojeHora*60 + hojeMinutos
        let splitMembroEntrada
        let parseMembroMinutos
        if(membroEntrada!=undefined){
            splitMembroEntrada = membroEntrada.split(":")
            parseMembroMinutos = parseInt(splitMembroEntrada[0])*60 + parseInt(splitMembroEntrada[1])
        }

        if(hojeSemana==membroSemana){
            if(parseHojeMinutos<parseMembroMinutos-10){
                alert("Seu horário ainda não começou")
            }else if(parseHojeMinutos>parseMembroMinutos+10){
                alert("Você está atrasado! Justifique perante a equipe de Gestão de Pessoas")
            }else{
                alert(id)
                let pontoInserido = {}
                pontoInserido =  {              
                    pontoNome: membroNome,
                    pontoHora: now.getFullYear()+"-"+hojeMes+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"."+now.getMilliseconds(),
                    pontoTipo: "entrada",
                    pontoAtraso: 0,
                    membroID: id
                }

                alert(pontoInserido['pontoHora'])
        
                axios.post('http://localhost:3000/api/pontos', pontoInserido, axiosConfig)
                    .then((res) => {
                        console.log("Resposta recebida: ", res);                                
        
                    })
                    .catch((err) => {
                        console.log("Problema ao inserir o ponto: ", err);
                    })
            }
        }else{
            alert("Você não tem horário hoje!")
        }
    }

    const inserePontoSaida = () => {
        const now = new Date
        const dayName = new Array ("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado")
        let hojeSemana = dayName[now.getDay()]
        let hojeHora = parseInt(now.getHours())
        let hojeMes = parseInt(now.getMonth())+1
        hojeMes=hojeMes.toString()
        let hojeMinutos = parseInt(now.getMinutes())
        let parseHojeMinutos = hojeHora*60 + hojeMinutos
        let splitMembroSaida
        let parseMembroMinutos
        if(membroSaida!=undefined){
            splitMembroSaida = membroSaida.split(":")
            parseMembroMinutos = parseInt(splitMembroSaida[0])*60 + parseInt(splitMembroSaida[1])
        }

        if(hojeSemana==membroSemana){
            if(parseHojeMinutos<parseMembroMinutos-10){
                alert("Seu horário ainda não terminou!")
            }else if(parseHojeMinutos>parseMembroMinutos+10){
                alert("Você bateu o ponto de saída tarde demais!")
            }else{
                let pontoInserido = {}
                pontoInserido =  {              
                    pontoNome: membroNome,
                    pontoHora: now.getFullYear()+"-"+hojeMes+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"."+now.getMilliseconds(),
                    pontoTipo: "saida",
                    pontoAtraso: 0,
                    membroID: id
                }

                alert(pontoInserido['pontoHora'])
        
                axios.post('http://localhost:3000/api/pontos', pontoInserido, axiosConfig)
                    .then((res) => {
                        console.log("Resposta recebida: ", res);                                
        
                    })
                    .catch((err) => {
                        console.log("Problema ao inserir o ponto: ", err);
                    })
            }
        }else{
            alert("Você não tem horário hoje!")
        }
    }

    useEffect(() => {
        async function atualizaDados() { 
            const splitHora = dados.split("|")
            setMembroNome(splitHora[0])
            setMembroEntrada(splitHora[1])
            setMembroSaida(splitHora[2])
            setMembroSemana(splitHora[3])
            setId(splitHora[4])
        }
        atualizaDados()
    },[dados])
    
    return (
        <Container style={{ marginTop: '50px' }}>
            <h1> Sistema do Ponto</h1>

            

            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <div className='botaoPonto'>
            <Button style={{ width: '150px', margin: '10px', float: 'left' }} 
                onClick={inserePontoEntrada}>Bater Ponto de Entrada</Button>

            <Button variant="success" style={{ width: '150px', margin: '10px', float: 'left' }}
                onClick={inserePontoSaida}>Bater Ponto de Saída</Button>
            </div>
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
            <div className='listaPonto'>
            <select onChange={e => setDados(e.target.value)}>
                <option defaultValue>Selecione seu nome</option>
                
                {listaMembros.map(a => ( <option value={a.nome+"|"+a.entrada+"|"+a.saida+"|"+a.diasemana+"|"+a.membroid}> {a.nome} || {a.diasemana} : {a.entrada} - {a.saida}     </option>))}
            </select>
            </div>
            

            <Alert show={showMensagem} onClose={() => setShowMensagem(false)} variant={tipoMensagem} 
            closeLabel='Close Alert' dismissible fade="false">
                <Alert.Heading>{mensagem}</Alert.Heading>
            </Alert>
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
            <br>
            </br>



        </Container>

    )
}

export default Ponto;