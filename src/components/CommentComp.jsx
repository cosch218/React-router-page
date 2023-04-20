// 코멘트 1개가 보여질 공간

import React from 'react'

// 삭제 버튼에 쓸 메소드를 Board 페이지 컴포넌트에서 작성 후 전달받아 사용
// >> state와 action을 필요한 공간에서 쓰기 위함

export default function CommentComp(props) {
  // props로 전달한 comment를 구조분해를 통해서 쓰기 쉽게 작성
  const {cId, writer, text, date} = props.comment
  // Board에 작성한 메소드를 들고와서 사용
  const {deleteComment} = props;
  
  return (
    <div>
      <h5>{cId}/{writer}</h5>
      <p>
        {text}
        <button
          // 메소드를 사용할 때, cId를 전달해야함 >> 화살표 함수로 감싸서 사용
          onClick={()=>{deleteComment(cId)}}
        >
          X
        </button>
        </p>
      <span>{date}</span>
    </div>
  )
}
