/* eslint-disable react-hooks/rules-of-hooks */
/*
 * @Author: 'Salah' '2236291956@qq.com'
 * @Date: 2022-09-26 18:30:38
 * @LastEditors: 'Salah' '2236291956@qq.com'
 * @LastEditTime: 2022-10-17 16:18:15
 * @FilePath: \FIFA Wolrd Cup\src\pages\Home\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React from 'react'
import './index.css'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// import Menu from '../../components/Menu'
import worldCupUrl from '../../image/worldCupLogo.png'


// import i18n from 'i18n'

// 引入组件
// eslint-disable-next-line import/extensions
import NavigatorBar from '../../components/NavigatorBar'
import PhoneFooter from '../../components/PhoneFooter/index'

export default function Index() {
  const history = useHistory()

  const routerPushTournament = () => {
    history.push('/tournament')
  }

  return (
    <div className='HomePage'>
      {/* 主页背景图片显示 */}
      <div className='HomePagebg' />
      <div className='home'>
        {/* 导航栏组件 */}
        <NavigatorBar msg='2'/>

        <div className='homeIndex'>
          {/* 上一行 */}
          <div className='homeIndexTop'>
            {/* 左侧显示内容 */}
            <div className='homeIndexTopLeft'>
              {/* 第一段文字 */}
              <span className='textOne'>Glide into a new kind of finance</span>

              {/* 第二段文字 */}
              <span className='textTwo'>The first native farm and exchange on Elastos</span>

              <div className='LeftButtonBlock'>
                <div className='connectbtn'>
                  <span className='connecttext'>Connect Wallet</span>
                </div>

                <div className='tradebtn'
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {
                    routerPushTournament()
                  }}
                  onClick={() => {
                    routerPushTournament()
                  }}
                >
                  <span className='tradetext'>Trade Now</span>
                </div>
              </div>
            </div>

            <div className='homeIndexTopRight'>
              <img src={worldCupUrl} className="RightImage" alt=""/>
            </div>
          </div>

          {/* 显示数据 */}
          <div className='homeIndexBottom'>
            <div className='DataItem'>
              <span>$1,531,426.00</span>
              <span>Total value locked</span>
            </div>

            <div className='DataItem'>
              <span> 7,364,791 </span>
              <span>Circulating GLIDE</span>
            </div>

            <div className='DataItem'>
              <span> $300 thousand</span>
              <span>Market cap</span>
            </div>

            <div className='DataItem'>
              <span>2.25/block</span>
              <span>Emission rate</span>
            </div>
          </div>

        </div>
      </div>
      {/* {t('Glide into a new kind of finance')} */}
      <PhoneFooter footerIndex='2'/>
    </div>
  )
}


