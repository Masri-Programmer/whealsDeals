import React from 'react'

const Skeleton = ({ times, className }) => {
    const outerClassNames = `position-relative overflow-hidden bg-bombay-light rounded mb-3 ${className}`;
    const innerClassNames = "skeleton-box"
    const boxes = Array(times)
        .fill(0)
        .map((_, i) => {
            return (
                <div key={i} className={outerClassNames}>
                    <span className={innerClassNames}></span>
                </div>
            );
        });

    return boxes;
}

export default Skeleton