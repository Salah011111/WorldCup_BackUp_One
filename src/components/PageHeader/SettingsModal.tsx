import React from 'react'
import { Modal } from '@pancakeswap-libs/uikit'
import { useTranslation } from 'react-i18next'
import SlippageToleranceSetting from './SlippageToleranceSetting'
import TransactionDeadlineSetting from './TransactionDeadlineSetting'
import AudioSetting from './AudioSetting'

type SettingsModalProps = {
  onDismiss?: () => void
  translateString: (translationId: number, fallback: string) => string
}

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const SettingsModal = ({ onDismiss = defaultOnDismiss, translateString }: SettingsModalProps) => {
  const { t } = useTranslation()
  return (
    <Modal title={translateString(1200, `${t('Settings')}`)} onDismiss={onDismiss}>
      <SlippageToleranceSetting translateString={translateString} />
      <TransactionDeadlineSetting translateString={translateString} />
      <AudioSetting translateString={translateString} />
    </Modal>
  )
}

export default SettingsModal
