import './ConfirmacionPedido.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Visualizar from './Visualizar.js';

function ConfirmacionPedido(props) {

    const [Productos, setProductos] = useState([]);

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

    const navega = useNavigate();

    const continuarPedido = () => {
        props.setPreciotot(precioTotal);
        navega('/formulariopedido');
    }

    const volverHandler = () => {
        navega('/');
    }

    let contenidoFiltrado = (<p>No hay productos.</p>);
    let precioTotal = 0;
    let continuar = (<div><div className='precio'> Precio total del pedido: {props.preciotot} €</div><div className='boton'><Button value='1' variant="success" onClick={continuarPedido}>CONTINUAR</Button>   <Button value='1' variant="secondary" onClick={volverHandler}>Volver</Button></div></div>);
    if (Productos.length > 0) {
        let prod = 0;
        contenidoFiltrado = Productos.map((elemento) => {
            let cant = 0;
            props.pedido.map((elemento2) => {
                if (elemento2.id == elemento.id) {
                    cant = elemento2.cant;
                }
            })
            if (cant > 0) {
                prod++;
                precioTotal += cant * elemento.precio;
                props.setPreciotot(precioTotal);
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
                    />
                )
            }
        })
        if (prod == 0) {
            contenidoFiltrado = (<p>No hay productos en el carrito.</p>)
            continuar = (<div className='boton'><Button value='1' variant="success" disabled>CONTINUAR</Button>   <Button value='1' variant="secondary" onClick={volverHandler}>Volver</Button></div>);
        } else {

        }
    }

    return (
        <div className='body'>
            <h2 className='bodyTitulo'>Lista de productos en carrito.</h2>
            {contenidoFiltrado}
            {continuar}
        </div>
    )
}

export default ConfirmacionPedido;