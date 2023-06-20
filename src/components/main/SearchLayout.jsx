
const SearchLayout = (props) => {
    return (
        <div className="col-lg-3 col-md-5 col-sm-10 pb-5 px-4">
            <div className="">
                <h1 className="fw-bolder mt-0 mb-4 fs-2 text-center text-red-500">Search For {props.section}</h1>
                <p className='text-white lh-base mt-3 fs-5 text-center'>You may choose one or more options from each category</p>
                <div className="searchBox bg-sky-900 mt-2 p-4 rounded">
                    {props.search}
                    <div className="d-flex ">
                        <div className="p-2 text-white fw-bold ">Filter by</div>
                        <div className="ms-auto p-2 cursor-pointer text-white" onClick={props.handleReset}>Reset Filters</div>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default SearchLayout