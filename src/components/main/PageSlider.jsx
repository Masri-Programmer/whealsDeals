import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { upload, deleteIcon } from '@images'
import { Widgets } from "@mui/icons-material";
const PageSlider = (props) => {
    const dispatch = useDispatch();
    const { files, imgClass, onDeleteFile, carDetail } = props

    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    const handleDelete = (e, fileId) => {
        e.stopPropagation();
        console.log('HEREE')
        onDeleteFile(fileId);
    };
    return (
        <div className="PageSlider mb-2" style={{ maxHeight: '400px', maxWidth: '100%', overflow: 'hidden' }}>
            <Slider {...settings}>
                {files?.length > 0 && files.map((file, index) => (
                    <div key={index}>
                        <div style={{
                            overflow: 'hidden',
                            display: 'grid',
                            placeContent: 'center',
                            position: 'relative',

                        }}>
                            {!carDetail && (<img
                                style={{ width: "18px", height: "20px" }}
                                src={deleteIcon}
                                className="rounded position-absolute cursor-pointer top-0 end-0 delete-icon"
                                alt="Delete bin"
                                onClick={(e) => handleDelete(e, file.id)}
                            />)}
                            <img
                                style={{
                                    width: '400px',
                                    height: '400px',
                                    objectFit: 'cover'
                                }}
                                alt={file.name}
                                src={carDetail ? `${file.main_image}` : `data:${file.type};base64,${file.data}`}
                                className={`${imgClass}`}
                            />
                        </div>
                    </div>
                ))}
            </Slider>
            {(!files || files.length === 0) && (
                <div style={{ height: '400px' }}>
                    <img src={upload} className="img-fluid w-100" style={{ objectFit: 'contain', height: 'inherit' }} />
                </div>
            )}

        </div>
    );
}

export default PageSlider