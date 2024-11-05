import { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Radio, FormControlLabel } from '@mui/material';
import '../App.css';

function BuscarUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [cedulaBusqueda, setCedulaBusqueda] = useState('');
    const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);
    const [checked, setChecked] = useState(false); // Estado para el RadioButton

    useEffect(() => {
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
        setUsuarios(usuariosGuardados);
    }, []);

    const handleBusqueda = () => {
        const usuario = usuarios.find(user => user.numeroDocu === cedulaBusqueda);
        setUsuarioEncontrado(usuario || null);
    };

    return (
        <Box component="form" className="shadow-2xl">
            <Typography className="text-4xl">Buscar Usuario por Cédula</Typography>

            <TextField
                label="Número de Cédula"
                value={cedulaBusqueda}
                onChange={(e) => setCedulaBusqueda(e.target.value)}
                required
                className="MuiFormControl-root"
                sx={{ marginBottom: 2 }} // Espacio adicional entre el label y el botón
            />

            <Button 
                onClick={handleBusqueda} 
                variant="contained" 
                className="MuiButton-root"
                disabled={cedulaBusqueda.length === 0} // Deshabilitar el botón si no hay número de cédula
            >
                Buscar
            </Button>

            {/* Mostrar mensaje solo si la cédula tiene longitud adecuada y el usuario no es encontrado */}
            {cedulaBusqueda.length > 7 && usuarioEncontrado === null && (
                <Typography>Usuario no encontrado.</Typography>
            )}

            {usuarioEncontrado && (
                <Box sx={{ marginTop: 2 }}> {/* Espacio entre el botón y los resultados */}
                    <Typography>Usuario Encontrado:</Typography>
                    <Typography>Nombre: {usuarioEncontrado.nombre}</Typography>
                    <Typography>Tipo de Documento: {usuarioEncontrado.tipoDocu}</Typography>
                    <Typography>Cédula: {usuarioEncontrado.numeroDocu}</Typography>

                    {/* Radio button para realizar el checklist */}
                    <FormControlLabel
                        control={<Radio checked={checked} onChange={() => setChecked(!checked)} />}
                        label="Realizar Checklist"
                    />
                </Box>
            )}
        </Box>
    );
}

export default BuscarUsuario;
