import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Index from '../components/index/index';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import LoginHelp from '../components/loginHelp/LoginHelp';

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={Index} exact={true}/>
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/loginHelp' component={LoginHelp} />
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default Router;