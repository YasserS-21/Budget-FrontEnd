import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import NewTransaction from './Components/NewTransaction/NewTransaction'
import EditTransaction from './Components/EditTransaction/EditTransaction'
import Transactions from './Components/Transactions/Transactions'
import Transaction from './Components/Transactions/Transaction'
import Nav from './Components/Nav/Nav'

import "./App.css"


function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/:id" element={<Transaction />} />
        <Route path="/transactions/new" element={<NewTransaction/>}/>
        <Route path="/transactions/:id/edit" element={<EditTransaction/>}  />
      </Routes>
    </Router>
  )
}

export default App
