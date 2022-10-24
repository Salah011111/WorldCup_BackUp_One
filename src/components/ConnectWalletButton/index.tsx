/*
 * @Author: 'Salah' '2236291956@qq.com'
 * @Date: 2022-09-26 15:39:30
 * @LastEditors: 'Salah' '2236291956@qq.com'
 * @LastEditTime: 2022-09-29 13:55:47
 * @FilePath: \cypress\src\components\ConnectWalletButton\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Button, ButtonProps, useWalletModal} from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useTranslation } from 'react-i18next'
import useAuth from 'hooks/useAuth'

const UnlockButton: React.FC<ButtonProps> = (props) => {
  const { t } = useTranslation()
  const TranslateString = useI18n()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, `${t('Unlock Wallet')}`)}
    </Button>
  )
}

export default UnlockButton
