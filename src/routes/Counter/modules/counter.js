//TODO figure out how to change img locations in state with actions
//TODO map unique section IDs and Img Ids



// ------------------------------------
// Constants
// ------------------------------------
import { newImg, newSection } from "./dataTypes"
export const ADD_IMAGE = "ADD_IMAGE"
export const ADD_SECTION = "ADD_SECTION"
export const MOVE_IMG = "MOVE_IMG"
export const HOLD_DRAG = "HOLD_DRAG"
export const REMOVE_IMG = "REMOVE_IMG"
export const TEST_STATE_CHANGE = "TEST_STATE_CHANGE"
// ------------------------------------
// Actions
// ------------------------------------

const addImageAction = (newImg) => ({
  type: ADD_IMAGE,
  payload: newImg
})

const moveImgAction = (oldSection, newSection, Img) => ({
  type: MOVE_IMG,
  payload: { oldSection, newSection, Img }
})

const addSectionAction = (newSection) => ({
  type: ADD_SECTION,
  payload: newSection
})

const removeImgAction = (newState, key) => ({
  type: REMOVE_IMG,
  payload: newState,
  key
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
        const img = newImg()
        img.src = e.target.result
        dispatch(addImageAction(img))
      }

      reader.readAsDataURL(file);
      //var myFile = new File([file], "HelloWorld.pdf", { type: "image" })
      //fileArray.push(file)
    }
  }
}

export const addSection = () => {
  return (dispatch, getState) => {
    var newSection = {
      name: "New Section",
      imgs: []
    }
    dispatch(addSectionAction(newSection))
  }
}


export const moveImg = (img) => {
  return (dispatch, getState) => {
    //const state = getState().imgOrganizer
    dispatch({
      type: TEST_STATE_CHANGE,
      payload: 1
    })
    console.log(getState())
    //const newState = removeImg(state, img)
    //dispatch(removeImgAction(newState.newState, newState.keyValue))
  
  }
}

// remove is a bool, if you would like to delete the img
// from the state
const removeImg = (imgState, img) => {
  var foundImg
  var section
  var newSectionState = []

  for (var [key, value] of Object.entries(imgState)) {

    if (key === "imgQueue") {
      var index
      foundImg = value.find((d, i) => {
        if (d.id === img.id) {
          index = i
          return true
        }
        else 
          return false
      })
      if (foundImg.id !== undefined) {
        
        newSectionState = value.splice(index, 1)
        newSectionState = value.splice(index, 0, foundImg)
        console.log(newSectionState)
        return {newState: {...imgState, [key]: newSectionState}, keyValue: key }
      }

    }
    /*
    else if (key === "sections") {
      const sectionArr = imgState.sections
      sectionArr.map((section, i) => {
        foundImg = d.imgs.find((d) => {
          return d.id === img.id
        })
        if (foundImg !== undefined) {
          const newImgs = [...section.imgs]
          const newSect = newSection(section.name, section.imgs)
          const newSectionState = value.splice(i, 1, newSect)
          return {newState: {...imgState, key: newSectionState, keyName}, keyValue: key }
        }
      })
    }
    else if (key === "dragging") {
      foundImg = d.imgs.find((d) => {
        return d.id === img.id
      })
      if (foundImg !== undefined) {
        newSectionState = [...value, foundImg]
        return {newState: {...imgState, key: newSectionState}, keyValue: key }
      }
    }
    */
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
  [MOVE_IMG]: (state, action) => {
    return {
      ...state,
      sections: [...state.sections,]
    }
  },
  [REMOVE_IMG] : (state, action) => ({
    ...state,
    [action.key] : [...action.payload]
  }),

  [TEST_STATE_CHANGE] : (state, action) => {

    state["ADD"] += action.payload
    return state
  },

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  "sections": [],
  "imgQueue": [],
  "dragging": [],
}

const deepCopy = (state) => {
  return JSON.parse(JSON.stringify(state));
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(deepCopy(state), action) : state
}
