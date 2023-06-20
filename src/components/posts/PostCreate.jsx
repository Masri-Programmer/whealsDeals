import axios from 'axios';
import styles from '@style';
import Form from 'react-bootstrap/Form';
import TextField from '@mui/material/TextField';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { getCountries, createPost, getUsers } from '@get';
import { setShowModal } from '../../utils/store/slices/Slices';
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { setData, setMedia } from '../../utils/store/slices/PostsSlice';
import { OptionDropdown, Button, ModalCountries, LoaderAnimation } from '@index'
import { userImage, worldMap, postButtons1, postButtons2, postButtons3, deleteIcon } from '@images'

const PostCreate = () => {
    const dispatch = useDispatch();
    const postVideoRef = useRef(null)
    const postImageRef = useRef(null)
    const main_image = useSelector((state) => state.users.user?.main_image)
    const { data, media, countries } = useSelector((state) => state.posts)
    const [selection, setSelection] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('Public');
    const [allCountries, setAllCountries] = useState([]);
    const [content, setContent] = useState('');
    const [progress, setProgress] = useState(0);
    const [files, setFiles] = useState([]);
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [showMentions, setShowMentions] = useState(false);

    useEffect(() => {
        getUsers(searchTerm).then((data) => setUsers(data))
    }, [searchTerm]);

    const highlightMentions = (inputValue) => {
        const regex = /@(\w+)/g;
        const highlightedValue = inputValue.replace(regex, '<span class="highlight">$&</span>');
        return highlightedValue;
    };

    const handleUserClick = (user) => {
        const inputElement = document.getElementById('input');
        const value = inputElement.value;
        const start = inputElement.selectionStart;
        const end = inputElement.selectionEnd;

        // Find the word that contains the cursor position
        const wordStart = value.lastIndexOf(' ', start - 1) + 1;
        const wordEnd = value.indexOf(' ', end);
        const word = value.substring(wordStart, wordEnd !== -1 ? wordEnd : value.length);

        // Replace the word with the user's name
        // const newValue = value.substring(0, wordStart) + `<span class="highlight">@${user.first_name} ${user.last_name}</span> ` + value.substring(end);
        const newValue = value.substring(0, wordStart) + `@${user.first_name} ${user.last_name} ` + value.substring(end);
        inputElement.innerHTML = highlightMentions(newValue);
        // inputElement.value = newValue;
        setContent(newValue);
        setSearchTerm('');
        setShowMentions(false);
    };

    // ...HANDLE INPUT...
    const handleInputChange = (event) => {
        const value = event.target.value;
        setContent(value);
        const index = value.lastIndexOf('@', event.target.selectionStart - 1);
        if (index >= 0 && value.substring(index + 1, event.target.selectionStart).match(/^\S+$/)) {
            setShowMentions(true);
            setSearchTerm(value.substring(index + 1, event.target.selectionStart));
        } else {
            setShowMentions(false);
            setSearchTerm('');
        }
    }


    // ...UPLOAD FILES  
    const uploadFile = async ({ file, postId, token }) => {
        let formData = new FormData();
        formData.append(`file`, file);
        formData.append(`post_id`, postId);
        formData.append(`token`, token);
        try {
            const response = await axios.post(
                `${styles.base_url}/v1_0_0-posts/upload-file`,
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        const currentProgress = Math.round(
                            (100 * progressEvent.loaded) / totalSize
                        );

                        setProgress((prevProgress) =>
                            currentProgress > prevProgress ? currentProgress : prevProgress
                        );
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to upload file");
        }
    };

    useEffect(() => {
        getCountries().then((data) => setAllCountries(data));
    }, []);

    // ----------------------
    // OPTIONS...
    // ----------------------
    const handleSelect = (option) => {
        if (option.label == 'Countries') {
            setOpen(true);
            setSelectedValue('Countries')
        } else {
            setSelectedValue('Public')
        }
        setSelection(option);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };
    const options = [
        { label: 'Public', value: 'Public', img: <img src={postButtons3} className="mx-1" alt="earth  icon" /> },
        { label: 'Countries', value: 'Countries', img: <img src={worldMap} className="mx-1" alt="map  icon" /> },
    ];

    // ----------------------
    // FILE HANDLER...
    // ----------------------

    const itemsHandler = (e) => {
        const newFiles = Array.from(e.target.files);
        setFiles([...files, ...newFiles]);

        const images = newFiles.filter((file) => file.type.startsWith("image/"));
        const videos = newFiles.filter((file) => file.type.startsWith("video/"));
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

        const videosData = videos.map((video) => {
            return {
                name: video.name,
                type: video.type,
                data: new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(video);
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
            Promise.all(
                videosData.map((videoData) => videoData.data.then((data) => {
                    return {
                        name: videoData.name,
                        type: videoData.type,
                        data: data.split(",")[1],
                    };
                }))
            ),
        ]).then(([base64Images, base64Videos]) => {
            setSelectedFiles((prevSelectedFiles) =>
                prevSelectedFiles.concat([...base64Images, ...base64Videos])
            );
        });
    };


    // ----------------------
    // DLETE IMAGE OR VIDEO...
    // ----------------------

    const handleDelete = (index) => {
        setSelectedFiles((prevSelectedFiles) =>
            prevSelectedFiles.filter((file, i) => i !== index)
        );
        setFiles((prevFiles) =>
            prevFiles.filter((file, i) => i !== index)
        );
    };
    // ----------------------
    // CREATE POST...
    // ----------------------
    let countries_allowed;
    if (selectedValue == 'Public') {
        countries_allowed = 'General'
    } else {
        countries_allowed = countries
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (content !== '' || selectedFiles.length > 0) {
            try {
                const newData = await createPost({ token, description: content, countries_allowed });
                const uploadPromises = files.map((file) => {
                    setFileLoading(true);
                    return uploadFile({ file, postId: Number(newData.post_id), token })
                        .then((data) => {
                            return data.attachment;
                        });
                });
                Promise.all(uploadPromises).then((attachments) => {
                    dispatch(setMedia([...media, ...attachments]));
                    setFileLoading(false);
                    setProgress(0);
                    setIsLoading(false);
                    dispatch(setData([newData.post, ...data]));
                    setContent('');
                    setSelectedValue('Public');
                    setSelectedFiles([]);
                    setFiles([]);
                });

            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        } else {
            alert("Content and/or items cannot be empty.");
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Form>
                <div className="post bg-light w-100 rounded p-3">
                    <div className="d-flex align-items-center pb-4 mx-3 border-bottom">
                        <img
                            src={main_image ? `${styles.imageUrl}${main_image}` : userImage}
                            alt="Profile"
                            className="profile-img-inner rounded-circle"
                            style={{ border: "1px solid #888888", height: '75px', width: '75px', }}
                        />
                        <div className="flex-grow-1 ms-3">
                            <TextField
                                id="input"
                                label="Share what's on your mind?"
                                multiline
                                maxRows={4}
                                value={content}
                                className='w-100'
                                onChange={handleInputChange}
                            />
                            {showMentions && (
                                <Dropdown className='mention'>
                                    {users.length > 0 && (<Dropdown.Menu show>
                                        {users.map(user => (
                                            <Dropdown.Item key={user.user_id}
                                                onClick={() => handleUserClick(user)}
                                            >
                                                {user.first_name} {user.last_name}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>)}
                                </Dropdown>
                            )}
                            {fileLoading && (<LinearProgress variant="determinate" value={progress * files?.length} />)}
                            {/* <img src={postButtons4} alt="happy face icon" classisLoadingsubiName='happyFace position-absolute top-50 start-100 translate-middle' /> */}
                        </div>
                    </div>

                    <div className="d-flex flex-wrap post-buttons w-100 flex-row-reverse mt-3 text-regular">
                        <div className="p-2 ">
                            <Button className='postButton zoomOnHover bg-sky-200 p-4 py-2  rounded border-0 ' disable={isLoading} loading={isLoading} onClick={isLoggedIn ? handleSubmit : (event) => {
                                event.preventDefault();
                                dispatch(setShowModal())
                            }}>
                                Post
                            </Button>
                        </div>
                        <div className="p-2 d-flex  ">
                            <OptionDropdown
                                selectedValue={selectedValue}
                                options={options}
                                value={selection}
                                onChange={handleSelect}
                            />
                        </div>
                        <div className="p-2 ">
                            <Form.Group
                                className="bg-sky-200 zoomOnHover rounded border-0 px-3 pb-1 pt-2"
                                onClick={() => postVideoRef.current.click()}>
                                <Form.Label className="cursor-pointer ">
                                    <div className="flex gap-1 " role="button">
                                        <img src={postButtons2} className='me-1' alt="icon image" />
                                        Video
                                    </div>
                                </Form.Label>
                                <Form.Control
                                    type="file"
                                    multiple
                                    size="lg"
                                    style={{ display: "none" }}
                                    ref={postVideoRef}
                                    onChange={itemsHandler}
                                    accept="video/*"
                                />
                            </Form.Group>
                        </div>
                        <div className="p-2  cursor-pointer">
                            <Form.Group
                                className={`bg-sky-200 zoomOnHover rounded border-0 px-3 pb-1 pt-2`}
                                onClick={() => postImageRef.current.click()}>
                                <Form.Label className="cursor-pointer flex">
                                    <div className='flex gap-1' role="button">
                                        <img src={postButtons1} className='me-1' alt="icon image" />
                                        Image
                                    </div>
                                </Form.Label>
                                <Form.Control
                                    type="file"
                                    multiple
                                    size="lg"
                                    style={{ display: "none" }}
                                    ref={postImageRef}
                                    onChange={itemsHandler}
                                    accept="image/*"
                                />
                            </Form.Group>

                        </div>
                    </div>
                    <ul className='d-flex imageList flex-wrap mx-auto justify-content-start'>
                        {selectedFiles && selectedFiles.map((item, index) => (
                            <li key={index} className="cursor-pointer mt-4 position-relative mx-2"
                            >
                                <img
                                    style={{ width: "30px", height: "20px" }}
                                    src={deleteIcon}
                                    className="position-absolute rounded top-0 start-0 translate-middle delete-icon"
                                    alt="Delete bin"
                                    onClick={() => handleDelete(index)}
                                />
                                {item.type.startsWith("image/") ? (
                                    <img
                                        className="boxImg h-100 w-100 rounded img-fluid"
                                        src={`data:${item.type};base64,${item.data}`} />
                                ) : (
                                    <video
                                        className="boxImg h-100 w-100 rounded img-fluid"
                                        controls>
                                        <source
                                            src={`data:${item.type};base64,${item.data}`}
                                            type={item.type}
                                        />
                                    </video>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </Form>
            <ModalCountries
                AllCountries={allCountries}
                selectedValue={selectedValue}
                onClose={handleClose}
                open={open}
            />
        </div >
    )
}

export default PostCreate