import React from 'react'
import { ReusableCard } from '@index'
import styles from '@style'
import { gallery6 } from '@images'
import { carsReducer } from '../../utils/store/slices/Slices'

let CarShow = ({ car }) => {
    const images = [
        'car (1).png',
        'car (2).png',
        'car (3).png',
        'car (4).png',
        'car (5).png',
        'car (6).png',
        'car (7).png',
    ]
    const randomImage = images[Math.floor(Math.random() * images.length)];

    return (
        <div className='my-3 mx-auto overflow-hidden px-2' >
            <ReusableCard
                img={car.main_image ? `${styles.imageUrl}${car.main_image}` : `${styles.imageUrl}${randomImage}`}
                distance={car.car_distance}
                title={car.name}
                price={car.car_price}
                year={car.car_year}
                location={car.car_location}
                ReadLink={`/car/${car.id}`}
            />
        </div>
    )
}
CarShow = React.memo(CarShow)
export default CarShow