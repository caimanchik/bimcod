import del from "del"

export const reset = async (cb) => {
    await del(app.path.clean)
    cb()
}