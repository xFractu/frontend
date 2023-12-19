import React, { useState } from "react";
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";


function LoginForm(props){
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
        return response.data
    } catch(error){
        throw error
    }
}


const cambiosFormulario = (evento) => {
    //console.log(evento.target)
    const {name,value} = evento.target
    setDatosFormulario ({...datosFormulario, [name]: value})
}


    return(
        <div className="cuerpo">
        <div className="wrapper">
            <form action="">
                <h1>Inicio</h1>
                <div className="input-box">
                    <input type="text" placeholder="Correo" required onChange={cambiosFormulario} name="correo" value={datosFormulario.nombre}/>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Contraseña" required onChange={cambiosFormulario} name="password" value={datosFormulario.password}/>
                    <FaLock className="icon"/>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" />Recuerdame</label>
                    <a href="#">¿Contraseña olvidada?</a>
                </div>
                <button type="submit" onClick={hacerPeticion} disabled={Cargando}>Entrar</button>
                <div className="register-link">
                    <p>¿No tienes una cuenta? <a href="">Register </a></p>
                </div>
            </form>
        </div>
        </div>
    )

}

export default LoginForm;