import React from 'react'
import { Button } from '@pancakeswap-libs/uikit'
import './index.css'
import i18n from 'i18n'

function Index() {
  const Bustinse = () => {
    console.log('123')
  }
  return (
    <div className="tliser">
      <div className="guing"> </div>
      <div className="posinsd">
        <div className="nsuer">
          <button type="button" className="nsuer_it" onClick={() => i18n.changeLanguage('en')}>
            English
          </button>
          <button type="button" className="nsuer_it" onClick={() => i18n.changeLanguage('zh-cn')}>
            简体中文
          </button>
        </div>
      </div>
    </div>
  )
}

export default Index
