import { configureStore, createSlice } from '@reduxjs/toolkit'

let cartData = createSlice({ 
  name: 'cartData',
  initialState: [
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

  reducers: {
    modifyCartData(){
      // cartData 의 name 을 변경하는 로직
      return [...cartData]
      
    }
  }
})

export let {modifyCartData} = cartData.actions

export default configureStore({
  reducer: {
    cartData : cartData.reducer,
  }
}) 