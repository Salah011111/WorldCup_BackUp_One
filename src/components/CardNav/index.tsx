import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useTranslation } from 'react-i18next'

const StyledNav = styled.div`
  margin-bottom: 40px;
`

function Nav({ activeIndex = 0 }: { activeIndex?: number }) {
  const { t } = useTranslation()
  const TranslateString = useI18n()
  return (
    <StyledNav>
      <ButtonMenu activeIndex={activeIndex} scale="sm" variant="subtle">
        <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
          {TranslateString(1142, `${t('Swap ')}`)}
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
          {TranslateString(262, `${t('Liquidity')}`)}
        </ButtonMenuItem>
      </ButtonMenu>
    </StyledNav>
  )
}

export default Nav
