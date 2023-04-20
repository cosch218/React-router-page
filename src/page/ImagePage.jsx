import React from 'react'

//src에서 이미지 들고 오는 방법
import logo from '../logo.svg'

// 이미지를 연결하는 방법 확인
export default function ImagePage() {
  return (
    <div>
      <h3>ImagePage</h3>
      <div>
        <img src="/logo192.png" alt="" />
        <img src="/img/logo192.png" alt="" />
        <p>public 폴더에 있는 이미지 가져오는 방식</p>
        <p>: build할 때 그 내용을 함께 가져간다</p>
      </div>
      <div>
        <img src={logo} alt="" width={"150px"} height={"150px"}/>
        <p>src 폴더에 있는 이미지 가져오는 방식</p>
        <p>: import를 통해 값을 가져올 수 있다</p>
        <img src={require("../logo.svg").default} width={"150px"} height={"150px"}/>
        <p>: require의 default를 통해서 접근하여 가져올 수 있다</p>
      </div>
      <div>
        <div 
          style={{
            width: "192px", 
            height: "192px", 
            backgroundImage: `url(${"/logo192.png"})`
          }}
        ></div>
        <p>css style 백그라운드 이미지로 가져오는 방식</p>
        <p>: public 폴더에서 가져온 이미지</p>
        <div 
          style={{
            width: "192px", 
            height: "192px", 
            backgroundImage: `url(${logo})`
          }}
        ></div>
        <p>: src 폴더에서 가져온 이미지</p>
      </div>
    </div>
  )
}
