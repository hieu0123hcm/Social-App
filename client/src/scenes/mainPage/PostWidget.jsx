import ClearIcon from '@mui/icons-material/Clear';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, ImageList, ImageListItem, Paper, Stack, Tooltip, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {COLORS} from '../../constants/colors'

import { useState } from 'react';
import { setPostModified } from '../../data/postsSlice';
import CommentWidget from './CommentWidget';
const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
    createdAt
  }) => {
    const likeCount = Object.keys(likes).length;
    const token = useSelector((state) => state.auth.token);
    const loggedInUserId = useSelector((state) => state.auth.user._id);
    const [showComment, setShowComment] = useState(false);
    const isLiked = Boolean(likes[loggedInUserId]);
    const [open, setOpen] = React.useState(false);
    console.log(showComment)
    const handleShowComment = () => {
        setShowComment(!showComment);
    }

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    const dispatch = useDispatch();

    const patchLike = async () => {
        await fetch(`http://localhost:5000/posts/${postId}/like`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        })
        dispatch(setPostModified())
    }
 
    const deletePost = async () => {
        
        await fetch(`http://localhost:5000/posts/${postId}`,
            {
                method:"DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({userId: loggedInUserId})
            }
            
        )
        dispatch(setPostModified())
        
    }



  return (
    <Paper elevation={0} 
        sx={{
            width: '30vw',
            padding:'10px',
            paddingTop:'25px'
            , marginY: '5px', 
            justifyContent:'center', 
            alignItems:'start', 
            display:'flex',
            borderRadius:'0.4rem'
            }}>
        <Stack flexDirection={'column'} sx={{width:'95%'}}>
            <Stack flexDirection={'row'}>
            <Avatar sx={{mr:'10px'}} alt="User Avatar" src={`http://localhost:5000/assets/${userPicturePath}`} />
            <Stack>
            
            <Stack flexDirection={'row'} >
                <Typography color={'black'} fontSize={'14px'} fontWeight={'600'}>{name}</Typography>
                <Typography ml={'5px'} fontSize={'14px'}>is at</Typography>
                <Typography ml={'5px'} fontWeight={'600'} fontSize={'14px'} color={COLORS.contrast} sx={{marginRight:'10px'}} >{location}</Typography>
            </Stack>
            <Tooltip title={createdAt.toDateString().toString()}>
                    <Typography fontSize={'11px'} fontWeight={'300'} color={'grey'} >{moment(createdAt).fromNow()}</Typography>
                </Tooltip>
            </Stack>
            {
                postUserId === loggedInUserId && <IconButton sx={{mt:'5px',marginLeft:'auto'}} onClick={handleClickOpen}><ClearIcon /></IconButton> 
            }
            </Stack>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Post delete"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want to delete this post?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={deletePost} autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>

            <Typography fontWeight={'400'} fontSize={'14px'} sx={{marginTop: '10px'}} >{description}</Typography>
            {/* {picturePath && (
                <img
                width="100%"
                height="auto"
                alt="post"
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                src={`http://localhost:5000/assets/${picturePath}`}
                />
            )} */}
            {
                picturePath.length !== 0 && (
                    <ImageList variant="masonry" cols={picturePath.length} gap={8}>
                    {picturePath.map((item) => (
                      <ImageListItem key={item.img}>
                        <img
                          width='100%'
                          height='auto'
                          style={{borderRadius: '0.4rem'}}
                          src={`http://localhost:5000/assets/${item}`}
                          srcSet={`http://localhost:5000/assets/${item}`}
                          alt={item.title}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                )
            }
            
            <Divider sx={{marginY:'5px'}}/>
            <Stack flexDirection={'row'} sx={{alignItems:'center',justifyContent:'space-between', mb:'5px'}}>
                <Typography ml={'5px'} fontSize={'14px'} fontWeight={'400'}>{likeCount} Like(s)</Typography>
                <Stack flexDirection={'row'}>
                <Button   sx={{fontWeight:'500',mr:'5px', width:'70px', color: isLiked? COLORS.pink :COLORS.contrast, textTransform:'capitalize'}} startIcon={isLiked? <FavoriteIcon /> : <FavoriteBorderIcon />  }  onClick={patchLike}>
                    {isLiked? 'Liked' : 'Like'}
                </Button>
                <Button onClick={handleShowComment} sx={{fontWeight:'500',color: COLORS.contrast, textTransform:'capitalize'}} startIcon={<CommentIcon />} >
                    {comments.length} Comments
                </Button>
                </Stack>
            </Stack>
            {
                showComment &&         
                    <CommentWidget postId={postId}/>
            }
        </Stack>
    </Paper>
  )
}

export default PostWidget