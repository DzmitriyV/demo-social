import React, {Suspense} from 'react'
import './App.css'
import {BrowserRouter, HashRouter, Route, withRouter} from 'react-router-dom'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import NavbarContainer from './components/Navbar/NavbarContainer'
import UsersContainer from './components/Users/UsersContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import LoginContainer from './components/Login/LoginContainer'
import {connect, Provider} from 'react-redux'
import {compose} from 'redux'
import {initializeApp} from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader'
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
// import DialogsContainer from './components/Dialogs/DialogsContainer'
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
// import ProfileContainer from './components/Profile/ProfileContainer'
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if(!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <NavbarContainer/>
                <div className='app-wrapper-content'>
                    <Route path='/profile/:userId?'
                           render={withSuspense(ProfileContainer)}/>
                    <Route path='/dialogs'
                           render={withSuspense(DialogsContainer)}/>
                    <Route path='/news'
                           render={() => <News/>}/>
                    <Route path='/music'
                           render={() => <Music/>}/>
                    <Route path='/settings'
                           render={() => <Settings/>}/>
                    <Route path='/users'
                           render={() => <UsersContainer/>}/>
                    <Route path='/login'
                           render={() => <LoginContainer/>}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

const AppContainer = compose(
    connect(mapStateToProps, {initializeApp}),
    withRouter)(App)

const SamuraiJSApp = (props) => {
    return(
        <HashRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </HashRouter>
        // <BrowserRouter basename={process.env.PUBLIC_URL}>
        //     <Provider store={store}>
        //         <AppContainer />
        //     </Provider>
        // </BrowserRouter>
    )
}

export default SamuraiJSApp
