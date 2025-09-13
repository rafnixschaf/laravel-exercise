import '@mui/material/styles';
import '@mui/material/Button';

declare module '@mui/material/styles' {
    interface Palette {
        cancel: Palette['primary'];
    }
    interface PaletteOptions {
        cancel?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        cancel: true;
    }
}
