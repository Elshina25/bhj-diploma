/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = options => {
    const { url, method, data, callback } = options;
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    try {
        xhr.open(method, url);
        if (method !== 'GET') {
            const formData = new FormData();
          
            // Object.keys(options.data).forEach(el => {
            //     formData.append(el, options.data[el]);
            //     return formData;
            // })
            for (let item in data) {
                formData.append(item, data[item]);
            }
            xhr.send(formData);
        } else {
            for (let item in data) {
                return url + '?' + item  + '&' + data[item];
            }
            xhr.send();
            
        }
    }
    catch (e) {
        callback(e);
    }
}









