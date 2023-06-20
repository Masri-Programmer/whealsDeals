import { createSlice } from "@reduxjs/toolkit";
import { getCars, PostCar } from "../../apis/Get";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        user: [],
        captchaResponse: null,
        isLoggedIn: false,
        isLoading: false,
        error: null,
    },
    reducers: {
        setUserProfile(state, action) { state.user = action.payload; },
        setCaptchaResponse(state, action) { state.captchaResponse = action.payload; },
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
    },
});

const carsSlice = createSlice({
    name: 'cars',
    initialState: {
        id: null,
        cart: [],
        data: [],
        categories: [],
        subcategories: [],
        subcategoriesIds: [],
        deleteShowModal: false,
        showCartModal: false,
        success: false,
        message: '',
        page: 1,
        params: '',
        isLoading: false,
        posted: null,
        error: null,
    },
    reducers: {
        incPage(state) { state.page += 1; },
        resetPage(state) { state.page = 1; },
        setParams: (state, action) => { state.params = action.payload; },
        setMessage: (state, action) => { state.message = action.payload; },
        setData(state, action) { state.data = action.payload; },
        setId(state, action) { state.id = action.payload; },
        setCart(state, action) { state.cart = action.payload; },
        setDeleteShowModal(state) { state.deleteShowModal = !state.deleteShowModal; },
        Alert(state) { state.success = !state.success; },
        setSuccess(state, action) { state.success = action.payload; },
        setShowCartModal(state) { state.showCartModal = !state.showCartModal; },
        setCategories(state, action) { state.categories = action.payload; },
        setSubCategories(state, action) { state.subcategories = action.payload; },
        setSubCategoriesIds(state, action) { state.subcategoriesIds = action.payload; },
        resetSubCategoriesIds: (state) => { state.subcategoriesIds = []; },
    },
    extraReducers(builder) {
        builder.addCase(getCars.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getCars.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(getCars.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

    }
});

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        data: [],
        modalDisplayPage: true,
        showModal: false,
        isLoading: false,
        alert: false,
        success: false,
        alertText: '',
        error: null,
    },
    reducers: {
        setShowModal(state) { state.showModal = !state.showModal; },
        setAlert(state) { state.alert = !state.alert; },
        setAlertText(state, action) { state.alertText = action.payload; },
        setAlertSuccess(state, action) { state.success = action.payload; },
        setModalDisplayPage(state) { state.modalDisplayPage = !state.modalDisplayPage; },
    },
});

export const {
    setShowModal,
    setAlert,
    setAlertText,
    setAlertSuccess,
    setModalDisplayPage,
} = homeSlice.actions;
export const homeReducer = homeSlice.reducer;

export const {
    setCategories,
    setSubCategories,
    setSubCategoriesIds,
    setData,
    incPage,
    setDeleteShowModal,
    Alert,
    setMessage,
    resetPage,
    setParams,
    setCart,
    setSuccess,
    setId,
    setShowCartModal,
    resetSubCategoriesIds,
} = carsSlice.actions;
export const carsReducer = carsSlice.reducer;

export const {
    login,
    logout,
    setIsLoggedIn,
    setUserProfile,
    setCaptchaResponse,
} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;