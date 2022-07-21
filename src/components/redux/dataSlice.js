import { createSlice } from "@reduxjs/toolkit";

const emp = [{
    name: 'John',
    designation: 'SDE',
    date_of_joining: '15-07-2022',
    address: `Iris Watson, P.O. Box 283 8562 Fusce Rd., Frederick Nebraska`,
    city: 'San Francisco',
    date_of_birth: '12-06-1996',
    gender: 'Male',
    hobbies: 'Travel, Art, Chess',
    id: '1',
    key: '1'
},
{
    name: 'Biden',
    designation: 'Consultant',
    date_of_joining: '11-06-2022',
    address: `Iris Watson, P.O. Box 283 8562 Fusce Rd., Frederick Nebraska`,
    city: 'San Francisco',
    date_of_birth: '04-04-1998',
    gender: 'Male',
    hobbies: 'Travel, Art, Chess, Trekking',
    id: '2',
    key: '2'
},
{
    name: 'Alice',
    designation: 'HR',
    date_of_joining: '18-10-2021',
    address: `Iris Watson, P.O. Box 283 8562 Fusce Rd., Frederick Nebraska`,
    city: 'San Francisco',
    date_of_birth: '09-03-1993',
    gender: 'Female',
    hobbies: 'Travel, Chess, Trekking',
    id: '3',
    key: '3'
}]

const initialState = {
    employees: emp,
    admins: [],
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        addEmployee: (state, action) => {
            state.employees.push(action.payload)
        },
        updateEmployee: (state, action) => {
            const { name, designation, date_of_joining, address, city, date_of_birth, gender, hobbies, id, key } = action.payload;
            const existingEmployee = state.employees.find((employee) => employee.id === id)
            if(existingEmployee) {
                existingEmployee.name = name;
                existingEmployee.designation = designation;
                existingEmployee.date_of_joining = date_of_joining;
                existingEmployee.address = address;
                existingEmployee.city =city;
                existingEmployee.date_of_birth = date_of_birth;
                existingEmployee.gender = gender;
                existingEmployee.hobbies = hobbies;
                existingEmployee.key = key;
            }
        },
        deleteEmployee: (state, action) => {
            const { id } = action.payload;
            return {...state, employees: state.employees.filter((employee) => employee.id !== id)};
        }
    }
})

export const { addEmployee, updateEmployee, deleteEmployee } = dataSlice.actions;

export default dataSlice.reducer;