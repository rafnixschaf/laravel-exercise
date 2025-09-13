import { Container, Grid, Typography } from '@mui/material';

interface IMyAuthLayout {
    children: React.ReactNode;
}
export const MyAuthLayout = ({ ...props }: IMyAuthLayout) => {
    return (
        <Grid container component="main" sx={{ minHeight: '100vh', backgroundColor: '#1b5a59' }}>
            <Container maxWidth="xs" sx={{ py: 6, }}>
                <Typography variant="h5" gutterBottom textAlign="center" mb={4} color="secondary.contrastText">
                    Log in to your account
                </Typography>
                {props.children}
            </Container>
        </Grid>

    );
};
