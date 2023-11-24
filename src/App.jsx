import './App.css'
import { OrderListAndSummary } from './components/OrderListAndSummary'

function App() {

  return (
    <div className='app'>
      <div>
        <div className='delPickupBox'>
          <h2>TSX PIZZERIAS</h2>
          <div className='delpubox'>
            <span className='delivery'>DELIVERY</span>
            <span className='pu'>PICK UP</span>
          </div>
          <div className='otherDetails'>
            <span>25 mins</span>
            <span>₹20</span>
            <span>Discounts</span>
          </div>
          <div className='otherDetails2'>
            Menu Hours: 10:00 AM to 11:00 PM
          </div>
        </div>
        <OrderListAndSummary />
      </div>
    </div>
  )
}

export default App
