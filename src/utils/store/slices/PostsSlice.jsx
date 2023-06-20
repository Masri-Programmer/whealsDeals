import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts, getPostFiles } from "../../apis/Get";

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        data: [],
        media: [],
        countries: [],
        likers: [],
        files: null,
        postId: null,
        page: 1,
        likerPage: 1,
        progress: 0,
        showModal: false,
        showReportModal: false,
        loadButton: true,
        isLoading: false,
        error: null,
        token: null,
    },
    reducers: {
        setData: (state, action) => { state.data = action.payload },
        setCountries: (state, action) => { state.countries = action.payload },
        setLikers: (state, action) => { state.likers = action.payload },
        setMedia: (state, action) => { state.media = action.payload },
        setPostId: (state, action) => { state.postId = action.payload },
        setShowModal: (state) => { state.showModal = !state.showModal },
        setShowReportModal: (state) => { state.showReportModal = !state.showReportModal },
        setLoadButton: (state) => { state.loadButton = !state.loadButton },
        incrementPage: (state) => { state.page += 1; },
        incrementLikerPage: (state) => { state.likerPage += 1; },
        resetPage: (state) => { state.page = 1; },
    },
    extraReducers(builder) {
        builder.addCase(getPosts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.data = action.payload;
            action.payload.map((post) => {
                if (post.file_path != null) {
                    getPostFiles(Number(post.id)).then((newData) => {
                        state.media.push(newData)
                    });
                }
            });
            state.isLoading = false;
        });

        builder.addCase(getPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const { incrementPage, resetPage, setData, setShowModal, setShowReportModal, setPostId, setMedia, setCountries, setLikers, incrementLikerPage, setLoadButton, } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;