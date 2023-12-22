import React, { useState } from 'react';
import { Button, Select, MenuItem, TextField, Box } from '@mui/material';
import axios from "axios";
import './hotelStyle.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaSwimmingPool, FaWifi, FaParking, FaDumbbell, FaUtensils, FaTshirt, FaAccessibleIcon } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


function PaginaHotel1() {
    const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const [reservationData, setReservationData] = useState({
    checkInDate: null,
    checkOutDate: null,
    quantity: 1,
  });
  
  const formatDate = (date) => {
    // Formatear la fecha en formato numérico (dd/MM/yyyy)
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const hacerReservacion = async () => {
    try {
      // Verificar que la información requerida esté presente en reservationData
      if (
        reservationData.checkInDate &&
        reservationData.checkOutDate &&
        reservationData.quantity
      ) {
        // Realizar la solicitud al backend utilizando axios u otra biblioteca de tu elección
        handleReserveClick();
        const response = await axios.post('http://localhost:4567/frontend/hacerReservacionHotel1', {
          reservationData
        });
  
        // Manejar la respuesta del backend según tus necesidades
        console.log(response.data);
        
        // Limpiar los datos después de hacer la reservación
        setReservationData({
          checkInDate: null,
          checkOutDate: null,
          quantity: 1,
        });
  
        // Puedes realizar otras acciones después de una reservación exitosa
        // abrirPopupR();
  
        return response.data;
      } else {
        // Manejar el caso en el que falta información
        console.log("Falta información para hacer la reservación");
        // Puedes mostrar un mensaje al usuario, abrir una ventana emergente, etc.
        // abrirPopupRs();
  
        return;
      }
    } catch (error) {
      // Manejar errores de la solicitud al backend
      console.error("Error al hacer la reservación", error);
      throw error;
    }
  };


  const today = new Date();

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    setReservationData((prevData) => ({ ...prevData, checkInDate: formatDate(date) }));
  };
  
  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
    setReservationData((prevData) => ({ ...prevData, checkOutDate: formatDate(date) }));
  };
  
  const handleQuantityChange = (value) => {
    setQuantity(value);
    setReservationData((prevData) => ({ ...prevData, quantity: value }));
  };
  const [showReservationDetails, setShowReservationDetails] = useState(false);

const handleReserveClick = () => {

  console.log('Reserva realizada:', reservationData);
  console.log('Check-in:', checkInDate);
  console.log('Check-out:', checkOutDate);
  console.log('Cantidad de Personas:', quantity);
  setShowReservationDetails(true);
};

  const redirectToHotelPage = () => {
    // Redirige a la página del hotel cuando se hace clic en el botón
    navigate("/frontend/");
  };

  const redirectToLogin = () => {
    // Redirige a la página del hotel cuando se hace clic en el botón
    navigate("/frontend/login");
  };


  return (
    <>
      <form onSubmit={handleFormSubmit}>
      <nav className="nav__fija">
        <div className="nav__logo">MCND</div>
        <ul className="nav__enlaces">
            <li className="enlace"><a href="#" onClick={redirectToHotelPage}>Inicio</a></li>
            <li className="enlace"><a href="#" onClick={(e) => handleLinkClick(e, "hotelesPopulares")}>Hoteles Populares</a></li>
            <li className="enlace"><a href="#">Blog</a></li>
            <li className="enlace"><a href="#" onClick={redirectToLogin}>Iniciar Sesion</a></li>
        </ul>
       </nav>

        <main>
          <div className="container-img-1">
        
          </div>
          <div className="container-info-hotel">
            <div className="container-hotel-nombre">
              <span>Holiday Inn Express</span>
              <i className="fa-solid fa-angle-right"></i>
            </div>

            <div className="container-detalles-hotel">
              <label className='precio' >Precio: $1,600</label>
              <div className="form-group">
                
                <label >Check-in</label>
                    <DatePicker className='dateIn'
                    selected={checkInDate}
                    onChange={(date) => handleCheckInDateChange(date)}
                    minDate={today} 
                    dateFormat="dd/MM/yyyy"
                    />
              </div>
              <div className="form-group">
                <label >Check-out</label>
                    <DatePicker className='dateOut'
                    selected={checkOutDate}
                    onChange={(date) => handleCheckOutDateChange(date)}
                    minDate={checkInDate || today}
                    dateFormat="dd/MM/yyyy"
                    />
              </div>
            </div>

            <div className="container-add-reservacion">
              <div className="container-cantidad-personas">
              <label>Personas </label>
                <TextField
                  type="number"
                  placeholder="1"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  InputProps={{ inputProps: { min: 1 } }}
                  className="input-cantidad"
                />
                <div className="btn-increment-decrement">
                  <i
                    className="fa-solid fa-chevron-up"
                    id="increment"
                    onClick={handleIncrement}
                  ></i>
                  <i
                    className="fa-solid fa-chevron-down"
                    id="decrement"
                    onClick={handleDecrement}
                  ></i>
                </div>
              </div>
              <Button variant="contained" color="primary" onClick={hacerReservacion} className="btn-reservar">
                Reservar Habitación
              </Button>
            </div>

            <div className="container-descripcion">
					<div className="title-descripcion">
						<h4>Descripción</h4>
						<i className="fa-solid fa-chevron-down"></i>
					</div>
					<div className="text-descripcion">
						<p>
              El Holiday Inn Veracruz-Boca Del Rio se encuentra a menos 
              de 1 km de la playa de Boca Del Rio y cuenta con piscina 
              cubierta y piscina al aire libre. 
              El restaurante Las Ventanas ofrece vistas al golfo de México.
              Todas las habitaciones del Veracruz-Boca Del Rio presentan 
              una decoración sencilla con suelo de baldosa. TV por cable 
              y baño privado.
              El establecimiento sirve un desayuno buffet y una selección 
              de platos mexicanos e internacionales para la cena.
						</p>
					</div>
				</div>

                <div className="container-servicios">
					<div className="title-servicios">
						<h4>Servcios Principales</h4>
						<i className="fa-solid fa-chevron-down"></i>
					</div>
					<div className="icon-servicios">
                    <div>
                        <FaSwimmingPool />
                        <p> 2 Albercas</p>
                    </div>
                    <div>
                        <FaWifi />
                        <p>Wifi Gratis</p>
                    </div>
                    <div>
                        <FaParking />
                        <p>Estacionamiento Gratuito</p>
                    </div>
                    <div>
                        <FaDumbbell />
                        <p>Gimnasio</p>
                    </div>
                    <div>
                        <FaUtensils />
                        <p>Restaurante</p>
                    </div>
                    <div>
                        <FaAccessibleIcon />
                        <p>Adaptado para personas con movilidad reducida</p>
                    </div>
                    </div>
				</div>

          </div>
        </main>

      </form>
    </>
  );
}

export default PaginaHotel1;