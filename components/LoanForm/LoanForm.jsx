import React from 'react'
import { FormControl, FormHelperText, InputLabel, Input, Select, MenuItem, FormLabel } from '@material-ui/core';

export default function LoanForm() {

    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div className="p-3 m-2 rounded bg-white">
            <FormControl>
                <div className="mb-3">
                    <Input placeholder='Name' id="my-input" aria-describedby="my-helper-text" />
                </div>

                <div className="mb-3">
                    <Input placeholder='Address' id="my-input" aria-describedby="my-helper-text" />
                </div>

                <div className="mb-3">
                    <Input placeholder='Documents' id="my-input" type="file" aria-describedby="my-helper-text"/>
                </div>
                
                <div className="mb-3">
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={"Loan"}
                    onChange={handleChange}
                >
                    <MenuItem value="Loan">
                    <em>Loan Type</em>
                    </MenuItem>
                    <MenuItem value="home">Home</MenuItem>
                    <MenuItem value="car">Car</MenuItem>
                </Select>
                </div>
            </FormControl>
        </div>
    )
}
