// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/UI/Header';
import Footer from './Components/UI/Footer';
import Productos from './Components/Paginas/Productos';
import ErrorPage from './Components/Paginas/ErrorPage';
import Pedidos from './Components/Paginas/Pedidos';
import ConfirmacionPedido from './Components/Paginas/ConfirmacionPedido.js';
import FormularioPedido from './Components/Paginas/FormularioPedido';
import PedidoRealizado from './Components/Paginas/PedidoRealizado';
import VerPedido from './Components/Paginas/VerPedido';
import { useState } from 'react';

function App() {

  const [pedido, setPedido] = useState(
    [
      {
        id: 0,
        cant: 0
      },
      {
        id: 1,
        cant: 0
      },
      {
        id: 2,
        cant: 0
      },
    ]);

  const [datosForm, setDatosForm] = useState([]);
  const [preciotot, setPreciotot] = useState('');

  const guardarForm = (datos) => {
    setDatosForm(datos);
  };

  const addProducto = (producto, suma) => {
    let ind = 0;
    let x = 0;
    let arrayCarrito = [];
    pedido.map((elemento) => {
      if (elemento.id == producto) {
        x++;
        if (suma == 1) {
          arrayCarrito.push({
            id: elemento.id,
            cant: pedido[ind].cant + 1
          });
        } else {
          if (elemento.cant > 0) {
            arrayCarrito.push({
              id: elemento.id,
              cant: pedido[ind].cant - 1
            });
          }
        }
      } else {
        arrayCarrito.push({
          id: elemento.id,
          cant: elemento.cant
        });
      }
      ind++;
    })
    if (x == 0) {
      // console.log(producto);
      if (suma == 1) {
        arrayCarrito.push({
          id: producto,
          cant: 1
        });
      }
    }
    setPedido(arrayCarrito);
  };



  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Productos addProducto={addProducto} pedido={pedido} setPreciotot={setPreciotot} />} />
        <Route path="/productos/:id" element={<VerPedido />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/confirmacionpedido" element={<ConfirmacionPedido addProducto={addProducto} pedido={pedido} setPreciotot={setPreciotot} preciotot={preciotot} />} />
        <Route path="/formulariopedido" element={<FormularioPedido guardarForm={guardarForm} />} />
        <Route path="/pedidorealizado" element={<PedidoRealizado pedido={pedido} datosForm={datosForm} setPedido={setPedido} preciotot={preciotot} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
