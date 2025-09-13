import '../css/app.css';

import { AppProvider } from '@/provider/AppProvider';
import { createInertiaApp } from '@inertiajs/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const mode: 'light' | 'dark' = document.documentElement.classList.contains('dark') ? 'dark' : 'light';

        const theme = createTheme({
            palette: {
                mode,
                primary: {
                    main: mode === 'light' ? '#003736' : '#163D3c',
                },
                secondary: {
                    main: mode === 'light' ? '#ffe983' : '#ffe983',
                    contrastText: mode === 'light' ? '#fff' : '#fff',
                },
                cancel: {
                    main: mode === 'light' ? '#838282' : '#838282',
                    dark: '#838282',
                    light: '#838282',
                },

                background: {
                    default: mode === 'light' ? '#ffe983' : '#c4e8da',
                },
                text: {
                    primary: mode === 'light' ? '#fff' : '#fff',
                },
                error: {
                    main: '#b23c3c',
                },
                success: {
                    main: '#2e7d6d',
                },
                warning: {
                    main: "#c77d2e",
                },
                info: {
                    main: "#2e5c7d",
                },
                action: {
                    activatedOpacity: 0.9,
                },


            },
            components: {
                MuiDrawer: {
                    styleOverrides: {
                        paper: {
                            backgroundColor: mode === 'light' ? '#004644' : '#004644',
                        },
                    },
                },
                MuiAppBar: {
                    styleOverrides: {
                        root: {
                            background: 'none',
                            boxShadow: 'none',
                            borderBottom: '1px solid #003736',
                            backgroundColor: mode === 'light' ? '#004644' : '#003736',
                        },
                    },
                },
                MuiToolbar: {
                    styleOverrides: {
                        root: {
                            backgroundColor: mode === 'light' ? '#004644' : '#004644',
                        },
                    },
                },
                MuiTable: {
                    styleOverrides: {
                        root: {
                            backgroundColor: mode === 'light' ? '#004644' : '#004644',
                        },
                    },
                },
                MuiModal: {
                    styleOverrides: {},
                },
                MuiButton: {
                }
            },
        });
        root.render(
            <AppProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App {...props} />
                </ThemeProvider>
            </AppProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
