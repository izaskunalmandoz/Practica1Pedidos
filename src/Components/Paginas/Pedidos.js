import './Pedidos.css';
import axios from "axios";
import { useState, useEffect } from 'react';
import VisualizarPedido from './VisualizarPedido.js';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


function Pedidos() {

    const [pedidos, setPedidos] = useState([]);
    const [count, setCount] = useState([]);

    useEffect(() => {
        axios.get('https://productos-eb803-default-rtdb.europe-west1.firebasedatabase.app/productos/pedidos.json').then(response => {
            console.log(response.data);
            let arrayPedidos = [];
            for (let key in response.data) {
                arrayPedidos.push({
                    id: key,
                    nombre: response.data[key].nombre,
                    apellido: response.data[key].apellido,
                    direccion: response.data[key].direccion,
                    preciototal: response.data[key].preciototal,
                    productos: response.data[key].productos,
                    fecha: new Date(response.data[key].fecha)
                });
            }
            setPedidos(arrayPedidos);
        }).catch(error => {
            console.log('Se ha producido un error');
        });
    }, [count]);

    let contenidoFiltrado;
    if (pedidos.length > 0) {
        contenidoFiltrado = pedidos.map((elemento) => {
            console.log(elemento);
            return (<VisualizarPedido
                key={elemento.id}
                id={elemento.id}
                nombre={elemento.nombre}
                preciototal={elemento.preciototal}
                apellido={elemento.apellido}
                direccion={elemento.direccion}
                fecha={elemento.fecha}
                productos={elemento.productos}
                setCount={setCount}
            />
            )
        })
    } else {
        contenidoFiltrado = (<p>No hay productos en la lista.</p>);
    }

    const navega = useNavigate();
    const volverHandler = () => {
        navega('/');
    }

    return (
        <div className='body'>
            <h2 className='bodyTitulo'>LISTA DE PEDIDOS ANTERIORES</h2>
            {contenidoFiltrado}
            <div className='botonFinal'><Button value='1' variant="secondary" onClick={volverHandler}>Volver</Button></div>

        </div>
    )
}

export default Pedidos;