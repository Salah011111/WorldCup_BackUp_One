/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/rules-of-hooks */
/*
 * @Author: 'Salah' '2236291956@qq.com'
 * @Date: 2022-09-27 13:48:36
 * @LastEditors: 'Salah' '2236291956@qq.com'
 * @LastEditTime: 2022-10-18 14:30:49
 * @FilePath: \FIFA Wolrd Cup\src\pages\Swap\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import React, { useState , useEffect} from 'react'

// import useI18n from 'hooks/useI18n'
// import { useTranslation } from 'react-i18next'

// 引入网页样式
import './index.css'
import './tab.css'
import './swapfooter.css'

import { CurrencyAmount, JSBI, Token, Trade, Pair } from '@pancakeswap-libs/sdk'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ArrowDown } from 'react-feather'
import { CardBody, ArrowDownIcon, Button, IconButton, Text } from '@pancakeswap-libs/uikit'
import { ThemeContext } from 'styled-components'
import AddressInputPanel from 'components/AddressInputPanel'
import Card, { GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import ConfirmSwapModal from 'components/swap/ConfirmSwapModal'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { AutoRow, RowBetween } from 'components/Row'
import confirmPriceImpactWithoutFee from 'components/swap/confirmPriceImpactWithoutFee'
import { ArrowWrapper, BottomGrouping, SwapCallbackError, Wrapper } from 'components/swap/styleds'
import TradePrice from 'components/swap/TradePrice'


import ProgressSteps from 'components/ProgressSteps'

import { INITIAL_ALLOWED_SLIPPAGE } from 'constants/index'
import { useActiveWeb3React } from 'hooks'
import { useCurrency } from 'hooks/Tokens'
import { ApprovalState, useApproveCallbackFromTrade } from 'hooks/useApproveCallback'
import { useSwapCallback } from 'hooks/useSwapCallback'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { Field } from 'state/swap/actions'
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import {
  useExpertModeManager,
  useUserDeadline,
  useUserSlippageTolerance,
  toV2LiquidityToken,
  useTrackedTokenPairs,
} from 'state/user/hooks'
import { LinkStyledButton } from 'components/Shared'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { computeTradePriceBreakdown, warningSeverity } from 'utils/prices'
import Loader from 'components/Loader'
import useI18n from 'hooks/useI18n'

// ----------------------- pool所需要引入的内容 import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks'
// import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks' 52已经引入
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'
import { usePairs } from 'data/Reserves'

import PageHeader from 'components/PageHeader'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from 'react-i18next'

// 跳转
import { Link } from 'react-router-dom'

// 帮助提示弹窗组件
import Question from '../../components/QuestionHelper'

// card组件
import { LightCard } from '../../components/Card'

// dot 组件
import { Dots } from '../../components/swap/styleds'

// 引入FullPositionCard 组件
import FullPositionCard from '../../components/PositionCard'

// 引入StyledInternalLink 组件
import { StyledInternalLink } from '../../components/Shared'

import PhoneFooter from '../../components/PhoneFooter'

import AppBody from '../AppBody'

// import AppBody from '../AppBody'
// 引入组件
// eslint-disable-next-line import/extensions
import NavigatorBar from '../../components/NavigatorBar'
// import PageHeader from '../../components/PageHeader'

export default function index(props) {
  const [tabButton, settabButton] = useState(1)

  const [addliquidityPopup, setAddliquidityPopup] = useState(false)

  // ------------------以下是swap所需方法和引入的内容------------
  const loadedUrlParams = useDefaultsFromURLSearch()

  // 国际化所需插件内容引入
  const TranslateString = useI18n()
  const { t } = useTranslation()

  // const { independentField, typedValue, recipient } = useSwapState()

  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]
  const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)
  const [transactionWarning, setTransactionWarning] = useState<{
    selectedToken: string | null
    purchaseType: string | null
  }>({
    selectedToken: null,
    purchaseType: null,
  })
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
    [loadedInputCurrency, loadedOutputCurrency]
  )
  const handleConfirmTokenWarning = useCallback(() => {
    setDismissTokenWarning(true)
  }, [])

  const handleConfirmWarning = () => {
    setTransactionWarning({
      selectedToken: null,
      purchaseType: null,
    })
  }

  const { account } = useActiveWeb3React()
  const theme = useContext(ThemeContext)

  const [isExpertMode] = useExpertModeManager()

  // get custom setting values for user
  const [deadline] = useUserDeadline()
  const [allowedSlippage] = useUserSlippageTolerance()

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()
  const { wrapType, execute: onWrap, inputError: wrapInputError } = useWrapCallback(
    currencies[Field.INPUT],
    currencies[Field.OUTPUT],
    typedValue
  )
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade

  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount,
      }
    : {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
      }

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()
  const isValid = !swapInputError
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput]
  )
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput]
  )

  // modal and loading
  const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    showConfirm: boolean
    tradeToConfirm: Trade | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const route = trade?.route
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0))
  )
  const noRoute = !route

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    // const buie: any = props.location.state.id;
    // console.log(buie);

    // if (props) {
      // console.log(props)
    // } else {
    //   console.log('789')
    // }
    if (props.location.state !== undefined) {
      settabButton(props.location.state.id)
      // settabButton(props.location.state.id)
    }
    // settabButton(2)
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted, props])

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
    trade,
    allowedSlippage,
    deadline,
    recipient
  )

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

  const handleSwap = useCallback(() => {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee)) {
      return
    }
    if (!swapCallback) {
      return
    }
    setSwapState((prevState) => ({ ...prevState, attemptingTxn: true, swapErrorMessage: undefined, txHash: undefined }))
    swapCallback()
      .then((hash) => {
        setSwapState((prevState) => ({
          ...prevState,
          attemptingTxn: false,
          swapErrorMessage: undefined,
          txHash: hash,
        }))
      })
      .catch((error) => {
        setSwapState((prevState) => ({
          ...prevState,
          attemptingTxn: false,
          swapErrorMessage: error.message,
          txHash: undefined,
        }))
      })
  }, [priceImpactWithoutFee, swapCallback, setSwapState])

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const handleConfirmDismiss = useCallback(() => {
    setSwapState((prevState) => ({ ...prevState, showConfirm: false }))

    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [onUserInput, txHash, setSwapState])

  const handleAcceptChanges = useCallback(() => {
    setSwapState((prevState) => ({ ...prevState, tradeToConfirm: trade }))
  }, [trade])

  // This will check to see if the user has selected Syrup or SafeMoon to either buy or sell.
  // If so, they will be alerted with a warning message.
  const checkForWarning = useCallback(
    (selected: string, purchaseType: string) => {
      if (['SYRUP', 'SAFEMOON'].includes(selected)) {
        setTransactionWarning({
          selectedToken: selected,
          purchaseType,
        })
      }
    },
    [setTransactionWarning]
  )

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
      if (inputCurrency.symbol === 'SYRUP') {
        checkForWarning(inputCurrency.symbol, 'Selling')
      }
      if (inputCurrency.symbol === 'SAFEMOON') {
        checkForWarning(inputCurrency.symbol, 'Selling')
      }
    },
    [onCurrencySelection, setApprovalSubmitted, checkForWarning]
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  const handleOutputSelect = useCallback(
    (outputCurrency) => {
      onCurrencySelection(Field.OUTPUT, outputCurrency)
      if (outputCurrency.symbol === 'SYRUP') {
        checkForWarning(outputCurrency.symbol, 'Buying')
      }
      if (outputCurrency.symbol === 'SAFEMOON') {
        checkForWarning(outputCurrency.symbol, 'Buying')
      }
    },
    [onCurrencySelection, checkForWarning]
  )

  // -----------------------------------------------------------

  // ------------------以下是pool所需方法和引入的内容------------

  // const theme = useContext(ThemeContext)
  // const { account } = useActiveWeb3React()
  // const TranslateString = useI18n()
  // const { t } = useTranslation()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens,
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  // -----------------------------------------------------------

  const changeTab = (id) => {
    settabButton(id)
  }

  // 当Tab按钮选中swap的时候渲染
  const renderSwapTabActive = () => {
    return (
      <div className="tabBtn">
        <div className="TabSwapActiveLeftArea">
          <span>Swap</span>
        </div>

        <div
          className="TabSwapActiveRightArea"
          role="button"
          tabIndex={0}
          onClick={() => {
            changeTab(2)
          }}
        >
          <span>Liquidity</span>
        </div>
      </div>
    )
  }

  // 当Tab按钮选中Liquidity的时候渲染
  const renderLiquidityTabActive = () => {
    return (
      <div className="tabBtn">
        <div
          className="TabLiquidityActiveLeftArea"
          role="button"
          tabIndex={0}
          onClick={() => {
            changeTab(1)
          }}
          onKeyDown={() => console.log('Liquidity')}
        >
          <span>Swap</span>
        </div>

        <div className="TabLiquidityActiveRightArea">
          <span>Liquidity</span>
        </div>
      </div>
    )
  }

  // 渲染中间核心内容
  const renderSwapCenterIndex = () => {
    return (
      <div className="swapCenter">
        <AppBody>
          <Wrapper id="swap-page">
            <PageHeader
              title={TranslateString(8, `${t('Exchange')}`)}
              description={TranslateString(1192, `${t('Trade tokens in an instant')}`)}
            />
            <ConfirmSwapModal
              isOpen={showConfirm}
              trade={trade}
              originalTrade={tradeToConfirm}
              onAcceptChanges={handleAcceptChanges}
              attemptingTxn={attemptingTxn}
              txHash={txHash}
              recipient={recipient}
              allowedSlippage={allowedSlippage}
              onConfirm={handleSwap}
              swapErrorMessage={swapErrorMessage}
              onDismiss={handleConfirmDismiss}
            />
            <CardBody>
              <AutoColumn gap="md">
                <CurrencyInputPanel
                  label={
                    independentField === Field.OUTPUT && !showWrap && trade
                      ? TranslateString(194, `${t('From')} ${t('estimated')}`)
                      : TranslateString(76, `${t('From')}`)
                  }
                  value={formattedAmounts[Field.INPUT]}
                  showMaxButton={!atMaxAmountInput}
                  currency={currencies[Field.INPUT]}
                  onUserInput={handleTypeInput}
                  onMax={handleMaxInput}
                  onCurrencySelect={handleInputSelect}
                  otherCurrency={currencies[Field.OUTPUT]}
                  id="swap-currency-input"
                />
                <AutoColumn justify="space-between">
                  <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
                    <ArrowWrapper clickable>
                      <IconButton
                        variant="tertiary"
                        onClick={() => {
                          setApprovalSubmitted(false) // reset 2 step UI for approvals
                          onSwitchTokens()
                        }}
                        style={{ borderRadius: '50%' }}
                        scale="sm"
                      >
                        <ArrowDownIcon color="primary" width="24px" />
                      </IconButton>
                    </ArrowWrapper>
                    {recipient === null && !showWrap && isExpertMode ? (
                      <LinkStyledButton id="add-recipient-button" onClick={() => onChangeRecipient('')}>
                        + Add a send (optional)
                      </LinkStyledButton>
                    ) : null}
                  </AutoRow>
                </AutoColumn>
                <CurrencyInputPanel
                  value={formattedAmounts[Field.OUTPUT]}
                  onUserInput={handleTypeOutput}
                  label={
                    independentField === Field.INPUT && !showWrap && trade
                      ? TranslateString(196, `${t('To')} ${t('estimated')}`)
                      : TranslateString(80, `${t('To')}`)
                  }
                  showMaxButton={false}
                  currency={currencies[Field.OUTPUT]}
                  onCurrencySelect={handleOutputSelect}
                  otherCurrency={currencies[Field.INPUT]}
                  id="swap-currency-output"
                />

                {recipient !== null && !showWrap ? (
                  <>
                    <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                      <ArrowWrapper clickable={false}>
                        <ArrowDown size="16" color={theme.colors.textSubtle} />
                      </ArrowWrapper>
                      <LinkStyledButton id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                        - Remove send
                      </LinkStyledButton>
                    </AutoRow>
                    <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
                  </>
                ) : null}

                {showWrap ? null : (
                  <Card padding=".25rem .75rem 0 .75rem" borderRadius="20px">
                    <AutoColumn gap="4px">
                      {Boolean(trade) && (
                        <RowBetween align="center">
                          <Text fontSize="14px">{TranslateString(1182, `${t('Price')}`)}</Text>
                          <TradePrice
                            price={trade?.executionPrice}
                            showInverted={showInverted}
                            setShowInverted={setShowInverted}
                          />
                        </RowBetween>
                      )}
                      {allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE && (
                        <RowBetween align="center">
                          <Text fontSize="14px">{TranslateString(88, `${t('Slippage Tolerance')}`)}</Text>
                          <Text fontSize="14px">{allowedSlippage / 100}%</Text>
                        </RowBetween>
                      )}
                    </AutoColumn>
                  </Card>
                )}
              </AutoColumn>
              <BottomGrouping>
                {!account ? (
                  <ConnectWalletButton width="100%" />
                ) : showWrap ? (
                  <Button disabled={Boolean(wrapInputError)} onClick={onWrap} width="100%">
                    {wrapInputError ??
                      (wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null)}
                  </Button>
                ) : noRoute && userHasSpecifiedInputOutput ? (
                  <GreyCard style={{ textAlign: 'center' }}>
                    <Text mb="4px">{TranslateString(1194, `${t('Insufficient liquidity for this trade.')}`)}</Text>
                  </GreyCard>
                ) : showApproveFlow ? (
                  <RowBetween>
                    <Button
                      onClick={approveCallback}
                      disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                      style={{ width: '48%' }}
                      variant={approval === ApprovalState.APPROVED ? 'success' : 'primary'}
                    >
                      {approval === ApprovalState.PENDING ? (
                        <AutoRow gap="6px" justify="center">
                          Approving <Loader stroke="white" />
                        </AutoRow>
                      ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                        'Approved'
                      ) : (
                        `Approve ${currencies[Field.INPUT]?.symbol}`
                      )}
                    </Button>
                    <Button
                      onClick={() => {
                        if (isExpertMode) {
                          handleSwap()
                        } else {
                          setSwapState({
                            tradeToConfirm: trade,
                            attemptingTxn: false,
                            swapErrorMessage: undefined,
                            showConfirm: true,
                            txHash: undefined,
                          })
                        }
                      }}
                      style={{ width: '48%' }}
                      id="swap-button"
                      disabled={
                        !isValid || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)
                      }
                      variant={isValid && priceImpactSeverity > 2 ? 'danger' : 'primary'}
                    >
                      {priceImpactSeverity > 3 && !isExpertMode
                        ? `${t('Price Impact High')}`
                        : `Liquidity${priceImpactSeverity > 2 ? ' Anyway' : ''}`}
                    </Button>
                  </RowBetween>
                ) : (
                  <Button
                    onClick={() => {
                      if (isExpertMode) {
                        handleSwap()
                      } else {
                        setSwapState({
                          tradeToConfirm: trade,
                          attemptingTxn: false,
                          swapErrorMessage: undefined,
                          showConfirm: true,
                          txHash: undefined,
                        })
                      }
                    }}
                    id="swap-button"
                    disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
                    variant={isValid && priceImpactSeverity > 2 && !swapCallbackError ? 'danger' : 'primary'}
                    width="100%"
                  >
                    {swapInputError ||
                      (priceImpactSeverity > 3 && !isExpertMode
                        ? `${t('Price Impact Too High')}`
                        : `${t(`Swap ${priceImpactSeverity > 2 ? 'Anyway' : ''}`)}`)}
                  </Button>
                )}
                {showApproveFlow && <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />}
                {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
              </BottomGrouping>
            </CardBody>
          </Wrapper>
        </AppBody>
      </div>
    )
  }

  const renderPool = () => {
    return (
      <>
        {/* <CardNav activeIndex={1} /> */}
        <AppBody>
          <PageHeader
            title={TranslateString(262, `${t('Liquidity')}`)}
            description={TranslateString(1168, `${t('Add liquidity to receive LP tokens')}`)}
          >
            {/* 点击产生添加流动性弹框 */}
            {/* 项目第一难点 */}
            <Button id="join-pool-button" as={Link} tabIndex={0} to="/add/BNB">
              {TranslateString(168, `${t('Add Liquidity')}`)}
            </Button>
            {/* <div className='addLiquiditybtn' role="button"  onClick={() => {setAddliquidityPopup(true)} }>
              <span>{TranslateString(168, `${t('Add Liquidity')}`)}</span>
            </div> */}
          </PageHeader>
          <AutoColumn gap="lg" justify="center">
            <CardBody>
              <AutoColumn gap="12px" style={{ width: '100%' }}>
                <RowBetween padding="0 8px">
                  <Text color={theme.colors.text}>{TranslateString(107, `${t('Your Liquidity')}`)}</Text>
                  <Question
                    text={TranslateString(
                      1170,
                      `${t(
                        'When you add liquidity, you are given pool tokens that represent your share. If you don’t see a pool you joined in this list, try importing a pool below.'
                      )}`
                    )}
                  />
                </RowBetween>

                {!account ? (
                  <LightCard padding="40px">
                    <Text color="textDisabled" textAlign="center">
                      {TranslateString(156, `${t('Connect to a wallet to view your liquidity.')}`)}
                    </Text>
                  </LightCard>
                ) : v2IsLoading ? (
                  <LightCard padding="40px">
                    <Text color="textDisabled" textAlign="center">
                      <Dots>Loading</Dots>
                    </Text>
                  </LightCard>
                ) : allV2PairsWithLiquidity?.length > 0 ? (
                  <>
                    {allV2PairsWithLiquidity.map((v2Pair) => (
                      <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                    ))}
                  </>
                ) : (
                  <LightCard padding="40px">
                    <Text color="textDisabled" textAlign="center">
                      {TranslateString(104, `${t('No liquidity found.')}`)}
                    </Text>
                  </LightCard>
                )}

                <div>
                  <Text fontSize="14px" style={{ padding: '.5rem 0 .5rem 0' }}>
                    {TranslateString(106, `${t('Don’t see a pool you joined?')}`)}{' '}
                    <StyledInternalLink id="import-pool-link" to="/find">
                      {TranslateString(108, `${t('Import it.')}`)}
                    </StyledInternalLink>
                  </Text>
                  <Text fontSize="14px" style={{ padding: '.5rem 0 .5rem 0' }}>
                    {TranslateString(
                      1172,
                      `${t('Or, if you staked your LP tokens in a farm, unstake them to see them here.')}`
                    )}
                  </Text>
                </div>
              </AutoColumn>
            </CardBody>
          </AutoColumn>
        </AppBody>
      </>
    )
  }

  const renderLiquidityCenterIndex = () => {
    return <div className="swapCenter">{renderPool()}</div>
  }

  const renderLiquidityPopup = () => {
    return (
      <div>
        POPUP
        {/* <RedirectOldAddLiquidityPathStructure currencyIdA="BNB" /> */}
      </div>
    )
  }

  return (
    <div className="SwapPage">
      {/* 主页背景图片显示 */}
      <div className="Pagebg" />
      <div className="swap">
        <NavigatorBar msg="3" />

        <div className="swapIndex">
          <div className="TabArea">
            {/* tab选项卡外部样式 */}
            {tabButton === 1 && renderSwapTabActive()}
            {tabButton === 2 && renderLiquidityTabActive()}
          </div>

          {/* 主页面核心显示区域 */}

          {/* 选项卡选择swap 显示内容 */}
          {tabButton === 1 && renderSwapCenterIndex()}

          {/* 选项卡选择流动性 但未点击添加流动性按钮显示的内容 */}
          {tabButton === 2 && !addliquidityPopup && renderLiquidityCenterIndex()}

          {/* 选项卡选择流动性 同时点击添加流动性按钮显示的内容 */}
          {tabButton === 2 && addliquidityPopup && renderLiquidityPopup()}

          {/*
          <Switch>
            <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
          </Switch> */}

          {/* 底部导航栏区域 */}
          <div className="SwapFooterArea" style={{ marginTop: '1.25rem' }}>
            <div className="SwapFooterLeftText">ABOUT / HELP / DEVELOPERS</div>
            <div className="SwapFooterRightArea">
              <span className="SwapFooterRightText">Copyight © 1994-2022 FIFA. All rights reserved</span>
            </div>
          </div>

          <PhoneFooter footerIndex='3'/>
        </div>
      </div>

    </div>
  )
}
