import './index.css';
import { Route, Routes } from 'react-router-dom'
import TradingOverviewScreen from './pages/TradingOverviewScreen'
import TradeExecutionScreen from './pages/TradeExecutionScreen';
import TradeConfirmationScreen from './pages/TradeConfirmationScreen';
import LiveTradesScreen from './pages/LiveTradesScreen';
import DepositScreen from './pages/DepositScreen';
import WithdrawalScreen from './pages/WithdrawalScreen';
import MainDashboard from './pages/MainDashboardScreen';
import WalletScreen from './pages/WalletScreen';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<MainDashboard />} />
        <Route path='/dashboard' element={<MainDashboard />} />
        <Route path='/overview' element={<TradingOverviewScreen />} />
        <Route path='/trade' element={<TradeExecutionScreen />} />
        <Route path='/trade/confirm' element={<TradeConfirmationScreen />} />
        <Route path='/trade/live' element={<LiveTradesScreen />} />
        <Route path='/deposit' element={<DepositScreen />} />
        <Route path='/withdraw' element={<WithdrawalScreen />} />
        <Route path='/wallet' element={<WalletScreen />} />
      </Routes>
    </>
  )
}

export default App
