import './NavbarAdy.css'
import {Link} from 'react-router'

export default function NavbarAdy(props){
    return(
        <nav className='navbar-ady' style={{fontSize:'13px'}}>
            <span className={props.page == 'Appointments' ? 'current-page' : ''}><Link to='/ady'>Appointments</Link></span>
            <span className={props.page == 'Recurring' ? 'current-page' : ''}><Link to='/recurring'>Recurring</Link></span>
            <span className={props.page == 'History' ? 'current-page' : ''}><Link to='/history'>History</Link></span>
            <span className={props.page == 'Birthdays' ? 'current-page' : ''}><Link to='/birthdays'>Birthdays</Link></span>
            <span className={props.page == 'DadView' ? 'current-page' : ''}><Link to='/dad-view'>DadView</Link></span>
        </nav>
    )
}