import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './index.css'
import toxing from '../../image/txioi.png'
import xuisn from '../../image/xuisn.png'

function Index() {
  const { t } = useTranslation()
  const [usershow, setUsershow] = useState(false)
  const dkisClick = () => {
    setUsershow(!usershow)
  }
  return (
    <div className="framHsi">
      <div className="falirtie">
        <div className="lirTIle">{t('Farm')}</div>
        <div className="nsueri">{t('Deposit LP tokens to earn')}</div>
      </div>
      <div className="frisher">
        <div className="nuseoo">
          <div className="nuseoo_les1">
            <div className="nuseoo_les_i">
              <img src={toxing} alt="" />
            </div>
            <div className="nuseoo_les_f">{t('AC')}</div>
          </div>
          <div className="nuseoo_les">
            <div className="auis1">
              <div className="ubsti">{t('Eamed')}</div>
              <div className="iud">0</div>
            </div>
            <div className="auis2">
              <div className="ubsti">{t('APR')}</div>
              <div className="iud">0%</div>
            </div>
            <div className="auis3">
              <div className="ubsti">{t('Liquidity')}</div>
              <div className="iud">$11,688</div>
            </div>
            <div className="auis4">
              <div className="ubsti">{t('Muliiplier')}</div>
              <div className="iud">6x</div>
            </div>
          </div>
          <div className="nuseoo_les3">
            <button
            className="dkise"
              type="button"
              onClick={() => {
                dkisClick()
              }}
            >
              {t('Details')}
              <img src={xuisn} alt="" />
            </button>
          </div>
        </div>
        {usershow ? <div className="firsh_buier">1</div> : ''}
      </div>
    </div>
  )
}

export default Index
