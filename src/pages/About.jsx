import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import AboutUsV2 from '../components/AboutUsV2';
import RejlersExpertise from '../components/RejlersExpertise';
import RejlersValues from '../components/RejlersValues';
import TeamV2 from '../components/TeamV2';
import Footer from '../components/Footer';
import Header from '../components/Header';

const About = () => {
    return (
        <>
            <Header />
            <Breadcrumb pageTitle="About Rejlers" />
            <AboutUsV2 />
            <RejlersExpertise />
            <RejlersValues />
            <TeamV2 />
            <Footer />
        </>
    );
};

export default About;