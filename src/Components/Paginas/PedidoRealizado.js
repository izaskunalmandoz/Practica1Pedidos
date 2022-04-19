import './PedidoRealizado.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';

function PedidoRealizado(props) {

    const tiempo = Date.now();
    const fecha = new Date(tiempo);

    let pedido = {
        key: props.datosForm.nombre,
        nombre: props.datosForm.nombre,
        apellido: props.datosForm.apellido,
        direccion: props.datosForm.direccion,
        preciototal: props.preciotot,
        productos: props.pedido,
        fecha: fecha
    }
    console.log(pedido.nombre);
    const ano = (new Date(fecha)).getFullYear();
    const mes = (new Date(fecha)).getMonth() + 1;
    const dia = (new Date(fecha)).getDate();


    const [id, setId] = useState('');

    useEffect(() => {
        axios.post('https://productos-eb803-default-rtdb.europe-west1.firebasedatabase.app/productos/pedidos.json', pedido).then(response => {
            console.log(response.data);
            setId(response.data.name);
            console.log(id);
        });
    }, []);

    const navega = useNavigate();

    const terminarPedido = () => {
        props.setPedido([]);
        navega('/');
    }

    return (
        <div className='body'>
            <h2 className='bodyTitulo'>Gracias por realizar su pedido.</h2>
            <div className='datosPedido'>
                <p>ID de su pedido: {id}</p>
                <p>{ano}-{mes}-{dia}</p>
                <p>{pedido.nombre} {pedido.apellido}</p>
                <p>{pedido.direccion}</p></div>
            <div className='botonFinal'><Button value='1' variant="success" onClick={terminarPedido}>Realizar nuevo pedido</Button></div>
        </div>
    )
}

export default PedidoRealizado;