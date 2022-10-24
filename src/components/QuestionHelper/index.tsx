/*
 * @Author: 'Salah' '2236291956@qq.com'
 * @Date: 2022-09-26 15:40:38
 * @LastEditors: 'Salah' '2236291956@qq.com'
 * @LastEditTime: 2022-10-20 15:13:37
 * @FilePath: \cypress\src\components\QuestionHelper\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useCallback, useState } from 'react'
import { HelpCircle as Question } from 'react-feather'
import styled from 'styled-components'
import Tooltip from '../Tooltip'
import './index.css';

const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;
  background-color: ${({ theme }) => theme.colors.invertedContrast};
  color: ${({ theme }) => theme.colors.textSubtle};

  :hover,
  :focus {
    opacity: 0.7;
  }
`

export default function QuestionHelper({ text }: { text: string }) {
  const [show, setShow] = useState<boolean>(false)

  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])

  return (
    <span style={{ marginLeft: 4 }}>
      <Tooltip text={text} show={show}>
        {/* 删除关闭事件 */}
      {/* <QuestionWrapper onClick={open} onMouseEnter={open}> */}
        <QuestionWrapper onClick={open} onMouseEnter={open} onMouseLeave={close}>
        {/* <QuestionWrapper onClick={open} onMouseEnter={open}> */}
          <Question size={16} />
        </QuestionWrapper>
      </Tooltip>
    </span>
  )
}
