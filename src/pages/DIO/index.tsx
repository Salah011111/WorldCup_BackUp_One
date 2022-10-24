import React from 'react'
import { useTranslation } from 'react-i18next'
import './index.css'
import { Button } from '@pancakeswap-libs/uikit'


function Index() {
  const { t } = useTranslation()
  return (
    <div className="poosido">
      <div className="pooidshe">
        <div className="Idotiu">{t('IDO For ANT')}</div>
        <div className="busedrin">
          <div className="buyser">
            <div className="kitem">{t('Paid Amount：')}0 USDT</div>
            <div className="kitem">{t('Claimed Token：')}0 AC</div>
            <div className="kitem">{t('Reserved Amount：')}0 AC</div>
          </div>
          <div className="busidng">
            <Button>{t('CLAIM')}</Button>
          </div>
        </div>
        <div className="busedrin">
          <div className="buyser2">
            <div className="lloer">0.0</div>
            <div className="Nipri">{t('Your contribution')} (USDT)</div>
          </div>
          <div className="busidng">
            <Button>{t('FINISHED')}</Button>
          </div>
        </div>
        <div className="busiernr">
          <div className="buitme">
            <div className="bustite">12500448.29 AC</div>
            <div className="busnr">{t('Total Reserved Amount')}</div>
          </div>
          <div className="buitme">
            <div className="bustite">73532.05 USDT</div>
            <div className="busnr">{t('Total Paid Amount')}</div>
          </div>
          <div className="buitme">
            <div className="bustite">170 GHAF / USDT</div>
            <div className="busnr">{t('Total Price')}</div>
          </div>
          <div className="buitme">
            <div className="bustite">300 USDT</div>
            <div className="busnr">{t('Max Contribute')}</div>
          </div>
          <div className="buitme">
            <div className="bustite">15th to 19th May</div>
            <div className="busnr">{t('Launch Time')}</div>
          </div>
        </div>
        <div className="nsueriti">{t('You ll be refunded any excess tokens when you claim')}</div>
      </div>
    </div>
  )
}

export default Index
