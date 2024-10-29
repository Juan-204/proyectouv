import { Typography, Box, TextField, Select, MenuItem, InputLabel, FormControl, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'));
    if(usuariosGuardados) {
      setUsuarios(usuariosGuardados)
    }
  }, [])

  const manejoForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)

    const nuevosUsuario = {
      nombre: formData.get('nombre'),
      tipoDocu : formData.get('Tipo_Documento'),
      numeroDocu: formData.get('Numero_Docu'),
      TipoAsis: formData.get('Tipo_Asis')
    };

    const nuevosUsuarios = [...usuarios, nuevosUsuario]

    setUsuarios(nuevosUsuarios);
    localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios))

    e.target.reset()
  }

  return (
    <>
        <Box
        class='shadow-2xl rounded-2xl flex flex-col'
        component='form'
        onSubmit={manejoForm}>
          <Typography class='text-4xl'>Asistencia Eventos Univalle</Typography>
          
          <FormControl 
          sx={{
            margin: '10px'
          }}>
            <TextField label='Nombre Completo' name="nombre"/>
          </FormControl>
          
          <FormControl
          sx={{
            margin: '10px',
            textAlign: 'start'
          }}
          >
            <InputLabel id='TipoDocu'>Tipo de documento</InputLabel>
            <Select
            labelId='TipoDocu'
            id='TipoDocu'
            label="Tipo de documento"
            name="Tipo_Documento"
            >
              <MenuItem value='TD'>Tarjeta de identidad</MenuItem>
              <MenuItem value='CC'>Cedula de ciudadania</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl 
          sx={{
            margin: '10px'
          }}>
            <TextField label='Numero De Documento' name="Numero_Docu"/>
          </FormControl>

          <FormControl
          sx={{
            margin: '10px',
            textAlign: 'start'
          }}
          >
            <InputLabel id='TipoAsis'>Tipo de Asistente</InputLabel>
            <Select
            labelId='TipoAsis'
            id='TipoAsis'
            label="Tipo de Asistente"
            name="Tipo_Asis"
            >
              <MenuItem value='EXPOSITOR/A'>Expositor/a</MenuItem>
              <MenuItem value='ASISTENTE'>Asistente</MenuItem>
              <MenuItem value='LOGISTICA'>Logistica</MenuItem>
              <MenuItem value='ORGANIZADOR'>Organizador</MenuItem>
              <MenuItem value='PONENTE'>Ponente</MenuItem>
            </Select>
          </FormControl>
          <Button type='submit'>
            Guardar
          </Button>
        </Box>

        <TableContainer sx={{marginTop: 10}} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table' >
          <TableHead>
            <TableRow>
              <TableCell>Nombres</TableCell>
              <TableCell>Tipo de Documento</TableCell>
              <TableCell>Numero Documento</TableCell>
              <TableCell>Tipo de Asistente</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario, index) => (
              <TableRow key={index}>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.tipoDocu}</TableCell>
                <TableCell>{usuario.numeroDocu}</TableCell>
                <TableCell>{usuario.TipoAsis}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        </TableContainer>

    </>
  )
}

export default App
