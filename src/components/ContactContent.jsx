import React from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const ContactContent = () => {
    return (
        <>
            <section className="contact-page-sec pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <ContactForm />
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <ContactInfo />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactContent;