import React, { useState, useEffect, useContext } from 'react'

// 주소 값으로 보낸 id를 가져오기 위해 useParams 사용
// boardData의 값이 undefined일 경우 다시 BoardList 컴포넌트로 이동하기 위해 useNavigate 사용
import { useParams, useNavigate } from 'react-router-dom'


// dummy.json의 내용이 필요함
import data from '../data/dummy.json'


// json 내용 대신에 DataContext에 있는 boardlist 들고와서 화면에 출력하기
import DataContext from '../context/DataContext';

// Comment 기능을 위한 컴포넌트 import
import CommentComp from '../components/CommentComp';



// id로 구분하기 위해 board에 data의 내용이 필요함
export default function Board() {

  // useNavigate를 사용하면 함수를 이용해서 화면 이동 가능
  const navigate = useNavigate();


  // 주소 값으로 보낸 id를 가져오기 위해 useParams 사용
  const {id} = useParams();


  // Context의 값을 가져옴 
  // 수정, 삭제를 위해 action 속성도 가져옴
  const { state, action } = useContext(DataContext);
  const {boardlist} = state;


  // 코멘트의 작성할 글을 저장하기 위한 공간
  const [text, setText] = useState("");


  // 배열의 함수인 find를 이용하여 배열 안에서 함수의 조건이 참인 단 하나의 값을 가져온다
  const boardData = boardlist.find( (d)=>(d.id == id) )
  // find로 값을 찾지 못할 경우 undefined 출력 >> 오류!
  // >> useEffect를 사용해서 boardData의 값이 undefined면 Error 컴포넌트 또는 BoardList 컴포넌트로 이동하게 할 수 있다
  // useNavigate()를 사용하면 함수를 이용해서 화면이동가능
  // useEffect의 두번째 인자값([])이 빈 배열이라면 컴포넌트 생성 시 실행
  useEffect(()=>{
    if (boardData == undefined) {
      navigate('/boardlist');
    }
  },[])
  

  // state의 commentlist에서 boardId와 param의 id값이 같은 새로운 배열 작성(filter)
  const boardCommentlist = state.commentlist.filter(
    (comment)=>(comment.boardId == id)
  )
  

  // 게시물 삭제 메소드
  const deleteBoard = () => {
    // 1. "정말로 삭제하시겠습니까?" 알림창을 띄워 확인 누르면 삭제되고 취소 누르면 실행 취소
    if(window.confirm("정말로 삭제하시겠습니까?")){
      // 2. 현재 id를 들고 온다 >> useParams를 통해 가져온 id를 들고 온다
      // 3. id와 동일한 객체를 제외한 새로운 배열을 만든다 >> filter() 사용
        // 일치 비교연산자 사용할 때는 자료형까지 동일해야 한다
      const newBoardlist = boardlist.filter( (board) => (board.id !== Number(id)) )
      // 4. 새로운 배열을 set메소드를 통해 넣어준다
      action.setBoardlist(newBoardlist);
      // 5. boradlist로 이동
      navigate('/boardlist');
    }
  }



  // 코멘트 추가 메소드
  const addComment = () => {
    // 1. 추가할 코멘트 객체 생성
    const newComment = {
      cId: state.cId,
      boardId: boardData.id,
      writer : state.user.writer,
      text: text,
      date: "2023-04-19"
    };
    // 2. cId 값 증가를 위한 메소드 실행
    action.cIdCount();
    // 3. 코멘트가 추가된 새로운 배열 생성 >> concat() 사용
    const newCommentlist = state.commentlist.concat(newComment);
    // 4. 새로운 배열을 set메소드를 통해 값 할당
    action.setCommentlist(newCommentlist);
  }


  // 코멘트 삭제 메소드
  const deleteComment = (cId) => {
    // 1. 삭제/수정을 할 때는 값의 id(유일한 값)을 통해 확인
    // boardCommentlist의 각 객체에 id가 있음 >> map()으로 객체를 하나씩 출력할 때 id 값을 가져옴
    // 2. filter()를 통해 해당 id 값을 제외한 새로운 배열 생성
    const newCommentlist = state.commentlist.filter(
      (comment) => (comment.cId !== cId)
    );
    // state.commentlist를 통해서 새로운 배열 생성
    // 3. 그 배열을 set 메소드를 통해 값 할당
    action.setCommentlist(newCommentlist);
  }
  

  return (
    <div>
      { /** useEffect를 사용하기 위한 삼항연산자 
       * 화면이 먼저 렌더되고 useEffect가 실행되기 때문에 화면상에서 나타나는 오류를 제거하고 useEffect로 이동
       * boardData = undefined == false
       * boardDate = 값있음 == true
       * >> 자동 형변환
      */
        boardData && (
          <div>
            <h3>제목 : {boardData.title}</h3>
            <p>작성자 : {boardData.writer}</p>
            <p>작성 날짜 : {boardData.date}</p>
            <p>내용 : {boardData.content}</p>
          </div>
        )
      }

      {/** writer의 값이 같을 때만 아래 버튼들 보이게 만들기 >> 삼항연산자 사용
       * boarddata의 값이 있을 때 비교!
       * >> 먼저 boardData가 있는지 확인한 후에 비교하고 출력
       * 연달아서 비교 확인하기 위해 && 연산자 사용
       * 첫번째 확인할 내용 : boardData가 있는지? >> 값이 있으면 true, 없으면
       * 두번째 확인할 내용 : state.user.writer와 boardData.writer 비교
      */}
      {
        boardData && (state.user.writer === boardData.writer &&
          <div>
            <button
            // navigate의 state를 이용하여 boardData객체를 전달
              onClick={()=>{navigate('/board-edit-form', {state: boardData})}}
            >
              수정
            </button>
            <button
              onClick={deleteBoard}
            >
              삭제
            </button>
          </div>
          )
      }
      <hr />
      {/** 코멘트를 작성할 공간 */}
      <input 
        type="text" 
        onChange={(e)=>{setText(e.target.value)}}
      />
      <button
        onClick={addComment}
      >
        댓글추가
      </button>
      <hr />
      {/** 값을 넘길 형태가 객체로 주어져 있으면 객체로 넘길 수 있다
       * state의 commentlist를 그대로 쓰게 되면 전체가 나오기 때문에
       * 동일한 boardId를 가진 commentlist를 만들어야 함
       */
        boardCommentlist.map(
          (comment)=>(
            <CommentComp 
              key={comment.cId} 
              comment={comment}
              deleteComment={deleteComment}
            />
          )
        )
      }
    </div>
  )
}
