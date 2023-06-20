import { Link } from "react-router-dom"
import styles from '@style'

const CTA = (props) => {


  return (
    <div className={`cta-banner col-12 text-center p-5 ${props.styleClass}`} style={{
      backgroundImage: `url(${props.url})`,
      backgroundSize: 'cover ',

    }}>
      <div className='p-3 contents'  >
        <h1 className={`text-4xl mt-3  text-sky-700 font-black cta-title ${props.titleClass}`}>{props.title}</h1>
        <p className={`my-4 mx-auto w-75 text-lg text-white textShadow lh-lg ${props.textClass}`} >{props.text}</p>
        <Link to={props.btnLink}>
          <button className={`btn mt-3 mb-5 rounded-pill text-black ${styles.button_white}`}>{props.buttonText}</button>
        </Link>
        {props.children}
      </div>
    </div>
  )
}

export default CTA