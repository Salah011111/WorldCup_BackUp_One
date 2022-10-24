/*
 * @Author: 'Salah' '2236291956@qq.com'
 * @Date: 2022-09-26 15:39:35
 * @LastEditors: 'Salah' '2236291956@qq.com'
 * @LastEditTime: 2022-09-30 10:23:40
 * @FilePath: \cypress\src\components\Menu\config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/home',
  },
  {
    label: 'Swap',
    icon: 'TradeIcon',
    href: '/swap',
  },
  // {
  //   label: 'Trade',
  //   icon: 'TradeIcon',
  //   initialOpenState: true,
  //   items: [
  //     {
  //       label: 'Exchange',
  //       href: '/swap',
  //     },
  //     {
  //       label: 'Liquidity',
  //       href: '/pool',
  //     },
  //   ],
  // },
  {
    label: 'IDO',
    icon: 'NftIcon',
    href: '/ido',
  },
  {
    label: 'Farm',
    icon: 'FarmIcon',
    href: '/farm',
  },
  {
    label: 'Community',
    icon: 'PoolIcon',
    href: '/unity',
  },
]

export default config
