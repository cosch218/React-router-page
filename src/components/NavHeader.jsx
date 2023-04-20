import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'


import DataContext from '../context/DataContext'


export default function NavHeader() {
  const {state} = useContext(DataContext);

  return (
    <div>
        <Link to="/">HOME</Link>
        <Link to="/boardlist">BOARDLIST</Link>
        <Link to="/board-write-form">WRITE</Link>
        <Link to="/image">IMAGE</Link>
        {/** state.user.login이
        * true일 때 : state.user.writer 출력 
         * false일 때 : 링크 출력 */}
        {/** 방법
         * 1. useContext와 DataContext를 import
         * 2. 삼항연산자를 사용하여 조건문 작성
         */}
        {
          state.user.login
          ? <span>{state.user.writer}</span> 
          : <Link to="/login-form">LOGIN</Link>
        }
    </div>
  )
}
