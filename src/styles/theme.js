/**
 * Theme Configuration
 *
 * Only 4 colors to manage! Edit the palette below.
 * Dark/light themes are just these colors swapped.
 */

// ===========================================
// EDIT THESE 4 COLORS TO CHANGE YOUR PALETTE
// ===========================================
const palette = {
    color1: '#0D1B1E', // Deep dark teal
    color2: '#1E3A47', // Brighter slate blue
    color3: '#A8DADC', // Soft sage/mint
    color4: '#F1FAEE', // Brighter cream
};

export const colors = {
    // Dark theme - dark backgrounds, light text
    dark: {
        background: palette.color1,
        backgroundPaper: palette.color2,
        primary: palette.color3,
        secondary: palette.color4,
        text: palette.color4,
        textMuted: palette.color3,
    },
    // Light theme - light backgrounds, dark text
    light: {
        background: palette.color4,
        backgroundPaper: palette.color3,
        primary: palette.color2,
        secondary: palette.color1,
        text: palette.color1,
        textMuted: palette.color2,
    }
};

// Material-UI theme configuration
export const getMuiTheme = (mode) => ({
    palette: {
        type: mode,
        primary: {
            main: mode === 'dark' ? colors.dark.primary : colors.light.primary,
        },
        secondary: {
            main: mode === 'dark' ? colors.dark.secondary : colors.light.secondary,
        },
        background: {
            default: mode === 'dark' ? colors.dark.background : colors.light.background,
            paper: mode === 'dark' ? colors.dark.backgroundPaper : colors.light.backgroundPaper,
        },
        text: {
            primary: mode === 'dark' ? colors.dark.text : colors.light.text,
            secondary: mode === 'dark' ? colors.dark.textMuted : colors.light.textMuted,
        },
    },
});

export { palette };
export default colors;
