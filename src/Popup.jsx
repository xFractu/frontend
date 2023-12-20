import { Button } from "@mui/base"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState } from "react"

function Popup ({id}){
    const[open,setOpen] = useState(true);

    const eventoAbrir = () => {
        setOpen(true)
    }

    const eventoCerrar = () => {
        setOpen(false)
    }
    return(
        <>
  
        <div>
            <Button variant="outlined" onClick={eventoAbrir}>Mostrar Pupop</Button>
            <Dialog open={open} onClose={eventoCerrar}>
            <DialogTitle>Ejemplo diálogo</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    El ID del usuario es: {id}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={eventoCerrar}>Cerrar</Button>
            </DialogActions>
            </Dialog>
        </div>
        </>
    )
}

export default Popup