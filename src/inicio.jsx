import React, {useEffect, useState} from "react";
import { TextField, Button, Box } from "@mui/material"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopupRegistro from "./PopupRegistro.jsx";
import PopupRegistroS from "./PopupRsindatos.jsx";


function Inicio(props){
    const navigate = useNavigate();
    const  [Cargando, setCargando] = useState(false)
    const [datosFormulario, setDatosFormulario] = useState(
        {correo: '',
        password: '',
        nombre: ''
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

    const mostrarAlertaRegistroFallido=()=>{
      swal({
        title: "Registro Fallido",
        text: "Introduzca los datos para poder registrarse.",
        icon: "error",
        button: "Aceptar"
  
      });
    }

    const mostrarAlertaRegistroExitoso=()=>{
      swal({
        title: "Registro Exitoso",
        text: "Usuario registrado correctamente.",
        icon: "success",
        button: "Aceptar"
  
      });
    }

    const mostrarAlertaCorreoExistente=()=>{
      //console.log(datosFormulario.correo);
      swal({
        title: "Registro Fallido",
        text: "El correo "+datosFormulario.correo+" ya ha sido registrado",
        icon: "error",
        button: "Aceptar"
  
      });
    }

    const [nombreUsuario, setNombreUsuario]=useState("");

    const cerrarSesion = async () => {
      try {
        // Realizar la llamada al backend para obtener el nombre del usuario
        const response = await axios.post('http://localhost:4567/frontend/cerrarSesion', { datosFormulario });
        setNombreUsuario(response.data.nombre);
        console.log(nombreUsuario);
        obtenerNombreUsuario();
        //mostrarAlertaLogOut();
      } catch (error) {
        // Manejar el error según tus necesidades
        console.error("Error al obtener el nombre del usuario", error);
      }
    };

    const obtenerNombreUsuario = async () => {
      try {
        // Realizar la llamada al backend para obtener el nombre del usuario
        const response = await axios.post('http://localhost:4567/frontend/obtenerUsuario', { datosFormulario });
        setNombreUsuario(response.data.nombre);
        console.log(nombreUsuario);
      } catch (error) {
        // Manejar el error según tus necesidades
        console.error("Error al obtener el nombre del usuario", error);
      }
    };

    useEffect(() => {
      // Llamar a la función al cargar la página
      obtenerNombreUsuario();
    }, []); 
    
    // El segundo argumento [] indica que este efecto se ejecutará solo una vez al montar el componente
  
    

    const registrarUsuario = async () => {
      try{
        if(datosFormulario.correo && datosFormulario.password && datosFormulario.nombre) {

          const response2 = await axios.post('http://localhost:4567/frontend/correoExiste',{datosFormulario})
          console.log(response2.data);
          const res = response2.data;
          console.log("res: "+res);

          // Verificar si el correo existe
          if (res.correoExistente) {
            // Hacer algo si el correo existe
            mostrarAlertaCorreoExistente();
            setDatosFormulario({
              correo: '',
              password: '',
              nombre: ''
          });
        } else {
            // Hacer algo si el correo no existe
            
            const response = await axios.post('http://localhost:4567/frontend/',{datosFormulario})
            console.log(response.data)
            mostrarAlertaRegistroExitoso();
            setDatosFormulario({
              correo: '',
              password: '',
              nombre: ''
          });
            return response.data


        }
          
        }else{

          console.log("si entro");
          mostrarAlertaRegistroFallido();
          setDatosFormulario({
            correo: '',
            password: '',
            nombre: ''
        });
          
          return;
        }

          
      } catch(error){
          throw error
      }
  }



  const [mostrarPopupR, setMostrarPopupR] = useState(false);
  const abrirPopupR = () => {
    setMostrarPopupR(true);
  };

  const [mostrarPopupRs, setMostrarPopupRs] = useState(false);
  const abrirPopupRs = () => {
    setMostrarPopupRs(true);
  };

  const cambiosFormulario = (evento) => {
    //console.log(evento.target)
    const {name,value} = evento.target
    setDatosFormulario ({...datosFormulario, [name]: value})
    setMostrarPopupR(false);

}

    const handleLinkClick = (event, targetId) => {
      event.preventDefault();
      const targetElement = document.getElementById(targetId);
  
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    };

    const redirectToHotelPage1 = () => {
      // Redirige a la página del hotel cuando se hace clic en el botón
      navigate("/frontend/paginaHotel1");
    };

    const redirectToHotelPage2 = () => {
      // Redirige a la página del hotel cuando se hace clic en el botón
      navigate("/frontend/paginaHotel2");
    };

    const redirectToHotelPage3 = () => {
      // Redirige a la página del hotel cuando se hace clic en el botón
      navigate("/frontend/paginaHotel3");
    };

    const redirectToHotelPage4 = () => {
      // Redirige a la página del hotel cuando se hace clic en el botón
      navigate("/frontend/paginaHotel4");
    };

    const redirectToHotelPage5 = () => {
      // Redirige a la página del hotel cuando se hace clic en el botón
      navigate("/frontend/paginaHotel5");
    };

    const redirectToHotelPage6 = () => {
      // Redirige a la página del hotel cuando se hace clic en el botón
      navigate("/frontend/paginaHotel6");
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
<nav className="nav__fija">
  <div className="nav__logo">MCND</div>
  <ul className="nav__enlaces">
    <li className="enlace"><a href="#">Inicio</a></li>
    <li className="enlace"><a href="#" onClick={(e) => handleLinkClick(e, "hotelesPopulares")}>Hoteles Populares</a></li>
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
<header className="seccion__contenedor encabezado__contenedor" id="inicio">
  <div className="contenedor__imagen__encabezado">
    <div className="contenido__encabezado">
      <h1>Disfruta de tus Vacaciones Soñadas</h1>
      <p>Reserva Hoteles, Vuelos y paquetes de estadía al precio más bajo.</p>
      <h2>Registrate Ahora</h2>
    </div>
    <div className="contenedor__reserva">
      <form>
        <div className="grupo__formulario">
          <div className="grupo__entrada">
            <input type="text" onChange={cambiosFormulario} name="correo" value={datosFormulario.correo}/>
            <label>Correo:</label>
          </div>
          <p>ejemplo@ejemplo.com</p>
        </div>
        <div className="grupo__formulario">
          <div className="grupo__entrada">
            <input type="password" onChange={cambiosFormulario} name="password" value={datosFormulario.password}/>
            <label>Contraseña: </label>
          </div>
          <p>8 caracteres</p>
        </div>
        <div className="grupo__formulario">
          <div className="grupo__entrada">
            <input type="text" onChange={cambiosFormulario} name="nombre" value={datosFormulario.nombre}/>
            <label>Nombre:</label>
          </div>
          <p>Completo</p>
        </div>

      </form>
      <button className="btn" onClick={registrarUsuario} disabled={Cargando}><i className="ri-search-line">Registrarse</i></button>
    </div>
  </div>
  <Box m={5}>
                    {mostrarPopupRs && <PopupRegistroS onClose={() => setMostrarPopupRs(false)} />}
      </Box>
  <Box m={5}>
                    {mostrarPopupR && <PopupRegistro onClose={() => setMostrarPopupR(false)} />}
      </Box>

      
</header>
<section className="seccion__contenedor_contenedor__populares" id="hotelesPopulares">
  <h2 className="encabezado__seccion">Hoteles Populares</h2>
  <div className="grid__populares">
    {/* Estructura para hoteles */}

    <div className="tarjeta__popular">
      <div className="imagen-hotel-1" alt="hotel popular" />
      <div className="contenido__popular">
        <div className="encabezado__tarjeta__popular">
          <h4>Holiday Inn Express</h4>
          <h4>$1,600</h4>
        </div>
        <div className="info">
          <p>Veracruz, México</p>
          <button className="btn__info" onClick={redirectToHotelPage1}>Más Información</button>
        </div>
      </div>
    </div>

    {/* Estructura para hoteles */}
    <div className="tarjeta__popular">
    <div className="imagen-hotel-6" alt="hotel popular" />
      <div className="contenido__popular">
        <div className="encabezado__tarjeta__popular">
          <h4>Hotel Flamingo Vallarta</h4>
          <h4>$2,300</h4>
        </div>
        <div className="info">
          <p>Jalisco, México</p>
          <button className="btn__info" onClick={redirectToHotelPage2} >Más Información</button>
        </div>
      </div>
    </div>

    {/* Estructura para hoteles */}
    <div className="tarjeta__popular">
    <div className="imagen-hotel-3" alt="hotel popular" />
      <div className="contenido__popular">
        <div className="encabezado__tarjeta__popular">
          <h4>Hotel Esperanza</h4>
          <h4>$4,000</h4>
        </div>
        <div className="info">
          <p>Baja California Sur, México</p>
          <button className="btn__info" onClick={redirectToHotelPage3}>Más Información</button>
        </div>
      </div>
    </div>

    {/* Estructura para hoteles */}
    <div className="tarjeta__popular">
    <div className="imagen-hotel-4" alt="hotel popular" />
      <div className="contenido__popular">
        <div className="encabezado__tarjeta__popular">
          <h4>Hotel Gamma Acapulco</h4>
          <h4>$2,500</h4>
        </div>
        <div className="info">
          <p>Guerrero, México</p>
          <button className="btn__info"  onClick={redirectToHotelPage4}>Más Información</button>
        </div>
      </div>
    </div>

    {/* Estructura para hoteles */}
    <div className="tarjeta__popular">
    <div className="imagen-hotel-5" alt="hotel popular" />
      <div className="contenido__popular">
        <div className="encabezado__tarjeta__popular">
          <h4>Hotel Royal Solaris</h4>
          <h4>$4,370</h4>
        </div>
        <div className="info">
          <p>Quintana Roo, México</p>
          <button className="btn__info" onClick={redirectToHotelPage5}>Más Información</button>
        </div>
      </div>
    </div>

    {/* Estructura para hoteles */}
    <div className="tarjeta__popular">
    <div className="imagen-hotel-6" alt="hotel popular" />
      <div className="contenido__popular">
        <div className="encabezado__tarjeta__popular">
          <h4>Hotel GR Caribe</h4>
          <h4>$4,200</h4>
        </div>
        <div className="info">
        <p>Quintana Roo, México</p>
        <button className="btn__info" onClick={redirectToHotelPage6}>Más Información</button>
        </div>
      </div>
    </div>
    
  </div>
</section>

<section className="secc_espacio">
  <div className = "espacio">
            <h1>Hola</h1>

  </div>
</section>


<footer className="pie__pagina">
  <div className="seccion__contenedor contenedor__pie__pagina">
    <div className="columna__pie">
      <h3>MCND Hoteles</h3>
      <p>
        MCND es un sitio web líder en reservas de hoteles que ofrece una forma sencilla y conveniente de encontrar y reservar alojamientos en todo el mundo.
      </p>
      <p>
        Con una interfaz fácil de usar y una amplia selección de hoteles, WDM&Co busca proporcionar una experiencia sin estrés para los viajeros que buscan la estadía perfecta.
      </p>
    </div>
  </div>
</footer>
        </>
      )
}

export default Inicio