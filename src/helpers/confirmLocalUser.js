import {api} from "./api";
import User from "../models/User";
export async function fetchLocalUser(){
    try {
        const requestBody = JSON.stringify({ token: localStorage.getItem("token") });
        const response = await api.post(`/users/localUser`, requestBody);

        const user = new User(response.data);
        console.log("Confirm local user:",user);
        await localStorage.setItem('loggedInUser', user.id);
    } catch (error) {
        alert("You are not logged in!")
        await localStorage.removeItem('token');
        await localStorage.removeItem('loggedInUser');
    }
}