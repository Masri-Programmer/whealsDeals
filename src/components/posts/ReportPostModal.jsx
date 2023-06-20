import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { Button, AlertC } from '@index';
import { reportPost } from '@get';
import { setShowReportModal } from '../../utils/store/slices/PostsSlice';
import TextField from '@mui/material/TextField';

function ReportPostModal(props) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = useState("Describe how this post inappropriate")
    const [showAlert, setShowAlert] = useState(false);
    const token = sessionStorage.getItem('token') ?? localStorage.getItem("token");

    const handleConfirm = () => {
        setIsLoading(true)
        reportPost({ userId: token, post_id: props.postId, report: value }).then((newData) => {
            setIsLoading(false)
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
            dispatch(setShowReportModal());
        });
        setIsLoading(false)
    }

    return (<>
        <AlertC showAlert={showAlert} text={"Post Reported"} />
        <Modal
            show={props.show}
            onHide={() => dispatch(setShowReportModal())}
            size="lg"
            centered >
            <Modal.Body className='text-white text-center border-5'>
                <p className='text-uppercase text mx-auto lh-3  fs-4 lh-lg mt-5'>
                </p>
                <TextField
                    id="standard-helperText"
                    defaultValue={value}
                    className='w-100'
                    onChange={(e) => setValue(e.target.value)}
                    variant="standard"
                />
            </Modal.Body>
            <Modal.Footer className=' mx-auto'>
                <button
                    onClick={() => { dispatch(setShowReportModal()) }} className='px-5
sandy-button text-uppercase btn mx-3 '>cancel</button>
                <Button
                    disable={isLoading}
                    loading={isLoading}
                    className='sandy-button text-uppercase btn mx-3 px-5'
                    onClick={handleConfirm}
                    type='Submit'>
                    report
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}
export default ReportPostModal;
