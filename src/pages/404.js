import { Box } from '@material-ui/core'
import { Link } from 'gatsby'
import React from 'react'

const NotFoundPage = () => (
    <Box display='flex' justifyContent='center'>
        <h1>The good ol 404 for ya</h1>
        <Link to="/">Go to home page</Link>
    </Box>
)

export default NotFoundPage