import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { Form } from '@inertiajs/react';

import { MyAuthLayout } from '@/layouts/MyAuthLayout';
import { MyButton } from '@/stories/atoms/Button/MyButton';
import { Alert, Box, Checkbox, FormControlLabel, Paper, TextField, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';

interface ILogin {
    status?: string;
}
export default function login({ status }: ILogin) {
    return (
        <MyAuthLayout>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Form {...AuthenticatedSessionController.store.form()} resetOnSuccess={['password']}>
                    {({ processing, errors }) => (
                        <Box display="flex" flexDirection="column" gap={2}>
                            <Box>
                                <TextField
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Email address"
                                    placeholder="email@example.com"
                                    autoComplete="email"
                                    autoFocus
                                    fullWidth
                                    tabIndex={1}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email}
                                    margin="normal"
                                />
                            </Box>

                            <Box>
                                <Box display="flex" alignItems="center">
                                    <Typography component="label" htmlFor="password" sx={{ fontSize: 14, fontWeight: 500 }}>
                                        Password
                                    </Typography>

                                    <Tooltip title="Disabled in this demo">
                                        <span style={{ marginLeft: 'auto' }}>
                                            <Link
                                                style={{ pointerEvents: 'none' }}
                                                sx={{ fontSize: 14 }}
                                                tabIndex={5}
                                                underline="hover"
                                                color={'secondary'}
                                            >
                                                Forgot password?
                                            </Link>
                                        </span>
                                    </Tooltip>
                                </Box>

                                <TextField
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    fullWidth
                                    tabIndex={2}
                                    error={Boolean(errors.password)}
                                    helperText={errors.password}
                                    margin="normal"
                                />
                            </Box>

                            <FormControlLabel control={<Checkbox id="remember" name="remember" tabIndex={3} />} label="Remember me" />

                            <MyButton type="submit" fullWidth variant="contained" loading={processing} tabIndex={4} sx={{ mt: 1 }}>
                                Log in
                            </MyButton>

                            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
                                Don&apos;t have an account?&nbsp;
                                <Tooltip title="Disabled in this demo">
                                    <span>
                                        <Link tabIndex={5} underline="hover" color={'secondary'} style={{ pointerEvents: 'none' }}>
                                            Sign up
                                        </Link>
                                    </span>
                                </Tooltip>
                            </Typography>
                        </Box>
                    )}
                </Form>

                {status && (
                    <Alert severity="success" sx={{ mt: 2, textAlign: 'center' }}>
                        {status}
                    </Alert>
                )}
            </Paper>
        </MyAuthLayout>
    );
}
