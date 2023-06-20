import Slider from "react-slick";
import styles from '@style';

const PostFiles = (props) => {
    const settings = {
        dots: true,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    function isVideo(filePath) {
        const videoExtensions = [".mp4", ".mov", ".avi", ".wmv", ".mkv", ".flv", ".webm"];
        const extension = filePath.slice(filePath.lastIndexOf("."));
        return videoExtensions.includes(extension);
    }

    return (
        <div className='PostSlider'>
            <Slider {...settings}>
                {props.files.map((file, index) => (
                    <div key={index}>
                        {file.file_path && (
                            <>
                                {isVideo(file.file_path) ? (
                                    <video
                                        src={`${styles.base_url}/${file.file_path.substring(file.file_path.indexOf("web") + 4)}`}
                                        style={{ height: "auto", width: "100%" }}
                                        controls
                                    />
                                ) : (
                                    <img
                                        src={`${styles.base_url}/${file.file_path.substring(file.file_path.indexOf("web") + 4)}`}
                                        style={{ height: "auto", width: "100%" }}
                                        alt="post"
                                    />
                                )}
                            </>
                        )}
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default PostFiles