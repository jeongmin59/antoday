import { Link } from 'react-router-dom';
import { homeImage } from '../../../assets/img/common';

const Home = () => {
    return (
        <Link to='/'>
            <img src={homeImage} alt="" />
            <div>Home</div>
        </Link>
    )
};

export default Home;