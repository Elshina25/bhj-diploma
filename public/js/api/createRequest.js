/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = options => {
    const { url, method, data, callback} = options;
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    xhr.responseType = 'json';

    if (method !== 'GET') {
        for (let item in data) {
            formData.append(item, data[item]);
        }
    } else {
        for (let item in data) {
           const urlString = url + '?' + item  + '&' + data[item];
        }
    }

    xhr.addEventListener('load', () => {
            const response = xhr.response;
            callback(null, response);
    })

    try {
        xhr.open(method, url);
        if (method !== 'GET') {
            xhr.send(formData)
        } else {
            xhr.send();
        }
    }
    catch (e) {
        callback(e);
    }   
}






