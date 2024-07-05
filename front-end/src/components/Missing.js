import { Link } from "react-router-dom"
import "./Missing.css"

const Missing = () => {
    return (
        <section className="missingsection">
            <div className="missingstrana">
                    <h1>Oops!</h1>
                    <p>Page Not Found</p>
                    <div className="flexGrow">
                        <Link to="/">Visit Our Homepage</Link>
                    </div>
            </div>
        </section>
    )
}

export default Missing
