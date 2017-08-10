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

export const holdDragAction = (img) => {


  return (dispatch, getState) => {
    console.log("imgOrganizer ", getState().imgOrganizer )
    findImg(getState().imgOrganizer, img)



    return {
      type: HOLD_DRAG,
      payload: img
    }
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

    var newSection = {
      name: "New Section",
      imgs: []
    }

    dispatch(addSectionAction(newSection))

  }
}


export const moveImg = () => {
  return (dispatch, getState) => {



  }
}


const findImg = (imgState, img) => {
  var foundImg
  var section

  for (var [key, value] of Object.entries(imgState)) {

    if (key === "imgQueue") {
      foundImg = value.find((d) => {
        return d.id === img.id
      })

    }
    /* else if (key === "sections") {
      array.map((d, i) => {

        if (img != undefined)
          img = d["imgs"].find((d) => d.id === img.id)

        else
          section = d
      })
    } else if ( key === "dragging") {
      img = array.find((d) => d.id === img.id)
    }
*/
    if (foundImg !== undefined)
      break;
    
  }
  console.log(img.id, section)
  return { img, section, key }
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

  [HOLD_DRAG]: (state, action) => ({
    ...state,
    dragging: [...state.dragging, action.payload]
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  "sections": [],
  "imgQueue": [],
  "dragging": [],
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
