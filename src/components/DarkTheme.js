import { Box } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

export const DarkTheme = ({ toggleDarkTheme }) => {
    const isBrowser = () => typeof window !== "undefined"
    const windowGlobal = typeof window !== 'undefined' && window

    let existingPreference = 'light'
    if (isBrowser()) { existingPreference = windowGlobal.localStorage.getItem("theme") };
    const checked = existingPreference === 'dark'
    // const ToggleSun = styled(Box)({
    //     paddingRight: '7px',
    //     width: '50%',
    //     textAlign: 'center',
    //     paddingTop: '7px',
    //     zIndex: 420,
    //     position: 'relative'
    // })

    return (
        // <ToggleBox class='b'>
        <Box display='flex'>
            <div class="container" justifyContent='flex-end'>
                <label class="switch" for="checkbox" title="Change color scheme to dark mode">
                    <input type="checkbox" id="checkbox" onClick={toggleDarkTheme} checked={checked} />
                    <div class="slider round"></div>
                    <div class="toggle-moon"><span role="img" aria-label="dark">🌙</span></div>
                    <div class="toggle-sun" paddingRight='0.6em'><span role="img" aria-label="light">☀️</span></div>
                </label>
            </div>
        </Box>

        // </ToggleBox>

    )

}