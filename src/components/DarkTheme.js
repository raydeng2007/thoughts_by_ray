import React from 'react'
// import { Box } from '@material-ui/core'

export const DarkTheme = ({ toggleDarkTheme }) => {
    const existingPreference = localStorage.getItem("theme");
    const checked = existingPreference && existingPreference === 'dark'
    return (
        // <Box>
        //     <label>
        //         <input
        //             type="checkbox"
        //             onChange={e => {
        //                 toggleDarkTheme()
        //             }}
        //             checked={checked}
        //         />{' '}
        //             Dark mode
        //         </label>
        // </Box>
        <div class="container">
            <label class="switch" for="checkbox" title="Change color scheme to dark mode">
                <input type="checkbox" id="checkbox" onClick={toggleDarkTheme} checked={checked} />
                <div class="slider round"></div>
                <div class="toggle-moon">🌙</div>
                <div class="toggle-sun">☀️</div>
            </label>
        </div>
    )

}