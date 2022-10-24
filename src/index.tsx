import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import GlobalStyle from './style/Global'
import App from './pages/App'
import Butnse from './components/Butnsue'
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import ToastListener from './components/ToastListener'
import Providers from './Providers'
import 'inter-ui'
import './i18n'

const baseSize = 16

function getRem () {
  // eslint-disable-next-line prefer-destructuring
  const clientWidth = document.documentElement.clientWidth
  if(clientWidth > 750) {
      const scale = document.documentElement.clientWidth / 1420
      document.documentElement.style.fontSize = `${baseSize * Math.min(scale, 1)}px`
  } else {
      const scale = document.documentElement.clientWidth / 390
      document.documentElement.style.fontSize = `${baseSize * Math.min(scale, 2)}px`
  }
}

window.onload = function windowOnload() {
  getRem();
  window.addEventListener('resize', getRem, false);
}

if ('ethereum' in window) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false
}

window.addEventListener('error', () => {
    localStorage?.removeItem('redux_localstorage_simple_lists')
})

ReactDOM.render(
  <StrictMode>
    <Providers>
      <>
        <ListsUpdater />
        <ApplicationUpdater />
        <TransactionUpdater />
        <MulticallUpdater />
        <ToastListener />
      </>
      <ResetCSS />
      <GlobalStyle />

      <App />
      <Butnse />
    </Providers>
  </StrictMode>,
  document.getElementById('root')
)
