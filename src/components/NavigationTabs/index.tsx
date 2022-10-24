import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Link as HistoryLink } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'
import { RowBetween } from 'components/Row'
import QuestionHelper from 'components/QuestionHelper'
import useI18n from 'hooks/useI18n'

const Tabs = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
`

const ActiveText = styled.div`
  font-weight: 500;
  font-size: 20px;
`

const StyledArrowLeft = styled(ArrowLeft)`
  color: ${({ theme }) => theme.colors.text};
`

export function FindPoolTabs() {
  const { t } = useTranslation()
  const TranslateString = useI18n()
  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>{t('Import Pool')}</ActiveText>
        <QuestionHelper
          text={TranslateString(256, `${t('Use this tool to find pairs that do not automatically appear in the interface.')}`)}
        />
      </RowBetween>
    </Tabs>
  )
}

export function AddRemoveTabs({ adding }: { adding: boolean }) {
  const { t } = useTranslation()
  const TranslateString = useI18n()
  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem' }}>
        {/* <HistoryLink to="/pool */}
        <HistoryLink to={{ pathname: '/swapindex', state: { id: 2 }}}>
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>{adding ? TranslateString(258, `${t('Add')}`) : TranslateString(260, `${t('Remove')}`)}{t('Liquidity')} </ActiveText>
        <QuestionHelper
          text={
            adding
              ? TranslateString(
                  264,
                  `${t('When you add liquidity, you are given pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.')}`
                )
              : TranslateString(
                  266,
                  `${t('Removing pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.')}`
                )
          }
        />
      </RowBetween>
    </Tabs>
  )
}
