import React, { useState } from "react";
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";


const LoginForm = () => {
    return(
        <div className="cuerpo">
        <div className="wrapper">
            <form action="">
                <h1>Inicio</h1>
                <div className="input-box">
                    <input type="text" placeholder="Correo" required />
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Contraseña" required />
                    <FaLock className="icon"/>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" />Recuerdame</label>
                    <a href="#">¿Contraseña olvidada?</a>
                </div>
                <button type="submit">Entrar</button>
                <div className="register-link">
                    <p>¿No tienes una cuenta? <a href="">Register </a></p>
                </div>
            </form>
        </div>
        </div>
    )
}

export default LoginForm;