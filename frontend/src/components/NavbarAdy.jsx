import './NavbarAdy.css'
import {Link} from 'react-router'

export default function NavbarAdy(){
    return(
        <nav className='navbar-ady'>
            <span><Link to='/ady'>Home</Link></span>
            <span><Link to='/birthdays'>Birthdays</Link></span>
        </nav>
    )
}