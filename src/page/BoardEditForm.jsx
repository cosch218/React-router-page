import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';


import DataContext from '../context/DataContext';


// BoardWriteForm 컴포넌트는 Board 컴포넌트에서 수정 버튼을 클릭했을 때
// 방법 1. 그 id 값을 가져와서 boardlist의 객체값을 수정해서 작성하는 공간
// 방법 2. 객체를 가져와서 boardlist의 객체값을 수정해서 작성하는 공간
// 아래 내용은 두번째 방법인 객체를 가져와서 진행
// 객체를 가져올 때는 주소(params)를 이용할 수 없다
// >> useNavigate에서 state를 통해 값 전달
// >> useLocation을 통해서 값을 받아올 수 있다
// ** 방법 1, 방법 2 모두 수정해서 쓰는 부분은 동일!!
export default function BoardEditForm() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  // 수정버튼을 누른 Board에서 받아온 객체
  // {id, title, content, date, writer}
  // 여기서 title과 content만 수정
  const boardData = location.state;


  // 사용자로 입력받아올 공간을 useState로 작성
  // >> todoList에서 todo를 작성할 공간과 동일
  const [title, setTitle] = useState(boardData.title);
  const [content, setContent] = useState(boardData.content);


  // DataContext를 통해서 공용데이터 값, 메소드 들고 오기
  const value = useContext(DataContext);
  const { state, action } = value;


  // 글 수정 메소드
  const editBoard = () => {
    // 1. "정말로 수정하시겠습니까?" 알림창을 띄워 확인 누르면 수정되고 취소 누르면 실행 취소
    if(window.confirm("정말로 수정하시겠습니까?")) {
      // 2. 수정된 객체 작성한다
        // 가져온 boardData와 수정한 title, content 사용
        // ...boardData : boardData의 모든 속성값을 가져옴
      const newBoard = {
        ...boardData,
        title,
        content
      }
      // 3. 배열을 들고 와서 동일한 id에 객체를 바꿔 넣어 새로운 배열 생성한다 >> map() 사용
      // 동일하지 않다면 이전 배열의 객체값 그대로 사용
      const newBoardList = state.boardlist.map( (board) => (board.id === boardData.id ? newBoard : board) )
      // 4. 새로운 배열을 set 메소드를 이용하여 추가한다
      action.setBoardlist(newBoardList);
      // 5. 수정한 Board로 이동해서 내용 확인
      navigate(`/boardlist/${newBoard.id}`)
    }
  }


  return (
    <div>
      <h3>BoardEditForm</h3>
      <form action="">
        <label htmlFor="">제목</label>
        <input 
          type="text" 
          onChange={(e) => {setTitle(e.target.value)}}
          // 현재 수정할 객체의 title 값 들고오기
          value={title}
        />
        <br/>
        <textarea name="" id="" cols="30" rows="10"
          onChange={(e) => {setContent(e.target.value)}}
          // 현재 수정할 객체의 content 값 들고오기
          value={content}
        ></textarea>
        <br />
        <button
          onClick={editBoard}
        >
          글 수정 완료
        </button>
      </form>
    </div>
  )
}
