import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Col ,Button} from 'react-bootstrap';
import MaskedFormControl from 'react-bootstrap-maskedinput'
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const CaixaEntrada = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const [title, setTitle] = useState("Transitioning...");
    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [diaSemana, setDiaSemana] = useState('');
    const [entrada, setEntrada] = useState('');
    const [saida, setSaida] = useState('');

    useEffect(() => {        
        setId(props.membroData.membroID)
        setNome(props.membroData.membroNome)
        setCargo(props.membroData.membroCargo)
        setDiaSemana(props.membroData.membroDiaSemana)
        setEntrada(props.membroData.membroEntrada)
        setSaida(props.membroData.membroSaida)
    }, [setIsOpen])


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
        setTitle("Atualizar Membro");
    };

    const saveMembro = () => {
        props.saveMembro(id, nome, cargo, diaSemana,entrada,saida)
        hideModal()
    }

    const handleNome = (e) => setNome(e.target.value)
    const handleCargo = (e) => setCargo(e.target.value)
    const handleDiaSemana = (e) => setDiaSemana(e.target.value)
    const handleEntrada = (e) => setEntrada(e.target.value)
    const handleSaida = (e) => setSaida(e.target.value)
    const handleId = (e) => setId(e.target.value)
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
          minWidth: 465
        },
      }));

      const classes = useStyles();
      const [age, setAge] = React.useState('');
      const handleChange = (event) => {
        setAge(event.target.value);
      };
    return (
        <>
            {/* <button onClick={showModal}>Display Modal</button> */}
            <Modal show={isOpen} onHide={hideModal} onEntered={modalLoaded}>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    <Form.Label>Id</Form.Label> 
                    <Form.Control
                        className="txtID"
                        value={id}
                        onChange={e => handleId(e)}
                        placeholder="Digite o id do membro" />
                    <Form.Label>Nome</Form.Label>            
                    <Form.Control
                        className="txtNome"
                        value={nome}
                        type="text"
                        onChange={e => handleNome(e)}
                        placeholder="Digite o nome" />
                    <Form.Label>Cargo</Form.Label>
                    <Form.Control 
                        className="txtCargo"
                        value={cargo}
                        type="text"
                        onChange={e => handleCargo(e)}
                        placeholder="Digite o cargo" />
                    <Form.Label>Dia da Semana</Form.Label>
                    <br></br>
                        <FormControl className={classes.margin}>
                            <Select
                            id="demo-customized-select"
                            value={diaSemana}
                            onChange={e => handleDiaSemana(e)}
                            input={<BootstrapInput />}
                            >
                            <MenuItem value={""}></MenuItem>
                            <MenuItem value={"segunda"}>Segunda</MenuItem>
                            <MenuItem value={"terça"}>Terça</MenuItem>
                            <MenuItem value={"quarta"}>Quarta</MenuItem>
                            <MenuItem value={"quinta"}>Quinta</MenuItem>
                            <MenuItem value={"sexta"}>Sexta</MenuItem>
                            <MenuItem value={"sábado"}>Sábado</MenuItem>
                            <MenuItem value={"domingo"}>Domingo</MenuItem>
                            </Select>
                        </FormControl>
                        <br></br>
                    <Form.Label>Entrada</Form.Label>
                    <MaskedFormControl type='text'
                            name='txtEntrada'
                            value={entrada}
                            onChange={e => handleEntrada(e)}
                            placeholder="00:00"
                            mask='11:11' />
                    <Form.Label>Saida</Form.Label>
                    <MaskedFormControl type='text'
                            name='txtSaida'
                            value={saida}
                            onChange={e => handleSaida(e)}
                            placeholder="00:00"
                            mask='11:11' />
                    

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" style={{ width: '150px', margin: '10px', float: 'left' }}
                    onClick={hideModal}>Cancel</Button>
                    <Button style={{ width: '150px', margin: '10px', float: 'left' }}
                    onClick={saveMembro}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CaixaEntrada;