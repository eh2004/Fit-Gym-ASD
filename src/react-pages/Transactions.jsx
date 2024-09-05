import React from "react"
import ReactDOM from "react-dom/client"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "../css/styling.css"

const transactions = [{
    id: "1",
    date: "1/1/24",
    description: "Standard plan monthly fee",
    type: "Payment",
    amount: "$60"
}, {
    id: "2",
    date: "1/2/24",
    description: "Standard plan monthly fee",
    type: "Payment",
    amount: "$60" 
}, {
    id: "3",
    date: "1/3/24",
    description: "Standard plan monthly fee",
    type: "Payment",
    amount: "$60" 
}, {
    id: "4",
    date: "1/4/24",
    description: "Doesn't like the gym :<",
    type: "Refund",
    amount: "$60" 
}, {
    id: "5",
    date: "1/5/24",
    description: "Switched to basic plan",
    type: "Payment",
    amount: "$40" 
}, {
    id: "6",
    date: "1/6/24",
    description: "Basic plan monthly fee",
    type: "Payment",
    amount: "$40" 
}, {
    id: "7",
    date: "1/7/24",
    description: "Basic plan monthly fee",
    type: "Payment",
    amount: "$40" 
}, {
    id: "8",
    date: "1/8/24",
    description: "Basic plan monthly fee",
    type: "Payment",
    amount: "$40" 
}, {
    id: "9",
    date: "1/9/24",
    description: "Basic plan monthly fee",
    type: "Payment",
    amount: "$40" 
}, {
    id: "10",
    date: "1/10/24",
    description: "Basic plan monthly fee",
    type: "Payment",
    amount: "$40" 
}, {
    id: "11",
    date: "1/11/24",
    description: "Basic plan monthly fee",
    type: "Payment",
    amount: "$40" 
}, {
    id: "12",
    date: "1/12/24",
    description: "Basic plan monthly fee",
    type: "Payment",
    amount: "$40" 
}, {
    id: "13",
    date: "1/1/25",
    description: "Upgraded to premium plan",
    type: "Payment",
    amount: "$80" 
}, {
    id: "14",
    date: "1/2/25",
    description: "Premium plan monthly fee",
    type: "Payment",
    amount: "$80" 
}, {
    id: "15",
    date: "1/3/25",
    description: "Premium plan monthly fee",
    type: "Payment",
    amount: "$80" 
}, {
    id: "16",
    date: "1/4/25",
    description: "Premium plan monthly fee",
    type: "Payment",
    amount: "$80" 
}];


const transactionsList = transactions.map((transaction) =>
    <tr key={transaction.id}>
        <td key={transaction.date}>{transaction.date}</td>
        <td key={transaction.description}>{transaction.description}</td>
        <td key={transaction.type}>{transaction.type}</td>
        <td key={transaction.amount}>{transaction.amount}</td>
    </tr>
)


function TransactionsTable() {
    return (
        <table className="transactions-table">
        <thead>
            <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            {transactionsList}
         </tbody>
        </table>
    )
}

function TransactionsSort() {
    return (
        <div className="dropdown-container">
            <button className="dropdown-btn">Sort By</button>
            <div className="dropdown-list">
                <button>Date (Newest to Oldest)</button>
                <button>Date (Oldest to Newest)</button>
                <button>Amount (Highest to Lowest)</button>
                <button>Amount (Lowest to Highest)</button>
            </div>
        </div>
    )
}

function App() {
    return (
        <React.Fragment>
        <Header />
        <h1>Transaction History</h1>
        <TransactionsSort />
        <TransactionsTable />
        <Footer />
        </React.Fragment>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)

