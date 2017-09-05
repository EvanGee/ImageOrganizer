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
const ADD_TO_BLOBS = "ADD_TO_BLOBS"
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

export const move_img = (section, img) => ({
  type: MOVE_IMG,
  section,
  img
})

export const prepare_move = (imgToDropOn) => ({
  type: PREPARE_MOVE,
  imgToDropOn
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
      var prefix = i < 9 ? "0" + (i + 1) + "-" : (i + 1)
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
        saveAs(content, "Images.zip");
      });
      
  }
  
}

//Special thanks to mal hasaranga perera for the binary.charCode idea
function dataURItoBlob(dataURI) {
  var metaData = dataURI.split(',')
  var binary = atob(metaData[1]);
  var type = metaData[0].split("/")[1].split(";")[0]
  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: 'image/' + type });
}



export const addImage = (evt) => {

  return (dispatch, getState) => {

    var imageFiles = evt.target.files
    for (var i = 0; i < imageFiles.length; i++) {
      var file = imageFiles[i]

      if (!file.type.match('image.*'))
        throw new Error("Wrong file type")

      var reader =  new FileReader()
      const img = newImg()
      img.uploadNum = i
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
      if( ind > -1 ) {
        state.imgQueue.imgs.splice(ind, 1)
      }
    }

    else if (key === "sections") {
      state.sections.map((section, i) => {
        let ind = findImgIndex(section, img)
        if( ind > -1) {
          state.sections[i].imgs.splice(ind, 1)
        }
      })
    }
  }

}

const findImgsInState = (state, imgs) => {
  var imgs = []
  for (var [key, value] of Object.entries(state)) {
    if (key === "imgQueue") {
      let img = findImgInSection(state.imgQueue, img)
      if( img !== -1 ) {
        imgs.push(img)
      }
    }

    else if (key === "sections") {
      state.sections.map((section, i) => {
        let img = findImgInSection(section, img)
        if( img !== -1 ) {
          imgs.push(img)
        }
      })
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
  var img = -1
  section.imgs.map((d, i) => {
    if (d !== undefined && d.id === img.id) {
      index = img
    }
  })
  return img
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
    state.imgQueue.imgs.sort((imgA, imgB)=>imgA.uploadNum - imgB.uploadNum)
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
  [UPDATE_NAME]: (state, action) => {
    state.sections.map((d) => {
      if (d.id === action.sectionId)
        d.name = action.payload
    })
    return state
  },
  [MOVE_IMG]: (state, action) => {
    if (action.section.id === state.imgQueue.id) {
      let section = state.imgQueue
      let ind1 = findImgIndex(section, state.dragTo)
      let ind2 = findImgIndex(section, action.img)
      let tmp = section.imgs[ind1]
      section.imgs[ind1] = section.imgs[ind2]
      section.imgs[ind2] = tmp
    } else {
      
      state.sections.map((section, i) => {
        if (section.id === action.section.id) {
          let ind1 = findImgIndex(section, state.dragTo)
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
    state.dragTo = action.imgToDropOn
    return state
  },
  [DELETE_SECTION]: (state, action) => {
    var ind = findSectionIndex(state, action.section)
    state.sections.splice(ind, 1)
    return state
  },
  [HIGH_LIGHTED]: (state, action) => {

    let isThere = false
    state.highLighted.map((d) => {
      if (d.id === action.img.id)
        isThere = true
    })

    if (isThere === false)
      state.highLighted.push(action.img.id)
    console.log(state.highLighted)
    
    return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  "blobs": {},
  "sections": [newSection("Section Name", [])],
  "imgQueue": newSection("ImgQueue", []),
  "dragTo": "",
  "highLighted": [],
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
