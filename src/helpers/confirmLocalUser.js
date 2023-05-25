import {api} from "./api";
import User from "../models/User";
export async function fetchLocalUser(){
    try {
        const requestBody = JSON.stringify({ token: localStorage.getItem("token") });
        const response = await api.post(`/users/localUser`, requestBody);

        const user = new User(response.data);
        await localStorage.setItem('loggedInUser', user.id);
    } catch (error) {
        console.log("You are not logged in!")
        await localStorage.removeItem('token');
        await localStorage.removeItem('loggedInUser');
    }
}