import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from '@material-ui/core/Avatar';
import mhLogo from '../../constants/images/webdiner.jpg';
import "./navbar.css";

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block"
        }
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
}));


const Navbar = () => {

    const classes = useStyles();
    return (
        <>
            <div className={`navbarContainer ${classes.grow}`}>
                <AppBar position="static">
                    <Toolbar>
                        <Avatar variant="square" src={mhLogo} className={` ${classes.title} mh-logo`}></Avatar>
                        <div className={classes.grow} />
                    </Toolbar>
                </AppBar>
            </div>
        </>
    );
}

export default Navbar;
