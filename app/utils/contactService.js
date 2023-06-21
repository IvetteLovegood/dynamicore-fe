import axios from "axios"
const URL_API = process.env.NEXT_PUBLIC_API_URL + 'contacts'

export const getContacts = async () => {
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

export const getContactsById = async (id) => {
    try {
        const response = await axios.get(URL_API+ '/' + id);
        const data = response.data;
        if (response.status === 200) {
            return data;
        }
    } catch (error) {
        return { status: false, error: error }
    }
}

export const editContactbyID = async (id, data) => {
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

export const contactDelete = async (id) => {
    try {
        const response = await axios.delete(URL_API + '/' + id);
        const data = response.data;
        if (response.status === 200) {
            return data;
        }
    } catch (error) {
        return { status: false, error: error }
    }
}

export const addContact = async (data) => {
    try {
        const response = await axios.post(URL_API, data);
        const dataResponse = response.data;
        if (response.status === 200) {
            return dataResponse;
        }
    } catch (error) {
        return { status: false, error: error }
    }
}