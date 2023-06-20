import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs'
import { slider2, slider1, slider3, sliderVideo } from '@images'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../../style";
import ReactPlayer from 'react-player';

const HomeSlider = () => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 8000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className='homeSlider overflow-hidden text-center'>
      <Slider {...settings}>
        <div className="relative ">
          <div className="video-filter">
            <ReactPlayer
              url={sliderVideo} // Replace with your video URL
              playing
              loop
              muted
              width="100%"
              height="100%"
            />
          </div>
          <div className=" w-100 px-3 items-center absolute top-50 justify-between">
            <div className="p-2 flex-grow-1 title m-0 text-uppercase text-white">
              <h1 className={styles.title}>Welcome to WheelsDeals,</h1>
              <p className="text-lg break-all  overflow-hidden">Are you ready to upgrade your ride? Look no further! Our inventory has a wide selection of vehicles to suit any style or budget. From sleek and sporty to spacious and family-friendly, we've got you covered. Our team of experts is committed to helping you find the perfect car to fit your lifestyle. Come in today and drive away in the car of your dreams!</p>
            </div>
            <Link to={"/buy"}>
              <button className={`${styles.button} m-0`}>Read More</button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <img src={slider2} alt="slider-image" />
          <div className=" w-100 px-3 items-center absolute top-50 justify-between">
            <div className="p-2 flex-grow-1 title m-0 text-uppercase text-white">
              <h1 className={styles.title}>Welcome to WheelsDeals,</h1>
              <p className="text-lg break-all  overflow-hidden">Looking for a hassle-free way to get around town? Our car rental service has got you covered! Whether you need a car for a day or a week, we have a variety of options to choose from. From compact cars for city driving to SUVs for weekend getaways, we've got the perfect rental car for you. With competitive prices and exceptional customer service, renting a car has never been easier!</p>
            </div>
            <br />
            <Link to={"/rent"}>
              <button className={`${styles.button} m-0`}>Read More</button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <img src={slider3} alt="slider-image" />
          <div className=" w-100 px-3 items-center absolute top-50 justify-between">
            <div className="p-2 flex-grow-1 title m-0 text-uppercase text-white">
              <h1 className={styles.title}>Welcome to WheelsDeals,</h1>
              <p className="text-lg break-all  overflow-hidden">Ready to say goodbye to your old car? Let us help you get top dollar for it! Our team of experienced professionals will guide you through the process of selling your car. We offer competitive prices and make the process easy and stress-free. Say goodbye to the hassle of selling your car on your own and let us help you get the best price for your vehicle. Contact us today to schedule an appraisal and see how much your car is worth!</p>
            </div>
            <br />
            <Link to={"/sell"}>
              <button className={`${styles.button} m-0`}>Read More</button>
            </Link>
          </div>
        </div>
      </Slider>

    </div>
  );
}

export default HomeSlider