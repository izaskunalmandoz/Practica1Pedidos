import './Visualizar.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Visualizar(props) {

    const nombre = props.nombre;
    const precio = props.precio;
    const fecha = props.fecha;
    const id = props.id;
    const cantid = props.cant;

    const añadirProducto = (event) => {
        props.addProducto(id, event.target.value);
    }

    return (
        <div className='producto'>
            <div className='producto__descripcion'>
                <Row>
                    <Col xs={3}>
                        <Card style={{ width: '12rem' }}>
                            <img src={props.imagen} />
                        </Card>
                    </Col>
                    <Col xs={9}>
                        <h2>{nombre} - <Button value='1' className='boton2' variant="danger" onClick={añadirProducto}>+</Button> <Badge bg="light" text="dark">{cantid}</Badge> <Button value='2' className='boton2' variant="danger" onClick={añadirProducto}>-</Button></h2>
                        <div className='producto__precio'>Precio: {precio}€</div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Visualizar;