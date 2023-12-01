import { useState } from 'react';

function useAlert(initialState = false) {
    const [open, setOpen] = useState(initialState);

    const handleClose = (_event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return [open, setOpen, handleClose];
}

export default useAlert;