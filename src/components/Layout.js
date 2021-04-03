import styled from 'styled-components'
import React from 'react';
import { useSiteMetadata } from '../hooks/useSiteMetadata';
import { Header } from './Header';
import { Box } from '@material-ui/core';

const AppStyles = styled.main`
  width: 1000px;
  margin: 0 auto;
`;

export const Layout = ({ toggleDarkTheme, children }) => {
    const { title, description } = useSiteMetadata();
    return (
        <Box>
            <AppStyles>
                <Header toggleDarkTheme={toggleDarkTheme} siteTitle={title} siteDescription={description} />
                {children}
            </AppStyles>
        </Box>

    );
};