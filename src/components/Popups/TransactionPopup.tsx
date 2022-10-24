/*
 * @Author: 'Salah' '2236291956@qq.com'
 * @Date: 2022-09-26 15:39:53
 * @LastEditors: 'Salah' '2236291956@qq.com'
 * @LastEditTime: 2022-10-24 09:48:24
 * @FilePath: \cypress\src\components\Popups\TransactionPopup.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useContext } from 'react'
import { AlertCircle, CheckCircle } from 'react-feather'
import { Text } from '@pancakeswap-libs/uikit'
import styled, { ThemeContext } from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { getBscScanLink } from '../../utils'
import { ExternalLink } from '../Shared'
import { AutoColumn } from '../Column'
import { AutoRow } from '../Row'

// swap 交易成功后 右上角弹出来的提示框
// 长度铺满PC端的话 需要隐藏

const RowNoFlex = styled(AutoRow)`
  flex-wrap: nowrap;
`

export default function TransactionPopup({
  hash,
  success,
  summary,
}: {
  hash: string
  success?: boolean
  summary?: string
}) {
  const { chainId } = useActiveWeb3React()

  const theme = useContext(ThemeContext)

  return (
    <RowNoFlex>
      <div style={{ paddingRight: 16 }}>
        {success ? (
          <CheckCircle color={theme.colors.success} size={24} />
        ) : (
          <AlertCircle color={theme.colors.failure} size={24} />
        )}
      </div>
      <AutoColumn gap="8px">
        <Text>{summary ?? `Hash: ${hash.slice(0, 8)}...${hash.slice(58, 65)}`}</Text>
        {chainId && <ExternalLink href={getBscScanLink(chainId, hash, 'transaction')}>View on bscscan</ExternalLink>}
      </AutoColumn>
    </RowNoFlex>
  )
}
