import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom';

import dayjs from 'dayjs';
import relativeTime  from 'dayjs/plugin/relativeTime';

import PropTypes from 'prop-types';

// MUI 
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

// redux
import {connect} from 'react-redux';
import {markNotificationsRead} from '../../redux/actions/userActions';

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
    }

    handleOpen = (event) => {
        this.setState({anchorEl: event.currentTarget});
    }

    handleClose = () => {
        this.setState({anchorEl: null});
    }

    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications.filter(notif => !notif.read).map(notif => notif.notificationId);
        this.props.markNotificationsRead(unreadNotificationsIds);
    }

    render(){
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;

        dayjs.extend(relativeTime);

        let notificationIcon;
        if (notifications && notifications.length > 0) {
            notifications.filter(notif => notif.read === false).length > 0 ? (
                notificationIcon = (
                    <Badge badgeContent={notifications.filter(notif => notif.read === false).length} color='secondary'>
                        <NotificationsIcon></NotificationsIcon>
                    </Badge>
                )) : (
                    notificationIcon = <NotificationsIcon></NotificationsIcon>
                )
        } 
        else {
            notificationIcon = <NotificationsIcon></NotificationsIcon>
        }
        let notificationsMarkup = notifications && notifications.length > 0 ? (
            notifications.map(notif => {
                const verb = notif.type ==='like' ? 'liked' : 'commented on';
                const time = dayjs(notif.createdAt).fromNow();
                const iconColor = notif.read? 'primary' : 'secondary';
                const icon = notif.type ==='like' ? (
                    <FavoriteIcon color={iconColor} style={{marginRight: 10}}></FavoriteIcon>
                ) : (
                    <ChatIcon color={iconColor} style={{marginRight: 10}}></ChatIcon>
                )
                return (
                    <MenuItem key={notif.createdAt} onClick={this.handleClose}>
                        {icon}
                        <Typography component ={Link} color='primary' variant='body1' to={`/users/${notif.recipient}/scream/${notif.screamId}`}>
                            {notif.sender} {verb} your post {time}.
                        </Typography>
                    </MenuItem>
                )
            })
        ) : (
            <MenuItem onClick={this.handleClose}>
                You have no notifications yet
            </MenuItem>
        )
        return (
            <Fragment>
                <Tooltip placement='top' title='Notifications'>
                    <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup='true' onClick={this.handleOpen}>
                        {notificationIcon}
                    </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} onEntered={this.onMenuOpened}>
                    {notificationsMarkup}
                </Menu>
            </Fragment>
        )
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, {markNotificationsRead})(Notifications);