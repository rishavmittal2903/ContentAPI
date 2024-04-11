import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IContentField, IContentState } from '../../interfaces/IField'

// Define a type for the slice state

// Define the initial state using that type
const initialState: IContentState = {
  contentData: [],
}
const addFieldsToContentById = createAsyncThunk(
    'users/addFieldsToContentById',
    // if you type your function argument here
    async (contentId: string) => {
      return contentId;
    },
  )
export const userReducer = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addContentData: (state,  action: PayloadAction<IContentField>) => {
      debugger;
      state.contentData =[...state.contentData, action.payload]
      console.log(state.contentData);
    },
    addFieldsByContent: (state:IContentState,  action: PayloadAction<IContentField>) => {
      let index = state.contentData?.findIndex((data:IContentField)=>data.contentId === action.payload.contentId);
      index= state.contentData[0]?.contentId ? index : 0
      if(index!==-1)
      {
        state.contentData[index].fields = [...state.contentData[index]?.fields ?? {}, ...action.payload.fields]
      }
      state.contentData =[...state.contentData]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addFieldsToContentById.pending, (state, action) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    }).addCase(addFieldsToContentById.fulfilled, (state, action)=>{

    }).addCase(addFieldsToContentById.rejected, (state, action)=>{
        
    })
}
})

export const { addContentData, addFieldsByContent } = userReducer.actions

// Other code such as selectors can use the imported `RootState` type
export default userReducer.reducer