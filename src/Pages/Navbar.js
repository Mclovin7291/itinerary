import { Link } from 'react-router-dom';
import './Styles/Navbar.css'

export default function Navbar() {
    return (
        <div className='nav'>
            <br />
            <Link to='/Home' className='alist'>Home</Link>
            <br />
            <Link to='/Survey' className='alist'>Survey</Link>
            <br />
            <Link to='/Itinerary' className='alist'>Itinerary</Link>
            <br />
            <Link to='/Maps' className='alist'>Maps</Link>
            <br />
            <br />
        </div>
    )
}