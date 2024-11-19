import './index.css';
import { Route, Routes } from 'react-router-dom'
import TradingOverviewScreen from './pages/TradingOverviewScreen'
import TradeExecutionScreen from './pages/TradeExecutionScreen';
import LiveTradesScreen from './pages/LiveTradesScreen';
import DepositScreen from './pages/DepositScreen';
import WithdrawalScreen from './pages/WithdrawalScreen';
import MainDashboard from './pages/MainDashboardScreen';
import WalletScreen from './pages/WalletScreen';
import LoginPage from '@/pages/LoginScreen';
import SignupPage from '@/pages/SignupScreen';
import NotFoundPage from '@/pages/404';
import RequireAuth from '@/components/auth/RequireAuth';

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/register' element={<SignupPage />} />
        <Route path='/overview' element={<TradingOverviewScreen />} />
        <Route path='/' element={<TradingOverviewScreen />} />
        <Route path='/dashboard' element={
          <RequireAuth>
            <MainDashboard />
          </RequireAuth>
        } />
        <Route path='/trade' element={
          <RequireAuth>
            <TradeExecutionScreen />
          </RequireAuth>
        } />
        <Route path='/trade/live' element={
          <RequireAuth>
            <LiveTradesScreen />
          </RequireAuth>
        } />
        <Route path='/deposit' element={
          <RequireAuth>
            <DepositScreen />
          </RequireAuth>
        } />
        <Route path='/withdraw' element={
          <RequireAuth>
            <WithdrawalScreen />
          </RequireAuth>
        } />
        <Route path='/wallet' element={
          <RequireAuth>
            <WalletScreen />
          </RequireAuth>
        } />
        // 404
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
