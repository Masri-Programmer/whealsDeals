import React, { useState, useEffect, useRef } from 'react'
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from "three";
import { HomeSlider, AboutCta, BuyCta, RentCta, BlogCta, Testimonials } from '@index'

const Home = () => {
    const [vantaEffect, setVantaEffect] = useState(null);
    const myRef = useRef(null);
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                NET({
                    el: myRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    color: 0xffffff,
                    backgroundColor: 0x1F2937,
                })
            );
        }
        return () => {
            if (myRef.current && myRef.current.vanta) {
                myRef.current.vanta.destroy();
            }
        };
    }, []);

    return (<>
        <HomeSlider />
        <div ref={myRef}>
            <AboutCta />
            <BuyCta />
            <RentCta />
            <BlogCta />
            <Testimonials />
        </div>
    </>
    );
};

export default Home