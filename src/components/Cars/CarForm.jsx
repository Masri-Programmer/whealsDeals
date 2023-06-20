import React, { useState, useEffect, useRef } from 'react'
import { Form, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getCarsCategories } from '../../utils/apis/Get';
import { setCategories, setSubCategories, resetSubCategoriesIds, setAlertSuccess, setAlertText, setAlert } from '@slices'
import { FormGroup, PageSlider, Button, FilterCars } from '@index';
import { png } from '@images'
import styles from '@style';
import { useThunk } from '../../utils/store/hooks/use-thunk'
import { PostCar, uploadFile } from '../../utils/apis/Get';

const CarForm = () => {
    const dispatch = useDispatch();
    const token = sessionStorage.getItem('token') ?? localStorage.getItem("token");
    const { categories, subcategories, subcategoriesIds, id } = useSelector((state) => state.cars);
    const postImageRef = useRef(null)
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [carName, setCarName] = useState(null);
    const [carNameError, setCarNameError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [maker, setMaker] = useState(null);
    const [makerError, setMakerError] = useState(false);
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(null);
    const [yearError, setYearError] = useState(false);
    const [distance, setDistance] = useState(null);
    const [price, setPrice] = useState(null);
    const [forSale, setForSale] = useState(null);
    const [forRent, setForRent] = useState(null);
    const [description, setDescription] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [subCat, setSubCat] = useState({});
    const isFormValid = !!(carName || maker || year || distance || price);

    const handleSubCatChange = (updatedSubCat) => {
        setSubCat(updatedSubCat);
    };
    const onDeleteFile = (fileId) => {
        setFiles(files.filter((data) => data.id == fileId));
        setSelectedFiles(selectedFiles.filter((data) => data.id == fileId));
    };
    const color = 'text-sky-700 text-capitalize w-100';
    useEffect(() => {
        setCarNameError(false)
        setMakerError(false)
        setYearError(false)
    }, [carName, maker, year]);

    // ...SUB CATEGORIES & CATEGORIES
    useEffect(() => {
        if (categories?.length === 0 || subcategories.length === 0) {
            getCarsCategories().then((data) => {
                if (data?.length !== 0) {
                    dispatch(setCategories(data.categories))
                    dispatch(setSubCategories(data.subgategories))
                } else return;
            })
        }
    }, []);

    const itemsHandler = (e) => {
        const newFiles = Array.from(e.target.files);
        setFiles([...files, ...newFiles]);

        const images = newFiles.filter((file) => file.type.startsWith("image/"));
        const imagesData = images.map((image) => {
            return {
                name: image.name,
                type: image.type,
                data: new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(image);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                }),
            };
        });

        Promise.all([
            Promise.all(
                imagesData.map((imageData) => imageData.data.then((data) => {
                    return {
                        name: imageData.name,
                        type: imageData.type,
                        data: data.split(",")[1],
                    };
                }))
            ),
        ]).then(([base64Images]) => {
            setSelectedFiles((prevSelectedFiles) =>
                prevSelectedFiles.concat([...base64Images])
            );
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!carName || !maker || !year) {
            setCarNameError(true);
            setMakerError(true);
            setYearError(true);
            return;
        }
        PostCar({
            token,
            carName,
            maker,
            year,
            distance,
            price,
            forSale,
            forRent,
            description,
            image: selectedFiles[0]?.name,
            quantity,
            subCat
        })
            .then((data) => {
                files.map((file) => {
                    uploadFile({ id: data.car.id, token, file, tableId: 3 });
                });
            })
            .finally(() => {
                dispatch(setAlert());
                dispatch(setAlertText('Successfully added'));
                dispatch(setAlertSuccess(true));
            });
    };

    const renderedFilter = categories?.map((category, index) => (
        <FilterCars
            subCat={subCat} setSubCat={handleSubCatChange}
            key={index}
            category={category} />
    ));

    return (
        <div className='bg-white rounded p-3 m-2'>
            <h4 className='text-medium '>
                Enter your Car Details
            </h4>
            <hr />
            <div className="mt-5">
                <div className="">
                    <div className=" pb-4 ">
                        <div className="position-relative cursor-pointer" onClick={() => { postImageRef.current.click() }}>
                            <PageSlider onDeleteFile={onDeleteFile} files={selectedFiles} />
                            <Form.Control
                                type="file"
                                multiple
                                size="lg"
                                style={{ display: "none" }}
                                ref={postImageRef}
                                onChange={itemsHandler}
                                accept="image/*"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            {/* {errMsg && (<p ref={errRef} className="w-100 text-regular text-white bg-danger rounded p-2 text-uppercase" aria-live="assertive">{errMsg}</p>)}
        {success && (<p ref={errRef} className="w-100 text-regular text-white bg-success  rounded p-2 text-uppercase" aria-live="assertive">{success}</p>)} */}
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-7">
                    {renderedFilter}
                    <button role="button" className={styles.button} onClick={() => {
                        dispatch(resetSubCategoriesIds());
                        setSubCat({})
                    }
                    }>
                        Reset Filters
                    </button>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Car Name
                                {carNameError && (
                                    <span className="text-danger"> * required field</span>
                                )}
                                <Form.Control
                                    type="text"
                                    placeholder="Car Name"
                                    id="carName"
                                    required
                                    autoComplete="off"
                                    onChange={(e) => setCarName(e.target.value)}
                                    value={carName}
                                />
                            </Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className={`${color}`}>
                                Maker
                                {makerError && (
                                    <span className="text-danger"> * required field</span>
                                )}
                                <Form.Control
                                    type="text"
                                    placeholder="BMW, Mercedes..."
                                    id="maker"
                                    required
                                    autoComplete="on"
                                    onChange={(e) => setMaker(e.target.value)}
                                    value={maker}
                                />
                            </Form.Label>
                        </Form.Group>

                        <div className="row">
                            <div className="col-6">

                                <Form.Group className="mb-3">
                                    <Form.Label className={`${color}`}>
                                        Year
                                        {yearError && (
                                            <span className="text-danger"> * required field</span>
                                        )}
                                        <Form.Control
                                            type="number"
                                            placeholder="Year"
                                            id="year"
                                            required
                                            autoComplete="off"
                                            min="2000"
                                            max="2023"
                                            onChange={(e) => setYear(e.target.value)}
                                            value={year}
                                        />
                                    </Form.Label>
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Form.Group className="mb-3">
                                    <Form.Label className={`${color}`}>
                                        Distance
                                        <Form.Control
                                            type="text"
                                            placeholder="Distance"
                                            id="distance"
                                            required
                                            autoComplete="off"
                                            onChange={(e) => setDistance(e.target.value)}
                                            value={distance}
                                        />
                                    </Form.Label>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <Form.Group className="mb-3">
                                    <Form.Label className={`${color}`}>
                                        Quantity
                                        <Form.Control
                                            type="number"
                                            placeholder="Quantity"
                                            id="quantity"
                                            autoComplete="off"
                                            onChange={(e) => setQuantity(e.target.value)}
                                            value={quantity}
                                        />
                                    </Form.Label>
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Form.Group className="mb-3">
                                    <Form.Label className={`${color}`}>
                                        Price
                                        <Form.Control
                                            type="text"
                                            placeholder="Price"
                                            id="price"
                                            required
                                            autoComplete="off"
                                            onChange={(e) => setPrice(e.target.value)}
                                            value={price}
                                        />
                                    </Form.Label>
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 col-sm-12">
                                <Form.Group className="mb-3">
                                    <Form.Label className={`${color}`}>
                                        Description
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Description"
                                            id="description"
                                            onChange={(e) => setDescription(e.target.value)}
                                            value={description}
                                        />
                                    </Form.Label>
                                </Form.Group>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-sm-6 d-flex gap-4">
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        id="forSale"
                                        label="For Sale"
                                        checked={forSale}
                                        onChange={(e) => { setForSale(e.target.checked); setForRent(null) }}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        id="forRent"
                                        label="For Rent"
                                        checked={forRent}
                                        onChange={(e) => { setForSale(null); setForRent(e.target.checked) }}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="d-flex gap-3 mx-auto justify-conent-end w-100">
                            <Button
                                className={styles.button}
                                disable={isLoading || !isFormValid}
                                loading={isLoading}
                                onClick={handleSubmit}
                                type="Submit"
                            >
                                Save
                            </Button>
                            <button role="button" className={styles.button} onClick={(e) => {
                                e.preventDefault();
                                setFiles(null)
                                setSelectedFiles(null)
                                setCarName(null)
                                setMaker(null)
                                setYear(null)
                                setDistance(null)
                                setPrice(null)
                                setForSale(null)
                                setForRent(null)
                                setDescription(null)
                                setQuantity(null)
                            }}>Cancel</button>
                        </div>
                    </Form>
                </div>
            </div>

        </div>
    )
}

export default CarForm