import React from 'react';
import Banner from '../components/Banner';
import AboutUs from '../components/AboutUs';
import TeamHeader from '../components/TeamHeader';
import Team from '../components/Team';
import Footer from '../components/Footer';
import Services from '../components/Services';
import Header from '../components/Header';

const Home1 = () => {
    return (
        <>
            <Header parentMenu='home' />
            <Banner />
            <AboutUs />
            <Services />
            <TeamHeader />
            <Team />
            <Footer />
        </>
    );
};

export default Home1;