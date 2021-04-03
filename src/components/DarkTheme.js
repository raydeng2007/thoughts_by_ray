import React from 'react'

export const DarkTheme = ({ toggleDarkTheme }) => {
    const isBrowser = () => typeof window !== "undefined"
    const windowGlobal = typeof window !== 'undefined' && window

    let existingPreference = 'light'
    if (isBrowser()) { existingPreference = windowGlobal.localStorage.getItem("theme") };
    const checked = existingPreference === 'dark'
    return (
        <div class="container">
            <label class="switch" for="checkbox" title="Change color scheme to dark mode">
                <input type="checkbox" id="checkbox" onClick={toggleDarkTheme} checked={checked} />
                <div class="slider round"></div>
                <div class="toggle-moon"><span role="img" aria-label="dark">🌙</span></div>
                <div class="toggle-sun"><span role="img" aria-label="light">☀️</span></div>
            </label>
        </div>
    )

}