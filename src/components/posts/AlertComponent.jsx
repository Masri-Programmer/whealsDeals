import { Alert } from 'react-bootstrap';
import { FiCheckCircle } from 'react-icons/fi';
const AlertC = ({ text, showAlert }) => {
    return (
        <>
            {showAlert && (
                <Alert className='cornered d-flex align-items-center gap-2 justify-contetn-center' variant="light">
                    <FiCheckCircle /> {text}
                </Alert>
            )}
        </>
    )
}

export default AlertC