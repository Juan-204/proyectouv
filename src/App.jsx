import { Typography, Box, TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    tipoDocu: '',
    numeroDocu: '',
    tipoAsis: '',
    institucion: '',
    programa: '',
    campus: '',
    contacto1: '',
    contacto2: '',
    correoElectronico: '',
    sectorExterno: '',
    empresaNombre: '',
    tipoSector: ''
  });
  const [editIndex, setEditIndex] = useState(null);

  const programas = [
    'TECNOLOGÍA EN DESARROLLO DE SOFTWARE',
    'TECNOLOGÍA AGROAMBIENTAL',
    'CONTADURÍA PÚBLICA',
    'ADMINISTRACIÓN DE EMPRESAS',
    'TECNOLOGÍA EN GESTIÓN DE ORGANIZACIONES TURÍSTICAS'
  ];

  const campus = [
    'SEDE CAICEDONIA',
    'NODO SEVILLA'
  ];

  useEffect(() => {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    setUsuarios(usuariosGuardados);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const manejoForm = (e) => {
    e.preventDefault();

    let usuarioData = { ...formData };
    switch (formData.tipoAsis) {
      case 'ESTUDIANTE':
        usuarioData = {
          ...formData,
          tipoAsis: formData.tipoAsis,
        };
        break;
      case 'DOCENTE':
      case 'EXPOSITOR':
      case 'PONENTE':
      case 'LOGISTICA':
        usuarioData = {
          ...formData,
          tipoAsis: formData.tipoAsis,
        };
        break;
      case 'SECTOR_EXTERNO':
        usuarioData = {
          ...formData,
          tipoAsis: formData.tipoAsis,
        };
        break;
      default:
        usuarioData = { ...formData };
    }

    if (editIndex !== null) {
      const updatedUsuarios = usuarios.map((usuario, index) =>
        index === editIndex ? { ...usuarioData } : usuario
      );
      setUsuarios(updatedUsuarios);
      localStorage.setItem('usuarios', JSON.stringify(updatedUsuarios));
      setEditIndex(null);
    } else {
      const nuevosUsuarios = [...usuarios, usuarioData];
      setUsuarios(nuevosUsuarios);
      localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
    }

    setFormData({
      nombre: '',
      tipoDocu: '',
      numeroDocu: '',
      tipoAsis: '',
      institucion: '',
      programa: '',
      campus: '',
      contacto1: '',
      contacto2: '',
      correoElectronico: '',
      sectorExterno: '',
      empresaNombre: '',
      tipoSector: ''
    });
  };

  const handleEdit = (index) => {
    setFormData(usuarios[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const nuevosUsuarios = usuarios.filter((_, i) => i !== index);
    setUsuarios(nuevosUsuarios);
    localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
  };

  return (
    <>
      <Box className="shadow-2xl rounded-2xl flex flex-col" component="form" onSubmit={manejoForm}>
        <Typography className="text-4xl">Asistencia Eventos Univalle</Typography>
        
        <FormControl sx={{ margin: '10px' }}>
          <TextField label="Nombre Completo" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </FormControl>

        <FormControl sx={{ margin: '10px' }}>
          <InputLabel>Tipo de Documento</InputLabel>
          <Select name="tipoDocu" value={formData.tipoDocu} onChange={handleChange} required>
            <MenuItem value="CC">Cédula de Ciudadanía</MenuItem>
            <MenuItem value="TI">Tarjeta de Identidad</MenuItem>
            <MenuItem value="CE">Cédula de Extranjería</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ margin: '10px' }}>
          <TextField label="Número de Documento" name="numeroDocu" value={formData.numeroDocu} onChange={handleChange} required />
        </FormControl>

        <FormControl sx={{ margin: '10px' }}>
          <InputLabel>Tipo de Asistente</InputLabel>
          <Select name="tipoAsis" value={formData.tipoAsis} onChange={handleChange} required>
            <MenuItem value="ESTUDIANTE">Estudiante</MenuItem>
            <MenuItem value="DOCENTE">Docente</MenuItem>
            <MenuItem value="EXPOSITOR">Expositor</MenuItem>
            <MenuItem value="PONENTE">Ponente</MenuItem>
            <MenuItem value="LOGISTICA">Logística</MenuItem>
            <MenuItem value="SECTOR_EXTERNO">Sector Externo</MenuItem>
          </Select>
        </FormControl>
        {/* Campos condicionales */}
        {(formData.tipoAsis === 'DOCENTE' || formData.tipoAsis === 'EXPOSITOR' || formData.tipoAsis === 'PONENTE' || formData.tipoAsis === 'LOGISTICA') && (
          <FormControl sx={{ margin: '10px' }}>
            <TextField label="Nombre de la Institución" name="institucion" value={formData.institucion} onChange={handleChange} />
          </FormControl>
        )}

        {formData.tipoAsis === 'ESTUDIANTE' && (
          <>
            <FormControl sx={{ margin: '10px' }}>
              <InputLabel>Programa</InputLabel>
              <Select name="programa" value={formData.programa} onChange={handleChange}>
                {programas.map((programa) => (
                  <MenuItem key={programa} value={programa}>{programa}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ margin: '10px' }}>
              <InputLabel>Campus</InputLabel>
              <Select name="campus" value={formData.campus} onChange={handleChange}>
                {campus.map((campus) => (
                  <MenuItem key={campus} value={campus}>{campus}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}

        {formData.tipoAsis === 'SECTOR_EXTERNO' && (
          <>
            <FormControl sx={{ margin: '10px' }}>
              <InputLabel>Tipo de Sector</InputLabel>
              <Select name="tipoSector" value={formData.tipoSector} onChange={handleChange}>
                <MenuItem value="PUBLICO">Empresa pública</MenuItem>
                <MenuItem value="PRIVADO">Empresa Privada</MenuItem>
                <MenuItem value="INDEPENDIENTE">Independiente</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ margin: '10px' }}>
              <TextField label="Nombre de la Empresa" name="empresaNombre" value={formData.empresaNombre} onChange={handleChange} />
            </FormControl>
          </>
        )}

        <FormControl sx={{ margin: '10px' }}>
          <TextField label="Contacto 1" name="contacto1" value={formData.contacto1} onChange={handleChange} />
        </FormControl>
        <FormControl sx={{ margin: '10px' }}>
          <TextField label="Contacto 2" name="contacto2" value={formData.contacto2} onChange={handleChange} />
        </FormControl>
        <FormControl sx={{ margin: '10px' }}>
          <TextField label="Correo Electrónico" name="correoElectronico" value={formData.correoElectronico} onChange={handleChange} />
        </FormControl>

        <Button type="submit" variant="contained" sx={{ margin: '10px' }}>Guardar</Button>
      </Box>
    </>
  );
}

export default App;