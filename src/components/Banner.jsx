import React from 'react';
import BannerData from '../jsonData/BannerData.json'
import SingleBanner from './SingleBanner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Autoplay, EffectFade } from 'swiper/modules';
import SwiperCustomNavigation from './SwiperCustomNavigation';

const Banner = () => {

    return (
        <>
            <section className="modern-slider">
                <div className="modern-banner-container">
                    <Swiper
                        modules={[Keyboard, Autoplay, EffectFade]}
                        spaceBetween={0}
                        slidesPerView={1}
                        effect="fade"
                        fadeEffect={{
                            crossFade: true
                        }}
                        autoplay={{
                            delay: 6000,
                            disableOnInteraction: false,
                        }}
                        speed={1500}
                        loop={true}
                        keyboard={{
                            enabled: true,
                        }}
                        className="modern-banner-swiper"
                    >
                        {BannerData.map(banner =>
                            <SwiperSlide key={banner.id}>
                                <SingleBanner banner={banner} />
                            </SwiperSlide>
                        )}
                        <SwiperCustomNavigation />
                    </Swiper>
                </div>

                {/* Modern Progress Indicator */}
                <div className="banner-progress">
                    <div className="progress-bar"></div>
                </div>

            </section>
        </>
    );
};

export default Banner;