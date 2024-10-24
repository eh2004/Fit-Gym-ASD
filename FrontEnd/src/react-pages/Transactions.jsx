import React, { useEffect, useCallback, Fragment, useState } from 'react';
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "../css/styling.css"

function TransactionsTable({transactions}) {
    
    const transactionsList = transactions.map((transaction) =>
        <tr key={transaction.transaction_id}>
            <td>{transaction.transaction_date}</td>
            <td>{transaction.transaction_description}</td>
            <td>{transaction.transaction_type}</td>
            <td>{transaction.transaction_amount}</td>
        </tr>
    )

    return (
        <table className="transactions-table">
        <thead>
            <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
                <th>Amount ($)</th>
            </tr>
        </thead>
        <tbody>
            {transactionsList}
         </tbody>
        </table>
    )
}

function TransactionsSort({onFilterSort}) {
    return (
        <div className="dropdown-container">
            <button className="dropdown-btn">Sort By</button>
            <div className="dropdown-list">
                <button onClick={() => onFilterSort("NewToOld")}>Date (Newest to Oldest)</button>
                <button onClick={() => onFilterSort("OldToNew")}>Date (Oldest to Newest)</button>
                <button onClick={() => onFilterSort("HighToLow")}>Amount (Highest to Lowest)</button>
                <button onClick={() => onFilterSort("LowToHigh")}>Amount (Lowest to Highest)</button>
            </div>
        </div>
    )
}

function TransactionsFilter({onFilterSort}) {
    return (
        <div className="dropdown-container filter-container">
            <button className="dropdown-btn filter-dropdown-btn">Filter</button>
            <div className="dropdown-list filter-list">
                <button onClick={() => onFilterSort("Payment")}>Show Payments</button>
                <button onClick={() => onFilterSort("Refund")}>Show Refunds</button>
                <button onClick={() => onFilterSort("All")}>Show All</button>
            </div>
        </div>
    )
}

var filterType = "none";

function App() {
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/transactions')
            .then((response) => response.json())
            .then((transactionData) => {
                const storedUser = localStorage.getItem("loggedInUser");
                const storedUserType = localStorage.getItem("userType");

                console.log("User type: " + storedUserType + ", User ID: " + storedUser);

                let userTransactionsList = [];

                if (storedUserType === "customer") {
                    userTransactionsList = transactionData.filter(transaction => transaction.customer_id == storedUser);
                } else if (storedUserType === "trainer") {
                    userTransactionsList = transactionData.filter(transaction => transaction.trainer_id == storedUser);
                }

                setTransactions(userTransactionsList);
                setFilteredTransactions(userTransactionsList);
            });
    }, []);

    const handleFilterSort = (condition) => {
        let transactionsSortCopy = [...transactions];
        
        if (condition === "All") {
            setFilteredTransactions(transactions);
            filterType = "none";
        } else if (condition === "Payment") {
            setFilteredTransactions(transactions.filter(transaction => transaction.transaction_type === "Payment"));
            filterType = "Payment";
        } else if (condition === "Refund") {
            setFilteredTransactions(transactions.filter(transaction => transaction.transaction_type === "Refund"));
            filterType = "Refund";
        } else if (condition === "NewToOld") {
            setFilteredTransactions(transactionsSortCopy.sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date)));
        } else if (condition === "OldToNew") {
            setFilteredTransactions(transactionsSortCopy.sort((a, b) => new Date(a.transaction_date) - new Date(b.transaction_date)));
        } else if (condition === "HighToLow") {
            setFilteredTransactions(transactionsSortCopy.sort((a, b) => parseFloat(b.transaction_amount) - parseFloat(a.transaction_amount)));
        } else if (condition === "LowToHigh") {
            setFilteredTransactions(transactionsSortCopy.sort((a, b) => parseFloat(a.transaction_amount) - parseFloat(b.transaction_amount)));
        }
    };

    return (
        <React.Fragment>
            <Header />
            <h1>Transaction History</h1>
            <div className="sort-filter-container">
                <TransactionsSort onFilterSort={handleFilterSort} />
                <TransactionsFilter onFilterSort={handleFilterSort} />
            </div>
            <TransactionsTable transactions={filteredTransactions} />
            <Footer />
        </React.Fragment>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

