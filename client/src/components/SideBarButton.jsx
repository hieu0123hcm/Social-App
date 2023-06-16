import { Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeView, selectCurrentView } from '../data/currentViewSlice';
import * as viewConstant from '../constants/viewConstants';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { COLORS } from '../constants/colors';




const SideBarButton = ({view}) => {
    const dispatch = useDispatch();
    const currentView = useSelector(selectCurrentView);

    function SetButtonIcon(view){
      if(view === viewConstant.FEED){
        return <DynamicFeedIcon/>
      }else if(view === viewConstant.FRIEND){
        return <PeopleIcon/>
      }else if(view === viewConstant.PROFILE){
        return <AccountBoxIcon/>
      }
    }

  return (
     <Button startIcon={SetButtonIcon(view)}
     variant= {currentView === view? "outlined" : 'text'}
    sx={{
      height: '45px',
      justifyContent:'start',
      color: currentView === view ? 'white' : '#949497', 
      textTransform:'capitalize',
      fontWeight:'thin',
      backgroundColor: currentView === view? '#3F4D5D' :'',
      ":hover": {
        borderTop:    '0px ',
        borderRight:  '0px ',
        borderBottom: '0px ',
        borderLeft:   `5px solid ${COLORS.contrast}`,
      },
      borderRadius: 0,
      border: 0,
      borderLeft: currentView === view? `5px solid ${COLORS.contrast}` : '5px solid transparent'
    }} 
    onClick={() =>
        dispatch(changeView(view))
      }
      >
        <Typography fontSize={'14px'} fontWeight={currentView === view? 'bold': 'light'}>{view}</Typography>
    </Button>
   
  )
}

export default SideBarButton