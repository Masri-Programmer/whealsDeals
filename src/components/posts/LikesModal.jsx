import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@style';
import { incrementLikerPage, setLikers, setLoadButton } from '../../utils/store/slices/PostsSlice';
import { getLikers, } from '@get';
import { LoaderAnimation } from '@index'

function LikesModal(props) {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const { likers, likerPage, loadButton } = useSelector((state) => state.posts)
    const { onClose, open, postId } = props;


    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = () => {
        setIsLoading(true)
        const page = likerPage + 1
        getLikers(page, postId).then((data) => {
            if (data.length > 0) {
                dispatch(setLikers([...likers, ...data]));
                dispatch(incrementLikerPage());
                setIsLoading(false)
            } else {
                dispatch(setLoadButton());
                setIsLoading(false)
            }
        })
    };
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle ><span className='text-heavy-metal text-heavy-font text-black text-uppercase'> Likers</span></DialogTitle>
            <List sx={{ pt: 0 }}>
                {likers.map((user, index) => (
                    <ListItem disableGutters>
                        <ListItemButton onClick={() => handleListItemClick(user)} key={index}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                    {user.main_image ?
                                        <img src={`${styles.base_url}${user.main_image}`} alt="user profile" className='profile-img-inner' />
                                        : <PersonIcon />}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={
                                <span className='text-capitalize'>
                                    {user.first_name || user.last_name ? `${user.first_name} ${user.last_name}` : user.user_name}
                                    {user.name && ` - ${user.name}`}
                                </span>
                            }
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
                {loadButton && (<ListItem disableGutters>
                    <ListItemButton
                        autoFocus
                        onClick={() => handleListItemClick()}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Load More" />
                    </ListItemButton>
                </ListItem>)}
                {isLoading && (<LoaderAnimation />)}
            </List>
        </Dialog>
    );
}
export default LikesModal;
