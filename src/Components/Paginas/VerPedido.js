import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import VerProductoPedido from './VerProductoPedido.js';
import { useNavigate } from 'react-router-dom';

function VerPedido() {

    const [pedido, setPedido] = useState({});
    const parametros = useParams();
    const id = parametros.id
    console.log(parametros.id);

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
            setPedido(arrayPedidos);
        }).catch(error => {
            console.log('Se ha producido un error');
        });
    }, []);

    let nombre, apellido, fecha, direccion, preciotot;
    let contenidoFiltrado = (<p>No hay productos en el pedido.</p>);
    if (pedido.length > 0) {
        pedido.map((elemento) => {
            console.log(elemento);
            if (elemento.id == id) {
                nombre = elemento.nombre;                
                apellido = elemento.apellido;                
                fecha = elemento.fecha;                
                direccion = elemento.direccion;                
                preciotot = elemento.preciototal;                
                const productos = elemento.productos;
                console.log(productos);
                let prod = 0;
                contenidoFiltrado = productos.map((elemento) => {
                    if (elemento.cant > 0) {
                        prod++;
                        return (
                                <VerProductoPedido id={elemento.id} cant={elemento.cant} />
                        );
                    }
                })
                if (prod == 0) {
                    contenidoFiltrado = (<p>No hay productos en el pedido.</p>);
                }


            }
        })
    } else {
        contenidoFiltrado = (<p>No hay productos en la lista.</p>);
    }

    const ano = (new Date(fecha)).getFullYear();
    const mes = (new Date(fecha)).getMonth() + 1;
    const dia = (new Date(fecha)).getDate();

    const navega = useNavigate();
    const volverHandler = () => {
        navega('/pedidos');
    }

    return (
        <div className='body'>
            <h2 className='bodyTitulo'>DETALLES DEL PEDIDO</h2>
            <h3>ID del pedido: {parametros.id}</h3>
            <h4><p>Fecha: {ano}-{mes}-{dia}</p></h4>
            <div className='comprador'>
                <h2 className='titulo1'>Datos del comprador</h2>
                <p>Nombre: {nombre}</p>
                <p>Apellido: {apellido}</p>
                <p>Direccion: {direccion}</p>
            </div>
            <div className='pedido'>
                <h2 className='titulo1'>Productos</h2>
                {contenidoFiltrado}
                <div className='precio2'><p>Precio total del pedido: {preciotot}€</p></div>
            </div>
            <div className='botonFinal'><Button value='1' variant="secondary" onClick={volverHandler}>Volver a la lista de pedidos</Button></div>
        </div>
    )
}

export default VerPedido;