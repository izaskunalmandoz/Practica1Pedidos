import './FormularioPedido.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';

function FormularioPedido(props) {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [direccion, setDireccion] = useState('');

    const navega = useNavigate();

    const realizarPedido = () => {
        console.log('datuekbidali');
        let datos = {
            nombre: nombre,
            apellido: apellido,
            direccion: direccion,
        };
        props.guardarForm(datos);
        navega('/pedidorealizado');
    }

    const nombreHandler = (event) => {
        setNombre(event.target.value);
        // props.addNumero(event.target.value);
    }

    const apellidoHandler = (event) => {
        setApellido(event.target.value);
        // props.addNumero(event.target.value);
    }

    const dirHandler = (event) => {
        setDireccion(event.target.value);
        // props.addNumero(event.target.value);
    }

    return (
        <div className='body'>
            <h2 className='bodyTitulo'>Formulario del pedido.</h2>
            <div className='apartado'><p>Nombre: </p>
            <input type='text' onChange={nombreHandler} className='input_numero'></input></div>
            <div className='apartado'><p>Apellido: </p>
            <input type='text' onChange={apellidoHandler} className='input_numero'></input></div>
            <div className='apartado'><p>Dirección de envío: </p>
            <input type='text' onChange={dirHandler} className='input_numero'></input></div>
            <div className='boton'><Button value='1' variant="success" onClick={realizarPedido}>REALIZAR PEDIDO</Button></div>
        </div>
    )
}

export default FormularioPedido;