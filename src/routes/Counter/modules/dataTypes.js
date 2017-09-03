import uuid from "uuid"

export const newImg = () => ({
    src: "",
    id: uuid.v4(),
    classes: ["imgs"],
    uploadNum: -1
})

export const newSection = (name = "New Section", imgs) => ({
    name,
    id: uuid.v4(),
    imgs: [...imgs],
    
})
