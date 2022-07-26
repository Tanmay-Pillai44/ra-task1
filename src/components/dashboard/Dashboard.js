import { Table, Space, Button, Typography, Tooltip, notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { deleteEmployee, getEmployees } from '../redux/dataSlice';
import { logout, reset } from '../redux/authSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

const { Title } = Typography;


const Dashboard = () => {

    const dispatch = useDispatch();

    const { employees, isError, isLoading } = useSelector((state) => state.data)

    const { user } = useSelector((state) => state.auth)

    const navigate = useNavigate();

    const columns = [
        {
            title: 'Name',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            render: (text, record) => (
            <Tooltip title="Show Details" color="#b37feb">
                <Link to= {`/employee-details/${record._id}`} style={{textDecoration: "none", color:"#722ed1"}}>{text}</Link>
            </Tooltip>
            ),
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: '1',
            width: 110
        },
        {
            title: 'Date Of Joining',
            dataIndex: 'date_of_joining',
            key: '2',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: '3',
            width: 300
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: '4',
        },
        {
            title: 'Date Of Birth',
            dataIndex: 'date_of_birth',
            key: '5',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: '6',
        },
        {
            title: 'Hobbies',
            dataIndex: 'hobbies',
            key: '7',
            width: 200,
            render: (text) => <>{text.map((item, index) => <span key={index}>{item}, </span>)}</>
        },
        {
            title: 'Actions',
            key: 'actions',
            fixed: 'right',
            width: 100,
            render: (employee) => (
                <Space size="middle">
                    <Button type='primary' onClick={() =>handleEditEmployee(employee)} style={{borderRadius: "4px"}} >Edit</Button>
                    <Button type='danger' onClick={() => handleDeleteEmployee(employee)} style={{borderRadius: "4px"}} >Delete</Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        console.log("I rendered")
        if(isError) {
            console.log('Error occured on dashboard')
        }

        if(!user) {
            navigate('/login')
        }

        dispatch(getEmployees())

    }, [user, navigate, isError, dispatch])

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        notification.info({
            message: "You have been logged out !",
            duration: "3"
        })
        navigate('/login')
    }

    const handleAddEmployee = () => {
        navigate("/employee-form")
    }

    const handleDeleteEmployee = (employee) => {
        dispatch(deleteEmployee(employee))
        notification.warn({
            message: "Record has been deleted !",
            duration: "3"
        })
    }

    const handleEditEmployee = (employee) => {
        navigate(`/employee-form/${employee._id}`)
    }

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{width: "90%", margin: "40px auto 10px", display: "flex", justifyContent: "space-between"}}>
                <Title style={{color: "#b37feb", textShadow: "3px 4px 8px rgba(81,67,21,0.6)", fontWeight: "700"}}>My Dashboard</Title>
                <Title style={{margin: "0px"}}>
                    <span style={{color: "#333", textStroke: "1px #282828", textShadow: "0px 4px 6px #282828", fontWeight: "700"}}>Welcome </span>
                    <span style={{color: "white", textStroke: "1px #F8F8F8", textShadow: "0px 2px 4px #531dab", fontWeight: "700"}}>{user?.username} !</span>
                </Title>
                <div>
                    <Button size='large' style={{backgroundColor: "#f5f5f5", margin: "10px", borderRadius: "5px"}} onClick={handleAddEmployee} >
                        <PlusOutlined />
                        Add Employee
                    </Button>
                    <Button danger size='large' onClick={handleLogout} style={{borderRadius: "5px"}}>Log out</Button>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={employees}
                rowKey= {(record) => record._id}
                pagination={false}
                scroll={{
                    x: 'max-content',
                    y: 450
                }}
                style={{
                    width: "90%",
                    margin: "20px auto"
                }}
            />
        </div>
    )
}
export default Dashboard;


