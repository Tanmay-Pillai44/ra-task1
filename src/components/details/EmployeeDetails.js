import { useParams, useNavigate } from "react-router-dom";
import { Typography, Avatar, Button } from "antd";
import { UserOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";

const { Title } = Typography;

const cardStyle = {
    width: "70%",
    margin: "50px auto",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
    borderRadius: "30px",
    padding: "40px 0px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FF9A8B",
    backgroundImage: "linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)",
}

const EmployeeDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { employees, isLoading } = useSelector((state) => state.data)

    const employee = employees.find((employee) => employee._id === id)

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div style={{display: "flex", justifyContent: "space-evenly", flexDirection: "column"}}>
            <Title style={{textAlign: "center", margin: "40px auto 0px", fontWeight: "700", textStroke: "1px #F8F8F8", textShadow: "0px 2px 4px #cf1322", color: "whitesmoke"}}>Employee Details</Title>
            <div style={cardStyle}>
                <div>
                    <Avatar size={250} icon={<UserOutlined />} />
                </div>
                <div>
                    <Title level={2} style={{margin: "15px auto 0px", color: "whitesmoke"}}>Name: {employee.name}</Title>
                    <div style={{display: "flex"}}>
                        <Title level={3} style={{margin: "15px 15px 0px 0px", color: "whitesmoke"}}>Designation: {employee.designation}</Title>
                        <Title level={3} style={{margin: "15px", marginBottom: "0px", color: "whitesmoke"}}>Gender: {employee.gender}</Title>
                    </div>
                    <Title level={4} style={{margin: "15px auto", color: "whitesmoke"}}>Date of Birth: {employee.date_of_birth}</Title>
                    <Title level={4} style={{margin: "15px auto", color: "whitesmoke"}}>Date of Joining: {employee.date_of_joining}</Title>
                    <Title level={4} style={{margin: "15px auto", color: "whitesmoke"}}>Address: {employee.address}</Title>
                    <Title level={4} style={{margin: "15px auto", color: "whitesmoke"}}>City: {employee.city}</Title>
                    <Title level={4} style={{margin: "15px auto", color: "whitesmoke"}}>Hobbies: {employee.hobbies}</Title>
                </div>
            </div>
            <Button danger size="large" style={{width: "150px", margin: "10px auto", borderRadius: "5px"}} onClick={() => navigate("/dashboard")}>
                <LeftCircleOutlined /> Go Back
            </Button>
        </div>
    )
}
export default EmployeeDetails;

