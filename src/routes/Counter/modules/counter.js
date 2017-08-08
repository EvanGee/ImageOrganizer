// ------------------------------------
// Constants
// ------------------------------------
import {newImg, newSection} from "./dataTypes"
export const ADD_IMAGE = "ADD_IMAGE"
export const ADD_SECTION = "ADD_SECTION"
// ------------------------------------
// Actions
// ------------------------------------

const addImageAction = (newImg) => ({
  type: ADD_IMAGE,
  payload: newImg
})


export const addImage = (evt) => {

  return (dispatch, getState) => {

    var imageFiles = evt.target.files
    for (var i = 0; i < imageFiles.length; i++) {
      var file = imageFiles[i]

      if (!file.type.match('image.*'))
        throw new Error("Wrong file type")

      var reader = new FileReader()

      reader.onload = (e) => {
        const img = 
        dispatch(addImageAction(e.target.result))
      }

      reader.readAsDataURL(file);
      //var myFile = new File([file], "HelloWorld.pdf", { type: "image" })
      //fileArray.push(file)
    }
  }
}


const addSectionAction = (newSection) => ({
  type: ADD_SECTION,
  payload: newSection
})

export const addSection = () => {
  return (dispatch, getState) => {

    var newSection = {
      name: "New Section",
      imgs: []
    }

    dispatch(addSectionAction(newSection))

  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_IMAGE]: (state, action) => ({
    ...state,
    imgQueue: [...state.imgQueue, action.payload]
  }),
  [ADD_SECTION]: (state, action) => ({
    ...state,
    sections: [...state.sections, action.payload]
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  sections: [],
  imgQueue: []
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
