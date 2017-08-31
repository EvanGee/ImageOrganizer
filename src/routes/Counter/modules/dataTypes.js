import uuid from "uuid"

export const newImg = () => ({
    src: "",
    id: uuid.v4(),
    classes: []
})

export const newSection = (name = "New Section", imgs) => ({
    name,
    id: uuid.v4(),
    imgs: [...imgs]
})
