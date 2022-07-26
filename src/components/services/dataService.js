import axios from 'axios';

const API_URL = 'http://localhost:8000/api/employees/';

const addEmployee = async (employeeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, employeeData, config)
    return response.data
}

const getEmployees = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    return response.data
}

const deleteEmployee = async (employeeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + employeeData._id, config)
    return response.data
}

const updateEmployee = async (employeeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + employeeData._id, employeeData, config)
    return response.data
}



const dataService = {
    addEmployee,
    getEmployees,
    deleteEmployee,
    updateEmployee
}

export default dataService;