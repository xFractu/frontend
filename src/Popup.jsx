import React from 'react';
import './App.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { red } from '@mui/material/colors';
import { TextField, Box } from "@mui/material";

class Popup extends React.Component{
  state={
    abierto: false,
  }

  abrirModal=()=>{
    this.setState({abierto: !this.state.abierto});
  }

  render(){

    const modalStyles = {
      position: "absolute",
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '400px', // Ancho del modal
      maxHeight: '80%', // Altura máxima del modal
      overflowY: 'auto', // Habilitar desplazamiento vertical si el contenido es demasiado largo
      borderRadius: '40px', // Bordes redondeados
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Sombra
      backgroundColor: '#0f0ff', // Color de fondo

    };
    
    return(
      <>
      <div className="principal">
        <div className="secundario">
      <Button color="success" onClick={this.abrirModal}>Iniciar Sesion</Button>

      </div></div>

      <Modal isOpen={this.state.abierto} style={modalStyles}>
        <ModalHeader className='titulo'>
          Iniciar Sesión
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="usuario">Usuario</Label>
            <Input type="text" id="usuario"/> 
          </FormGroup>
          <FormGroup>
            <Label for="password">Contraseña</Label>
            <Input type="password" id="password"/> 
          </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button color="primary">Iniciar Sesión</Button>
            <Button color="secondary" onClick={this.abrirModal}>Cerrar</Button>
        </ModalFooter>
      </Modal>
      </>
    )
  }
}

export default Popup;