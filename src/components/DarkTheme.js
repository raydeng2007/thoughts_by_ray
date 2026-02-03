import { Box } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Contain = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: '0px',
    flexDirection: 'row',
})

export const DarkTheme = ({ toggleDarkTheme }) => {
    const isBrowser = () => typeof window !== "undefined"

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (isBrowser()) {
            const theme = window.localStorage.getItem("theme")
            setChecked(theme === 'dark')
        }
    }, [])

    const handleToggle = () => {
        setChecked(!checked)
        toggleDarkTheme()
    }

    return (
        <Contain>
            <div className="container">
                <label className="switch" htmlFor="checkbox" title="Change color scheme to dark mode">
                    <input type="checkbox" id="checkbox" checked={checked} onChange={handleToggle}/>
                    <div className="slider round"></div>
                    <div className="toggle-moon"><span role="img" aria-label="dark">🌙</span></div>
                    <div className="toggle-sun"><span role="img" aria-label="light">☀️</span></div>
                </label>
            </div>
        </Contain>
    )
}