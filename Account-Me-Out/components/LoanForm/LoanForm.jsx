import React, { useState } from 'react'
import { FormControl, FormHelperText, InputLabel, Input, Select, MenuItem, FormLabel } from '@material-ui/core';
import axios from 'axios';

export default function LoanForm() {

    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [state, setstate] = useState({name : "", address : "", loantype : "", file : ""});

    const handleStateChange = (e) =>{
        setstate({...state, [e.target.name] : e.target.value});
    };

    const handleFileChange = (e) => {
        setstate({...state, file : e.target.files[0]});
        console.log('Hanlded : ', e.target.files[0]);
    }

    const handleChange = (event) => {
        setAge(event.target.value);
        setstate({...state, loantype : event.target.value});
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        const formdata = new FormData();

        formdata.append('loan_form', JSON.stringify(state));
        formdata.append('file', state.file);

        const url = "http://localhost:8000/loanForm";
        
        axios.post(url, formdata, {headers : {
            'Content-Type' : 'application/json'
        }})
        .then((res)=>{
            console.log(res);
        })
    };

    console.log(state);

    return (
        <div className="d-flex flex-column p-3 m-2 rounded bg-white">
            <FormControl>
                <div className="mb-3">
                    <Input name="name" placeholder='Name' id="my-input" aria-describedby="my-helper-text" value={state.name} onChange={handleStateChange}/>
                </div>
            </FormControl>
            <FormControl>
                <div className="mb-3">
                    <Input name="address" placeholder='Address' id="my-input" aria-describedby="my-helper-text" value={state.address} onChange={handleStateChange}/>
                </div>
            </FormControl>
            <FormControl>
                <div className="mb-3">
                    <Input name="file" placeholder='Documents' id="my-input" type="file" aria-describedby="my-helper-text" onChange={handleFileChange} />
                </div>
            </FormControl>    
            <FormControl>
                <div className="mb-3">
                <Select
                    name = "loantype"
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={state.loantype}
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

            <button onClick={handleSubmit}>Submit</button>


            <form encType="multipart/form-data">  
                <input name="file" placeholder='Documents' id="my-input" type="file" aria-describedby="my-helper-text" onChange={handleFileChange} />  
                <button onClick={handleSubmit}>Submit</button>
            </form> 
        </div>
    )
}
