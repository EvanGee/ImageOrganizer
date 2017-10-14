import uuid from "uuid"

export const newImg = () => ({
    src: "",
    id: uuid.v4(),
    classes: ["imgs"],
    uploadNum: -1,
    uploadName: "",
    type: "img",
    isEmpty : false
})

export const newSection = (name = "New Section", imgs) => ({
    type: "section",
    name,
    id: uuid.v4(),
    imgs: [...imgs],
    
})
