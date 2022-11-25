import React, { useState, useEffect } from 'react';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { Container, Col, Button } from 'react-bootstrap';
import MaskedFormControl from 'react-bootstrap-maskedinput'
//import AlertsAPI from './Mensagem'
import Alert from 'react-bootstrap/Alert';
import CaixaEntrada from './CaixaEntrada'
import TabelaMembros from './TabelaMembros'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import CaixaLogin from './CaixaLogin'
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

import 'bootstrap/dist/css/bootstrap.min.css';
const axios = require('axios')

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
}

function Membro(props) {
    const [id, setId] = useState(0)
    const [nome, setNome] = useState('')
    const [senha, setsenha] = useState('')
    const [diaSemana, setDiaSemana] = useState('')
    const [entrada, setEntrada] = useState('')
    const [saida, setSaida] = useState('')
    const [showMensagem, setShowMensagem] = useState(false)
    const [mensagem, setMensagem] = useState('')
    const [tipoMensagem, setTipoMensagem] = useState('')
    const [showCaixaEntrada, setShowCaixaEntrada] = useState(false)
    const [listaMembros, setListaMembros] = useState([])
    const [carregaVetor, setCarregaVetor] = useState(0)    
    const [membroData, setMembroData] = useState({})
    const [showCaixaLogin, setShowCaixaLogin] = useState(true)

    const handleNome = (e) => setNome(e.target.value)
    const handlesenha = (e) => setsenha(e.target.value)
    const handleDiaSemana = (e) => setDiaSemana(e.target.value)
    const handleEntrada = (e) => setEntrada(e.target.value)
    const handleSaida = (e) => setSaida(e.target.value)

    const showLoginNovamente = () => {
        setShowCaixaLogin(false)
    }



    useEffect(() => {
        console.log("Dentro da função useEffect. O valor atual do contador ");
        
        return () => {
            console.log("Dentro da função useEffect. O valor atual do contador ")
        }
    }, [showMensagem])

    useEffect(() => {
        async function getListaMembros() { 
            try {
                const data = await axios.get('http://localhost:3000/api/membros/');
                
                setListaMembros(data.data)
                
            }
            catch (error) {
                alert("Ocorreu um erro")
            }
        }
        console.log("Carregando os itens mudando")
        getListaMembros()
    },[])

    useEffect(() => {
        async function getItems() { 
            try {
                const data = await axios.get('http://localhost:3000/api/membros/');
                console.log(data.data)
                setListaMembros(data.data)
            }
            catch (error) {
                alert("Ocorreu um erro")
            }
        }
        console.log("Carregando os itens mudando vetor")
        getItems()
    },[carregaVetor])    


    const insereMembro = () => {
        let membroInserido = {}
        membroInserido =  {               
            senhaNome: nome,
            senhaSenha: senha
        }

        axios.post('http://localhost:3000/api/senhas', membroInserido, axiosConfig)
            .then((res) => {
                console.log("Resposta recebida: ", res);                                
                setNome("")
                setsenha("")
                setShowMensagem(true)
                setMensagem("User e senha inseridos com Sucesso!!")
                setTipoMensagem("success")
                setCarregaVetor(carregaVetor + 1)
            })
            .catch((err) => {
                console.log("Problema ao inserir o membro: ", err);
            })
    }
    const atualizaMembro = () => {
        let membroInserido = {}
        membroInserido =  {               
            senhaNome: nome,
            senhaSenha: senha
        }

        axios.put('http://localhost:3000/api/senhas', membroInserido, axiosConfig)
            .then((res) => {
                console.log("Resposta recebida: ", res);                                
                setNome("")
                setsenha("")
                setShowMensagem(true)
                setMensagem("User e senha modificados com Sucesso!!")
                setTipoMensagem("success")
                setCarregaVetor(carregaVetor + 1)
            })
            .catch((err) => {
                console.log("Problema ao inserir o membro: ", err);
            })
    }

    const carregaCampos = (id, nome, senha, diaSemana, entrada, saida) => {
        setNome(nome)
        setsenha(senha)
        setDiaSemana(diaSemana)
        setEntrada(entrada)
        setSaida(saida)
        setId(id)
        
        setMembroData(prevState => ({
            ...prevState,
            membroID: id, 
            membroNome: nome,
            membrosenha: senha,
            membroDiaSemana: diaSemana,
            membroEntrada: entrada,
            membroSaida: saida

        }))
        console.log("Peguei o ID")
        console.log(membroData)
    }

    const alteraMembro = (e) => {
        console.log("Esta chamando...")
        console.log(showCaixaEntrada)
        setShowCaixaEntrada(true)
        console.log(nome)
        console.log(membroData)
    }

    const removeMembro = (e) => {
        console.log("Removendo o Membro!!!")
        console.log(nome)
        console.log(id)
        axios.delete('http://localhost:3000/api/membros/' + String(id), axiosConfig)
            .then((res) => {
                console.log("Resposta recebida: ", res);                                
                setNome("")
                setsenha("")
                setDiaSemana("")
                setEntrada("")
                setSaida("")
                setShowMensagem(true)
                setMensagem("Membro removido com Sucesso!!")
                setTipoMensagem("success")
                setCarregaVetor(carregaVetor + 1)
            })
            .catch((err) => {
                console.log("Problema ao remover o membro: ", err);
                setShowMensagem(true)
                setMensagem("Problemas em remover o membro!!")
                setTipoMensagem("danger")
            })   

    }

    const showCaixaNovamente = () => {
        setShowCaixaEntrada(false)
    }

    const saveMembro = (id, nome, senha, diaSemana, entrada, saida) => {
        let membroAlterado = {}
        
        membroAlterado = {
            membroID: id,          
            membroNome: nome,
            membrosenha: senha,
            membroDiaSemana: diaSemana,
            membroEntrada: entrada,
            membroSaida: saida           
        }

        axios.put('http://localhost:3000/api/membros', membroAlterado, axiosConfig)
            .then((res) => {
                console.log("Resposta recebida: ", res);                                
                setNome("")
                setsenha("")
                setDiaSemana("")
                setEntrada("")
                setSaida("")
                setShowMensagem(true)
                setMensagem("Membro alterado com Sucesso!!")
                setTipoMensagem("success")
                setCarregaVetor(carregaVetor + 1)
            })
            .catch((err) => {
                console.log("Problema ao inserir o membro: ", err);
                setShowMensagem(true)
                setMensagem("Problemas em alterar o membro!!")
                setTipoMensagem("danger")
            })   
    }

    function debug(){
        console.log(listaMembros)
    }
    const BootstrapInput = withStyles((theme) => ({
        input: {
          borderRadius: 4,
          position: 'relative',
          backgroundColor: theme.palette.background.paper,
          border: '1px solid #ced4da',
          fontSize: 16,
          padding: '10px 20px 10px'
        },
      }))(InputBase);
      
      const useStyles = makeStyles((theme) => ({
        margin: {
          margin: theme.spacing(0),
          minWidth: 300
        },
      }));

      const classes = useStyles();
      const [age, setAge] = React.useState('');
      const handleChange = (event) => {
        setAge(event.target.value);
      };

    return (
        <Container style={{ marginTop: '50px' }}>
            <h1>Cadastro de Senhas</h1>
            <Form style={{ margin: '15px', width: '250px' }}>
            <Row className="g-2">
            <Col md>
                <Form.Label>Usuário</Form.Label>
                <Form.Control
                    className="txtNome"
                    value={nome}
                    onChange={e => handleNome(e)} />
            </Col>
            </Row>
            <Row className="g-2">
            <Col md>
                
                <Form.Label>Senha</Form.Label>
                <Form.Control className="txtsenha"
                    onChange={e => handlesenha(e)}
                    value={senha}
                    type="password"/>
            </Col>
            </Row>
            </Form>
            <br></br>
                <Button style={{ width: '150px', margin: '10px', float: 'left' }}
                    onClick={insereMembro}>Adicionar</Button>
                <Button variant="warning" style={{ width: '150px', margin: '10px', float: 'left' }}
                onClick={atualizaMembro}>Atualizar</Button>
            
            <br></br>
            <br></br>
            
            <br>
            </br>
            <br>
            </br>
            <Alert show={showMensagem} onClose={() => setShowMensagem(false)} variant={tipoMensagem} 
            closeLabel='Close Alert' dismissible fade="false">
                <Alert.Heading>{mensagem}</Alert.Heading>
            </Alert>
            {                
                showCaixaLogin && <CaixaLogin isOpen={showCaixaLogin}
                showCaixaNovamente={showLoginNovamente}
                />
            }

        </Container>
        

    )
}

export default Membro;