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

const Container = styled(Box)({
    justifyContent: 'center',
    paddingBottom: '24px',
})

const ToggleBox = styled(Box)({
    justifyContent: 'flex-end',
})

export const Header = ({ siteTitle, siteDescription, toggleDarkTheme }) => {
    return (
        <Container>
            <TitleCard>
                <Link to='/'>
                    <h1>{siteTitle}</h1>
                </Link>
                <p>{siteDescription}</p>

            </TitleCard>
            <ToggleBox>
                <DarkTheme toggleDarkTheme={toggleDarkTheme} />
            </ToggleBox>

        </Container>
    );
};