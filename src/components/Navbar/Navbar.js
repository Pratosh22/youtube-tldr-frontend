import logo from '../../images/logo.PNG'
import './Navbar.css'
function Navbar() {
  return (
   <nav>
        <div className="logo">
            <img src={logo} alt="logo" className='logo-img'/>
        </div>
   </nav>
  );
}

export default Navbar;
