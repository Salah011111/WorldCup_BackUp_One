/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unescaped-entities */
/*
 * @Author: 'Salah' '2236291956@qq.com'
 * @Date: 2022-09-26 18:30:38
 * @LastEditors: 'Salah' '2236291956@qq.com'
 * @LastEditTime: 2022-10-17 15:15:58
 * @FilePath: \FIFA Wolrd Cup\src\pages\Home\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useState } from 'react'
import './index.css'
// import { useTranslation } from 'react-i18next'
// import i18n from 'i18n'

// 引入组件
// eslint-disable-next-line import/extensions
import NavigatorBar from '../../components/NavigatorBar'

// 引入倒计时图片
import timeWorldCup from '../../image/2022_FIFA_World_Cup.png'
import WorldCupPhotoOne from '../../image/WorldCupPhotoOne.png'
import WorldCupPhotoTwo from '../../image/WorldCupPhotoTwo.png'
import WorldCupPhotoThree from '../../image/WorldCupPhotoThree.png'
import WorldCupPhotoFour from '../../image/WorldCupPhotoFour.png'
import WorldCupPhotoFive from '../../image/WorldCupPhotoFive.png'
import FooterWorldCupLogo from '../../image/worldCupLogo.png'
import FooterFIFALogo from '../../image/footerLogo-one.png'
// import FooterContactLogo from '../../image/footerLogo-two.png'
import Twitter from '../../image/Twitter.png'
import Ins from '../../image/Ins.png'
import Facebook from '../../image/Facebook.png'
import Playaudio from '../../image/Playaudio.png'
import Tiktok from '../../image/Tiktok.png'

import GroupA from '../../image/Group-A.png'
import GroupB from '../../image/Group-B.png'
import GroupC from '../../image/Group-C.png'
import GroupD from '../../image/Group-D.png'
import GroupE from '../../image/Group-E.png'
import GroupF from '../../image/Group-F.png'
import GroupG from '../../image/Group-G.png'
import GroupH from '../../image/Group-H.png'

import hostCountry from '../../image/hostCountry.png'
import Accomodation from '../../image/accomodation.png'
import LusailStadium from '../../image/lusailStadium.png'
import EducationCityStadium from '../../image/educationCityStadium.png'

import PhoneFooter from '../../components/PhoneFooter/index'

export default function Index() {
  // useEffect(() => {

  // },[])

  // const { t } = useTranslation()

    const [tabItem, settabItem] = useState(1)

    const changeTabItem = (item) => {
        settabItem(item)
    }

    // 渲染世界杯前四个小组
    const renderTabOne = () => {
        return (
        <div className="TabImageArea">
            <div className="TabItem">
                <span className="groupTabTitle">Group A</span>
                <img src={GroupA} alt="" className="tabImage" />
            </div>

            <div className="TabItem">
                <span className="groupTabTitle">Group B</span>
                <img src={GroupB} alt="" className="tabImage" />
            </div>

            <div className="TabItem">
                <span className="groupTabTitle">Group C</span>
                <img src={GroupC} alt="" className="tabImage" />
            </div>

            <div className="TabItem">
                <span className="groupTabTitle">Group D</span>
                <img src={GroupD} alt="" className="tabImage" />
            </div>
        </div>
        )
    }

    // 渲染世界杯后四个小组
    const renderTabTwo = () => {
        return (
        <div className="TabImageArea">
            <div className="TabItem">
                <span className="groupTabTitle">Group E</span>
                <img src={GroupE} alt="" className="tabImage" />
            </div>

            <div className="TabItem">
                <span className="groupTabTitle">Group F</span>
                <img src={GroupF} alt="" className="tabImage" />
            </div>

            <div className="TabItem">
                <span className="groupTabTitle">Group G</span>
                <img src={GroupG} alt="" className="tabImage" />
            </div>

            <div className="TabItem">
                <span className="groupTabTitle">Group H</span>
                <img src={GroupH} alt="" className="tabImage" />
            </div>
        </div>
        )
    }

    // 显示在移动端的小组分组情况
    const renderPhoneGroup = () => {
        return (
        <div className="TabImagePhoneArea">
            <div className="TabPhoneItem">
                <span className="groupTabPhoneTitle">Group A</span>
                <img src={GroupA} alt="" className="tabPhoneImage" />
            </div>

            <div className="TabPhoneItem">
                <span className="groupTabPhoneTitle">Group B</span>
                <img src={GroupB} alt="" className="tabPhoneImage" />
            </div>

            <div className="TabPhoneItem">
                <span className="groupTabPhoneTitle">Group C</span>
                <img src={GroupC} alt="" className="tabPhoneImage" />
            </div>

            <div className="TabPhoneItem">
                <span className="groupTabPhoneTitle">Group D</span>
                <img src={GroupD} alt="" className="tabPhoneImage" />
            </div>

            <div className="TabPhoneItem">
                <span className="groupTabPhoneTitle">Group E</span>
                <img src={GroupE} alt="" className="tabPhoneImage" />
            </div>

            <div className="TabPhoneItem">
                <span className="groupTabPhoneTitle">Group F</span>
                <img src={GroupF} alt="" className="tabPhoneImage" />
            </div>

            <div className="TabPhoneItem">
                <span className="groupTabPhoneTitle">Group G</span>
                <img src={GroupG} alt="" className="tabPhoneImage" />
            </div>

            <div className="TabPhoneItem">
                <span className="groupTabPhoneTitle">Group H</span>
                <img src={GroupH} alt="" className="tabPhoneImage" />
            </div>
        </div>
        )
    }

    return (
        <div className="TourPage">
        {/* 主页背景图片显示 */}
        <div className="TourPagebg" />

        <div className="tour">
            {/* 导航栏组件 */}
            <NavigatorBar msg="1" />

            <div className="textButtonBlock">
                <span>fifa word cup qatar 2022™</span>
                <span>the official home for the word's most prestigious event</span>
            </div>

            <div className="coverImage">
                <div className="worldCupImage" />

                <div className="PhonetextButtonBlock">
                    <span>fifa word cup qatar 2022™</span>
                    <span>the official home for the word's most prestigious event</span>
                </div>
            </div>
        </div>

        {/* 倒计时 */}
        <div className="timeBlock">
            {/* 左侧文字 */}
            <div className="timeItemOne">
                <span>Tournament starts in</span>
            </div>

            {/* 中间时间 */}
            <div className="timeItemTwo">
                <div className='timeTitleArea'>
                    <span className='timeData'>135</span>
                    <span className='timeData'>DAYS</span>
                </div>
                <div className='pointArea'>
                    <span className='timeData'>:</span>
                </div>
                <div className='timeTitleArea'>
                    <span className='timeData'>04</span>
                    <span className='timeData'>HOURS</span>
                </div>
                <div className='pointArea'>
                    <span className='timeData'>:</span>
                </div>
                <div className='timeTitleArea'>
                    <span className='timeData'>43</span>
                    <span className='timeData'>MINUTES</span>
                </div>

            </div>

            {/* 右侧图案 */}
            <div className="timeItemThree">
            <img src={timeWorldCup} alt="" className="timeWorldCupImage" />
            </div>
        </div>

        {/* 展示图片区域 */}
        <div className="ImageDisplay">
            {/* 文字标题区域 */}
            <div className="ImagedisplayTitle">
                <span>MORE ON QATAR 2022™</span>
                <span>SEE ALL</span>
            </div>

            {/* 第一行图片显示区域 */}
            <div className="firstImageColumn">
            <div>
                <img src={WorldCupPhotoOne} alt="" className="firstColumnPhoto" />
                <div className="firstColumnMaskLayer">
                <span className="MaskLayerFirstColumnText">
                    World Cup Qatar 2022: Teams, groups, fixtures, stadiums, tickets and more
                </span>
                </div>
            </div>

            <div>
                <img src={WorldCupPhotoTwo} alt="" className="firstColumnPhoto" />
                <div className="firstColumnMaskLayer">
                <span className="MaskLayerFirstColumnText">
                    Semi-automated offside technology to be used at FIFA World Cup 2022™
                </span>
                </div>
            </div>
            </div>

            <div className="secondImageColumn">
            <div>
                <img src={WorldCupPhotoThree} alt="" className="secondColumnPhoto" />
                <div className="secondColumnMaskLayer masklayerOne">
                <span className="MaskLayerSecondColumnText">Wiggled in the stars</span>
                </div>
            </div>

            <div>
                <img src={WorldCupPhotoFour} alt="" className="secondColumnPhoto" />
                <div className="secondColumnMaskLayer masklayerTwo">
                <span className="MaskLayerSecondColumnText">
                    FIFA World Cup Qatar 2022™ tickets back on sale next week
                </span>
                </div>
            </div>

            <div>
                <img src={WorldCupPhotoFive} alt="" className="secondColumnPhoto" />
                <div className="secondColumnMaskLayer masklayerThree">
                <span className="MaskLayerSecondColumnText">Denmark’s Hojbjerg talks grief, growth and glory</span>
                </div>
            </div>
            </div>
        </div>

        {/* 显示世界杯分组图片 */}
        <div className="worldCupGroup">
            <span className="groupTitle">MEET THE FINAL GROUPS</span>
            <div className="groupArea">
            {/* 图片展示区域 */}
            {tabItem === 1 && renderTabOne()}
            {tabItem === 2 && renderTabTwo()}
            { renderPhoneGroup() }


            {/* 选项卡tab区域 */}
            <div className="groupTabArea">
                <div

                className={`circleTab ${tabItem === 1 ? 'tabCircleactive' : 'tabCircleNonActive'}`}
                onClick={() => {
                    changeTabItem(1)
                }}
                />
                <div
                className={`circleTab ${tabItem === 2 ? 'tabCircleactive' : 'tabCircleNonActive'}`}
                onClick={() => {
                    changeTabItem(2)
                }}
                />
            </div>
            </div>
        </div>

        <div className="MatchView">
            <span className="viewtextOne">Matches & Groups</span>
            <span className="viewtextTwo">
            view all the matches, groups and teams ahead of the FIFA word cup Qatar 2022™
            </span>
            <div className="viewbtn">
            <span>view</span>
            </div>
        </div>

        <div className="discoverArea">
            <div className='discover'>

                {/* 渐变区域 */}
                <div className='discoverMaskLayer'>
                    <span>DISCOVER QATAR</span>
                </div>

                {/* 显示图片区域 */}
                <div className='discoverImageArea'>
                    <div className='ImageAreaItem'>
                        <div className='ImageArea'>
                            <div className='discoverImageMaskLayer' />
                            <img src={hostCountry} alt='' className='discoverImage' />
                            <span className='discoverTitle' >HOST COUNTRY</span>
                        </div>
                        <div className='ImageArea' >
                            <div className='discoverImageMaskLayer' />
                            <img src={Accomodation} alt='' className='discoverImage' />
                            <span className='discoverTitle ' >ACCOMODATION</span>
                        </div>
                    </div>

                    {/* 轮播图右侧箭头按钮 */}
                    <div className='ArrowArea'>
                        <div className='RightArrow' />
                    </div>
                </div>
            </div>

            <div className='discover'>
                <div className='discoverMaskLayer'>
                    <span>THE STADIUMS</span>
                </div>

                {/* 显示图片区域 */}
                <div className='discoverImageArea'>
                    <div className='ImageAreaItem'>
                        <div className='ImageArea'>
                            <div className='discoverImageMaskLayer' />
                            <img src={LusailStadium} alt='' className='discoverImage'/>
                            <span className='discoverTitle' >LUSAIL STADIUM</span>
                        </div>
                        <div className='ImageArea' >
                            <div className='discoverImageMaskLayer' />
                            <img src={EducationCityStadium} alt='' className='discoverImage' />
                            <div className='discoverImageFour'>
                                <span>EDUCATION CITY</span>
                                <span>STADIUM</span>
                            </div>
                        </div>
                    </div>

                    {/* 右侧轮播图按钮 */}
                    <div className='ArrowArea'>
                        <div className='RightArrow' />
                    </div>
                </div>
            </div>
        </div>

        {/* about部分内容 */}
        <div className="aboutArea">
            <div className="titleRectangle">
            <span className="aboutTitle">ABOUT</span>
            </div>
            <div className="aboutIntroduction">
            The FIFA World Cup Qatar 2022™ will be played from 21 November to 18 December in Qatar. It will be the 22nd
            edition of the competition, and the first played in the Arab world.
            </div>
        </div>

        {/* 底部导航栏显示内容 */}
        <div className="TourFooterArea">
            <div className="footerLeftArea">
            {/* FIFA Logo图标 */}
            <div className="LogoAreaOne">
                <img src={FooterFIFALogo} alt="" className="FooterLogoOne" />
            </div>

            {/* 推特等等图标 */}
            <div className="LogoAreaTwo">
                <img src={Twitter} alt="" className="contactIcon" />
                <img src={Facebook} alt="" className="contactIcon" />
                <img src={Ins} alt="" className="contactIcon" />
                <img src={Playaudio} alt="" className="contactIcon" />
                <img src={Tiktok} alt="" className="contactIcon" />
            </div>

            {/* 第一行文字 */}
            <div className="LogoAreaThree">
                <span className="footertitle">PRIVACY POLICY TERMS OF SERVICE</span>
            </div>

            {/*  第二行文字 */}
            <div className="LogoAreaFour">
                <span className="footertitle">Copyright © 1994 - 2022 FIFA. All rights reserved.</span>
            </div>
            </div>

            <div className="footerRight">
            <img src={FooterWorldCupLogo} alt="" className="FooterLogoThree" />
            </div>
        </div>

        {/* {t('Glide into a new kind of finance')} */}
        <PhoneFooter footerIndex="1" />
        </div>
    )
}
