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
export const REMOVE_IMG_QUEUE = "REMOVE_IMG_QUEUE"
export const ADD_IMG_TO_SECTION = "ADD_IMG_TO_SECTION"

// ------------------------------------
// Actions
// ------------------------------------

const addImageAction = (newImg) => ({
  type: ADD_IMAGE,
  payload: newImg
})

const moveImgAction = (newSection, Img) => ({
  type: MOVE_IMG,
  payload: Img,
  section: newSection
})

const addSectionAction = (newSection) => ({
  type: ADD_SECTION,
  payload: newSection
})

const removeImg_Sections = (newState, key) => ({
  type: REMOVE_IMG,
  payload: newState,
  key,
})

const removeImg_Queue = (newState) => ({
  type: REMOVE_IMG_QUEUE,
  payload: newState,
})

const sectionAddImage = (sectionId, img) => ({
  type: ADD_IMG_TO_SECTION,
  payload: img,
  sectionId: sectionId
})

export const addToSection = (sectionId, Img) => {
  return (dispatch, getState) => {
    dispatch(sectionAddImage(sectionId, Img))

  }
}

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
    var newSec = newSection("name", [])
    dispatch(addSectionAction(newSec))
  }
}


export const moveImg = (img) => {
  return (dispatch, getState) => {
    const state = getState().imgOrganizer
    const ImgLocation = removeImg(state, img)

    if (ImgLocation.path === "imgQueue") {
      dispatch(removeImg_Queue(ImgLocation.newArray, ImgLocation.path))
    }
  }
}

// remove is a bool, if you would like to delete the img
// from the state
const removeImg = (imgState, img) => {
  var foundImg
  var section
  var newArray = []

  for (var [key, value] of Object.entries(imgState)) {

    if (key === "imgQueue") {
      var index
      foundImg = value.find((d, i) => {
        if (d !== undefined && d.id === img.id) {
          index = i
          return true
        }
        else
          return false
      })
      if (foundImg !== undefined) {
        newArray = value.splice(index, 1)
        return true
      }
    }
    
    else if (key === "sections") {
      imgState.sections.map((section, i) => {
        section.imgs.find((d, i) => {
          if (d !== undefined && d.id === img.id) {
            section.imgs.splice(i, 1)
          }
        })
      })
    }
    /*
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

//instert into the specific state array
const insertImg = (state, key, img, sectionId) => {

    if (key === "sections") {
      state.find((d) => {
        if (d.id === sectionId) {
          d.imgs.push(img)
          return true
        }
        else
          return false
      })
    }
    else if (key === "dragging") {
      state.push(img)
    }
    else if (key === "imgQueue"){
      state.push(img)
    }
  }


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_IMAGE]: (state, action) => {
    imgQueue: state["imgQueue"].push(action.payload)
    return state
  },
  [ADD_SECTION]: (state, action) => {
    sections: state.sections.push(action.payload)
    return state
  },
  [REMOVE_IMG_QUEUE]: (state, action) => {
    state.imgQueue = action.payload
    return state
  },
  [MOVE_IMG]: (state, action) => {
    state[action.section].push(action.payload)
    return state
  },
  [ADD_IMG_TO_SECTION]: (state, action) => {
    removeImg(state, action.payload)
    insertImg(state.sections, "sections", action.payload, action.sectionId)
    return state
  }
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
