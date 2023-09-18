import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse} from '@fortawesome/free-solid-svg-icons'

const Home = () => {
    return (
        <Link to='/'>
            <FontAwesomeIcon icon={faHouse} style={{ color: 'var(--main-yellow-color)' }}/>
            <div>Home</div>
        </Link>
    )
};

export default Home;