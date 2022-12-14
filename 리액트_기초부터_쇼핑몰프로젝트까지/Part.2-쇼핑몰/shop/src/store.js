import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice'

//createSlice -> useState 만들기
let cartData = createSlice({ 
  name: 'cartData', //state 이름
  initialState: [ //state 데이터
    {
      id : 0,
      name: 'White and Black',
      count : 2
    },
    {
      id : 2,
      name: 'Grey Yordan',
      count : 1
    },
  ],

  reducers: { //state 변경 함수 생성
    modifyCartData(state,action){
      let num = state.findIndex(item => {return item.id === action.payload})
      state[num].count++;
    },
    addItem(state,action){
      state.push(action.payload)
      //payload => 함수 파라미터 출력문법
    }
  }
})

//만든 함수 export
export let {modifyCartData , addItem} = cartData.actions
// cardData.actions => state 변경함수를 남음

export default configureStore({
  reducer: { //state 만든거 등록
    cartData : cartData.reducer,
  }
}) 