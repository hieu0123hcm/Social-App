import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../data/postsSlice';
import PostWidget from './PostWidget';

const PostsFeed = () => {
  const posts = useSelector((state) => state.posts.postsList);
  
  const postModified = useSelector((state) => state.posts.postModified)
 
  const token = useSelector((state) => state.auth.token);
  const [spinner, setSpinner] = useState(false);   
  const dispatch = useDispatch();

 

  useEffect(() => {
    
    const getPosts = async () => {
      setSpinner(true);
      // const response = 
      await fetch("http://localhost:5000/posts", {
        method: "GET",
         headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()).then((data) => {
        dispatch(setPosts({postsList: data}));
      }).finally(() => {
        setSpinner(false)
      })
      // const data = await response.json();
      // console.log(data)
      
    };  
    getPosts();
  }, [postModified])

  return (
    <>
        {/* {
        spinner &&
        <Box  
        sx={{justifyContent: 'center', alignItems:'center', display:'flex'}}>
           <CircularProgress />
        </Box> 
        } */}
        {posts.map(
            ({
                _id,
                userId,
                firstName,
                lastName,
                description,
                location,
                picturePath,
                userPicturePath,
                likes,
                comments,
                createdAt
              }) => (
                <PostWidget
                  key={_id}
                  postId={_id}
                  postUserId={userId}
                  name={`${firstName} ${lastName}`}
                  description={description}
                  location={location}
                  picturePath={picturePath}
                  userPicturePath={userPicturePath}
                  likes={likes}
                  comments={comments}
                  createdAt={new Date(createdAt)}
                />
              )
        )}
    </>
  )
}

export default PostsFeed