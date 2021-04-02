import React from 'react';
import { Box, Card, styled } from '@material-ui/core'
import { Link } from 'gatsby';
import { DarkTheme } from './DarkTheme'

const TitleCard = styled(Card)({
    marginTop: '20px',
    textAlign: 'center',
})

export const Header = ({ siteTitle, siteDescription, toggleDarkTheme }) => {
    return (
        <Box justifyContent='center' pb={4}>
            <TitleCard>
                <Link to='/'>
                    <h1>{siteTitle}</h1>
                </Link>
                <p>{siteDescription}</p>

            </TitleCard>
            <Box justifyContent='flex-end'>
                <DarkTheme toggleDarkTheme={toggleDarkTheme} />
            </Box>

        </Box>
    );
};