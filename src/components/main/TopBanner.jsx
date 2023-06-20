import { topBannerImg } from "@images"

const TopBanner = (props) => {
    return (
        <div className='TopBanner position-relative w-100 overflow-hidden' style={{ maxHeight: '42vh' }}>
            <img src={props.img ?? topBannerImg} className="card-img w-100 topBannerImg  " alt="top banner" />
            <div className="d-flex w-100 px-3 align-items-center bottom-0 position-absolute justify-content-between">
                <div className="p-2 flex-grow-1 title m-0 text-uppercase text-white fs-2">
                    {props.section}
                </div>
                <div className="p-2 text-regular text-white fs-4 text-uppercase">home/{props.section}</div>
            </div>
        </div>
    )
}
export default TopBanner
