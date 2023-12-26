import React, {useEffect, useState} from "react";
import axios from "axios";
import './reservaciones.css';

import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from "react-router-dom";


function Reservaciones() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);


  const redirectToHotelPage = () => {
    navigate("/frontend/");
  };

  const redirectToLogin = () => {
    navigate("/frontend/login");
  };

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

  const mostrarAlertaEliminarRes=(idReservacion,nombHotel)=>{
    swal({
      title: "Eliminar Reservacion",
      text: "Seguro que quieres eliminar la reservacion de una habitacion en el "+nombHotel+".",
      icon: "warning",
      buttons: ["No","Si"]
    }).then(respuesta=>{
      if(respuesta){
        swal({text: "Reservacion eliminada correctamente.",
        icon: "success"
      })
      eliminarReservacion(idReservacion,nombHotel);
      }
    })
  }

  const obtenerReservaciones = async () => {
    try {
      const response = await axios.post('http://localhost:4567/frontend/obtenerReservaciones');
      console.log("Reservaciones obtenidas:", response.data.reservaciones);
      // Almacena las reservaciones en el estado
      setReservas(response.data.reservaciones);
    } catch (error) {
      console.error("Error al obtener reservaciones:", error);
    }
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

    obtenerNombreUsuario();
    obtenerReservaciones();
  }, []);

  const [datosId, setDatosId] = useState("");

const eliminarReservacion = async (idReservacion) => {
  console.log(idReservacion);
  try {
    if (idReservacion) {
      const response = await axios.post('http://localhost:4567/frontend/eliminarReservacion', { datosId: { idReservacion } });
      console.log(response.data);
      // Lógica adicional si es necesario
      obtenerReservaciones();
    } else {
      console.log("El ID de la reservación es obligatorio para eliminar.");
      // Lógica adicional si es necesario
    }
  } catch (error) {
    throw error;
  }
};



  const generarReservaciones = () => {

    if(nombreUsuario==null){
      return (
          <h1 className="IniSesReserva">Inicia Sesion para poder ver tus reservaciones.</h1>
      );
    }else{

      if(reservas.length==0){
        return(
          
          <h1 className="ReservaNull">No tienes reservaciones en este momento.</h1>
        );

        
      }else{
        return (
          <div>
            {reservas.map(reserva => (
              <div key={reserva.id_reservacion} className="reservacion">
                <div className="reservaData">
                  <h3>{reserva.nombre_hotel}</h3>
                  <p>Precio de la reservación: {reserva.precio}</p>
                  <p>Check-In: {reserva.check_in}</p>
                  <p>Check-Out: {reserva.check_out}</p>
                  <p>Personas: {reserva.personas}</p>
                  <button className="eliminar-btn" onClick={() => mostrarAlertaEliminarRes(reserva.id_reservacion,reserva.nombre_hotel)}>
                    Eliminar Reservación
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      }


      
    }



    
  };

  return (
    <>
      <nav className="nav__fija">
        <div className="nav__logo">MCND</div>
        <ul className="nav__enlaces">
          <li className="enlace"><a href="#" onClick={redirectToHotelPage}>Inicio</a></li>
          <li className="enlace"><a href="#" >Reservaciones</a></li>
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

      {/* Nuevo contenedor para las reservaciones */}
      <div id="contenedor_reservaciones">
        {generarReservaciones()}

        {/* Agrega más reservaciones según sea necesario */}
      </div>
    </>
  );
}

export default Reservaciones;