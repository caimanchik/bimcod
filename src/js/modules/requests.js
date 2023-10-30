export const BACKEND_HOST = 'http://127.0.0.1:8000/api/v1'
// export const BACKEND_HOST = 'https://bimcod.pythonanywhere.com/api/v1'

export function getRequest(url, serializer) {
    return fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
        .then(r => r.json())
        .then(serializer)
}

export function postRequest(url, data) {
    return fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
}