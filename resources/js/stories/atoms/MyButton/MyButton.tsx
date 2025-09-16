import Button from '@mui/material/Button';
import { ComponentProps } from 'react';

type IMyButton = ComponentProps<typeof Button>;
export const MyButton = ({ children, onClick, ...props }: IMyButton) => {
    return (
        <Button
            color={props.color || 'primary'}
            variant="contained"
            sx={{
                "&.Mui-disabled": {
                    backgroundColor: "primary.main",
                    opacity: 0.5,
                },
            }}
            onClick={(e) => {
                // blur trigger button to prevent focus inside aria-hidden region after opening modal
                (e.currentTarget as HTMLButtonElement).blur();
                onClick?.(e);
            }}
            {...props}
        >
            {children}
        </Button>
    );
};
