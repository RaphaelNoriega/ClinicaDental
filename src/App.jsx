import { useState,useEffect } from 'react'
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"

const App=()=> {

  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({})

  //los useEffect se van ejecutando en el orden que son declarados
  useEffect(()=>{
    const obtenerLocalStorage =()=>{
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];

        setPacientes(pacientesLS)
    }
    obtenerLocalStorage();
  },[])

  
  useEffect(()=>{
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  },[pacientes])

  const elimiarPaciente = (id) =>{
    console.log('Elimiando paciente', id)
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id)
    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mt-auto mx-20">
     <Header 
 
     />

     <div className="mt-12 flex">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          elimiarPaciente={elimiarPaciente}
        />

     </div>
    
    </div>
  )
}

export default App
