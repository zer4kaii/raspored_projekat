import { useNavigate } from "react-router-dom"
import './Unauthorized.css';

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section className="unauthorizedsection">
            <div className="unauthorizedstrana">
            <h1>Unauthorized</h1>
            <p>You do not have access to the requested page.</p>
                <div className="flexGrow1">
                    <button onClick={goBack}>Go Back</button>
                </div>
            </div>
        </section>
    )
}

export default Unauthorized
