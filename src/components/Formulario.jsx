import {useState,useEffect} from 'react';
import Error from './Error'
const Formulario=({pacientes,setPacientes,paciente,setPaciente})=>{

    const [nombre,setNombre]= useState('');
    const [email,setEmail]= useState('');
    const [fecha,setFecha]= useState('');
    const [sintomas,setSintomas]= useState('');

    const [error, setError] = useState(false);

    useEffect(()=>{
        console.log(Object.keys(paciente).length > 0)
        setNombre(paciente.nombre)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
    },[paciente])


    const generarId = ()=>{
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);

        return random + fecha;
    }

    const handleSubmit =(e)=> {
        e.preventDefault();

        // Validación del Formulario
        if( [ nombre, email, fecha, sintomas ].includes('') ) {
            console.log('Hay Al Menos un campo vacio')

            setError(true)
            return;
        } 
        
        setError(false)

        //objeto del paciente
        const objetoPaciente ={
            nombre,
            email,
            fecha,
            sintomas
        }

        if (paciente.id) {
            //Editando registro
            objetoPaciente.id = paciente.id
         

            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

            setPacientes(pacientesActualizados)
        }else{
            //nuevo registro
            objetoPaciente.id = generarId();
            setPacientes([...pacientes,objetoPaciente]);
        }

        console.log(objetoPaciente);
        
        

        //reiniciar el formulario
        setNombre('')
        setEmail('')
        setFecha('')
        setSintomas('')

    }
    return(
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <p className="text-xl mt-5 text-center mb-10">
            Añade Pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form className="bg-white shadow-xl rounded-lg py-10 px-5 mg-10"
                onSubmit={handleSubmit}

                >
            {error && <Error mensaje='Todos los campos son obligatorios' /> }
            
            
            <div className="mb-5">
                <label htmlFor="paciente" className="block text-gray-700 uppercase
                font-bold">Nombre pacientes</label>

                <input
                    id="paciente"
                    type="text"
                    placeholder="Nombre"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={nombre}
                    onChange={(e)=>setNombre(e.target.value)}
                />
            </div>



            <div className="mb-5">
                <label htmlFor="email" className="block text-gray-700 uppercase
                font-bold">correo electronico</label>

                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="fecha" className="block text-gray-700 uppercase
                font-bold">Fecha de alta</label>

                <input
                    id="fecha"
                    type="date"
                    placeholder="Fecha"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fecha}
                    onChange={(e)=>setFecha(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="sintomas" className="block text-gray-700 uppercase
                font-bold">Sintomas</label>

                <textarea
                    id="sintomas"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Describe los sintomas"
                    value={sintomas}
                    onChange={(e)=>setSintomas(e.target.value)}
                />
            </div>

            <input
                type="submit"
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold
                hover:bg-indigo-800 cursor-pointer rounded-md"
                value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
            />
        </form>

        </div>

    )
}

export default Formulario;
