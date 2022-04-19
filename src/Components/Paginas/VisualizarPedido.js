import './VisualizarPedido.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';


function VisualizarPedido(props) {

    const nombre = props.nombre;
    const preciototal = props.preciototal;
    const apellido = props.apellido;
    const direccion = props.direccion;
    const productos = props.productos;
    const fecha = props.fecha.toDateString();
    console.log(fecha);
    const ano = props.fecha.getFullYear();
    const mes = props.fecha.getMonth() + 1;
    const dia = props.fecha.getDate();
    const key = props.id;

    const [show, setShow] = useState(false);

    let contenidoFiltrado = (<p>No hay productos en el pedido.</p>);
    // console.log(productos.length);
    if (productos.length > 0) {
        console.log(productos);
        let prod = 0;
        contenidoFiltrado = productos.map((elemento) => {
            if (elemento.cant > 0) {
                prod++;
                return (
                    <div>
                        id={elemento.id}
                        cant={elemento.cant}
                    </div>
                );
            }
        })
        if (prod == 0) {
            contenidoFiltrado = (<p>No hay productos en el pedido.</p>);
        }
    }


    const borrarPedido = () => {
        axios.delete('https://productos-eb803-default-rtdb.europe-west1.firebasedatabase.app/productos/pedidos/' + key + '.json')
            .then(response => {
                console.log(response);
                setShow(false);
                alert('Pedido borrado');
                props.setCount(key);
            });
    }

    const navega = useNavigate();
    const handleDetalles = () => {
        navega(`/productos/${props.id}`);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='pedido'>
            <h2>{nombre} {apellido} - <Button variant="danger" onClick={handleDetalles} >Ver pedido</Button> - <Button variant="danger" onClick={handleShow}>Borrar pedido</Button></h2>
            <h3>{ano}-{mes}-{dia}</h3>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header>
                    <Modal.Title>Esta seguro de borrar este pedido?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button variant="primary" onClick={borrarPedido}>Borrar</Button>
                </Modal.Footer>
            </Modal>
            ID: {key}
        </div>
    )
}

export default VisualizarPedido;