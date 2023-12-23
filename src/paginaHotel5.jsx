import React, {useEffect, useState} from "react";
import { Button, Select, MenuItem, TextField, Box } from '@mui/material';
import axios from "axios";
import './hotelStyle.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaSwimmingPool, FaWifi, FaParking, FaDumbbell, FaUtensils, FaSpa } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


function PaginaHotel5() {
    const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const [reservationData, setReservationData] = useState({
    checkInDate: null,
    checkOutDate: null,
    quantity: 1,
  });

  const mostrarAlertaLogOut=()=>{
    swal({
      title: "Cerrar Sesion",
      text: "Seguro que quieres cerrar sesion",
      icon: "warning",
      buttons: ["No","Si"]
    }).then(respuesta=>{
      if(respuesta){
        swal({text: "Sesion cerrada correctamente. Adios "+nombreUsuario+"",
        icon: "success"
      })
      cerrarSesion();
      }
    })
  }

  const mostrarAlertaReservaFallida=()=>{
    swal({
      title: "Reservacion Fallida",
      text: "Introduce los datos corrrectamente para poder hacer la reservacion.",
      icon: "error",
      button: "Aceptar"

    });
  }

  const mostrarAlertaReservaFallidaLogin=()=>{
    swal({
      title: "Reservacion Fallida",
      text: "Inicia Sesion para poder hacer reservaciones.",
      icon: "error",
      button: "Aceptar"

    });
  }

  const mostrarAlertaReservaExitosa=()=>{
    swal({
      title: "Reservacion Exitosa",
      text: "Tu reservacion se ha realizado correctamente.",
      icon: "success",
      button: "Aceptar"

    });
  }
  
  const formatDate = (date) => {
    // Formatear la fecha en formato numérico (dd/MM/yyyy)
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [nombreUsuario, setNombreUsuario]=useState("");

  const obtenerNombreUsuario = async () => {
    try {
      // Realizar la llamada al backend para obtener el nombre del usuario
      const response = await axios.post('http://localhost:4567/frontend/obtenerUsuario');
      setNombreUsuario(response.data.nombre);
    } catch (error) {
      // Manejar el error según tus necesidades
      console.error("Error al obtener el nombre del usuario", error);
    }
  };

  const cerrarSesion = async () => {
    try {
      // Realizar la llamada al backend para obtener el nombre del usuario
      const response = await axios.post('http://localhost:4567/frontend/cerrarSesion');
      setNombreUsuario(response.data.nombre);
      obtenerNombreUsuario();
      redirectToHotelPage();
    } catch (error) {
      // Manejar el error según tus necesidades
      console.error("Error al obtener el nombre del usuario", error);
    }
  };

  useEffect(() => {
    // Llamar a la función al cargar la página
    obtenerNombreUsuario();
  }, []); 


  const hacerReservacion = async () => {
    try {
      // Verificar que la información requerida esté presente en reservationData

      if(nombreUsuario==null){
        mostrarAlertaReservaFallidaLogin();
        setCheckInDate(null);
        setCheckOutDate(null);
        setQuantity('1');

      }else{

        if (
          reservationData.checkInDate &&
          reservationData.checkOutDate &&
          reservationData.quantity
        ) {
          // Realizar la solicitud al backend utilizando axios u otra biblioteca de tu elección
          handleReserveClick();
          const response = await axios.post('http://localhost:4567/frontend/hacerReservacionHotel5', {
            reservationData
          });
    
          // Manejar la respuesta del backend según tus necesidades
          console.log(response.data);
          mostrarAlertaReservaExitosa();
          // Limpiar los datos después de hacer la reservación

        setCheckInDate(null);
        setCheckOutDate(null);
        setQuantity('1');

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
          mostrarAlertaReservaFallida();
          setCheckInDate(null);
          setCheckOutDate(null);
          setQuantity('1');
          setReservationData({
            checkInDate: null,
            checkOutDate: null,
            quantity: 1,
          });
          console.log("Falta información para hacer la reservación");
          // Puedes mostrar un mensaje al usuario, abrir una ventana emergente, etc.
          // abrirPopupRs();
    
          return;
        }

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

  const redirectToReservaciones = () => {
    // Redirige a la página del hotel cuando se hace clic en el botón
    navigate("/frontend/reservaciones");
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
      <nav className="nav__fija">
        <div className="nav__logo">MCND</div>
        <ul className="nav__enlaces">
            <li className="enlace"><a href="#" onClick={redirectToHotelPage}>Inicio</a></li>
            <li className="enlace"><a href="#" onClick={redirectToReservaciones}>Reservaciones</a></li>
            {nombreUsuario ? (
            <>
              <li className="enlace"><a href="#">{nombreUsuario}</a></li>
              <li className="enlace"><a href="#" onClick={mostrarAlertaLogOut}>Cerrar Sesión</a></li>
            </>
          ) : (
            <li className="enlace"><a href="#" onClick={redirectToLogin}>Iniciar Sesión</a></li>
          )
    }
        </ul>
       </nav>

        <main>
          <div className="container-img-5">
        
          </div>
          <div className="container-info-hotel">
            <div className="container-hotel-nombre">
              <span>Hotel Royal Solaris</span>
              <i className="fa-solid fa-angle-right"></i>
            </div>

            <div className="container-detalles-hotel">
              <label className='precio' >Precio: $4,370</label>
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
            Royal Solaris Cancun Resort Spa es un Cancun Todo Incluido frente al mar en Mexico diseñado para ser uno de los mejores resorts familiares en cancun. 
            Le ofrecemos paquetes Todo Incluido para familias, con una variedad de restaurantes internacionales de primera clase, cómodas suites con vista al mar Caribe, 
            bellezas naturales de clase mundial como en ningún otro lugar, así como la famosa hospitalidad mexicana y, un increíble equipo de entretenimiento, 
            somos el resort todo incluido perfecto para unas increíbles vacaciones familiares. 
            ¿Quieres volver a menudo para disfrutar de las playas del Caribe? Únete al Club Solaris Cancún y vive la experiencia VIP.
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
                        <FaSpa />
                        <p>Spa</p>
                    </div>
                    </div>
				</div>

          </div>
        </main>

      </form>
    </>
  );
}

export default PaginaHotel5;