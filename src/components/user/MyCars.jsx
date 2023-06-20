import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LoaderAnimation, CarCard } from '@index';
import { getUserCars, deleteMyCar } from '../../utils/apis/Get';
import { setDeleteShowModal, setId, setAlert, setAlertText, setAlertSuccess } from '@slices'

const MyCars = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const token = sessionStorage.getItem('token') ?? localStorage.getItem("token");
    const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

    // ...GET CARS
    useEffect(() => {
        getUserCars(token).then((newData) => {
            setData(newData)
            setIsLoading(false);
        });
    }, []);

    const handleConfirm = (id) => {
        deleteMyCar(id).then((res) => {
            if (res.succeeded) {
                const updatedItems = data.filter((item) => item.id !== id);
                setData(updatedItems);
                dispatch(setAlert());
                dispatch(setAlertText('Successfully deleted'));
                dispatch(setAlertSuccess(true));
            } else {
                dispatch(setAlert());
                dispatch(setAlertText('failed to delete'));
                dispatch(setAlertSuccess(false));
            }
        })
    };


    const content = isLoading ? <LoaderAnimation /> : data?.map((car) => {
        return (
            <div key={car.id}>
                <CarCard
                    inBox={true}
                    id={car.id}
                    onClick={() => handleConfirm(car.id)}
                    data={car}
                    ReadLink={`/car/${car.id}`}
                />
            </div>)
    });

    if (isLoggedIn) {
        return (
            <div>{content}</div>
        )
    } else { return; }
}

export default MyCars