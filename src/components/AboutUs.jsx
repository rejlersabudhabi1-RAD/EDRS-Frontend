import React from 'react';
import AboutTabs from './AboutTabs';

const AboutUs = () => {
    return (
        <>
            <section className="about-sec pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="about-us-v2">
                                <AboutTabs />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUs;