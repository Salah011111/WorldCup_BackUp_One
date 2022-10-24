/*
 * @Author: 'Salah' '2236291956@qq.com'
 * @Date: 2022-09-26 15:40:00
 * @LastEditors: 'Salah' '2236291956@qq.com'
 * @LastEditTime: 2022-09-30 10:23:26
 * @FilePath: \cypress\src\pages\Swap\redirects.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'

// Redirects to swap but only replace the pathname
export function RedirectPathToSwapOnly({ location }: RouteComponentProps) {
  return <Redirect to={{ ...location, pathname: '/swap' }} />
}

export default RedirectPathToSwapOnly
