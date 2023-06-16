import { Avatar, List, ListItem, ListItemAvatar, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const FriendsList = () => {
  const friends = useSelector((state) => state.auth.friends);
  console.log(friends)  
  return (
    <List  sx={{padding:0, width: '100%', maxWidth: 360, bgcolor: '#FFF' }}>
     {
        friends.map((friend) => (
            <ListItem alignItems="flex-start" sx={{display:'flex',alignItems: 'center'}}>
                {friend.picturePath &&
                    <ListItemAvatar>
                        <Avatar alt="User Avatar" src={`http://localhost:5000/assets/${friend.picturePath}`} />    
                    </ListItemAvatar>}
                    <Typography
                        fontSize={'14px'}
                    >{`${friend.firstName} ${friend.lastName}`}</Typography>
            </ListItem>
            
            
        ))
     }
   </List>
  )
}

export default FriendsList