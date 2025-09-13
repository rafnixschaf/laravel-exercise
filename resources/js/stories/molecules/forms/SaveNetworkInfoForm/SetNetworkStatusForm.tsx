import { MyButton } from '@/stories/atoms/Button/MyButton';
import { NetworkStatus } from '@/stories/atoms/NetworkStatus/NetworkStatus';
import { useSetNetworkStatusForm } from '@/stories/molecules/forms/SaveNetworkInfoForm/setNetworkStatusFormHook';
import { style } from '@/stories/molecules/forms/SaveNetworkInfoForm/style';
import { FormControl, Grid, Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';


export interface ISetNetworkInfoForm {
    onSave: () => void;
    // need a custom property because react expects a html element
    formRef?: React.Ref<ISetNetworkStatusFormRef>
}

export interface ISetNetworkStatusFormRef {
    handleClose: () => void;

}
export const SetNetworkStatusForm = ({ ...props }: ISetNetworkInfoForm) => {
    const { errors, submit, networkRef, setData, data } = useSetNetworkStatusForm({onSuccess: props.onSave, ref: props.formRef});

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
                    <Stack sx={{ alignItems: 'flex-end' }}>
                        <MyButton onClick={(event) => submit(event)}>Save</MyButton>
                    </Stack>
                </Grid>
        </Box>
    );
};
