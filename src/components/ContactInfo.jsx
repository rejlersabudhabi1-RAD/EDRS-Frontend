import React from 'react';

const ContactInfo = () => {
    return (
        <>
            <div className="contact-info">
                <div className="contact-info-item">
                    <div className="contact-info-icon">
                        <i className="icofont-map-pins"></i>
                    </div>
                    <div className="contact-info-text">
                        <h2>Abu Dhabi Office</h2>
                        <span>Rejlers Tower, 13th floor</span>
                        <span>AI Hamdan Street, P.O. Box 39317</span>
                        <span>Abu Dhabi, United Arab Emirates</span>
                    </div>
                </div>
            </div>
            <div className="contact-info">
                <div className="contact-info-item">
                    <div className="contact-info-icon">
                        <i className="icofont-email"></i>
                    </div>
                    <div className="contact-info-text">
                        <h2>e-mail</h2>
                        <span> <a href="mailto:info@rejlers.ae">info@rejlers.ae</a> </span>
                        <span> <a href="mailto:careers@rejlers.ae">careers@rejlers.ae</a> </span>
                    </div>
                </div>
            </div>
            <div className="contact-info">
                <div className="contact-info-item">
                    <div className="contact-info-icon">
                        <i className="icofont-wall-clock"></i>
                    </div>
                    <div className="contact-info-text">
                        <h2>phone</h2>
                        <span>Abu Dhabi: <a href="tel:+97126397449">+971 26 397 449</a></span>
                        <span>Sweden: <a href="tel:+46771780000">+46 771 78 00 00</a></span>
                        <span>Global Operations Available</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactInfo;