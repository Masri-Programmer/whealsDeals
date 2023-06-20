import './LoaderAnimation.css'
const LoaderAnimation = () => {
    return (
        <div className='loader-animation text-center text-uppercase fs-1 '>
            <div className="lds-roller "><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default LoaderAnimation