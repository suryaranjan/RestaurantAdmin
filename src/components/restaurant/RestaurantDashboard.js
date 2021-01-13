import React, { useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CloseIcon from '@material-ui/icons/Close';
import Popover from '@material-ui/core/Popover';
import { restaurantColumn } from '../../constants/commonConstants';
import RestaurantListContainer from '../../containers/restaurantListContainer';
import SnackbarAlert from '../sharedComponent/Snackbar';
import RestaurantModalContainer from '../../containers/restaurantModalContainer';
import './restaurantDashboard.css';

const RestaurantDashboard = (props) => {
    const [searchInput, setSearchInput] = React.useState('');
    const [showRestaurantModal, setShowRestaurantModal] = React.useState(false);
    const [displayRestaurantList, setDisplayRestaurantList] = React.useState([]);
    const [restaurantColumnListView, setRestaurantColumnListView] = React.useState(false);
    const [restaurantListAnchorEl, setRestaurantListAchorEl] = React.useState(null);
    const [restaurantColumnList, setRestaurantColumnList] = React.useState(restaurantColumn);
    const [editRestaurant, setEditRestaurant] = React.useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = React.useState({});
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        type: '',
        message: ''
    })
    let wrapperRef = useRef(null);
    let eleRef = useRef(null);

    const handleRestaurantColumntListView = (e) => {
        setRestaurantColumnListView(!restaurantColumnListView);
        setRestaurantListAchorEl(restaurantColumnListView ? null : e.currentTarget);
    }

    const handleChangeRestaurantListColumn = (object) => {
        let tempRestaurantColumnList = restaurantColumnList;
        let newRestaurantColumns = tempRestaurantColumnList.map(column => {
            if (column.name === object.name) {
                column.show = !object.show
            }
            return column;
        });
        setRestaurantColumnList(newRestaurantColumns);
    }

    const handleRestaurantColumnFilter = () => {
        return restaurantColumnList.map(column => {

            return (
                <div className="productColumnItem" key={column.id}>
                    <Checkbox checked={column.show} onChange={(e) => handleChangeRestaurantListColumn(column)}
                        icon={<CheckBoxOutlineBlankIcon />} checkedIcon={<CheckBoxIcon />}
                        label={column.name} name="checkedH" />
                    <p>{column.name}</p>
                </div>
            )
        })
    }

    const setElementRef = (node) => {
        eleRef = node;
    }

    const handleOpenRestaurantModalForm = () => {
        setShowRestaurantModal(!showRestaurantModal);
        setEditRestaurant(false);
        setSelectedRestaurant({});
    }

    const handleTableSearchResult = (e) => {

    }

    const handleClose = (e) => {
        if (eleRef && !eleRef.contains(e.target)) {
            setRestaurantColumnListView(!restaurantColumnListView);
            setRestaurantListAchorEl(null);
        }
    }

    const handleNotification = (close, type, message) => {
        let snackbar = {};
        if (close) {
            snackbar = {
                open: false,
                type: '',
                message: ''
            }
        } else {
            snackbar = {
                open: true,
                type: type,
                message: message
            }

        }

        setSnackbar({ ...snackbar });
    }

    const editRestaurantDetails = (data) => {
        setSelectedRestaurant(data);
        setShowRestaurantModal(true);
        setEditRestaurant(true);
    }

    return (
        <>
            {showRestaurantModal ?
                <RestaurantModalContainer
                    modalView={showRestaurantModal}
                    modalClose={handleOpenRestaurantModalForm}
                    handleNotification={handleNotification}
                    editRestaurant={editRestaurant}
                    selectedRestaurant={selectedRestaurant}
                /> : ''
            }
            {snackbar.open ?
                <SnackbarAlert
                    snackbar={snackbar}
                    handleShowNotification={handleNotification}
                >
                </SnackbarAlert> : ''
            }
            <Grid container spacing={3}>
                <Grid item xs={10} className="orderDashboard">
                    <h2>Restaurants</h2>
                </Grid>
                <Grid item xs={2} className="orderDropdown customerDropdown">
                    <Button variant="outlined" onClick={handleOpenRestaurantModalForm}>
                        Add Restaurant
                </Button>
                </Grid>
                {/* <Grid item xs={12} className="orderFilters">
                    <div className="orderFilterSearch">
                        <IconButton aria-label="menu" className="searchIcon">
                            <SearchIcon />
                        </IconButton>
                        <InputBase className="searchBar"
                            placeholder="Search Restaurant"
                            value={searchInput}
                            onChange={e => handleTableSearchResult(e)}
                        />
                    </div>
                </Grid> */}
                <Grid item xs={12} className="productListColumnList">
                    <p onClick={handleRestaurantColumntListView} aria-describedby='simple-popover'>Customise Columns</p>
                </Grid>
                <Grid item xs={12} className="orderHistoryTableContainer">
                    {restaurantColumnListView &&
                        <Popover
                            ref={wrapperRef}
                            id='simple-popover'
                            open={restaurantColumnListView}
                            anchorEl={restaurantListAnchorEl}
                            onClose={handleRestaurantColumntListView}
                            onClick={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <div className="productColumnListContainer" ref={setElementRef}>
                                <div className="productColumnListHeader">
                                    <Grid item xs={11} className="listOfColumnHeader">
                                        List Of Columns
                                        </Grid>
                                    <Grid item xs={1}>
                                        <CloseIcon onClick={handleRestaurantColumntListView} />
                                    </Grid>
                                </div>
                                <div className="productColumnListCheckbox">
                                    {handleRestaurantColumnFilter()}
                                </div>
                            </div>
                        </Popover>
                    }
                    <RestaurantListContainer
                        restaurantColumn={restaurantColumnList}
                        editRestaurantDetails={editRestaurantDetails}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default RestaurantDashboard;