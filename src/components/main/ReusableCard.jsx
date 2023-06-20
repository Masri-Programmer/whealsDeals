import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { logo } from '@images';
import { ButtonEffect } from '@index';
import styles from '@style'
import './ReusableCard.css'
import { PriceChange } from '@mui/icons-material';

function ReusableCard({ title, text, location, price, distance, img, year, contentClassName, ReadLink, rent, id, car }) {
    let content = 'd-flex justify-content-between contentCardBelow'
    return (
        <Link to={ReadLink}>
            <Card className="bg-dark text-white mx-auto" style={{ height: '400px' }}>
                <div className='overflow-hidden'>
                    <Card.Img src={img} className='bg-image' alt="Card image" />
                </div>
                <Card.Title className={`sportTitle text-center mx-auto `}>{title}</Card.Title>
                <Card.ImgOverlay className={`contentsCard ${contentClassName}`} >
                    <div className='flex justify-between items-center'>
                        <ButtonEffect ReadLink={ReadLink} white={true} />
                        <AiOutlineShoppingCart className="mx-auto text-center" />
                        <span className='text-white'>{price}$</span>
                    </div>
                    <div className='flex justify-around items-center mt-3'>
                        <div>@{location}</div>
                        <div>year: {year}</div>
                        <div>Milage: {distance}Km</div>
                    </div>
                    <Card.Text ><button className={`testingButton px-3`}>Test & Policy</button> <button className={`testingButton px-3`}>Prototyping and testing</button></Card.Text>
                    <img src={logo} className="img-fluid logo pt-3 mx-auto text-center" alt="logo" />
                </Card.ImgOverlay>
            </Card>
        </Link>
    );
}
export default ReusableCard;