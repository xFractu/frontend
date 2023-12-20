import React, { useState } from "react";
import './LoginForm.css';
import { FaUser, FaLock, FaHome } from "react-icons/fa";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function LoginForm(props){
    const navigate = useNavigate();
const  [Cargando, setCargando] = useState(false)
const [datosFormulario, setDatosFormulario] = useState(
    {correo: '',
    password: ''
})

const hacerPeticion = async () => {
    try{
        const response = await axios.post('http://localhost:4567/frontend/login',{datosFormulario})
        console.log(response.data)
        setId(response.data.id)
        abrirPopup()
        return response.data
    } catch(error){
        throw error
    }
}

const [id,setId]=useState('')

const [mostrarPopup, setMostrarPopup] = useState(false);
const abrirPopup = () => {
    setMostrarPopup(true);
};

const cambiosFormulario = (evento) => {
    //console.log(evento.target)
    const {name,value} = evento.target
    setDatosFormulario ({...datosFormulario, [name]: value})
}

const redirectToHome = () => {
    // Redirige a la página del hotel cuando se hace clic en el botón
    navigate("/frontend/");
  };

    return(
        <>
        <div className="cuerpo">
        <div className="wrapper">
            <form onSubmit={hacerPeticion}>

                <div className="boton1">
                    <button type="button" className="button first-button" onClick={redirectToHome}>
                    <span className="button-text"></span>
                    <FaHome />
                </button>
                </div>

                <h1>Inicio</h1>


                <div className="input-box">
                    <input type="text" placeholder="Correo" onChange={cambiosFormulario} name="correo" value={datosFormulario.nombre}/>
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
        
                <button className="Entrar" type="submit" disabled={Cargando}>Entrar</button>
                
                
                <div className="register-link">
                    <p>¿No tienes una cuenta? <a href="" onClick={redirectToHome}>Register </a></p>
                </div>
                <Box m={5}>
                    {mostrarPopup && <Popup id ={id} onClose={() => setMostrarPopup(false)} />}
                </Box>
            </form>
        </div>
        </div>
        </>
    )

}

export default LoginForm;