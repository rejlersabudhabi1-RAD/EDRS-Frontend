import React from 'react';
import TeamData from '../jsonData/TeamData.json'
import SingleTeam from './SingleTeam';

const Team = () => {
    return (
        <>
            <section className="team-sec pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="team-support-inner">
                                <span>Expert Support</span>
                                <h1>Professional Leadership with 24/7 Engineering Excellence</h1>
                                <p>Our experienced management team brings together decades of engineering expertise across energy transition, industrial transformation, and sustainable development. Based at Rejlers Tower in Abu Dhabi, we serve the Middle East region with world-class engineering solutions.</p>
                                <p>From concept to completion, our leadership ensures every project meets the highest standards of safety, sustainability, and technical excellence. We're committed to driving innovation and creating lasting value for our clients across the UAE and beyond.</p>
                                <ul>
                                    <li><a href="mailto:mohammed.agra@rejlers.ae"><i className="icofont-envelope"></i>Contact Leadership <i className="icofont-thin-double-right"></i></a></li>
                                    <li><a href="tel:+97126397449"><i className="icofont-live-support"></i>+971 2 639 7449<i className="icofont-telephone"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="row">
                                {TeamData.map(team =>
                                    < div className="col-md-6 col-sm-12" key={team.id} >
                                        < SingleTeam team={team} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
};

export default Team;