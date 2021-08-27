import { Link } from 'react-router-dom';

const Unsubscribe = () => {

    const showPassword = (event) => {
        event.target.type = 'text'
    }

    return (
        <>
            <header className='login-header'>
                <Link to='/'>
                    <h1>Title</h1>
                </Link>
            </header>
            <main>
                <form className='login-form'>
                    <h1 className='login-h1' >Sorry to see you go,</h1>
                    <div className='login-input-container'>
                        <label className='login-label' >Email or phone number</label>
                        <br></br>
                        <input className='login-input' type='text' />
                    </div>
                    <div className='login-input-container'>
                        <label className='login-label' >Password</label>
                        <br></br>
                        <input id='password' className='login-input' type='password' />
                        {/* <span className='login-showBtn' onClick={showPassword} >SHOW</span> */}
                    </div>
                    <button className='login-signBtn' type='submit'>Delete Account</button>
                </form>
            </main>
        </>
    );
}

export default Unsubscribe;