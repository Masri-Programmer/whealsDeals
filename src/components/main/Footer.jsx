import {
  logo,
  vendor1,
  vendor2,
  vendor3,
  vendor4,
  vendor5,
  vendor6,
  vendor7,
  vendor8,
} from '@images';
import { FaEnvelope, FaPhone, FaLocationArrow } from 'react-icons/fa';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaGithub, FaGooglePlus, FaTumblr, FaPinterest, FaWhatsapp, FaSnapchat, FaStumbleupon, FaDelicious, FaDigg, FaQuora, FaReddit, FaFlickr } from 'react-icons/fa';
import { AiOutlineCopyrightCircle } from 'react-icons/ai';

import styles from '@style';
const Footer = ({ children }) => {

  return (
    <div className=' text-white !bg-gray-800  w-100 p-4 pb-0 position-relative h-500 Footer'>
      <div className="w-100 d-flex flex-wrap px-5 h-100">
        <div className="col-lg-5 col-md-6 col-sm-6 h-100">
          <img src={logo} alt="logo" className='img-fluid' width={110} />
          <p className='mt-4 text-justify w-75 w-md-100 mb-5 text-white text-regular'>
            Your one-stop destination for car rentals and sales. Explore, sell, and drive with ease.
          </p>
        </div>
        <div className="col-lg-4 ms-auto col-md-6 col-sm-6 h-100" >
          <div>
            <h1 className="text-bold text-sky-700 fs-5 text-uppercase">Contact us</h1>
            <a target="_blank" className='flex align-center my-1'><FaLocationArrow /><span className={`${styles.nav_link}`}>Address over here</span></a>
            <a href={`mailto:mohamad@masri.digital`} className='flex align-center my-1'><FaEnvelope size={15} /> <span className={`${styles.nav_link}`}>mohamad@masri.digital</span></a>
            <a href={`tel:0096470757134`} className='flex align-center my-1'><FaPhone /> <span className={`${styles.nav_link}`}>+961 70757134</span></a>

          </div>
          <h1 className="text-bold text-sky-700 fs-5 text-uppercase mt-4">Follow us</h1>
          <div className='d-flex mb-3 flex-wrap w-50'>
            <FaInstagram style={{ color: '#111827', margin: '5px' }} size={20} />
            <FaLinkedin style={{ color: '#111827', margin: '5px' }} size={20} />
            <FaYoutube style={{ color: '#111827', margin: '5px' }} size={20} />
            <FaFacebook style={{ color: '#111827', margin: '5px' }} size={20} />
            <FaTwitter style={{ color: '#111827', margin: '5px' }} size={20} />
            <FaGithub style={{ color: '#111827', margin: '5px' }} size={20} />
            <FaTumblr style={{ color: '#111827', margin: '5px' }} size={20} />
            <FaFlickr style={{ color: '#111827', margin: '5px' }} size={20} />
            <FaReddit style={{ color: '#111827', margin: '5px' }} size={20} />
            <FaQuora style={{ color: '#111827', margin: '5px' }} size={20} />
            <FaDigg style={{ color: '#111827', margin: '5px' }} size={20} />
            <FaDelicious style={{ color: '#111827', margin: '5px' }} size={20} />
            <FaStumbleupon style={{ color: '#111827', margin: '5px' }} size={20} />
            <FaSnapchat style={{ color: '#111827', margin: '5px' }} size={20} />
            <FaWhatsapp style={{ color: '#111827', margin: '5px' }} size={20} />
            <FaGooglePlus style={{ color: '#111827', margin: '5px' }} size={20} />
            <FaPinterest style={{ color: '#111827', margin: '5px' }} size={20} />
          </div>
        </div>
        <div className="col-lg-3 col-md-6 ms-auto col-sm-12 h-100">
          <div className='d-flex flex-wrap w-75 w-sm-100 mb-3'>
            <div className='align-self-center mx-1 my-1'>
              <a href="/">
                <img src={vendor1} width={40} alt={'logo'} />
              </a>
            </div>
            <div className='align-self-center mx-1 my-1'>
              <a href="/">
                <img src={vendor2} width={40} alt={'logo'} />
              </a>
            </div>
            <div className='align-self-center mx-1 my-1'>
              <a href="/">
                <img src={vendor3} width={40} alt={'logo'} />
              </a>
            </div>
            <div className='align-self-center mx-1 my-1'>
              <a href="/">
                <img src={vendor4} width={40} alt={'logo'} />
              </a>
            </div>
            <div className='align-self-center mx-1 my-1'>
              <a href="/">
                <img src={vendor1} width={40} alt={'logo'} />
              </a>
            </div>
            <div className='align-self-center mx-1 my-1'>
              <a href="/">
                <img src={vendor5} width={40} alt={'logo'} />
              </a>
            </div>
            <div className='align-self-center mx-1 my-1'>
              <a href="/">
                <img src={vendor6} width={40} alt={'logo'} />
              </a>
            </div>
            <div className='align-self-center mx-1 my-1'>
              <a href="/">
                <img src={vendor7} width={40} alt={'logo'} />
              </a>
            </div>
            <div className='align-self-center mx-1 my-1'>
              <a href="/">
                <img src={vendor8} width={40} alt={'logo'} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex py-2 justify-content-between fs-6 roboto border-top">
        <div className='d-flex align-items-center'> <AiOutlineCopyrightCircle /> opyRight 2023 Mohamad Masri</div>
        <div> Powered By Mercedes </div>
      </div>
    </div >
  )
}
export default Footer