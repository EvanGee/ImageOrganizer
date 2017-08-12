import uuid from "uuid"

export const newImg = () => ({
    src: "",
    id: uuid.v4()
})

export const newSection = (name = "New Section", imgs) => ({
    name,
    imgs: [...imgs]
})
