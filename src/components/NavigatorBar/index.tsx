
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'

import './index.css'

import { useHistory } from 'react-router-dom'

import Menu from '../Menu'
import NavLogoUrl from '../../image/World_Cup_Logo.png'
import NavLogoWhiteUrl from '../../image/footerLogo-one.png'

declare const window: Window & { ethereum: any };

export default function Index(props) {
  const history = useHistory()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [tabIndex, settabIndex] = useState<number>(0)


  const setTab = (id, url) => {
    history.push(`/${url}`)
  }

  const checknBNBNetwork = async () => {
    try {
      const { ethereum } = window
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      const bscTestNetworkId = '0x61'
      if(chainId !== bscTestNetworkId){
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: bscTestNetworkId }],
        });
      }
    } catch (error) {
      alert(`checkNetwork error: ${error}`)
    }
  }

  useEffect(()=>{
    checknBNBNetwork()
  },[])

  useEffect(() => {
    settabIndex(Number(props.msg))
  }, [props,tabIndex])

  return (
      <div className="nav">
        <div className="navTop">
          <div className="navLogo">
            {tabIndex !== 1 && <img src={NavLogoUrl} alt="" />}
            {tabIndex === 1 && <img src={NavLogoWhiteUrl} alt="" />}
          </div>
          <div className="navButtonblock">
            <div
              className="tabItem"
              role="button"
              tabIndex={0}
              onKeyDown={() => {
                setTab(1, 'tournament')
              }}
              onClick={() => {
                setTab(1, 'tournament')
              }}
              style={{
                background: tabIndex === 1 ? 'linear-gradient(90deg, rgba(63,187,254,0.95), rgba(165,65,255,0.95))' : '',
              }}
            >
              <span style={{ color: tabIndex === 1 ? '#FFF' : '#333437' }}>TOURNAMENTS</span>
            </div>
            <div
              className="tabItem"
              role="button"
              tabIndex={0}
              onKeyDown={() => {
                setTab(2, 'homeindex')
              }}
              onClick={() => {
                setTab(2, 'homeindex')
              }}
              style={{
                background: tabIndex === 2 ? 'linear-gradient(90deg, rgba(63,187,254,0.95), rgba(165,65,255,0.95))' : '',
              }}
            >
              <span style={{ color: tabIndex === 2 ? '#FFF' : '#333437' }}>HOME</span>
            </div>
            <div
              className="tabItem"
              role="button"
              tabIndex={0}
              onKeyDown={() => {
                setTab(3, 'swapindex')
              }}
              onClick={() => {
                setTab(3, 'swapindex')
              }}
              style={{
                background: tabIndex === 3 ? 'linear-gradient(90deg, rgba(63,187,254,0.95), rgba(165,65,255,0.95))' : '',
              }}
            >
              <span
                style={{ color: tabIndex === 3 ? '#FFF' : '#333437' }}
                role="button"
                tabIndex={0}
                onKeyDown={() => {
                  setTab(3, 'swapindex')
                }}
                onClick={() => {
                  setTab(3, 'swapindex')
                }}
              >SWAP</span>
            </div>
          </div>
          <div className='menuArea'>
            <Menu />
          </div>
        </div>
        <div className="navLine" />
      </div>
  )
}
