import { useState, useEffect, useRef } from 'react';
import Panel from './Panel';
import { postButtons3, worldMap } from '@images'

function OptionDropdown({ options, value, onChange, selectedValue }) {
    const [isOpen, setIsOpen] = useState(false);
    const divEl = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (!divEl.current) {
                return;
            }

            if (!divEl.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handler, true);

        return () => {
            document.removeEventListener('click', handler);
        };
    }, []);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setIsOpen(false);
        onChange(option);
    };

    const renderedOptions = options.map((option) => {
        return (
            <div
                className="cursor-pointer d-flex justify-content-between p-2 px-3"
                onClick={() => handleOptionClick(option)}
                key={option.value}
            >
                {option.img}
                {option.label}
                <span className='ms-auto'>{option.input}</span>
            </div>
        );
    });
    const class1 = ` bg-sky-200 p-3 py-2 postButton align-items-center cursor-pointer ${isOpen ? 'rounded-top' : 'rounded zoomOnHover'}`;
    return (
        <div ref={divEl} className="position-relative ">
            <Panel
                className={class1}
                onClick={handleClick}
            >
                <div className="d-flex align-items-center">
                    {value?.label === 'Public' ?
                        <img src={postButtons3} className='mx-1' alt="earth icon" />
                        : <img src={worldMap} className='mx-1' alt="map icon" />
                    }
                    {selectedValue ? selectedValue : 'Public'}
                </div>
            </Panel>
            {isOpen && <Panel>{renderedOptions}</Panel>}
        </div>
    );
}

export default OptionDropdown;
