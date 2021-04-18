import React from 'react';
import { Box, Card } from '@material-ui/core'
import styled from 'styled-components'
import { Link } from 'gatsby';
import { DarkTheme } from './DarkTheme'

const TitleCard = styled(Card)({
    borderRadius: '8px',
    marginTop: '20px',
    textAlign: 'center',
})

const HeaderBox = styled(Box)({
    paddingBottom: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
})

export const Header = ({ siteTitle, siteDescription, toggleDarkTheme }) => {
    return (
        <HeaderBox>
            <TitleCard raised={true}>
                <Link to='/'>
                    <h1>{siteTitle}</h1>
                </Link>
                <p>{siteDescription}</p>
            </TitleCard>
            <DarkTheme toggleDarkTheme={toggleDarkTheme} />
        </HeaderBox>
    );
};