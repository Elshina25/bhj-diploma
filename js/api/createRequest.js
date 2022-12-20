/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const { url, method, data, callback } = options;
    const xhr = new XMLHttpRequest();
    if (method !== 'GET') {
        const formData = new FormData();
        try {
            xhr.open(method, url);
            xhr.responseType = 'json';
            xhr.send(formData);
        }
        catch (err) {
            callback(err);
        }
    } else {
        try {
            xhr.open(method, url);
            xhr.responseType = 'json';
            xhr.send(data);
        }
        catch (err) {
            callback(err);
        }
    }
}


