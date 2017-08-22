//TODO figure out how to change img locations in state with actions
//TODO map unique section IDs and Img Ids



// ------------------------------------
// Constants
// ------------------------------------
import { newImg, newSection } from "./dataTypes"
import {saveAs} from "file-saver"
export const ADD_IMAGE = "ADD_IMAGE"
export const ADD_SECTION = "ADD_SECTION"
export const ADD_IMG_TO_SECTION = "ADD_IMG_TO_SECTION"
export const ADD_IMG_TO_IMGQUEUE = "ADD_IMG_TO_IMGQUEUE"
export const UPDATE_NAME = "UPDATE_NAME"
export const DOWNLOAD = "DOWNLOAD"
// ------------------------------------
// Actions
// ------------------------------------

const addImageAction = (newImg) => ({
  type: ADD_IMAGE,
  payload: newImg
})

const addSectionAction = (newSection) => ({
  type: ADD_SECTION,
  payload: newSection
})

const sectionAddImage = (sectionId, img) => ({
  type: ADD_IMG_TO_SECTION,
  payload: img,
  sectionId: sectionId
})

export const addToImgQueue = (sectionId, img) => ({
  type: ADD_IMG_TO_IMGQUEUE,
  payload: img,
})

export const addToSection = (sectionId, Img) => {
  return (dispatch, getState) => {
    dispatch(sectionAddImage(sectionId, Img))

  }
}

export const download = () => {
  return (dispatch, getState) => {

    var state = getState()
    state.imgOrganizer.sections.map((section) => {
      if (section.imgs.length !== 0) {
        section.imgs.map((d) => {
          var file = new File([d.src], section.name + "-01.png", {type: "image"})
          
          saveAs(file)
        })
      }
    })
    //var myFile = new File([file], "HelloWorld.pdf", { type: "image" })
    //fileArray.push(file)

    dispatch({ type: DOWNLOAD })
  }
}

export const updateName = (sectionId, name) => ({
  type: UPDATE_NAME,
  payload: name,
  sectionId
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

    }
  }
}

export const addSection = () => {
  return (dispatch, getState) => {
    var newSec = newSection("Section Name", [])
    dispatch(addSectionAction(newSec))
  }
}

const removeImg = (state, img) => {

  for (var [key, value] of Object.entries(state)) {

    if (key === "imgQueue") {
      state.imgQueue.imgs.find((d, i) => {
        if (d !== undefined && d.id === img.id) {
          state.imgQueue.imgs.splice(i, 1)
        }
      })
    }

    else if (key === "sections") {
      state.sections.map((section, i) => {
        section.imgs.find((d, i) => {
          if (d !== undefined && d.id === img.id) {
            section.imgs.splice(i, 1)
          }
        })
      })
    }
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
  else if (key === "imgQueue") {
    state.imgs.push(img)
  }
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_IMAGE]: (state, action) => {
    state.imgQueue.imgs.push(action.payload)
    return state
  },
  [ADD_SECTION]: (state, action) => {
    sections: state.sections.push(action.payload)
    return state
  },
  [ADD_IMG_TO_SECTION]: (state, action) => {
    removeImg(state, action.payload)
    insertImg(state.sections, "sections", action.payload, action.sectionId)
    return state
  },
  [ADD_IMG_TO_IMGQUEUE]: (state, action) => {
    removeImg(state, action.payload)
    insertImg(state.imgQueue, "imgQueue", action.payload, null)
    return state
  },
  [UPDATE_NAME]: (state, action) => {
    state.sections.map((d) => {
      if (d.id === action.sectionId)
        d.name = action.payload
    })
    return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  "sections": [newSection("Section Name", [])],
  "imgQueue": newSection("ImgQueue", []),
  "dragging": [],
}

const deepCopy = (state) => {
  return JSON.parse(JSON.stringify(state));
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(deepCopy(state), action) : state
}
