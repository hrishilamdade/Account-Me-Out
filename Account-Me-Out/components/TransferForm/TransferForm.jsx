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
    <div className="d-flex flex-column p-3 m-2 rounded bg-white">
      <FormControl>
        <div className="mb-3">
          <Input
            name="accountOfReceiver"
            placeholder="Account Number"
            id="my-input"
            aria-describedby="my-helper-text"
            value={state.accountOfReceiver}
            onChange={handleStateChange}
          />
        </div>
      </FormControl>
      <FormControl>
        <div className="mb-3">
          <Input
            name="nameOfReceiver"
            placeholder="Name"
            id="my-input"
            aria-describedby="my-helper-text"
            value={state.nameOfReceiver}
            onChange={handleStateChange}
          />
        </div>
      </FormControl>

      <FormControl>
        <div className="mb-3">
          <Input
            name="amountToTranfer"
            placeholder="Amount"
            id="my-input"
            aria-describedby="my-helper-text"
            value={state.amountToTranfer}
            onChange={handleStateChange}
          />
        </div>
      </FormControl>

      <FormControl>
        <div className="mb-3">
          <Input
            name="sender"
            placeholder="Sender"
            id="my-input"
            aria-describedby="my-helper-text"
            value={state.sender}
            onChange={handleStateChange}
          />
        </div>
      </FormControl>

      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
}

export default TransferForm;
