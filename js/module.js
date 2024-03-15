function fetchAnyUrl(url) {
    return fetch(url).then(response => response.json())
}

async function postFormDataAsJson(formData, url) {
    const plainFormData = Object.fromEntries(formData.entries())
    const resp = await restPost(url, plainFormData)
}

async function restPost(url, object) {
    const objectAsJsonString = JSON.stringify(object)
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString
    }
    const response = await fetch(url, fetchOptions)
    return response
}

async function restDelete(url) {
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: ""
    }
    const response = await fetch(url, fetchOptions)
    return response
}

export { fetchAnyUrl, postFormDataAsJson, restPost, restDelete }