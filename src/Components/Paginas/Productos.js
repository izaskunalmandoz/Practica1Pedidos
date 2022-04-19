import './Productos.css';
import axios from "axios";
import { useState, useEffect } from 'react';
import Visualizar from './Visualizar.js';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


function Productos(props) {

    const [Productos, setProductos] = useState([]);
    const navega = useNavigate();

    useEffect(() => {
        axios.get('https://productos-eb803-default-rtdb.europe-west1.firebasedatabase.app/productos/productos.json').then(response => {
            console.log(response.data);
            let arrayProductos = [];
            for (let num in response.data) {
                arrayProductos.push({
                    id: num,
                    nombre: response.data[num].nombre,
                    precio: response.data[num].precio,
                    fecha: response.data[num].fecha,
                    imagen: response.data[num].imagen
                });
            }
            setProductos(arrayProductos);
        });
    }, []);

    let preciotot=0;
    let contenidoFiltrado;
    if (Productos.length > 0) {
        contenidoFiltrado = Productos.map((elemento) => {
            let cant = 0;
            props.pedido.map((elemento2) => {
                if (elemento2.id == elemento.id) {
                    cant = elemento2.cant;
                }
            })
            preciotot+=cant*(elemento.precio);
            return (
                <Visualizar
                    key={elemento.id}
                    id={elemento.id}
                    nombre={elemento.nombre}
                    precio={elemento.precio}
                    fecha={elemento.fecha}
                    addProducto={props.addProducto}
                    cant={cant}
                    imagen={elemento.imagen}
                />)
        })
    } else {
        contenidoFiltrado = (<p>No hay productos en la lista.</p>);
    }

    let preciototal=(<div></div>);
    if (preciotot!=0){
        props.setPreciotot(preciotot);
        preciototal=(<div className='precio'> Precio total del pedido: {preciotot} €</div>);
    }

    const confirmacionPedido = () => {
        navega('/confirmacionpedido');
    }

    return (
        <div className='body'>
            <h2 className='bodyTitulo'>LISTA DE PRODUCTOS</h2>
            {contenidoFiltrado}
            {preciototal}
            <div className='boton'><Button value='1' variant="success" onClick={confirmacionPedido}>REALIZAR PEDIDO</Button></div>
        </div>
    )
}

export default Productos;