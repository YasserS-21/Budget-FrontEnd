import React, { useEffect, useState } from "react";
import axios from "axios";


function Transactions() {
    const [transactionArray, setTransactionArray] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);

    async function fetchData() {
      try {
        let result = await axios.get("http://localhost:3003/transactions");
        setTransactionArray(result.data);
      } catch (e) {
        console.log(e);
      }
    }
    let bankAccountTotal = 10
    transactionArray.forEach(transaction => {
        bankAccountTotal+= Number(transaction.amount)   
    })
    return (
        <div>
            <h2>Total: {bankAccountTotal}</h2>
            <div>
                <table id="transactions">
                    <tbody>
                        <tr>
                            <th>Date</th>
                            <th>Item</th>
                            <th>Amount</th>
                        </tr>

                        {transactionArray?.map(
                            ({ id, item_name, amount, date }) => {
                                return (
                                    <tr key={id}>
                                        <td>{date}</td>
                                        <td>{item_name}</td>
                                        <td>{amount}</td>
                                        <td><a href={`http://localhost:3000/transactions/${id}`}>SEE MORE</a></td>
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Transactions