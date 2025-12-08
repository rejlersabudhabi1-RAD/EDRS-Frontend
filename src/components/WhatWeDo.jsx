import React from 'react';
import WhatWeDoData from '../jsonData/WhatWeDoData.json'
import SingleWhatWeDo from './SingleWhatWeDo';

const WhatWeDo = () => {
    return (
        <>
            <section className="what-we-do-crousel-sec pt-100 pb-70">
                <div className="container">
                    <div className="row what-we-do-title-inner">
                        <div className="col-md-6">
                            <div className="what-we-do-title">
                                <span className="what-we-do-subtitle">What We Do</span>
                                <h1>Engineering Excellence Across Multiple Disciplines</h1>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="what-we-do-short-description">
                                <p>As the home of the learning minds, Rejlers delivers innovative engineering solutions across diverse industries. Our multidisciplinary expertise spans from energy transition to digital transformation, supporting sustainable development and future-proofing communities worldwide.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {WhatWeDoData.map(ourService =>
                            <div className="col-md-4 col-sm-6" key={ourService.id}>
                                <SingleWhatWeDo ourService={ourService} />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default WhatWeDo;