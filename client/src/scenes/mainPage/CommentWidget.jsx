import SendIcon from '@mui/icons-material/Send';
import { Avatar, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemText, Stack, Tooltip, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPostModified } from '../../data/postsSlice';

const CommentWidget = ({postId}) => {

    const [commentList, setCommentList] = useState([])
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user)
    const [newComment, setNewComment] = useState(false)
    const dispatch = useDispatch();
    const [comment, setComment] = useState('')

    const handleSendComment = async () => {
      const formData = new FormData();
      formData.append("userId", user._id)
      formData.append("content", comment)
        await fetch(`http://localhost:5000/posts/${postId}/comment`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              userId: user._id,
              content: comment
            }),
        })

        console.log('Comment Success')
        dispatch(setPostModified())
        setComment('')
        setNewComment(!newComment)
    }
    
    useEffect(() => {
      const getComments = async() => {
        await fetch(`http://localhost:5000/posts/${postId}/comment`,
        {
            method:"GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
        
        ).then((res) => res.json()).then((data) => {
          setCommentList(data)
        }).finally(() => {
        })
      }
      getComments()
    }, [newComment])

  return (
    <>
      <Stack flexDirection={'row'} height={'40px'}>
      <InputBase 
            placeholder="Comment something.."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            sx={{
              fontSize:'14px',
              width: "100%",
              padding: "10px",
              backgroundColor: '#f0f2f5',
              borderRadius:'0.4rem'
            }}
            
        />
        <IconButton onClick={handleSendComment} size='small' sx={{borderRadius:'0.4rem'}}><SendIcon/></IconButton>
      </Stack>
    <List sx={{ width: '100%',padding:'0', margin:'0'}}>
      {
        commentList.map((comment) => {
          const createDate = new Date(comment.createdAt)
          return (
            <ListItem  >
              <ListItemAvatar>
                <Avatar alt="User Avatar" src={`http://localhost:5000/assets/${comment.owner.picturePath}`} />
              </ListItemAvatar>

              
                <ListItemText
                  primary={
                    <Typography fontSize={'12px'} sx={{marginRight:'10px'}} fontWeight={'bold'} >{`${comment.owner.firstName} ${comment.owner.lastName}`}</Typography>
                  }
                  secondary={
                    <Tooltip title={createDate.toString()}>
                            <Typography fontSize={'14px'} color={'black'} >{comment.comment}</Typography>
                    </Tooltip>
                  }
                />
               
                
                <Typography fontSize={'11px'} fontWeight={'100'} color={'grey'}>{moment(createDate).fromNow()}</Typography>
               
                
            </ListItem>
          )
        }
        )
      }
    </List>
    </>
    
  )
}

export default CommentWidget