//TODO figure out how to change img locations in state with actions
//TODO map unique section IDs and Img Ids



// ------------------------------------
// Constants
// ------------------------------------
import { newImg, newSection } from "./dataTypes"
import { saveAs } from "file-saver"
import JSZip from "jszip"
export const ADD_IMAGE = "ADD_IMAGE"
export const ADD_SECTION = "ADD_SECTION"
export const ADD_IMG_TO_SECTION = "ADD_IMG_TO_SECTION"
export const ADD_IMG_TO_IMGQUEUE = "ADD_IMG_TO_IMGQUEUE"
export const UPDATE_NAME = "UPDATE_NAME"
export const DOWNLOAD = "DOWNLOAD"
export const MOVE_IMG = "MOVE_IMG"
export const PREPARE_MOVE = "PREPARE_MOVE"
export const DELETE_SECTION = "DELETE_SECTION"
export const HIGH_LIGHTED = "HIGH_LIGHTED"
export const ADD_TO_BLOBS = "ADD_TO_BLOBS"
export const MOVE_HIGHLIGHTED = "MOVE_HIGHLIGHTED"
export const SET_BTN_DOWN = "SET_BTN_DOWN"
export const ADD_CLASS = "ADD_CLASS"
export const REMOVE_CLASS = "REMOVE_CLASS"
export const CHANGE_NAME = "CHANGE_NAME"
// ------------------------------------
// Actions
// ------------------------------------

const addToBlobs = (url, blob) => ({
  type: ADD_TO_BLOBS,
  url,
  blob
})

const addImageAction = (newImg) => ({
  type: ADD_IMAGE,
  img: newImg
})

const addSectionAction = (newSection) => ({
  type: ADD_SECTION,
  payload: newSection
})


export const addToSection = (section, img) => ({
  type: ADD_IMG_TO_SECTION,
  img,
  section
})


export const addToImgQueue = (section, img) => ({
  type: ADD_IMG_TO_IMGQUEUE,
  img,
})

export const addClass = (item, cssClass) => ({
  type: ADD_CLASS,
  item,
  cssClass
})

export const removeClass = (item, cssClass) => ({
  type: REMOVE_CLASS,
  item,
  cssClass
})

export const changeDownloadName = (name) => ({
  type: CHANGE_NAME,
  name,
})

export const moveHiglighted = (section, extraImg) => {

  return (dispatch, getState) => {
    let state = getState().imgOrganizer
    if (section.id === state.imgQueue.id) {
      if (extraImg.id !== undefined)
        dispatch(addToImgQueue(section, extraImg))
      state.highLighted.map((d, i) => {
        dispatch(addToImgQueue(section, d))
      })

    }
    else {
      if (extraImg.id !== undefined)
        dispatch(addToSection(section, extraImg))
      state.highLighted.map((d, i) => {
        dispatch(addToSection(section, d))
      })
    }
    dispatch({ type: MOVE_HIGHLIGHTED })

  }
}

export const move_img = (section, img) => ({
  type: MOVE_IMG,
  section,
  img
})

export const prepare_move = (imgToDropOn, direction) => ({
  type: PREPARE_MOVE,
  imgToDropOn,
  direction
})

export const updateName = (sectionId, name) => ({
  type: UPDATE_NAME,
  payload: name,
  sectionId
})

export const highLighted = (section, img) => ({
  type: HIGH_LIGHTED,
  section,
  img
})

export const setButtonDown = (btnNum, val) => ({
  type: SET_BTN_DOWN,
  btnNum,
  val
})

export const deleteSection = (section) => {

  return (dispatch, getState) => {
    section.imgs.map((d, i) => {
      dispatch(addImageAction(d))
    })

    dispatch({
      type: DELETE_SECTION,
      section
    })
  }
}

export const download = () => {
  return (dispatch, getState) => {
    var zip = JSZip()
    var state = getState()
    state.imgOrganizer.sections.map((section, i) => {
      var prefix = i < 9 ? "0" + (i + 1) + "-" : (i + 1) + "-"
      if (section.imgs.length !== 0) {
        section.imgs.map((d, j) => {
          var blob = state.imgOrganizer.blobs[d.src]
          var postfix = j < 9 ? "-0" + (j + 1) : "-" + (j + 1)
          var name = prefix + section.name + postfix + "." + blob.type.split("/")[1]
          zip.file(name, blob);
        })
      }
    })

    zip.generateAsync({ type: "blob" })
      .then(function (content) {
        saveAs(content, state.imgOrganizer.downloadName + ".zip");
      });

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
      const img = newImg()
      img.uploadNum = i;
      img.uploadName = file.name;
      reader.onloadend = (e) => {
        var blob = new Blob([e.target.result], { type: file.type });
        var url = URL.createObjectURL(blob);
        img.src = url
        dispatch(addToBlobs(url, blob))
        dispatch(addImageAction(img))
      };

      reader.readAsArrayBuffer(file);

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
      let ind = findImgIndex(state.imgQueue, img)
      if (ind > -1) {
        state.imgQueue.imgs.splice(ind, 1)
      }
    }

    else if (key === "sections") {
      state.sections.map((section, i) => {
        let ind = findImgIndex(section, img)
        if (ind > -1) {
          state.sections[i].imgs.splice(ind, 1)
        }
      })
    }
  }

}

const findImgInState = (state, img) => {
  for (var [key, value] of Object.entries(state)) {
    if (key === "imgQueue") {
      const im = findImgInSection(state.imgQueue, img)
      if (im !== -1) {
        return im
      }
    }
    else if (key === "sections") {
      let found = 0
      state.sections.map((section, i) => {
        let im = findImgInSection(section, img)
        if (im !== -1)
          found = im
      })
      return found
    }
  }

}
const findImgIndex = (section, img) => {
  var index = -1
  section.imgs.map((d, i) => {
    if (d !== undefined && d.id === img.id) {
      index = i
    }
  })
  return index
}

const findImgInSection = (section, img) => {
  var found = -1
  section.imgs.map((d, i) => {
    if (d !== undefined && d.id === img.id) {
      found = d
    }
  })
  return found
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


const findSectionIndex = (state, section) => {
  var index = 0
  state.sections.map((d, i) => {
    if (d.id === section.id)
      index = i
  })
  return index
}

const moveImg = (state) => {
  //console.log(state.highLighted)
  //console.log(state.dragTo.direction)
  //console.log(state.dragTo.img)
}



// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_TO_BLOBS]: (state, action) => {
    state.blobs[action.url] = action.blob
    return state
  },
  [ADD_IMAGE]: (state, action) => {
    state.imgQueue.imgs.push(action.img)
    state.imgQueue.imgs.sort((imgA, imgB) => imgA.uploadName.localeCompare(imgB.uploadName))
    return state
  },
  [ADD_SECTION]: (state, action) => {
    sections: state.sections.push(action.payload)
    return state
  },
  [ADD_IMG_TO_SECTION]: (state, action) => {
    removeImg(state, action.img)
    insertImg(state.sections, "sections", action.img, action.section.id)
    return state
  },
  [ADD_IMG_TO_IMGQUEUE]: (state, action) => {
    removeImg(state, action.img)
    insertImg(state.imgQueue, "imgQueue", action.img, null)
    return state
  },
  [CHANGE_NAME]: (state, action) => {
    state.downloadName = action.name;
    return state
  },
  [UPDATE_NAME]: (state, action) => {
    state.sections.map((d) => {
      if (d.id === action.sectionId)
        d.name = action.payload
    })
    return state
  },
  [MOVE_IMG]: (state, action) => {
    moveImg(state)

    if (action.section.id === state.imgQueue.id) {
      let section = state.imgQueue
      let ind1 = findImgIndex(section, state.dragTo.img)
      let ind2 = findImgIndex(section, action.img)
      let tmp = section.imgs[ind1]
      section.imgs[ind1] = section.imgs[ind2]
      section.imgs[ind2] = tmp
    } else {

      state.sections.map((section, i) => {
        if (section.id === action.section.id) {
          let ind1 = findImgIndex(section, state.dragTo.img)
          let ind2 = findImgIndex(section, action.img)
          let tmp = section.imgs[ind1]

          section.imgs[ind1] = section.imgs[ind2]
          section.imgs[ind2] = tmp

        }
      })
    }
    return state
  },
  [PREPARE_MOVE]: (state, action) => {
    state.dragTo = { img: action.imgToDropOn, direction: action.direction }
    return state
  },
  [DELETE_SECTION]: (state, action) => {
    var ind = findSectionIndex(state, action.section)
    state.sections.splice(ind, 1)
    return state
  },
  [HIGH_LIGHTED]: (state, action) => {

    var isThere = false
    state.highLighted.map((d) => {
      if (d.id === action.img.id) {
        isThere = true
      }
    })

    if (isThere === false) {
      state.highLighted.push(action.img)

      if (action.section.id === state.imgQueue.id) {
        let img = findImgInSection(state.imgQueue, action.img)
        img.classes.push("highLighted")
      } else {
        let i = findSectionIndex(state, action.section)
        let img = findImgInSection(state.sections[i], action.img)
        img.classes.push("highLighted")
      }
    }
    return state
  },
  [MOVE_HIGHLIGHTED]: (state, action) => {
    state.highLighted.map(d => {
      d.classes.pop()
    })
    state.highLighted = []
    return state
  },
  [SET_BTN_DOWN]: (state, action) => {
    state.buttonsDown[action.btnNum] = action.val
    return state
  },
  [ADD_CLASS]: (state, action) => {
    if (action.item.type === "img") {
      let img = findImgInState(state, action.item)
      console.log(img)
      img.classes.includes(action.cssClass) ? null : img.classes.push(action.cssClass)
    }
    return state
  },
  [REMOVE_CLASS]: (state, action) => {
    if (action.item.type === "img") {
      let img = findImgInState(state, action.item)
      //console.log(img.classes)
      img.classes.includes(action.cssClass) ? null : img.classes.splice(indexof(action.cssClass) + 1)
      //console.log(img.classes)
    }
    return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  "imgQueue": newSection("imgQueue", []),
  "sections": [newSection("Exterior", []),
              newSection("Kitchen", []),
              newSection("Dining Area", []),
              newSection("Living Room", []),
              newSection("Master Bedroom", []),
              newSection("Master Ensuite", []),
              newSection("Second Bedroom", []),
              newSection("Second Bathroom", [])],

  "blobs": {},
  "dragTo": {},
  "highLighted": [],
  "buttonsDown": [0],
  "downloadName": "Property Address Photos"
}

const deepCopy = (state) => {
  var newState = JSON.parse(JSON.stringify(state));
  //dont deep copy blobs.
  newState.blobs = state.blobs
  newState.highLighted = state.highLighted
  return newState
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(deepCopy(state), action) : state
}
