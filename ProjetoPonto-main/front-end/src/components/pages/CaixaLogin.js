import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Col, Button } from 'react-bootstrap';
import MaskedFormControl from 'react-bootstrap-maskedinput'
import 'bootstrap/dist/css/bootstrap.min.css';

const CaixaLogin = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const [title, setTitle] = useState("Transitioning...");
    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [diaSemana, setDiaSemana] = useState('');
    const [entrada, setEntrada] = useState('');
    const [saida, setSaida] = useState('');
    const [user, setUser] = useState('');
    const [senha, setSenha] = useState('');


    const showModal = () => {
        setIsOpen(true);
    };

    const showCaixaNovamente = () => {
        props.showCaixaNovamente()
    }

    const hideModal = () => {
        setIsOpen(false);
        setTitle("Transitioning...");
        showCaixaNovamente()
    };

    const modalLoaded = () => {
        setTitle("Faça o Login");
    };

    const saveMembro = () => {
        if(user =="admin"&&senha=="admin"){
            hideModal()
        }
        
    }

    const handleUser = (e) => setUser(e.target.value)
    const handleSenha = (e) => setSenha(e.target.value)
    return (
        <>
            {/* <button onClick={showModal}>Display Modal</button> */}
            <Modal backdrop='static' keyboard={false} show={isOpen} onHide={hideModal} onEntered={modalLoaded}>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Label>Usuário</Form.Label> 
                <Form.Control
                        className="txtUser"
                        type="text"
                        value={user}
                        onChange={e => handleUser(e)} />
                     <Form.Label>Senha</Form.Label>                      
                    <Form.Control
                        className="txtSenha"
                        value={senha}
                        type="password"
                        onChange={e => handleSenha(e)} />
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ width: '150px', margin: '10px', float: 'left' }} 
                    variant="info" href="/ponto">Voltar ao ponto</Button>

                    <Button style={{ width: '90px', margin: '10px', float: 'left' }} 
                    variant="danger" onClick={saveMembro}>Login</Button>
                    
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CaixaLogin;