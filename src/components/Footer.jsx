import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import footerLogo from '/img/logo/rejlers-logo.png'
import SocialShare from './SocialShare';
import FooterBottom from './FooterBottom';

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-overlay"></div>
                <div className="footer-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="footer-widget-one">
                                    <h2 className='footer-title-one'>Rejlers</h2>
                                    <Link to="/#" className="footer-logo"><img src={footerLogo} alt="Rejlers Logo" /></Link>
                                    <p>Leading engineering consultancy since 1942. Home of the Learning Minds - we drive innovation in energy, industry, infrastructure, and real estate for a sustainable future.</p>
                                    <div className="footer-social">
                                        <SocialShare />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-widget-two footer-widget-menu">
                                    <h2>Our Solutions</h2>
                                    <ul>
                                        <li><Link to="/service">Energy Transition</Link></li>
                                        <li><Link to="/service">Industry Transformation</Link></li>
                                        <li><Link to="#">Expert Mechanical</Link></li>
                                        <li><Link to="#">civil engineering</Link></li>
                                        <li><Link to="#">oil & gas services</Link></li>
                                        <li><Link to="#">Repair Technology</Link></li>
                                        <li><Link to="#">Refinery Petroleum</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="footer-widget-three footer-widget-menu">
                                    <h2>useful link</h2>
                                    <ul>
                                        <li><Link to="/about#">about us</Link></li>
                                        <li><Link to="/project#">latest project</Link></li>
                                        <li><Link to="/about#">faq</Link></li>
                                        <li><Link to="/contact#">Contact Us</Link></li>
                                        <li><Link to="/contact#">site map</Link></li>
                                        <li><Link to="#">trust People</Link></li>
                                        <li><Link to="#">Our Project</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-widget-four">
                                    <h2>Contact Information</h2>
                                    <div className="footer-contact-inner">
                                        <div className="footer-contact-info">
                                            <div className="footer-contact-info-icon">
                                                <i className="icofont-google-map"></i>
                                            </div>
                                            <div className="footer-contact-info-text">
                                                <span>Rejlers Middle East LLC</span>
                                                <span>Dubai, United Arab Emirates</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="footer-contact-inner">
                                        <div className="footer-contact-info">
                                            <div className="footer-contact-info-icon">
                                                <i className="icofont-email"></i>
                                            </div>
                                            <div className="footer-contact-info-text">
                                                <a href="mailto:info@rejlers.ae">info@rejlers.ae</a>
                                                <a href="mailto:mohammed.agra@rejlers.ae">mohammed.agra@rejlers.ae</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="footer-contact-inner">
                                        <div className="footer-contact-info">
                                            <div className="footer-contact-info-icon">
                                                <i className="icofont-telephone"></i>
                                            </div>
                                            <div className="footer-contact-info-text">
                                                <a href="tel:+971-4-123-4567">+971 4 123 4567</a>
                                                <a href="tel:+971-50-123-4567">+971 50 123 4567</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterBottom />
            </footer>
        </>
    );
};

export default Footer;