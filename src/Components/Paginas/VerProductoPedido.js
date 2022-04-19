// import './VerProductoPedido.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function VerProductoPedido(props) {

    const id = props.id;
    const cantid = props.cant;

    const [producto, setProducto] = useState({});
    const [imagen, setImagen] = useState();

    useEffect(() => {
        axios.get('https://productos-eb803-default-rtdb.europe-west1.firebasedatabase.app/productos/productos/' + id + '.json')
            .then(response => {
                console.log(response.data);
                setProducto({
                    nombre: response.data.nombre,
                    imagen: response.data.imagen
                })
            });
    }, []);


    return (
        <div className='producto'>
            <div className='producto__descripcion'>
                <Row>
                    <Col xs={3}>
                        <Card style={{ width: '12rem' }}>
                            <img src={producto.imagen} />
                        </Card>
                    </Col>
                    <Col xs={9}>
                        <h2>{producto.nombre}</h2>
                        <p>ID del producto: {id}<br></br>
                            Cantidad: {cantid}</p>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default VerProductoPedido;