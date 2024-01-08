import { jwtDecode } from "jwt-decode";
export const dateFormat = (date) => {
    var d = new Date(date);
    var dformat = [(d.getMonth() + 1), d.getDate(), d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes()].join(':');
    console.log(dformat);
    return dformat;
}


export const getCurrentUser = () =>{
    const token = localStorage.getItem('token');
    if(!token) return false;
    const decoded = jwtDecode(token);
    return decoded;

}