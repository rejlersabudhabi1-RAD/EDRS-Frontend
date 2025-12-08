import React, { useEffect, useState } from 'react';
import logo from '/img/logo/rejlers-logo.png'
import { HashLink as Link } from 'react-router-hash-link';
import { useLocation, useNavigate } from 'react-router-dom';
import OffCanvasMenu from './OffCanvasMenu';

const MainMenu = (props) => {
    const [isSearchVisible, setIsSearchVisible] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    
    const navigate = useNavigate();
    
    const toggleIcon = () => {
        setIsSearchVisible(!isSearchVisible);
    }

    const handleSearch = (event) => {
        event.preventDefault()
        event.target.reset()
    }

    const { parentMenu } = props;
    const location = useLocation();
    const [isSticky, setIsSticky] = useState(false);

    // Check authentication status
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const userInfo = localStorage.getItem('user_info');
        
        if (token && userInfo) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userInfo));
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_info');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_profile');
        setIsAuthenticated(false);
        setUser(null);
        navigate('/');
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className={`hd-sec ${isSticky ? 'sticky-menu' : ''}`}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-3 col-4">
                            <div className="logo">
                                <Link to="/#" className="logo-container">
                                    <img src={logo} alt="logo" />
                                    <div className="logo-text">
                                        <span className="company-name">REJLERS</span>
                                        <span className="system-name">EDRS</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-7 d-none d-lg-block nav-menu">
                            <div className="menu">
                                <nav id="main-menu" className="main-menu">
                                    <ul>
                                        <li><Link className={parentMenu === 'home' ? 'active' : ''} to="/#">Home</Link>
                                            <ul>
                                                <li><Link className={location.pathname === '/' ? 'active' : ''} to="/#">Home Version 1</Link></li>
                                                <li><Link className={location.pathname === '/home-2' ? 'active' : ''} to="/home-2#">Home Version 2</Link></li>
                                            </ul>
                                        </li>
                                        <li><Link className={location.pathname === '/about' ? 'active' : ''} to="/about#">About</Link></li>
                                        <li><Link className={parentMenu === 'service' ? 'active' : ''} to="/service#">Service</Link>
                                            <ul>
                                                <li><Link className={location.pathname === '/service' ? 'active' : ''} to="/service#">service Page</Link></li>
                                                <li><Link className={location.pathname === '/service-2' ? 'active' : ''} to="/service-2#">service V2 Page</Link></li>
                                                <li><Link className={location.pathname === '/service-details' ? 'active' : ''} to="/service-details#">service Details Page</Link></li>
                                            </ul>
                                        </li>
                                        <li><Link className={parentMenu === 'project' ? 'active' : ''} to="/project#">Project</Link>
                                            <ul>
                                                <li><Link className={location.pathname === '/project' ? 'active' : ''} to="/project#">project Page</Link></li>
                                                <li><Link className={location.pathname === '/project-details' ? 'active' : ''} to="/project-details#">project details Page</Link></li>
                                            </ul>
                                        </li>

                                        <li><Link className={location.pathname === '/contact' ? 'active' : ''} to="/contact#">Contact</Link></li>
                                        <li><Link className="edrs-menu-link" to="/login#" style={{color: '#007bff', fontWeight: 'bold'}}>
                                            <i className="icofont-automation me-1"></i>EDRS Platform
                                        </Link></li>
                                    </ul>
                                </nav>
                                <div className="search-bar-icon d-none d-lg-inline-block">
                                    <div className="site-search">
                                        <span id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={toggleIcon}>
                                            {isSearchVisible ? (<i className="icofont-search-2"></i>) : (<i className="icofont-close-line"></i>)}
                                        </span>
                                        <div className="search-forum dropdown-menu animation slideUpIn" aria-labelledby="dropdownMenuButton1">
                                            <form onSubmit={handleSearch}>
                                                <input placeholder="Search Here" type="text" name="search" />
                                                <input type="submit" value="Go" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 d-none d-lg-block apply-button-area">
                            {!isAuthenticated ? (
                                <div className="auth-buttons d-flex gap-2">
                                    <Link to="/login#" className="btn btn-primary btn-sm" style={{background: 'linear-gradient(45deg, #007bff, #0056b3)'}}>
                                        <i className="icofont-rocket me-1"></i>EDRS Login
                                    </Link>
                                </div>
                            ) : (
                                <div className="user-menu position-relative">
                                    <button 
                                        className="btn btn-outline-success btn-sm dropdown-toggle d-flex align-items-center"
                                        onClick={() => setShowDropdown(!showDropdown)}
                                    >
                                        <i className="icofont-user me-1"></i>
                                        {user?.first_name || 'User'}
                                    </button>
                                    {showDropdown && (
                                        <div className="dropdown-menu show position-absolute end-0 mt-2" style={{minWidth: '200px'}}>
                                            <Link to="/dashboard#" className="dropdown-item">
                                                <i className="icofont-dashboard me-2"></i>Dashboard
                                            </Link>
                                            <Link to="/profile#" className="dropdown-item">
                                                <i className="icofont-user me-2"></i>Profile
                                            </Link>
                                            <div className="dropdown-divider"></div>
                                            <button onClick={handleLogout} className="dropdown-item text-danger">
                                                <i className="icofont-logout me-2"></i>Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="col-8 d-lg-none">
                            <div className="offcanvas-menu-area">
                                <OffCanvasMenu />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainMenu;