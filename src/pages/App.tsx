import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { LangType } from '@pancakeswap-libs/uikit'
import Popups from '../components/Popups'
// import Web3ReactManager from '../components/Web3ReactManager'
import { RedirectDuplicateTokenIds, RedirectOldAddLiquidityPathStructure } from './AddLiquidity/redirects'
// import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
// import AddLiquidity from './AddLiquidity'
import Pool from './Pool'
// import Home from './Home'
import HomeIndex from './HomeIndex'
import SwapIndex from './SwapIndex'
import Tournament from './Touranment'
// import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
// import Swap from './Swap'
// import DIO from './DIO'
// import Farm from './Farm'
// import Community from './Community'
// import { RedirectPathToSwapOnly } from './Swap/redirects'
import { EN, allLanguages } from '../constants/localisation/languageCodes'
import { LanguageContext } from '../hooks/LanguageContext'
import { TranslationsContext } from '../hooks/TranslationsContext'
import './index.css'

// import Menu from '../components/Menu'
import useGetDocumentTitlePrice from '../hooks/useGetDocumentTitlePrice'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

// const BodyWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   /* padding: 32px 16px; */
//   align-items: center;
//   flex: 1;
//   overflow-y: auto;
//   overflow-x: hidden;
//   z-index: 1;
//   justify-content: center;
//   background-image: url('/images/2.png');
//   background-repeat: no-repeat;
//   background-position: left 260px top;
//   background-size: 100%;

//   ${({ theme }) => theme.mediaQueries.xs} {
//     background-size: auto;
//   }

//   ${({ theme }) => theme.mediaQueries.lg} {
//     /* background-image: url('/images/2.png');
//     background-repeat: no-repeat;
//     background-position: left 124px top;
//     background-size: 1200px; */
//     min-height: 93vh;
//   }
// `

// const Marginer = styled.div`
//   margin-top: 5rem;
// `

const CACHE_KEY = 'pancakeSwapLanguage'

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(undefined)
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(undefined)
  const [translations, setTranslations] = useState<Array<any>>([])

  const getStoredLang = (storedLangCode: string) => {
    return allLanguages.filter((language) => {
      return language.code === storedLangCode
    })[0]
  }

  useEffect(() => {
    const storedLangCode = localStorage.getItem(CACHE_KEY)
    if (storedLangCode) {
      const storedLang = getStoredLang(storedLangCode)
      setSelectedLanguage(storedLang)
    } else {
      setSelectedLanguage(EN)
    }
  }, [])

  const handleLanguageSelect = (langObject: LangType) => {
    setSelectedLanguage(langObject)
    localStorage.setItem(CACHE_KEY, langObject.code)
  }

  useGetDocumentTitlePrice()

  return (
    <Suspense fallback={null}>
      <HashRouter>
        <AppWrapper>
          <LanguageContext.Provider
            value={{
              selectedLanguage,
              setSelectedLanguage: handleLanguageSelect,
              translatedLanguage,
              setTranslatedLanguage,
            }}
          >
            <TranslationsContext.Provider value={{ translations, setTranslations }}>
              {/* <BodyWrapper> */}
                <Popups />
                {/* <Web3ReactManager> */}
                  <Switch>
                    <Route exact strict path="/homeindex" component={HomeIndex} />
                    <Route exact strict path="/swapindex" component={SwapIndex} />
                    <Route exact strict path="/tournament" component={Tournament} />
                    <Route exact strict path="/pool" component={Pool} />
                    <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                    <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                    <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} /> 
                    <Redirect from="/" to="/homeindex" />
                  </Switch>
                {/* </Web3ReactManager> */}
                {/* <Marginer /> */}
              {/* </BodyWrapper> */}
            </TranslationsContext.Provider>
          </LanguageContext.Provider>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}
