/*
 * @Author: 'Salah' '2236291956@qq.com'
 * @Date: 2022-10-17 14:13:45
 * @LastEditors: 'Salah' '2236291956@qq.com'
 * @LastEditTime: 2022-10-18 14:30:17
 * @FilePath: \cypress\src\components\PhoneFooter\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import './index.css'
import { useHistory } from 'react-router-dom'

export default function PhoneFooter(props) {
  const history = useHistory()

  const [footerTabIndex, setfooterTabIndex] = useState<number>(0)

  // 路由页面跳转方法
  const routerPushPage = (url) => {
    // console.log(`/${url}`)
    history.push(`/${url}`)
  }

  useEffect(() => {
    setfooterTabIndex(Number(props.footerIndex))
  }, [props, footerTabIndex])

  return (
    <div className="Phonefooter">
      {/* 三列布局 */}
      <div
        className="TabButtonItem"
        role="button"
        tabIndex={0}
        onKeyDown={() => {
          console.log('tournament')
        }}
        onClick={() => {
          routerPushPage('tournament')
        }}
        style={{
          background:
            footerTabIndex === 1 ? 'linear-gradient(90deg, rgba(63,187,254,0.95), rgba(165,65,255,0.95))' : '',
        }}
      >
        {/* 显示文字区域 */}
        <div
          className="ButtonText"
          style={{
            color: footerTabIndex === 1 ? '#fff' : '#333',
          }}
        >
          TOURNAMENTS
        </div>
        {/* 显示线条区域 */}
        <div className="TabButtonLine" />
      </div>

      <div
        className="TabButtonItem"
        role="button"
        tabIndex={0}
        onKeyDown={() => {
          console.log('homeindex')
        }}
        onClick={() => {
          routerPushPage('homeindex')
        }}
        style={{
          background:
            footerTabIndex === 2 ? 'linear-gradient(90deg, rgba(63,187,254,0.95), rgba(165,65,255,0.95))' : '',
        }}
      >
        {/* 显示文字区域 */}
        <div
          className="ButtonText"
          style={{
            color: footerTabIndex === 2 ? '#fff' : '#333',
          }}
        >
          HOME
        </div>
        {/* 显示线条区域 */}
        <div className="TabButtonLine" />
      </div>

      <div
        className="TabButtonItem"
        role="button"
        tabIndex={0}
        onKeyDown={() => {
          routerPushPage('swapindex')
        }}
        onClick={() => {
          routerPushPage('swapindex')
        }}
        style={{
          background:
            footerTabIndex === 3 ? 'linear-gradient(90deg, rgba(63,187,254,0.95), rgba(165,65,255,0.95))' : '',
        }}
      >
        {/* 显示文字区域 */}
        <div
          className="ButtonText"
          style={{
            color: footerTabIndex === 3 ? '#fff' : '#333',
          }}
        >
          SWAP
        </div>
        {/* 显示线条区域 */}
        <div className="TabButtonLine" />
      </div>
    </div>
  )
}
