import React, {useState} from "react"
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "../css/styling.css"

const transactions = [{
    id: 1,
    date: "1/1/24",
    description: "Standard plan monthly fee",
    type: "Payment",
    amount: "60"
}, {
    id: 2,
    date: "1/2/24",
    description: "Standard plan monthly fee",
    type: "Payment",
    amount: "60" 
}, {
    id: 3,
    date: "1/3/24",
    description: "Standard plan monthly fee",
    type: "Payment",
    amount: "60" 
}, {
    id: 4,
    date: "1/4/24",
    description: "Doesn't like the gym :<",
    type: "Refund",
    amount: "60" 
}, {
    id: 5,
    date: "1/5/24",
    description: "Switched to basic plan",
    type: "Payment",
    amount: "40" 
}, {
    id: 6,
    date: "1/6/24",
    description: "Basic plan monthly fee",
    type: "Payment",
    amount: "40" 
}, {
    id: 7,
    date: "1/7/24",
    description: "Basic plan monthly fee",
    type: "Payment",
    amount: "40" 
}, {
    id: 8,
    date: "1/8/24",
    description: "Basic plan monthly fee",
    type: "Payment",
    amount: "40" 
}, {
    id: 9,
    date: "1/9/24",
    description: "Basic plan monthly fee",
    type: "Payment",
    amount: "40" 
}, {
    id: 10,
    date: "1/10/24",
    description: "Basic plan monthly fee",
    type: "Payment",
    amount: "40" 
}, {
    id: 11,
    date: "1/11/24",
    description: "Basic plan monthly fee",
    type: "Payment",
    amount: "40" 
}, {
    id: 12,
    date: "1/12/24",
    description: "Basic plan monthly fee",
    type: "Payment",
    amount: "40" 
}, {
    id: 13,
    date: "1/1/25",
    description: "Upgraded to premium plan",
    type: "Payment",
    amount: "80" 
}, {
    id: 14,
    date: "1/2/25",
    description: "Premium plan monthly fee",
    type: "Payment",
    amount: "80" 
}, {
    id: 15,
    date: "1/3/25",
    description: "Premium plan monthly fee",
    type: "Payment",
    amount: "80" 
}, {
    id: 16,
    date: "1/4/25",
    description: "Premium plan monthly fee",
    type: "Payment",
    amount: "80" 
}];


function TransactionsTable({transactions}) {
    
    const transactionsList = transactions.map((transaction) =>
        <tr key={transaction.id}>
            <td key={transaction.date}>{transaction.date}</td>
            <td key={transaction.description}>{transaction.description}</td>
            <td key={transaction.type}>{transaction.type}</td>
            <td key={transaction.amount}>{transaction.amount}</td>
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
    const [filteredTransactions, setFilteredTransactions] = useState(transactions);

    const handleFilterSort = (condition) => {
        let transactionsSortCopy = [...transactions];
        if(condition === "All") {
            setFilteredTransactions(transactions);
            filterType= "none";
        }
        else if(condition === "Payment") {
            setFilteredTransactions(transactions.filter(transaction => transaction.type === "Payment"));
            filterType = "Payment";
        }
        else if(condition === "Refund") {
            setFilteredTransactions(transactions.filter(transaction => transaction.type === "Refund"));
            filterType = "Refund";
        }
       
        else if(condition === "NewToOld") {
            if(filterType === "Payment") {
                setFilteredTransactions(transactionsSortCopy.sort((a, b) => new Date(b.date) - new Date(a.date))
                .filter(transaction => transaction.type === "Payment"));
            }
            else if(filterType === "Refund") {
                setFilteredTransactions(transactionsSortCopy.sort((a, b) => new Date(b.date) - new Date(a.date))
                .filter(transaction => transaction.type === "Refund"));
            }
            else {
                setFilteredTransactions(transactionsSortCopy.sort((a, b) => new Date(b.date) - new Date(a.date)));
            }
        }

        else if(condition === "OldToNew") {
            if(filterType === "Payment") {
                setFilteredTransactions(transactionsSortCopy.sort((a, b) => new Date(a.date) - new Date(b.date))
                .filter(transaction => transaction.type === "Payment"));
            }
            else if(filterType === "Refund") {
                setFilteredTransactions(transactionsSortCopy.sort((a, b) => new Date(a.date) - new Date(b.date))
                .filter(transaction => transaction.type === "Refund"));
            }
            else {
                setFilteredTransactions(transactionsSortCopy.sort((a, b) => new Date(a.date) - new Date(b.date)));
            }
        }

        else if(condition === "HighToLow") {
            if(filterType === "Payment") {
                setFilteredTransactions(transactionsSortCopy.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
                .filter(transaction => transaction.type === "Payment"));
            }
            else if(filterType === "Refund") {
                setFilteredTransactions(transactionsSortCopy.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
                .filter(transaction => transaction.type === "Refund"));
            }
            else {
                setFilteredTransactions(transactionsSortCopy.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount)));
            }
        }

        else if(condition === "LowToHigh") {
            if(filterType === "Payment") {
                setFilteredTransactions(transactionsSortCopy.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount))
                .filter(transaction => transaction.type === "Payment"));
            }
            else if(filterType === "Refund") {
                setFilteredTransactions(transactionsSortCopy.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount))
                .filter(transaction => transaction.type === "Refund"));
            }
            else {
                setFilteredTransactions(transactionsSortCopy.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount)));
            }
        }
    };

    return (
        <React.Fragment>
        <Header />
        <h1>Transaction History</h1>
        <div className="sort-filter-container">
            <TransactionsSort  onFilterSort={handleFilterSort}/>
            <TransactionsFilter onFilterSort={handleFilterSort}/>
        </div>
        <TransactionsTable transactions={filteredTransactions}/>
        <Footer />
        </React.Fragment>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)

