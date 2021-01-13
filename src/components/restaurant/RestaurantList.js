import React, { useEffect } from 'react';
import { ROUTES } from '../../constants/routesConstant';
import { Link } from 'react-router-dom';
import history from '../../helpers/history'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '../sharedComponent/TablePaginationAction';
import Paper from '@material-ui/core/Paper';
import { displayCuisine } from '../../helpers/sharedMethod';

const RestaurantList = (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [restaurantListData, setRestaurantListData] = React.useState(props.restaurantList);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, restaurantListData.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    useEffect(() => {
        setRestaurantListData(props.restaurantList && props.restaurantList.length > 0 ? props.restaurantList : []);
    }, [props])

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className="orderHistoryTable orderTable" aria-label="sticky table" >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">NAME</TableCell>
                            <TableCell align="center">CITY</TableCell>
                            <TableCell align="center">STATE</TableCell>
                            <TableCell align="center">COUNTRY</TableCell>
                            <TableCell align="center" style={{ display: props.restaurantColumn.filter(column => column.name === "Cuisine")[0].show ? "table-cell" : "none" }}>CUISINE</TableCell>
                            <TableCell align="center" style={{ display: props.restaurantColumn.filter(column => column.name === "Buffet")[0].show ? "table-cell" : "none" }}>BUFFET</TableCell>
                            <TableCell align="center" style={{ display: props.restaurantColumn.filter(column => column.name === "Dining")[0].show ? "table-cell" : "none" }}>DINING</TableCell>
                            <TableCell align="center" style={{ display: props.restaurantColumn.filter(column => column.name === "Average Cost")[0].show ? "table-cell" : "none" }}>AVERAGE COST</TableCell>
                            <TableCell align="center" style={{ display: props.restaurantColumn.filter(column => column.name === "Bars")[0].show ? "table-cell" : "none" }}>BARS</TableCell>
                            <TableCell align="center" style={{ display: props.restaurantColumn.filter(column => column.name === "Pure Veg")[0].show ? "table-cell" : "none" }}>PURE VEG</TableCell>
                            <TableCell align="center" style={{ display: props.restaurantColumn.filter(column => column.name === "Pet Friendly")[0].show ? "table-cell" : "none" }}>PET FRIENDLY</TableCell>
                            <TableCell align="center" style={{ display: props.restaurantColumn.filter(column => column.name === "Outdoor Seating")[0].show ? "table-cell" : "none" }}>OUTDOOR SEATING</TableCell>
                            <TableCell align="center">RATING</TableCell>
                            <TableCell align="center">CONTACT NUMBER</TableCell>
                            <TableCell align="center">EMAIL</TableCell>
                            <TableCell align="center">ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? restaurantListData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : restaurantListData
                        ).map((row, index) => (
                            <TableRow key={row.id} onClick={() => props.editRestaurantDetails(row)}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">
                                    {row.city}
                                </TableCell>
                                <TableCell align="center">
                                    {row.state}
                                </TableCell>
                                <TableCell align="center">
                                    {row.country ? row.country.label : ''}
                                </TableCell>
                                <TableCell align="center" style={{ display: props.restaurantColumn.filter(column => column.name === "Cuisine")[0].show ? "table-cell" : "none" }}>{displayCuisine(row.cuisines)}</TableCell>
                                <TableCell align="center" style={{ display: props.restaurantColumn.filter(column => column.name === "Buffet")[0].show ? "table-cell" : "none" }}>{row.buffet ? 'True' : 'False'}</TableCell>
                                <TableCell align="center" style={{ display: props.restaurantColumn.filter(column => column.name === "Dining")[0].show ? "table-cell" : "none" }}>{row.dining ? 'True' : 'False'}</TableCell>
                                <TableCell align="center" style={{ display: props.restaurantColumn.filter(column => column.name === "Average Cost")[0].show ? "table-cell" : "none" }}>{`$${parseFloat(row.averageCost).toFixed(2)}`}</TableCell>
                                <TableCell align="center" style={{ display: props.restaurantColumn.filter(column => column.name === "Bars")[0].show ? "table-cell" : "none" }}>{row.bars ? 'True' : 'False'}</TableCell>
                                <TableCell align="center" style={{ display: props.restaurantColumn.filter(column => column.name === "Pure Veg")[0].show ? "table-cell" : "none" }}>{row.pureVeg ? 'True' : 'False'}</TableCell>
                                <TableCell align="center" style={{ display: props.restaurantColumn.filter(column => column.name === "Pet Friendly")[0].show ? "table-cell" : "none" }}>{row.petFriendly ? 'True' : 'False'}</TableCell>
                                <TableCell align="center" style={{ display: props.restaurantColumn.filter(column => column.name === "Outdoor Seating")[0].show ? "table-cell" : "none" }}>{row.outdoorSitting ? 'True' : 'False'}</TableCell>
                                <TableCell align="center">
                                    {row.rating}
                                </TableCell>
                                <TableCell align="center">
                                    {row.phoneNumber}
                                </TableCell>
                                <TableCell align="center">
                                    {row.email}
                                </TableCell>
                                <TableCell align="center" className='actions' onClick={(e) => {
                                    e.stopPropagation();
                                    history.push(`${ROUTES.RESTAURANT_DETAILS}/${row.id}`)
                                }}>
                                    <VisibilityIcon />
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow >
                                <TableCell align="center" colSpan={14}>{restaurantListData.length > 0 ? '' : 'No Order Found'}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 20, { label: 'All', value: -1 }]}
                colSpan={14}
                count={restaurantListData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </div>
    )
}

export default RestaurantList;