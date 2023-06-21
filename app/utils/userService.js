import axios from "axios"
const URL_API = process.env.NEXT_PUBLIC_API_URL + 'users'

export const getUsers = async () => {
    try {
        const response = await axios.get(URL_API);
        const data = response.data;
        if (response.status === 200) {
            return data;
        }
    } catch (error) {
        return { status: false, error: error }
    }
}

export const getUserById = async (id) => {
    try {
        const response = await axios.get(URL_API + '/' + id);
        const data = response.data;
        if (response.status === 200) {
            return data;
        }
    } catch (error) {
        return { status: false, error: error }
    }
}

export const editUserByID = async (id, data) => {
    try {
        const response = await axios.put(URL_API + '/' + id, data);
        const dataResponse = response.data;
        if (response.status === 200) {
            return dataResponse;
        }
    } catch (error) {
        return { status: false, error: error }
    }
}

export const userDelete = async (id) => {
    try {
        const response = await axios.delete(URL_API + '/' + id);
        const data = response.data;
        console.log(data)
        if (response.status === 200) {
            return data;
        }
    } catch (error) {
        return { status: false, error: error }
    }
}

export const addUser = async (data) => {
    try {
        const response = await axios.post(URL_API, data);
        const responsedata = response.data;
        if (responsedata.status === 200) {
            return responsedata;
        }
    } catch (error) {
        return { status: false, error: error }
    }
}