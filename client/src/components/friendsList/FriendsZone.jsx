import { Box, Divider, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from '../../data/loginSlice';
import FriendsList from './FriendsList';

const FriendsZone = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const friends = useSelector((state) => state.auth.friends);
  const dispatch = useDispatch();
  useEffect(() => {
    
    const getFriends = async () => { 
      await fetch(`http://localhost:5000/users/${user._id}/friends`, {
        method: "GET",
         headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()).then((data) => {
        dispatch(setFriends({friends: data}));
      })
    };  
    getFriends();
  }, [])

  console.log(friends)
  return (
    
    <Box height={'auto'} py={'10px'} sx={{ backgroundColor: '#FFF', borderRadius:'0.4rem'}}>
      <Typography ml={'15px'} fontWeight={'500'}>Contacts</Typography>
      <Divider sx={{marginY:'10px'}}/>
      {!friends.length ? <Typography ml={'15px'}>No friends</Typography> : <FriendsList/>}
    
    </Box>
  )
}

export default FriendsZone