import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import DataContext from '../context/DataContext';


export default function LoginForm() {
  const [writer, setWriter] = useState();

  // 객체의 구조 분해를 통해서 원하는 속성만 가져옴(state와 action 중 action만 가져옴)
  const {action} = useContext(DataContext);

  const navigate = useNavigate();


  // 로그인 메소드
  // 변수로 자주 사용하는 이름이라면 헷갈리지 않도록 앞이나 뒤에 동사나 전치사를 붙여서 메소드임을 알림
  const onLogin = () => {
    // 1. 전달할 user 객체 만든다
    const newUser = {
      writer: writer,
      login: true
    };
    // 2. 그 내용을 set 메소드를 통해 수정 >> 우선 DataContext로 값을 가져와야 함
    action.setUser(newUser);
    // 3. Home 또는 Baordlist로 이동
    navigate('/');
  };

  return (
    <div>
      <h3>LoginForm</h3>
      <label htmlFor="">ID를 입력해 주세요</label>
      <br />
      <input 
        type="text"
        onChange={(e)=>{setWriter(e.target.value)}}
      />
      <br />
      <button
        onClick={onLogin}
      >
        로그인
      </button>
    </div>
  )
}
