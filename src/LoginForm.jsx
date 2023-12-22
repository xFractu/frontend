import React, { useState } from "react";
import './LoginForm.css';
import { FaUser, FaLock, FaHome } from "react-icons/fa";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopupV from "./PopupLoginValido.jsx";
import PopupIv from "./PopupLoginInvalido.jsx";



function LoginForm(props){
    const navigate = useNavigate();
const  [Cargando, setCargando] = useState(false)
const [datosFormulario, setDatosFormulario] = useState(
    {correo: '',
    password: ''
})

const loginUsuario = async (evento) => {
    evento.preventDefault();
    try{
        const response = await axios.post('http://localhost:4567/frontend/login',{datosFormulario})
        console.log(response.data)
        if (response.data === 'Invalido') {
            // Si la respuesta es 'Invalido', limpiar los campos del formulario
            abrirPopupIv()
            setDatosFormulario({
                correo: '',
                password: ''
            });

            

        } else {

            // Si la respuesta es 'Valido', puedes realizar las acciones deseadas
            setNombre(response.data.nombre)
            abrirPopupV()
            
        }




        return response.data
    } catch(error){
        throw error
    }
}

const [nombre,setNombre]=useState('')

const [mostrarPopupV, setMostrarPopupV] = useState(false);
const abrirPopupV = () => {
    setMostrarPopupV(true);
};

const [mostrarPopupIv, setMostrarPopupIv] = useState(false);
const abrirPopupIv = () => {
    setMostrarPopupIv(true);
};

const cambiosFormulario = (evento) => {
    //console.log(evento.target)
    const {name,value} = evento.target
    setDatosFormulario ({...datosFormulario, [name]: value})

    setMostrarPopupIv(false);
}

const redirectToHome = () => {
    // Redirige a la página del hotel cuando se hace clic en el botón
    navigate("/frontend/");
  };

    return(
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

                <h1>Inicio</h1>


                <div className="input-box">
                    <input type="text" placeholder="Correo" onChange={cambiosFormulario} name="correo" value={datosFormulario.correo}/>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Contraseña" onChange={cambiosFormulario} name="password" value={datosFormulario.password}/>
                    <FaLock className="icon"/>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" />Recuerdame</label>
                    <a href="#">¿Contraseña olvidada?</a>
                </div>
        
                <button className="Entrar" onClick={loginUsuario} disabled={Cargando}>Entrar</button>
                
                
                <div className="register-link">
                    <p>¿No tienes una cuenta? <a href="" onClick={redirectToHome}>Register </a></p>
                </div>
                <Box m={5}>
                    {mostrarPopupV && <PopupV nombre ={nombre} onClose={() => setMostrarPopupV(false)} />}
                </Box>
                <Box m={5}>
                    {mostrarPopupIv && <PopupIv nombre ={nombre} onClose={() => setMostrarPopupIv(false)} />}
                </Box>
            </form>
        </div>
        </div>
        </>
    )

}

export default LoginForm;