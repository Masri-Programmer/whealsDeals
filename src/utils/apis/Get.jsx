import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import styles from '@style'
const base_url = `${styles.base_url}`;

// ...CALC TIME
export function getTimeDifference(date) {
    const given = new Date(date);
    const offset = given.getTimezoneOffset() * 60 * 1000;
    const localDate = new Date(given.getTime() - offset);

    const now = new Date();
    const diff = now.getTime() - localDate.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months > 0) {
        return months === 1 ? "1 month ago" : `${months} months ago`;
    }
    if (days > 0) {
        return days === 1 ? "1 day ago" : `${days} days ago`;
    }
    if (hours > 0) {
        return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    }
    if (minutes > 0) {
        return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    }
    return `${seconds} seconds ago`;
}



// ------------------
// .....CARS.........
// ------------------
const getCars = createAsyncThunk('cars/get', async ({ page, params, ids, isBuy, min, max }) => {
    try {
        const queryParams = encodeURIComponent(params);
        const response = await axios.get(`${base_url}/cars/get-cars?page=${page}&q=${params}&cats=${ids}&isBuy=${isBuy}&min=${min}&max=${max}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
});

const fetchCars = async ({ page, params, ids, isBuy, min, max }) => {
    try {
        const queryParams = encodeURIComponent(params);
        const response = await axios.get(`${base_url}/cars/get-cars?page=${page}&q=${params}&cats=${ids}&isBuy=${isBuy}&min=${min}&max=${max}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getCarsCategories = async () => {
    const response = await axios.get(`${base_url}/cars/get-cars-categories`);
    return response.data;
}

const getCar = async (id) => {
    let formData = new FormData();
    formData.append("id", id);
    const response = await axios.post(`${base_url}/cars/get-car-by-id`, formData);
    return response.data;
};

// DELETE car
const deleteCar = async (car_id, token = "", session_id = "") => {
    try {
        const formData = new FormData();
        formData.append("car_id", car_id);
        if (token && token !== "null" && token !== "undefined") { formData.append("token", token); }
        if (session_id && session_id !== "null" && session_id !== "undefined") { formData.append("session_id", session_id); }
        const response = await axios.post(
            `${styles.base_url}/cars/delete-car`, formData);
        return response.data;
    } catch (error) {
        console.error("Failed to delete car", error);
        return { succeeded: false };
    }
};


const PostCar = async (
    { token,
        carName,
        maker,
        year,
        distance,
        price,
        forSale,
        forRent,
        description,
        image,
        quantity,
        subCat }) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("name", carName);
    formData.append("car_maker", maker);
    formData.append("car_year", year);
    formData.append("car_distance", distance);
    formData.append("car_price", price);
    formData.append("car_rental_price", price);
    if (forSale) {
        formData.append("car_for_sale", 1);
    } else {
        formData.append("car_for_sale", 0);
    }
    formData.append("car_description", description);
    formData.append("image", image);
    formData.append("quantity", quantity);
    formData.append("search_criteria", JSON.stringify(subCat));
    const response = await axios.post(`${base_url}/cars/post-car`, formData);
    return response.data;
};



// ------------------
// .....POSTS........
// ------------------
// ...POSTS 
const getPosts = createAsyncThunk('posts/get', async ({ page, userId }) => {
    let formData = new FormData();
    formData.append("page", page);
    formData.append("userId", userId);
    const response = await axios.post(`${base_url}/posts/get-posts`, formData);
    return response.data;
});

const getPostFiles = async (postId) => {
    const response = await axios.post(`${base_url}/posts/get-post-files?post_id=${postId}`);
    return response.data;
};

const fetchPosts = async ({ page, userId }) => {
    let formData = new FormData();
    formData.append("page", page);
    formData.append("userId", userId);
    const response = await axios.post(`${base_url}/posts/get-posts`, formData);
    return response.data;
};

const createPost = async ({ token, description, countries_allowed }) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("description", description);
    formData.append("countries_allowed", countries_allowed);
    try {
        const response = await axios.post(`${base_url}/posts/create-post`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create post");
    }
};
const uploadFile = async ({ file, id, token, tableId }) => {
    let formData = new FormData();
    formData.append(`file`, file);
    formData.append(`id`, id);
    formData.append(`token`, token);
    formData.append(`tableId`, tableId);
    try {
        const response = await axios.post(`${base_url}/cars/upload-file`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to upload file");
    }
};

const getCountries = async () => {
    const response = await axios.get(`${base_url}/posts/get-countries`);
    return response.data;
}
const deletePost = async (token, postId) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("post_id", postId);
    const response = await axios.post(`${base_url}/posts/delete-post`, formData);
    return response.data;
};

const likePost = async (token, postId) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("post_id", postId);
    const response = await axios.post(`${base_url}/posts/like-post`, formData);
    return response.data;
};
const dislikePost = async (token, postId) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("post_id", postId);
    const response = await axios.post(`${base_url}/posts/dislike-post`, formData);
    return response.data;
};
const reportPost = async ({ userId, post_id, report }) => {
    let formData = new FormData();
    formData.append("reporter", userId);
    formData.append("post_id", post_id);
    formData.append("report", report);
    const response = await axios.post(`${base_url}/posts/report-post`, formData);
    return response.data;
};
const getLikers = async (page, post_id) => {
    let formData = new FormData();
    formData.append("page", page);
    formData.append("post_id", post_id);
    const response = await axios.post(`${base_url}/posts/get-likers`, formData);
    return response.data;
};

const getComments = async (page, post_id, token) => {
    let formData = new FormData();
    formData.append("page", page);
    formData.append("post_id", post_id);
    formData.append("token", token);
    const response = await axios.post(`${base_url}/posts/get-comments`, formData);
    return response.data;
};


const createComment = async ({ token, post_id, comment }) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("post_id", post_id);
    formData.append("comment", comment);
    try {
        const response = await axios.post(`${base_url}/posts/create-comment`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create comment");
    }
};

const deleteComment = async ({ token, comment_id }) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("comment_id", comment_id);
    try {
        const response = await axios.post(`${base_url}/posts/delete-comment`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete comment");
    }
};

const replyComment = async (token, comment_id, reply) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("comment_id", comment_id);
    formData.append("reply", reply);
    try {
        const response = await axios.post(`${base_url}/posts/reply-comment`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to reply");
    }
};

const likeComment = async (token, comment_id, post_id) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("comment_id", comment_id);
    formData.append("post_id", post_id);
    try {
        const response = await axios.post(`${base_url}/posts/like-comment`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to like");
    }
};

const dislikeComment = async (token, comment_id, post_id) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("comment_id", comment_id);
    formData.append("post_id", post_id);
    try {
        const response = await axios.post(`${base_url}/posts/dislike-comment`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to dislike");
    }
};

const translate = async (text, lang) => {
    let formData = new FormData();
    formData.append("text", text);
    formData.append("lang", lang);
    try {
        const response = await axios.post(`${base_url}/posts/translate`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to translate");
    }
};

const getUsers = async (text) => {
    let formData = new FormData();
    formData.append("user_name", text);
    try {
        const response = await axios.post(`${base_url}/posts/get-users`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get users");
    }
};

const getCart = async (token, session_id) => {
    try {
        let formData = new FormData();
        if (token) {
            formData.append("token", token);
        }
        if (session_id) {
            formData.append("session_id", session_id);
        }
        const response = await axios.post(`${base_url}/cars/get-cart`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const editProfile = async (token, first_name, last_name, email, mobile_number, country, file) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("phone_number", mobile_number);
    formData.append("country", country);
    formData.append("file", file);
    const response = await axios.post(`${base_url}/users/edit-profile`, formData);
    return response.data;
};
const getUserPosts = async (token) => {
    let formData = new FormData();
    formData.append(`token`, token);
    const response = await axios.post(`${base_url}/users/get-user-posts`, formData);
    return response.data;
};

const getUserCars = async (token) => {
    let formData = new FormData();
    formData.append(`token`, token);
    const response = await axios.post(`${base_url}/cars/get-user-cars`, formData);
    return response.data;
};
const deleteMyCar = async (id) => {
    let formData = new FormData();
    formData.append(`id`, id);
    const response = await axios.post(`${base_url}/cars/delete-my-car`, formData);
    return response.data;
};
// ...users
export { editProfile, getUserPosts, getCart, getUserCars, deleteMyCar }
// ...cars
export { getCarsCategories, getCars, fetchCars, getCar, deleteCar, PostCar }
// ...posts
export { createComment, createPost, deleteComment, deletePost, dislikeComment, dislikePost, fetchPosts, getComments, getCountries, getLikers, getPostFiles, getPosts, getUsers, likeComment, likePost, replyComment, reportPost, translate, uploadFile }
