import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { firstLetterUppercase } from '../../../helpers/sharedMethod';

const MenuItemListView = (props) => {
    const [menuItems, setMenuItems] = useState({});
    const [renderMenuitems, setRenderMenuItems] = useState('No Menu Item Available');

    const displayMenuItemsCards = (value) => {
        return value.map(item => {
            return (
                <div className="item">
                    <FiberManualRecordIcon className={`${item.type.typeName}`} />
                    <p>{firstLetterUppercase(item.name)}</p>
                    <p>&#8377; {parseFloat(item.cost).toFixed(2)}</p>
                    <p className='actionItems'><EditIcon onClick={() => props.editMenuItem(item)} /><DeleteForeverIcon onClick={() => props.deleteMenuItem(item)} /></p>
                </div>
            )
        })
    }

    useEffect(() => {
        let newMenuItemList = {};
        if (props.menuItems && props.menuItems.length > 0) {
            props.menuItems.map((item) => {
                if (!item) {
                    return;
                }
                let tempItem = newMenuItemList[`${item.category.categoryName}`] ? newMenuItemList[`${item.category.categoryName}`] : [];
                tempItem.push(item);
                newMenuItemList[`${item.category.categoryName}`] = [...tempItem];
            })
            setMenuItems(newMenuItemList);
        } else {
            setMenuItems([])
        }

    }, [props.menuItems]);

    useEffect(() => {
        let menuItemProps = Object.entries(menuItems);
        let uiValue = menuItemProps.length > 0 ? menuItemProps.map(([key, value]) => {
            return <Grid item xs={12} className="menuTypeSection">
                <p>{firstLetterUppercase(key)}</p>
                <Divider className="headerDivider" />
                <div className='menuItemsContainer'>
                    {displayMenuItemsCards(value)}
                </div>
                {/* <Divider className="headerDivider extraLast" /> */}
            </Grid>
        }) : 'No Menu Available'
        setRenderMenuItems(uiValue);
    }, [menuItems])

    return (
        <Grid item xs={12}>
            {renderMenuitems}
        </Grid>
    )
}

export default MenuItemListView;