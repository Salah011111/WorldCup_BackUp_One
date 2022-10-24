import React, { useEffect } from 'react'
import './index.css'
import { useTranslation } from 'react-i18next'
import i18n from 'i18n'
import { Button } from '@pancakeswap-libs/uikit'
import imfk1 from '../../image/k6.png'
import t1 from '../../image/t1.png'
import t2 from '../../image/t2.png'
import t3 from '../../image/t3.png'
import k1 from '../../image/k1.png'
import k2 from '../../image/k2.png'
import k3 from '../../image/k3.png'
import k4 from '../../image/k4.png'
import imgt from '../../image/b3.png'
import shang from '../../image/shangx.png'

function Index() {
  const { t } = useTranslation()
  useEffect(() => {
    document.title = 'ANT Swap'
  }, [])

  return (
    <div className="Busdgei">
      <div className="nuseir">
        <div className="snuoem1">
          <div className="nuserili">
            <div className="suit">{t('Glide into a new kind of finance')}</div>
            <div className="suit2">{t('The first native farm and exchange on Elastos')}</div>
            <div className="suit3">
              <Button>{t('Trade Now')}</Button>
            </div>
          </div>
        </div>
        <div className="snuoem2">
          <img src={imfk1} alt="" />
        </div>
      </div>
      <div className="Nuseir">
        <div className="kuinjs">
          <div className="kitem">
            <div className="lindt">$1,531,426.00</div>
            <div className="ousi">{t('Total value locked')}</div>
          </div>
          <div className="kitem">
            <div className="lindt">7,364,791</div>
            <div className="ousi">{t('Circulating GLIDE')}</div>
          </div>
          <div className="kitem">
            <div className="lindt">$300 {t('thousand')}</div>
            <div className="ousi">Market cap</div>
          </div>
          <div className="kitem">
            <div className="lindt">2.25/{t('block')}</div>
            <div className="ousi">{t('Emission rate')}</div>
          </div>
        </div>
      </div>
      <div className="oIines">
        <div className="byusis">{t('Why DeFi?')}</div>
        <div className="kymseri">
          <div className="keitem">
            <div className="imstim">
              <img src={t1} alt="" />
            </div>
            <div className="nuisei">
              Trade
              <br />
              <div className="usies">{t('Tokens')}</div>
            </div>

            <div className="usfron">{t('Swap tokens with minimal fees and arbitrage against other exchanges')}</div>
          </div>
          <div className="keitem">
            <div className="imstim">
              <img src={t2} alt="" />
            </div>
            <div className="nuisei">
              {t('Supply')}
              <br />
              <div className="usies">{t('Liquidity')}</div>
            </div>

            <div className="usfron">{t('Contribute to a pool and collect swap fees')}</div>
          </div>
          <div className="keitem">
            <div className="imstim">
              <img src={t3} alt="" />
            </div>
            <div className="nuisei">
              {t('Earn at')}
              <br />
              <div className="usies">{t('Farms')}</div>
            </div>
            <div className="usfron">{t('Stake your liquidity provider tokens in farms to earn GLIDE!')}</div>
          </div>
        </div>
      </div>
      <div className="oIines1">
        <div className="byusis">{t('Why Glide?')}</div>
        <div className="aeuis">
          <div className="snueioo">
            <div className="sentitle">{t('Elastos Smart Chain')}</div>
            <div className="nUsier">
              {t('ESC is a sidechain to the Elastos mainchain that')}
              <br />
              {t('supports Solidity smart contracts. Consensus runs')}
              <br />
              {t('on DPoS to deliver a high-performance, scalable')}
              <br />
              {t('smart contract execution solution for the Elastos')}
              <br />
              {t('ecosystem.')}
            </div>
            <div className="Nsbuton">
              <Button>{t('Learn More')}</Button>
            </div>
          </div>
          <div className="rdnuise">
            <img src={k1} alt="" />
          </div>
        </div>
      </div>
      <div className="oIines1">
        <div className="aeuis">
          <div className="rdnuise">
            <img src={k2} alt="" />
          </div>
          <div className="snueioo">
            <div className="sentitle">{t('Fully Supports $ELA')}</div>
            <div className="nUsier">
              {t('Glide was built for Elastos exclusiv')}
              <br />
              {t('ely. 80% of all swap fees on the')}
              <br />
              {t('platform are converted to $ELA')}
              <br />
              {t('and shared with platform users.')}
            </div>
            <div className="Nsbuton">
              <Button>{t('Learn More')}</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="oIines1">
        <div className="aeuis">
          <div className="snueioo">
            <div className="sentitle">{t('Audited by Paladin')}</div>
            <div className="nUsier">
              {t('We take your asset safety seriously, so we had our')}
              <br />
              {t('contracts reviewed by one of the leading security')}
              <br />
              {t('organizations.')}
            </div>
            <div className="Nsbuton">
              <Button>{t('Learn More')}</Button>
            </div>
          </div>
          <div className="rdnuise">
            <img src={k3} alt="" />
          </div>
        </div>
      </div>
      <div className="oIines1">
        <div className="aeuis">
          <div className="rdnuise">
            <img src={k4} alt="" />
          </div>
          <div className="snueioo">
            <div className="sentitle">{t('Fair Launch')}</div>
            <div className="nUsier">{t('No pre-sale or pre-mine. Equal opportunity for all.')}</div>
            <div className="Nsbuton">
              <Button>{t('Learn More')}</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="oIines1">
        <div className="byusis">{t('Our Partners')}</div>
        <div className="limgne">
          <img src={imgt} alt="" />
        </div>
      </div>
      <div className="snuseit">
        {t('Return Top')}
        <img src={shang} alt="" />
      </div>
    </div>
  )
}

export default Index
