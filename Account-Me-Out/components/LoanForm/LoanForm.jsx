import React, { useState } from 'react'
import { FormControl, FormHelperText, InputLabel, Input, Select, MenuItem, FormLabel } from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function LoanForm() {

    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [state, setstate] = useState({name : "", address : "", loantype : "Loan Type", amount : ""});

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
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }})
        .then((res)=>{
            console.log(res);
        })

        Swal.fire({
          title: '<strong>Please wait while we verify your Documents and sanction your Loan</strong>',
          icon: "warning",
          width: 500,
          padding: '1.2rem',
          confirmButtonText: 'Close',
          background: '#fff',
          backdrop: `
            rgba(43, 165, 137, 0.45)
            left top
            no-repeat
          `,        
        });

        setTimeout(() => { 
            Swal.fire({
            title: '<strong>Your Documents have been verified successfully and Loan has been sanctioned successfully</strong>',
            icon: "success",
            width: 500,
            padding: '1.2rem',
            confirmButtonText: 'Close',
            background: '#fff',
            backdrop: `
                rgba(43, 165, 137, 0.45)
                left top
                no-repeat
            `,        
            });

        }, 5000);

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
                    <Input name="amount" placeholder='Amount' id="my-input" aria-describedby="my-helper-text" value={state.amount} onChange={handleStateChange} />
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

            {/* <button onClick={handleSubmit}>Submit</button> */}


            <form encType="multipart/form-data">  
                <input name="file" placeholder='Documents' id="my-input" type="file" aria-describedby="my-helper-text" onChange={handleFileChange} />  
                <button onClick={handleSubmit}>Submit</button>
            </form> 
        </div>
    )
}
