/*
 * @Author: 'Salah' '2236291956@qq.com'
 * @Date: 2022-10-11 16:35:39
 * @LastEditors: 'Salah' '2236291956@qq.com'
 * @LastEditTime: 2022-10-11 16:35:50
 * @FilePath: \cypress\src\pages\RemoverLiqidityBody.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import styled from 'styled-components'
import { Card } from '@pancakeswap-libs/uikit'

export const BodyWrapper = styled(Card)`
    position: relative;
    width: 50%;
    z-index: 5;
    margin:0 auto;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
    return <BodyWrapper>{children}</BodyWrapper>
}
