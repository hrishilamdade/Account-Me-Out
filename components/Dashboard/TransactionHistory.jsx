import React, { useState } from 'react'

function TransactionHistory() {
    const [tranactions, setTranactions] = useState([1,3,4,5,6,6])
    return (
        <div className="mt-3 p-3 bg-white rounded shadow-lg">
             <p><h4>Transaction History</h4></p>

            <div className="ms-2 justify-content-center text-center" >
                <table classNam="text-center">
                    <thead>
                        <th className="m-1 p-2">Transaction ID</th>
                        <th className="m-1 p-2">Date</th>
                        <th className="m-1 p-2">Transfer from/to</th>
                        <th className="m-1 p-2">Amount</th>
                    </thead>  
                
                {
                    tranactions.map((t,id)=>
                        <tr>
                            <td className="m-1 p-2">{id}</td>
                            <td className="m-1 p-2">14/11/2021</td>
                            <td className="m-1 p-2">From</td>
                            <td className="m-1 p-2">34</td>
                        </tr>
                    )
                }
                </table>
            </div>
        </div>
    )
}

export default TransactionHistory
