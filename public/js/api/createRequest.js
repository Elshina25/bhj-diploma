/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = options => {
    const { url, method, data, callback } = options;
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

     if (method !== 'GET') {
        const formData = new FormData();
      
        // Object.keys(options.data).forEach(el => {
        //     formData.append(el, options.data[el]);
        //     return formData;
        // })
        for (let item in data) {
            formData.append(item, data[item]);
        }

        try {
            xhr.open(method, url);
            xhr.send(formData);
        }
        catch (e) {
            callback(e);
        }
    } else {
        for (let item in data) {
            return url + '?' + item  + '&' + data[item];
        }
        try {
            xhr.open(method, url);
            xhr.send();
        }
        catch (e) {
            callback(e);
        }
    }
}






