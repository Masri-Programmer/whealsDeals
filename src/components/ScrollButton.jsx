import React, { useState, useEffect } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

const ScrollButton = () => {
    const [showScroll, setShowScroll] = useState(false);
    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 100) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div className="d-flex justify-content-end position-relative">
            {showScroll && (
                <button
                    className="rounded-circle scroll-top bg-gray-900 p-2 m-5 border-0 position-absolute bottom-0 end-0"
                    onClick={scrollToTop}
                >
                    <IoIosArrowUp color="white" />
                </button>
                // </div>
            )}
        </div>
    )
}
export default ScrollButton