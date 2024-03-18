import { Box, Typography, useTheme } from '@mui/material'
import Cookies from 'js-cookie'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../components/Spinner'
import { setPosts } from '../../data/postsSlice'
import PostWidget from '../../components/PostComponent/PostWidget'

const PostsFeed = () => {
    const posts = useSelector((state) => state.posts.postsList)
    const postModified = useSelector((state) => state.posts.postModified)
    const token = Cookies.get('token')
    const [spinner, setSpinner] = useState(false)
    const dispatch = useDispatch()
    const theme = useTheme()

    useEffect(() => {
        const getPosts = async () => {
            setSpinner(true)
            await fetch('http://localhost:5000/posts', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => {
                    dispatch(setPosts({ postsList: data }))
                })
                .finally(() => {
                    setSpinner(false)
                })
        }

        getPosts()
    }, [postModified, token, dispatch])

    return (
        <Fragment>
            {spinner && <Spinner />}
            {posts.length > 0 &&
                posts.map(
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
                        createdAt,
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
            {posts.length === 0 && (
                <Box
                    textAlign={'center'}
                    sx={{
                        [theme.breakpoints.between('xs', 'md')]: {
                            width: '90vw',
                        },
                        width: '40vw',
                        padding: '10px',
                        paddingTop: '25px',
                        marginY: '5px',
                        justifyContent: 'center',
                        alignItems: 'start',
                        display: 'flex',
                        borderRadius: '0.4rem',
                    }}
                >
                    <Typography>Nothing new!</Typography>
                </Box>
            )}
        </Fragment>
    )
}

export default PostsFeed
