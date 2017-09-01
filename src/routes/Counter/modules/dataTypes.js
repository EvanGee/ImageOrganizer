import uuid from "uuid"

export const newImg = () => ({
    src: "",
    blob: '',
    id: uuid.v4(),
    classes: ["imgs"]
})

export const newSection = (name = "New Section", imgs) => ({
    name,
    id: uuid.v4(),
    imgs: [...imgs]
})
