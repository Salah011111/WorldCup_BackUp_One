/*
 * @Author: 'Salah' '2236291956@qq.com'
 * @Date: 2022-09-26 13:40:14
 * @LastEditors: 'Salah' '2236291956@qq.com'
 * @LastEditTime: 2022-10-17 14:01:31
 * @FilePath: \cypress\src\style\Global.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createGlobalStyle } from 'styled-components'

// const GlobalStyle = createGlobalStyle`
//   body {
//     background-color: ${({ theme }) => theme.colors.background};

//     img {
//       height: auto;
//       max-width: 100%;
//     }
//   }
// `
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
    }
  }
`

export default GlobalStyle
