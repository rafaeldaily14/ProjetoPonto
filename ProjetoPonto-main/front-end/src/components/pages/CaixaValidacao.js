import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Col, Button } from 'react-bootstrap';
import MaskedFormControl from 'react-bootstrap-maskedinput'
import 'bootstrap/dist/css/bootstrap.min.css';

const CaixaValidacao = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const [title, setTitle] = useState("Transitioning...");
    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [diaSemana, setDiaSemana] = useState('');
    const [entrada, setEntrada] = useState('');
    const [saida, setSaida] = useState('');


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
        setTitle("Tem Certeza?");
    };

    const saveMembro = () => {
        props.saveMembro()
        hideModal()
    }
    return (
        <>
            {/* <button onClick={showModal}>Display Modal</button> */}
            <Modal show={isOpen} onHide={hideModal} onEntered={modalLoaded}>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Ao confirmar todos os dados das faltas serão perdidos 
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ width: '90px', margin: '10px', float: 'left' }} 
                    onClick={hideModal}>Cancelar</Button>

                    <Button style={{ width: '90px', margin: '10px', float: 'left' }} 
                    variant="danger" onClick={saveMembro}>Limpar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CaixaValidacao;