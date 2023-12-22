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

  useEffect(() => {
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
              <button className="eliminar-btn" onClick={() => eliminarReservacion(reserva.id_reservacion)}>
                Eliminar Reservación
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <nav className="nav__fija">
        <div className="nav__logo">MCND</div>
        <ul className="nav__enlaces">
          <li className="enlace"><a href="#" onClick={redirectToHotelPage}>Inicio</a></li>
          <li className="enlace"><a href="#">Hoteles Populares</a></li>
          <li className="enlace"><a href="#" onClick={redirectToLogin}>Iniciar Sesion</a></li>
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