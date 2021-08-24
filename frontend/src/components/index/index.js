import './index.css'
import { Link } from 'react-router-dom';

import Header from '../header/Header';

const index = () => {

    return (
        <>
        <Header></Header>
            <main className='main-container'>
                <h1 className='index-main-h1'>Unlimited movies, TV shows, and more.</h1>
                <h2 className='index-main-h2'>Watch anywhere. Cancel anytime</h2>
                <h4 className='index-main-h4'>Ready to watch? Enter your email to create or restart your membership.</h4>
                <Link to='/register'>
                    <button className='index-getStartedBtn'>Get Started</button>
                </Link>
            </main>
        </>
    );
}

export default index