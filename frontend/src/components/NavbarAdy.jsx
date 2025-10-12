import './NavbarAdy.css'
import {Link} from 'react-router'

export default function NavbarAdy(props){
    return(
        <nav className='navbar-ady'>
            <span className={props.page == 'Home' ? 'current-page' : ''}><Link to='/ady'>Home</Link></span>
            <span className={props.page == 'Birthdays' ? 'current-page' : ''}><Link to='/birthdays'>Birthdays</Link></span>
        </nav>
    )
}