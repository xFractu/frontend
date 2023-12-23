import { Button } from "@mui/base"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState } from "react"

function PopupActualizarInv ({nombre}){
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
    }
    return(
        <>
  
        <div>
            <Dialog open={open} onClose={eventoCerrar}>
            <DialogTitle>Correo no encontrado</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    El correo que introdujo no existe o no se encuentra.
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

export default PopupActualizarInv