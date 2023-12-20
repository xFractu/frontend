import React, { useState } from 'react';
import { Button, Select, MenuItem, TextField, Box } from '@mui/material';
import './hotelStyle.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaSwimmingPool, FaWifi, FaParking, FaDumbbell, FaUtensils, FaUmbrellaBeach } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


function PaginaHotel3() {
    const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

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
          <div className="container-img-3">
        
          </div>
          <div className="container-info-hotel">
            <div className="container-hotel-nombre">
              <span>Hotel Esperanza</span>
              <i className="fa-solid fa-angle-right"></i>
            </div>

            <div className="container-detalles-hotel">
              <label className='precio' >Precio: $4,000</label>
              <div className="form-group">
                
                <label >Check-in</label>
                    <DatePicker className='dateIn'
                    selected={checkInDate}
                    onChange={(date) => setCheckInDate(date)}
                    minDate={today}
                    dateFormat="dd/MM/yyyy"
                    />
              </div>
              <div className="form-group">
                <label >Check-out</label>
                    <DatePicker className='dateOut'
                    selected={checkOutDate}
                    onChange={(date) => setCheckOutDate(date)}
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
                  onChange={(e) => setQuantity(e.target.value)}
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
              <Button variant="contained" color="primary" className="btn-reservar">
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
            Esperanza - An Auberge Hotel es una fantástica base desde la que conocer numerosas atracciones de Cabo San Lucas, 
            como Iglesia de San Lucas, que es un lugar histórico popular. 
						Las habitaciones de Esperanza - An Auberge Hotel incluyen televisor de pantalla plana, minibar y aire acondicionado 
            para una comodidad mucho mayor, y los huéspedes pueden permanecer conectados con wifi gratuito.
            ¡Disfruta de tu estancia en Cabo San Lucas!
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
                        <p>Alberca</p>
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
                        <FaUmbrellaBeach />
                        <p>Playa </p>
                    </div>
                    </div>
				</div>

          </div>
        </main>

      </form>
    </>
  );
}

export default PaginaHotel3;