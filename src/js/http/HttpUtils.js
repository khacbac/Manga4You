
function HttpGetController(url) {
    return fetch(url);
}

function timeout() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("time out");
        }, 5000);
    })
}

function requestGet(url) {
    return Promise.race([HttpGetController(url), timeout()]);
}

export {
    requestGet
}