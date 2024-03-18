import DeleteIcon from '@mui/icons-material/Delete'
import {
    Avatar,
    Box,
    Button,
    Divider,
    IconButton,
    InputBase,
    Stack,
    Typography,
    useTheme,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS } from '../../constants/colors'
import { setPostModified, setPosts } from '../../data/postsSlice'

const CreatePost = ({ handleClose }) => {
    const dispatch = useDispatch()
    const [image, setImage] = useState([])
    const [post, setPost] = useState('')
    const user = useSelector((state) => state.auth.user)
    const token = useSelector((state) => state.auth.token)
    const [postButton, setPostButton] = useState(true)
    const theme = useTheme()

    useEffect(() => {
        if (post === '' && !image.length) {
            setPostButton(true)
        } else {
            setPostButton(false)
        }
    }, [post, image])

    const handleUploadPost = async () => {
        const formData = new FormData()
        formData.append('userId', user._id)
        formData.append('description', post)

        if (image.length) {
            image.map((item) => {
                formData.append('picture', item)
                formData.append('picturePath', item.name)
                return null
            })
        }
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1])
        }
        const response = await fetch(`http://localhost:5000/posts`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        })
        const posts = await response.json()
        dispatch(setPosts({ postsList: posts }))
        dispatch(setPostModified())
        setImage(null)
        handleClose()
        setPost('')
    }

    return (
        <Stack
            flexDirection={'column'}
            justifyContent={'center'}
            sx={{ [theme.breakpoints.between('xs', 'sm')]: { width: '80vw' } }}
            width={'40vw'}
            height={'auto'}
        >
            <Typography
                fontWeight={'bold'}
                justifyContent={'center'}
                display={'flex'}
                color={COLORS.contrast}
                marginBottom={'5px'}
            >
                Create New Post
            </Typography>
            <Divider sx={{ marginBottom: '10px' }} />
            <Stack flexDirection={'row'} alignItems={'center'}>
                <Avatar
                    alt="User Avatar"
                    src={`http://localhost:5000/assets/${user.picturePath}`}
                />
                <Typography
                    marginLeft={'10px'}
                    fontSize={'14px'}
                    fontWeight={'500'}
                >
                    {`${user.firstName} ${user.lastName}`}
                </Typography>
            </Stack>
            <InputBase
                placeholder="What's on your mind..."
                onChange={(e) => setPost(e.target.value)}
                value={post}
                sx={{
                    width: '100%',
                    height: '100px',
                    padding: '10px',
                    marginBottom: '10px',
                }}
            />
            <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={true}
                onDrop={(acceptedFiles) => setImage(acceptedFiles)}
            >
                {({ getRootProps, getInputProps }) => (
                    <Stack flexDirection={'row'}>
                        <Box
                            {...getRootProps()}
                            display={'flex'}
                            justifyContent={'center'}
                            border={`1px dashed black`}
                            width="100%"
                            sx={{ '&:hover': { cursor: 'pointer' } }}
                        >
                            <input {...getInputProps()} />
                            {!image.length ? (
                                <p>Add Image Here</p>
                            ) : (
                                <Stack alignItems={'center'}>
                                    {image.map((item) => (
                                        <Typography>{item.name}</Typography>
                                    ))}
                                </Stack>
                            )}
                        </Box>
                        {image && (
                            <IconButton
                                onClick={() => setImage([])}
                                sx={{ width: '15%' }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Stack>
                )}
            </Dropzone>
            <Button
                disabled={postButton}
                onClick={handleUploadPost}
                sx={{
                    marginTop: '10px',
                    color: 'white',
                    backgroundColor: COLORS.contrast,
                }}
            >
                Post
            </Button>
        </Stack>
    )
}

export default CreatePost
