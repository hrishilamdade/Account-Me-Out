import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  Select,
  MenuItem,
  FormLabel,
} from "@material-ui/core";
import axios from "axios";
function TransferForm() {
  const [state, setstate] = useState({
    nameOfReceiver: "",
    accountOfReceiver: "",
    amountToTranfer: "",
    sender: "",
  });

  const handleStateChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  const handleTransfer = (e) => {
    e.preventDefault();

    const url = "http://localhost:8000/transferForm";

    axios
      .post(url, state, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      });
    setstate({
      nameOfReceiver: "",
      accountOfReceiver: "",
      amountToTranfer: "",
      sender: "",
    });
  };

  console.log(state);
  return (
    <div className="d-flex flex-column p-3 m-4 text-center rounded bg-white shadow-lg mh-100">
      <FormControl className="w-75 m-2">
          <Input
            name="accountOfReceiver"
            placeholder="Account Number"
            id="my-input"
            aria-describedby="my-helper-text"
            value={state.accountOfReceiver}
            onChange={handleStateChange}
          />
      </FormControl>
      <FormControl className="w-75 m-2">
          <Input
            name="nameOfReceiver"
            placeholder="Name"
            id="my-input"
            aria-describedby="my-helper-text"
            value={state.nameOfReceiver}
            onChange={handleStateChange}
          />
      </FormControl>

      <FormControl className="w-75 m-2">
          <Input
            name="amountToTranfer"
            placeholder="Amount"
            id="my-input"
            aria-describedby="my-helper-text"
            value={state.amountToTranfer}
            onChange={handleStateChange}
          />
      </FormControl>

      <FormControl className="w-75 m-2">
          <Input
            name="sender"
            placeholder="Sender"
            id="my-input"
            aria-describedby="my-helper-text"
            value={state.sender}
            onChange={handleStateChange}
          />
      </FormControl>
      <div className="w-75">
      <button id = "pk" style={{width:"max-content"}} className="btn btn-success align-self-center" onClick={handleTransfer}>Transfer</button>
      </div>
    </div>
  );

}

export default TransferForm;
