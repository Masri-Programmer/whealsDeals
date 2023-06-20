import React from 'react'
import styles from '@style'
import { GoSync } from 'react-icons/go';
const ButtonLoad = ({ classes, loading, ...rest }) => {
    // ${styles.button} w-25 mx-auto ml-8
    return (
        <div className={`${styles.button} mx-auto `}>
            <button
                {...rest}
                disabled={loading}
                className={styles.load_more}
            >
                {loading ? <GoSync className="animate-spin" color='white' /> : "Load More"}
            </button>
        </div>
    )
}

export default ButtonLoad