import React, { useEffect } from 'react'
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Link } from 'react-router-dom';
import { userImage, logoutImg, ChangePassword, dashboard } from '@images';
import { setUserProfile, logout } from '@slices';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@style';

const UserTooltip = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const userName = localStorage.getItem("user_name");
  const user = useSelector((state) => state.users.user)
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    localStorage.setItem("token", null);
    localStorage.setItem("user_id", null);
    localStorage.setItem("user_name", null);
    sessionStorage.setItem("token", null);
    sessionStorage.setItem("isSignedIn", null);
    dispatch(logout());
    dispatch(setUserProfile(null))
  }
  return (
    <div>
      <ClickAwayListener
        onClickAway={handleTooltipClose}>
        <div>
          <Tooltip
            arrow
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={<>
              <div className="d-flex container rounded">
                <div className="flex-shrink-0">
                  <div id="profile-img" >
                    <img
                      src={user.main_image ? `${styles.imageUrl}${user.main_image}` : userImage} style={{ height: '75px', width: '75px', borderRadius: '75px' }}
                      alt="profile" className='profile-img-inner' />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3 me-5 text-break">
                  <div className='container mb-3'>
                    {userName !== null && (<div className='mt-1 text-capitalize'><h6><strong>{userName}</strong></h6></div>)}
                    <Link to={"/profile"}>
                      <div className='mt-1 text-uppercase'>view profile </div>
                    </Link>
                    <div className='mt-1' role="button" onClick={handleLogout}>
                      logout </div>
                  </div>
                </div>
              </div>
              <div className='bg-river tooltip-options rounded-bottom w-100'>
                <Link to={"/change-password"}>
                  <div className="d-flex">
                    <div className="p-2 flex-grow-1 text-uppercase roboto">
                      change-password
                    </div>
                    <div className=" p-2"><img src={ChangePassword} className='mb-1' alt="Forget pwd" /></div>
                  </div>
                </Link>
              </div>
            </>}
          >
            <button className='btn border-0' onClick={handleTooltipOpen}>
              <div id="profile-img" >
                <img src={user.main_image ? `${styles.imageUrl}${user.main_image}` : userImage} style={{ height: '45px', width: '45px', borderRadius: '75px' }} alt="profile" className='profile-img-inner' />
              </div>
            </button>
          </Tooltip>
        </div>
      </ClickAwayListener>
    </div>
  )
}

export default UserTooltip