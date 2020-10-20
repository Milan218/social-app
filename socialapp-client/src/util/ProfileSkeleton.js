import React from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import NoImg from '../images/blank_image.png';

// mui
import Paper from '@material-ui/core/Paper';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
    ...theme.spreadThis,
    handle:{
        height: 20,
        width: 60,
        margin: '0 auto 10px auto',
        backgroundColor: '#00bcd4'
    },
    fullLine: {
        width: '100%',
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        marginBottom: 10
    },
    halfLine: {
        width: '50%',
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        marginBottom: 10
    },
})

const ProfileSkeleton= (props) => {
    const {classes} = props;
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className='image-wrapper'>
                    <img src={NoImg} alt='profile' className='profile-image'></img>
                </div>
                <hr></hr>
                <div className='profile-details'>
                    <div className={classes.handle}></div>
                    <hr></hr>
                    <div className={classes.fullLine}></div>
                    <div className={classes.fullLine}></div>
                    <hr></hr>
                    <LocationOn color='primary'></LocationOn>
                    <hr></hr>
                    <LinkIcon color='primary'></LinkIcon>
                    <hr></hr>
                    <CalendarToday color ='primary'></CalendarToday>
                </div>
            </div>
        </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};


export default withStyles(styles)(ProfileSkeleton);
