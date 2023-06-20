import React, { useState } from 'react'
import { paper } from '@images'
import { Link } from 'react-router-dom'

const ButtonEffect = (props) => {
    let icon = ''
    return (
        <div>
            <Link to={props.ReadLink}>
                <button
                    className={`button-effect  ${props.white ? "btn card-button" : "mojo-button"} ${props.rest}`}
                >
                    <img src={paper}
                        className={icon} alt="paper icon" />
                    <span>Read More</span>
                </button>
            </Link>
        </div>
    )
}

export default ButtonEffect