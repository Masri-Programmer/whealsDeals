import React from 'react'

const CardSkeleton = () => {
    return (
        <>
            <div className="ms-4  mt-4 card is-loading">
                <div className="image"></div>
                <div className="content">
                </div>
            </div>
        </>
    )
}

export default CardSkeleton