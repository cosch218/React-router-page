import React from 'react'
import { useState, useContext } from 'react'

import { Link } from 'react-router-dom';

import data from '../data/dummy.json'
import DataContext from '../context/DataContext';

// Json을 이용한 데이터를 들고와서 게시글 목록 출력
export default function BoardList() {
  // const [dataList, setDataList] = useState(data);
  // DataContext에서 값을 가져와서 사용하기
  // {state: {boardlist}, action: {setBoardlist}}
  const value = useContext(DataContext);

  // 좋아요 버튼 메소드
  // * 클릭했을 때 값 추가 - 객체 생성 후 concat()
  // * 클릭했을 때 값 제거 
  // >> 언제 추가되고 언제 제거되는지 조건 설정
  // >> * 값이 없을 때 클릭 : 값 추가
  // >> * 값이 있을 때 클릭 : 값 제거
  // >>>> find()를 사용해서 값이 있을 때 객체 return, 값이 없을 때 undefined return
  const likeClick = ( board ) => {
    // 1. 값이 있을 때 클릭 >> 값 삭제
    if (value.state.likelist.find((like)=>(like.boardId === board.id))) {
      // 1-(1). filter()를 통해서 삭제 
      // >>>> id가 같다면 제외하고 배열 생성
      const newlikelist = value.state.likelist.filter((like)=>(like.boardId !== board.id));
      value.action.setLikelist(newlikelist);
    } 
    // 2. 값이 없을 때 클릭 >> 갑 추가
    else {
      // 2-(1). 값이 없을 때 클릭 >> 값 추가
      // 2-(2). 클릭했을 때 값 추가 >> 매개변수로 받아오기
      const newlike = {
        boardId: board.id,
        title: board.title
      }
      // 2-(3). concat()을 사용하여 새로운 배열 생성
      const newLikelist = value.state.likelist.concat(newlike);
      // 2-(4). set 메소드로 생성한 배열 값 할당
      value.action.setLikelist(newLikelist);
    }
    }

  return (
    <div>
      <h3>BoardList</h3>
      <ul>
        {
          // 좋아요 기능을 사용하기 위해 좋아요 배열에 있는 boardId와 boardlist에 있는 id를 비교하여 그 값이 있다면 화면에 출력
          // 어떤 배열 메소드를 사용해서 비교할지 결정해야 함
          // map()으로 board 값이 하나씩 반복되고 있고 하나씩 가져오는 board값과 좋아요 배열을 비교
          value.state.boardlist.map( (data) => (
            <li key={data.id}>
              {/** find를 이용해서 data(board)와 likelist를 비교해서 
               * 값이 있다면 검정 하트 >> return 객체
               * 값이 없다면 흰색 하트 출력 >> return undefined 
               * >> 삼항연산자 */}
              <span onClick={()=>{likeClick(data)}}>
              {
                // 삼항연산자와 && 연산자 사용하여 모든 조건이 참일 때 좋아요 버튼 화면에 출력
                // 각 내용을 구분하기 위해 ()로 묶어줌
                value.state.user.login && (value.state.likelist.find((like)=>(like.boardId === data.id))
                ? <span>❤</span>
                : <span>🤍</span>)
              }
              </span>
              <Link to={`/boardlist/${data.id}`}>
                {data.title}
              </Link>
            </li>
          ) )
        }
      </ul>
    </div>
  )
}
