import React, { useState } from 'react';
import { Button, Select, MenuItem, TextField, Box } from '@mui/material';
import './hotelStyle.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaSwimmingPool, FaWifi, FaParking, FaDumbbell, FaUtensils, FaTshirt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


function PaginaHotel4() {
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
    navigate("/inicio");
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
            <li className="enlace"><a href="#">Iniciar Sesion</a></li>
        </ul>
       </nav>

        <main>
          <div className="container-img-4">
        
          </div>
          <div className="container-info-hotel">
            <div className="container-hotel-nombre">
              <span>Hotel Gamma Acapulco Copacabana</span>
              <i className="fa-solid fa-angle-right"></i>
            </div>

            <div className="container-detalles-hotel">
              <label className='precio' >Precio: $2500</label>
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

            <div class="container-descripcion">
					<div class="title-descripcion">
						<h4>Descripción</h4>
						<i class="fa-solid fa-chevron-down"></i>
					</div>
					<div class="text-descripcion">
						<p>
						Con Gamma disfruta de una experiencia en cada momento, en cada espacio, en cada destino al que viajes.
            Descubre la esencia y la magia de la ciudad hospedándote en Gamma Acapulco Copacabana. 
            Esta ciudad que te muestra lo más encantador de México con su personalidad única y detalles regionales.
            Nuestro hotel en Acapulco Copacabana es calidez con sabor local. 
            Te fascinará vivir experiencias nuevas y auténticas en espacios mexicanos que resaltan la riqueza tradicional. 
            Alojarte en Gamma Acapulco Copacabana te permitirá conocer al detalle el destino, 
            ya que estamos ubicados en el centro de la Bahía de Acapulco en la Zona Dorada, a 25 minutos del aeropuerto internacional y 
            a minutos de la costera Miguel Alemán, muy cerca del Club Golf de Acapulco.
						</p>
					</div>
				</div>

                <div class="container-servicios">
					<div class="title-servicios">
						<h4>Servcios Principales</h4>
						<i class="fa-solid fa-chevron-down"></i>
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
                        <FaTshirt />
                        <p>Lavandería</p>
                    </div>
                    </div>
				</div>

          </div>
        </main>

      </form>
    </>
  );
}

export default PaginaHotel4;