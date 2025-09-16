import { MyButton } from '@/stories/atoms/MyButton/MyButton';
import { NetworkStatus } from '@/stories/atoms/NetworkStatus/NetworkStatus';
import { useSetNetworkStatusForm } from '@/stories/molecules/forms/SaveNetworkInfoForm/setNetworkStatusFormHook';
import { style } from '@/stories/molecules/forms/style/style';
import { FormControl, Grid, Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { IForm } from '@/types/IForm';
import { LoadingIndicator } from '@/stories/atoms/LoadingIndicator/LoadingIndicator';



export const SetNetworkStatusForm = ({ ...props }: IForm) => {
    const { errors, submit, networkRef, setData, data, isLoading } = useSetNetworkStatusForm({onSuccess: props.onSave, ref: props.formRef});

    return (
        <Box sx={style}>
                <Grid container spacing={2} flexDirection="column" width="100%">
                    <Stack sx={{ alignItems: 'center' }}>
                        <NetworkStatus ref={networkRef}/>
                    </Stack>
                    <FormControl variant="standard">
                        <TextField
                            id="locationsa"
                            label="Location"
                            multiline
                            fullWidth
                            maxRows={4}
                            error={!!errors.location}
                            helperText={errors.location}
                            minRows={1}
                            autoComplete="off"
                            value={data.location}
                            variant="standard"
                            onChange={(event) => setData('location', event.target.value)}
                        />
                    </FormControl>
                    <Stack sx={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end', gap: 2 }}>
                        <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
                        <MyButton onClick={(event) => submit(event)}>Save</MyButton>
                    </Stack>
                </Grid>
        </Box>
    );
};
