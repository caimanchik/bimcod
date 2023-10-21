export const BACKEND_HOST = 'http://127.0.0.1:8000/api/v1'

export function getRequest(url, serializer) {
    return fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
        .then(r => r.json())
        .then(r => new Promise(resolve => setTimeout(() => resolve(r), 1000)))
        .then(serializer)
}