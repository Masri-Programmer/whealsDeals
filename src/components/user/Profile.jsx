import React from 'react'
import { SectionLayout, PersonalInformation, MyPosts, MyCars } from '@index'
import { myGameWall, userImage2, userImagSmall } from '@images'

const Profile = () => {
    const [clicked, setClicked] = React.useState(true)
    const [clicked2, setClicked2] = React.useState(false)
    const [clicked3, setClicked3] = React.useState(false)
    return (
        <SectionLayout section={"Profile"}>
            <div className="col-2 mx-5 ">
                <div className="bg-light rounded">
                    <h4 className="title p-3">Account</h4>
                    <p onClick={() => { setClicked3(true); setClicked(false); setClicked2(false) }} className={`${clicked2 ? 'profile-pick' : ''} cursor-pointer text-heavy-metal text-regular p-3`}>
                        My Cars
                    </p>
                    <p onClick={() => { setClicked(false); setClicked2(true); setClicked3(false); }} className={`${clicked ? 'profile-pick' : ''} cursor-pointer text-heavy-metal text-regular p-3`}>
                        My Car Blog

                    </p>
                    <p onClick={() => { setClicked2(false); setClicked(true); setClicked3(false); }} className={`${clicked2 ? 'profile-pick' : ''} cursor-pointer text-heavy-metal text-regular p-3`}>
                        Personal Information
                    </p>
                </div>
            </div>
            <div className="col-9">
                {clicked && (<PersonalInformation />)}
                {clicked2 && (<MyPosts />)}
                {clicked3 && (<MyCars />)}
            </div>
        </SectionLayout>
    )
}

export default Profile