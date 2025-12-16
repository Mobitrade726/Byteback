export const BASE_URL = 'https://api.mobitrade.in/';


export const API_BASE_URL = BASE_URL + 'api';

export const ERROR_MESSAGE = 'We are facing some techical issue. Team is looking into it.'

export const dropDownArrFromObj = (ob) => {
    let newArr = [];
    let objKey = Object.keys(ob);
    objKey.map(item => {
        let obj = {
          id: item,
          title: ob[item]
        }
        newArr.push(obj)
    });
    return newArr;
}
