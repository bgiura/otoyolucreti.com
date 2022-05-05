import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="navbar navbar-light ">
            <div className="container-fluid justify-content-around">
                <Link to="/" className="navbar-brand mb-0 h1 text-white">Güncel Otoyol Ücreti Hesaplama</Link>
                <span></span>
            </div>
        </nav>
    );
}

export default Navbar;