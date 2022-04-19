import './Header.css';
import { Link } from 'react-router-dom';


function Header() {
    return (
        <div className='header'>
            <h2>PAGINA DE PEDIDOS</h2>
            <nav>
                <Link to="/">Inicio</Link> | {'   '}
                <Link to="/pedidos">Pedidos anteriores</Link>
            </nav>
        </div>
    )
}

export default Header;