import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import MyButton from '../../util/MyButton';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import PostScream from '../scream/PostScream';
import Notifications from './Notifications';

//Material UI
import AppBar from '@material-ui/core/AppBar'; 
import Toolbar from '@material-ui/core/Toolbar'; 
import Button from '@material-ui/core/Button';

// Icons
import HomeIcon from '@material-ui/icons/Home';
// import NotificationsIcon from '@material-ui/icons/Notifications';



export class Navbar extends Component {
    render() {
        const {authenticated} = this.props;
        return (
            <AppBar>
                <Toolbar className='nav-container'>
                    {authenticated? (
                        <Fragment>
                            <PostScream/>

                            <Link to='/'>
                                <MyButton tip='Home'>
                                    <HomeIcon></HomeIcon>
                                </MyButton>
                            </Link>

                                <Notifications></Notifications>
                        </Fragment>
                    ):(
                        <Fragment>
                            <Button color='inherit' component = {Link} to='/'>Home</Button>
                            <Button color='inherit' component = {Link} to='/login'>Login</Button>
                            <Button color='inherit' component = {Link} to='/signup'>SignUp</Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}


const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);

