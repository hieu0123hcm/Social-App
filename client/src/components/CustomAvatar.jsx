import { Avatar } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CustomAvatar = ({ userId, picturePath }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/profile/${userId}`)
    }

    return (
        <Avatar
            sx={{
                cursor: 'pointer',
            }}
            onClick={handleClick}
            alt="User Avatar"
            src={`http://localhost:5000/assets/${picturePath}`}
        />
    )
}

export default CustomAvatar
