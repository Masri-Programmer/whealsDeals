import classNames from 'classnames';

function Panel({ children, className, ...rest }) {
    const finalClassNames = classNames(
        'text-metal  border-0 py-1',
        className
    );

    return (
        <div {...rest} className={finalClassNames}>
            {children}
        </div>
    );
}

export default Panel;
