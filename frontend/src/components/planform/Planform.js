import './Planform.css';
import { Link } from 'react-router-dom'

import Header from '../header/Header';

//use axios for passing data to backend


const Planform = () => {

    return (
        <>
            <Header></Header>
            <main className='planform-main'>
                <div className='planform-textContainer'>
                    <p className='register-step'>STEP <span className='register-stepNum'>2</span> OF <span className='register-stepNum'>2</span></p>
                    <h2>Choose the plan that’s right for you</h2>
                    <p>Watch all you want. Ad-free.</p>
                    <p>Recommendations just for you.</p>
                    <p>Change or cancel your plan anytime.</p>
                </div>
                <form className='plan-form'>
                    <div className='planform-plan-container'>
                        <div className='basic-container'>
                            <p>Basic</p>
                        </div>
                        <div className='plan-data'>
                            <span>Monthly price</span>
                            <p className='data'>$9.99</p>
                        </div>
                        <div className='plan-data'>
                            <span>Video quality</span>
                            <p className='data'>Good</p>
                        </div>
                        <div className='plan-data'>
                            <span>Resolution</span>
                            <p className='data'>480p</p>
                        </div>
                        <input className='planform-radio' type='radio' name='planform' />
                    </div>
                    <div className='planform-plan-container'>
                        <p className='planform-label'>Standard</p>
                        <div className='plan-data'>
                            <span>Monthly price</span>
                            <p className='data'>$14.99</p>
                        </div>
                        <div className='plan-data'>
                            <span>Video quality</span>
                            <p className='data'>Better</p>
                        </div>
                        <div className='plan-data'>
                            <span>Resolution</span>
                            <p className='data'>1080p</p>
                        </div>
                        <input className='planform-radio' type='radio' name='planform' />
                    </div>
                    <div className='planform-plan-container'>
                        <p className='planform-label'>Premium</p>
                        <div className='plan-data'>
                            <span>Monthly price</span>
                            <p className='data'>$18.99</p>
                        </div>
                        <div className='plan-data'>
                            <span>Video quality</span>
                            <p className='data'>Best</p>
                        </div>
                        <div className='plan-data'>
                            <span>Resolution</span>
                            <p className='data'>4K + HDR</p>
                        </div>
                        <input className='planform-radio' type='radio' name='planform' />
                    </div>
                    <Link to='/planform'>
                        <center>
                            <button className='register-next-btn nextPlanform' type='submit'>Start Watching</button>
                        </center>
                    </Link>
                </form>
            </main>
        </>
    );
}

export default Planform;