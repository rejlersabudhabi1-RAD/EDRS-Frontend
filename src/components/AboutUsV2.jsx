import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import aboutThumb from '/img/about/about.jpg'

const AboutUsV2 = () => {
    return (
        <>
            <section className="about-us-sec pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="about-desc">
                                <div className="sec-title">
                                    <span>Trusted Provider of High-Quality Engineering</span>
                                    <h1>HOME of the <span className="learning-minds-emphasis">LEARNING MINDS</span></h1>
                                </div>
                                <p>Rejlers International Engineering Solutions is a trusted provider of high-quality engineering and project services. We have been present in Abu Dhabi, UAE, for over 15 years, operating from our regional headquarters in Abu Dhabi City with an office in Navi Mumbai, India.</p>
                                <p>Specializing in Oil & Gas, Refining, Petrochemical, Chemical, and Renewable Energy industries, as well as Industrial Infrastructure including Buildings, Structures, Power Distribution, and Telecommunications, we serve clients throughout the UAE and Arabian Gulf.</p>
                                <p>Our strong track record in Industrial Digitization and AI solutions reflects our commitment to innovation and excellence, bringing over 80 years of Nordic engineering heritage to the region.</p>
                                <div className="read-more-btn">
                                    <Link to="/contact#">Contact Us</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="about-us-img">
                                <img src={aboutThumb} alt="about" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUsV2;