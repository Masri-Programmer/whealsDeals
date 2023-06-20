import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { CarShow, FilterCars, ButtonLoad, SectionLayout, SearchLayout, CardSkeleton, SearchInput } from '@index'
import styles from '@style'
import { getCarsCategories, fetchCars, getCars } from '../utils/apis/Get'
import { useDispatch, useSelector } from 'react-redux'
import { setCategories, setSubCategories, setData, resetPage, incPage, setParams, resetSubCategoriesIds } from '@slices'
import { useThunk } from '../utils/store/hooks/use-thunk'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


const Buy = () => {
    const dispatch = useDispatch();
    const [doGetCars, isLoadingCars, loadingCarsError] = useThunk(getCars);
    const { data, page, params, categories, subcategories, subcategoriesIds } = useSelector((state) => state.cars);
    const [search, setSearch] = useState('');
    const [changed, setChanged] = useState(false);
    const [subcategoriesNames, setSubcategoriesNames] = useState([]);
    const [loadButtonDisabled, setLoadButtonDisabled] = useState(false);
    const skeletonsRef = useRef([]);
    const [subCat, setSubCat] = useState({});
    const [min, setMin] = React.useState(0);
    const [max, setMax] = React.useState(200000);

    useEffect(() => {
        doGetCars({ page: 1, params, ids: subcategoriesIds, isBuy: 1, min, max })
        dispatch(resetSubCategoriesIds())
    }, []);

    // ...GET CARS
    useEffect(() => {
        doGetCars({ page: 1, params, ids: subcategoriesIds, isBuy: 1, min, max })
        if (changed) {
            doGetCars({ page, params, ids: subcategoriesIds, isBuy: 1, min, max })
            dispatch(resetPage())
            setChanged(false)
        }
        else {
            return;
        }
    }, [subcategoriesIds, min, max]);

    // ...INFINITE SCROLL
    const fetchMoreData = () => {
        fetchCars({ page: page + 1, params, ids: subcategoriesIds, isBuy: 1, min, max })
            .then((newData) => {
                dispatch(setData([...data, ...newData]));
                dispatch(incPage());
            });
    };


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

    // ...  SUB CATEGORIES NAMES
    useEffect(() => {
        const newSubcategoriesNames = subcategoriesIds.reduce((acc, id) => {
            const subcategory = subcategories.find(subcat => subcat.id === id);
            if (subcategory) {
                acc.push(subcategory.name);
            }
            return acc;
        }, []);
        setSubcategoriesNames(newSubcategoriesNames);
    }, [subcategoriesIds, subcategories]);

    useEffect(() => {
        setChanged(true)
    }, [subcategoriesIds])

    // ...RESET 
    const handleReset = (() => {
        dispatch(resetSubCategoriesIds())
        dispatch(resetPage())
        dispatch(setParams(''))
    });

    // ...SEARCH
    const handleSubmit = (d) => {
        dispatch(setParams(d))
        setSearch(d)
        doGetCars({ page: 1, params: d, ids: subcategoriesIds, isBuy: 1, min, max })
        dispatch(resetPage())
    }

    // ...RENDER CATEGORIES & SUBCATEGORIES
    const handleSubCatChange = (updatedSubCat) => {
        setSubCat(updatedSubCat);
    };
    const renderedFilter = categories?.map((category, index) => (
        <FilterCars
            subCat={subCat} setSubCat={handleSubCatChange}
            key={index}
            category={category} />
    ));

    const numSkeletons = 12;
    useEffect(() => {
        skeletonsRef.current = [];
        for (let i = 0; i < numSkeletons; i++) {
            skeletonsRef.current.push(<CardSkeleton key={i} />);
        }
    }, [numSkeletons]);

    const content = isLoadingCars ? (
        <div className="d-flex flex-wrap gap-3">{skeletonsRef.current}</div>
    ) :
        loadingCarsError ? (
            <div className="text-lg font-extrabold text-white">
                Error fetching data...</div>
        ) : (
            <div className="d-flex flex-wrap">
                {data?.map((car, index) => (
                    <CarShow car={car} key={index} />
                ))}
            </div>
        );
    return (
        <SectionLayout section={"Pick your own Wheels"} >
            <SearchLayout
                search={<SearchInput onSubmit={handleSubmit} />}
                handleReset={handleReset}
            >
                {renderedFilter}
                <FormControl fullWidth classname="mt-2">
                    <InputLabel htmlFor="outlined-adornment-amount">From</InputLabel>
                    <OutlinedInput
                        onChange={(e) => setMin(e.target.value)}
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="From"
                    />
                </FormControl>

                <FormControl fullWidth classname="mt-2">
                    <InputLabel htmlFor="outlined-adornment-amount">To</InputLabel>
                    <OutlinedInput
                        onChange={(e) => setMax(e.target.value)}
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="To"
                    />
                </FormControl>
            </SearchLayout>

            <div className={`${styles.grid_col}`}>
                {content}
                {data?.length === 0 || loadingCarsError ? null :
                    <>
                        {data?.length < 12 ? null :
                            < ButtonLoad
                                // classes={`${styles.load_more}`}
                                loading={isLoadingCars}
                                onClick={fetchMoreData}
                            />
                        } </>
                }
            </div>
        </SectionLayout>
    )
}
export default Buy
