import { TopBanner } from '@index'

const SectionLayout = ({ children, img, section }) => {
    return (
        <section className='pb-5 ' style={{ minHeight: '100vh' }}>
            <TopBanner img={img} section={section} />
            <div className="row w-100 p-2 py-5">
                {children}
            </div>
        </section>
    )
}

export default SectionLayout