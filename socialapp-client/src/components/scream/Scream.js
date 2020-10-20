import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

import {Link} from 'react-router-dom';

import dayjs from 'dayjs';
import relativeTime  from 'dayjs/plugin/relativeTime';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import MyButton from '../../util/MyButton';
import ChatIcon from '@material-ui/icons/Chat';


import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton  from './LikeButton';

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,

    },
    image: {
        minWidth: 200,
        objectFit: 'cover'

    },
    content: {
        padding: 25,
    }
}

export class Scream extends Component {


    render() {
        dayjs.extend(relativeTime);
        const {classes, scream : {userImage, userHandle, likeCount, commentCount, screamId}, user : {authenticated, credentials: {handle}}} = this.props;
        

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId}/>
        ) : null
        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.image}
                    image={userImage}
                    title= 'Profile image'
                    src='123'
                />

                <CardContent className={classes.content}>
                    <Typography variants='h5' color='primary' component={Link} to={`/users/${this.props.scream.userHandle}`}>{this.props.scream.userHandle}</Typography>
                    {deleteButton}
                    <Typography variants='body2' color='textSecondary'>{dayjs(this.props.scream.createdAt).fromNow()}</Typography>
                    <Typography variants='body1'>{this.props.scream.body}</Typography>
                    <LikeButton screamId={screamId}></LikeButton>
                    <span>{likeCount} Likes</span>
                    <MyButton tip='Comments'>
                        <ChatIcon color='primary'></ChatIcon>
                    </MyButton>
                    <span>{commentCount} Comments</span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}></ScreamDialog>
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {

    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
    user: state.user
})


export default connect(mapStateToProps)(withStyles(styles)(Scream));
