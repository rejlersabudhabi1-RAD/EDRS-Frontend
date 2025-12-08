import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import '../assets/css/about-tabs.css';

const AboutTabs = () => {
    return (
        <>
            <ul className="nav nav-pills mb-3 about-tab" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">History</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Mission</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Support</a>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                    <div className="about-desc">
                        <h1>Our Heritage & History</h1>
                        <p>Rejlers is the home of the learning minds, with decades of experience in engineering and technology solutions. We have grown from a local engineering consultancy to an international powerhouse, driving innovation across multiple sectors. Our journey has been marked by strategic expansion into key markets including Sweden, Finland, Norway, and the UAE.</p>
                        <p>Throughout our history, we have consistently focused on sustainability both externally and internally. By catalyzing our customers' transformation, we contribute to the journey towards a sustainable society. Our expertise spans energy transition, industry transformation, and future-proofing communities worldwide.</p>
                        <div className="company-stats mt-4">
                            <div className="row">
                                <div className="col-4 text-center">
                                    <h3 className="text-primary">4</h3>
                                    <p>Countries</p>
                                </div>
                                <div className="col-4 text-center">
                                    <h3 className="text-primary">1000+</h3>
                                    <p>Projects</p>
                                </div>
                                <div className="col-4 text-center">
                                    <h3 className="text-primary">50+</h3>
                                    <p>Years Experience</p>
                                </div>
                            </div>
                        </div>
                        <Link to="https://www.rejlers.com/ae/about-us/" target="_blank" rel="noopener noreferrer">Learn More About Rejlers</Link>
                    </div>
                </div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
                    <div className="about-desc">
                        <h1>Our Mission & Vision</h1>
                        <p>Our mission is to be the catalyst for our customers' transformation journey towards sustainability. We empower organizations to drive the energy transition, transform industries for a circular economy, and future-proof communities against climate challenges. Through our deep technical expertise and innovative solutions, we create lasting value.</p>
                        <div className="mission-pillars mt-4">
                            <div className="pillar-item mb-3">
                                <h5 className="text-primary">🌱 Powering Energy Transition</h5>
                                <p>Together with our customers, we drive the shift to a sustainable energy future, reshaping how energy is produced and consumed for a cleaner, more efficient system.</p>
                            </div>
                            <div className="pillar-item mb-3">
                                <h5 className="text-primary">🏭 Sustainable Industry Transformation</h5>
                                <p>We enable the shift to resource-efficient and circular industrial production with broad expertise in the latest technologies.</p>
                            </div>
                            <div className="pillar-item mb-3">
                                <h5 className="text-primary">🏙️ Future-Proofing Communities</h5>
                                <p>We support sustainable society by driving projects in cities, infrastructure, and the built environment, adapting to decarbonized systems.</p>
                            </div>
                        </div>
                        <Link to="https://www.rejlers.com/what-we-do/" target="_blank" rel="noopener noreferrer">Discover Our Focus Areas</Link>
                    </div>
                </div>
                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex="0">
                    <div className="about-desc">
                        <h1>Support & Partnership</h1>
                        <p>At Rejlers, we believe in building long-term partnerships with our clients. Our dedicated support extends beyond project delivery to ensure sustained success. We provide comprehensive technical assistance, continuous improvement strategies, and expert guidance throughout your transformation journey.</p>
                        <div className="support-services mt-4">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="support-item mb-3">
                                        <h6 className="text-primary">🔧 Technical Excellence</h6>
                                        <p>Expert engineering solutions and technical support across all project phases.</p>
                                    </div>
                                    <div className="support-item mb-3">
                                        <h6 className="text-primary">📞 24/7 Availability</h6>
                                        <p>Round-the-clock support for critical projects and emergency situations.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="support-item mb-3">
                                        <h6 className="text-primary">🎓 Knowledge Transfer</h6>
                                        <p>Comprehensive training and knowledge sharing to empower your teams.</p>
                                    </div>
                                    <div className="support-item mb-3">
                                        <h6 className="text-primary">🌐 Global Reach</h6>
                                        <p>Local presence with global expertise across Sweden, Finland, Norway, and UAE.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="contact-info mt-4 p-3 bg-light rounded">
                            <h6>Contact Our UAE Office:</h6>
                            <p><strong>Rejlers Tower, 13th floor</strong><br/>
                            AI Hamdan Street, P.O. Box 39317<br/>
                            Abu Dhabi, United Arab Emirates<br/>
                            <strong>Phone:</strong> +971 2 639 7449</p>
                        </div>
                        <Link to="https://www.rejlers.com/ae/contact-us/" target="_blank" rel="noopener noreferrer">Get In Touch</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutTabs;