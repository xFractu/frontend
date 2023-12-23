import React, { useState } from "react";
import './RecuperarContra.css';
import { FaUser, FaLock, FaHome } from "react-icons/fa";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopupV from "./PopupLoginValido.jsx";
import PopupIv from "./PopupLoginInvalido.jsx";
import PopupActualizar from "./PopupActualizar";
import PopupActualizarInv from "./PopupActualizarInv.jsx";

function RecuperarContra(props) {
  const navigate = useNavigate();
  const [Cargando, setCargando] = useState(false);
  const [datosFormulario, setDatosFormulario] = useState({
    correo: '',
    password: ''
  });

  const mostrarAlertaCambioContraExitoso=()=>{
    swal({
      title: "Cambio de contraseña",
      text: "Credenciales actualizadas correctamenete",
      icon: "success",
      button: "Aceptar"

    }).then(respuesta=>{
        if(respuesta){
          redirectToLogin();
        }
        
    })
  }

  const mostrarAlertaCambioContraFallido=()=>{
    swal({
      title: "Correo no encontrado",
      text: "El correo que introdujo no existe o se escribio incorrectamente.",
      icon: "error",
      button: "Aceptar"

    });
  }

  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [desactivarCorreo, setDesactivarCorreo] = useState(false); 
  const [cambio, setCambio] = useState(0);

  const loginUsuario = async (evento) => {
    evento.preventDefault();

    if (cambio === 0) {
      try {
        const response = await axios.post('http://localhost:4567/frontend/RecuperarContra', { datosFormulario });
        console.log(response.data);

        if (response.data === 'Usuario encontrado') {
          console.log("Si se encontró");
          setMostrarContraseña(true);
          setDesactivarCorreo(true);
          setCambio(1);
        } else {
          console.log("No se encontró");
          mostrarAlertaCambioContraFallido();
        }

        return response.data;
      } catch (error) {
        throw error;
      }
    } else {
      try{
        const response = await axios.post('http://localhost:4567/frontend/ColocarContra2', { datosFormulario });
        console.log(response.data);
        console.log(datosFormulario);
        mostrarAlertaCambioContraExitoso();
      }catch(error){
        throw error;
      }
    }
  };
  const [nombre, setNombre] = useState('');


  const [mostrarPopupActualizarInv, setMostrarPopupActualizarInv]= useState(false);
  const abrirPopupActualizarInv = () =>{
    setMostrarPopupActualizarInv(true);
  };

  const [mostrarPopupVeri, setMostrarPopupVeri]= useState(false);
  const abrirPopupVeri = () =>{
    setMostrarPopupVeri(true);
  };

  const [mostrarPopupV, setMostrarPopupV] = useState(false);
  const abrirPopupV = () => {
    setMostrarPopupV(true);
  };

  const [mostrarPopupIv, setMostrarPopupIv] = useState(false);
  const abrirPopupIv = () => {
    setMostrarPopupIv(true);
  };

  const cambiosFormulario = (evento) => {
    const { name, value } = evento.target;
    setDatosFormulario({ ...datosFormulario, [name]: value });
    setMostrarPopupActualizarInv(false);
  };

  const redirectToHome = () => {
    navigate("/frontend/");
  };

  const redirectToLogin = () => {
    // Redirige a la página del hotel cuando se hace clic en el botón
    navigate("/frontend/login");
  };

  return (
    <>
      <div className="cuerpo">
        <div className="wrapper">
          <form>
            <div className="boton1">
              <button type="button" className="button first-button" onClick={redirectToHome}>
                <span className="button-text"></span>
                <FaHome />
              </button>
            </div>

            <h1>Recuperar Contraseña</h1>

            <label htmlFor="correo" className={`label-correo ${desactivarCorreo ? 'desactivado' : ''}`}>Ingrese su correo:</label>
            <div className={`input-box ${desactivarCorreo ? 'desactivado' : ''}`}>
              <input
                type="text"
                placeholder="Correo"
                onChange={cambiosFormulario}
                name="correo"
                value={datosFormulario.correo}
                disabled={desactivarCorreo}
              />
              <FaUser className="icon" />
            </div>

            {mostrarContraseña && (
              <div>
                <label htmlFor="contraseña" className="label-correo">Nueva contraseña:</label>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Contraseña"
                    onChange={cambiosFormulario}
                    name="password"
                    value={datosFormulario.password}
                  />
                  <FaLock className="icon" />
                </div>
              </div>
            )}

            <button className="Entrar" onClick={loginUsuario} disabled={Cargando}>
              Entrar
            </button>

            <Box m={5}>
              {mostrarPopupV && <PopupV nombre={nombre} onClose={() => setMostrarPopupV(false)} />}
            </Box>

            <Box m={5}>
              {mostrarPopupIv && <PopupIv nombre={nombre} onClose={() => setMostrarPopupIv(false)} />}
            </Box>

            <Box m={5}>
              {mostrarPopupVeri && <PopupActualizar nombre={nombre} onClose={() => setMostrarPopupVeri(false)} />}
            </Box>

            <Box m={5}>
              {mostrarPopupActualizarInv && <PopupActualizarInv nombre={nombre} onClose={() => setMostrarPopupActualizarInv(false)} />}
            </Box>

          </form>
        </div>
      </div>
    </>
  );
}

export default RecuperarContra;