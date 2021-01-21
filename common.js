export var response = (res, code, data) => {
    return res.status(code).send(data)
}