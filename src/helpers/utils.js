import config from './config';

/**
 * 
 * @param {String} path : api path
 * @param {String} payload : post data
 */
export async function postData(path, payload = null, method = 'POST') {
    try {
        let res = await fetch(`${config.apiPath}${path}`, {
            method: method,
            body: JSON.stringify(payload), 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        return res.json();
    } catch (err) {
        return;
    }
}

/**
 * 
 * @param {String} path : api path
 */
export async function getData(path) {
    try {
        let res = await fetch(`${config.apiPath}${path}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        return res.json();
    } catch (err) {
        return;
    }
}