import { Button } from "@mui/base"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState } from "react"

function Popup ({nombre}){
    const[open,setOpen] = useState(true);

    const redirectToHome = () => {
        // Redirige a la página del hotel cuando se hace clic en el botón
        navigate("/frontend/");
      };

    const eventoAbrir = () => {
        setOpen(true)
    }


    const eventoCerrar = () => {
        setOpen(false)
        window.location.reload();
    }
    return(
        <>
  
        <div>
            <Dialog open={open} onClose={eventoCerrar}>
            <DialogTitle>Error al Iniciar Sesion</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Correo o contraseña incorrecta.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button className="cerrar" onClick={eventoCerrar}>Cerrar</Button>
            </DialogActions>
            </Dialog>
        </div>
        </>
    )
}

export default Popup