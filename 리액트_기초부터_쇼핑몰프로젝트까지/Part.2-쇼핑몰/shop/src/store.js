import { configureStore, createSlice } from '@reduxjs/toolkit'

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

  reducers: { //함수 생성
    modifyCartData(state){
      state[0].count++;
    }
  }
})

export let {modifyCartData} = cartData.actions

export default configureStore({
  reducer: { //state 만든거 등록
    cartData : cartData.reducer,
  }
}) 