import { Form, Input, DatePicker, Select, Radio, Checkbox, Row, Col, Typography, Button, notification } from "antd";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addEmployee, updateEmployee } from "../redux/dataSlice";
import moment from 'moment';

const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select date!',
        },
    ],
};

const { Option } = Select;
const { Title } = Typography;

const EmployeeForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();

    const { employees } = useSelector((state) => state.data)


    const [ form ] = Form.useForm();

    const [btnText, setBtnText] = useState('Submit');

    const dateFormat = 'DD-MM-YYYY';

    const initialValues = {
        name: "",
        designation: "",
        date_of_joining: "",
        address: "",
        city: "",
        date_of_birth: "",
        gender: "",
        hobbies: [],
    }

    useEffect(() => {
        if(id === undefined) {
            form.setFieldsValue({
                name: "",
                designation: "",
                date_of_joining: "",
                address: "",
                city: "",
                date_of_birth: "",
                gender: "",
                hobbies: [],
            })
        } else {

            const employee = employees.find((emp) => emp._id === id)

            setBtnText("Update")
            form.setFieldsValue({
                name: employee.name,
                designation: employee.designation,
                date_of_joining: moment(employee.date_of_joining, dateFormat),
                address: employee.address,
                city: employee.city,
                date_of_birth: moment(employee.date_of_birth, dateFormat),
                gender: employee.gender,
                hobbies: employee.hobbies,
            })
        }
    }, [employees, id, form])

    const onFinish = (fieldsValue) => {
        if(id === undefined) {
            let newDetails = {
                ...fieldsValue,
                'date_of_joining': fieldsValue['date_of_joining'].format(dateFormat),
                'date_of_birth': fieldsValue['date_of_birth'].format(dateFormat),
                // 'hobbies': fieldsValue['hobbies'].join(', '),
            };
            dispatch(addEmployee(newDetails))
            notification.success({
                message: "Successfully added the record !",
                duration: "3"
            })
        } else {

            // const employee = employees.find((emp) => emp._id === id)

            const details = {
                ...fieldsValue,
                'date_of_joining': fieldsValue['date_of_joining'].format(dateFormat),
                'date_of_birth': fieldsValue['date_of_birth'].format(dateFormat),
                // 'hobbies': typeof fieldsValue['hobbies'] === "string" ? fieldsValue['hobbies'] : fieldsValue['hobbies'].join(', '),
                '_id': id
            }
            dispatch(updateEmployee(details))
            notification.success({
                message: "Successfully updated the record !",
                duration: "3"
            })
        }
        navigate("/dashboard")
    }

    const handleCancel = () => {
        navigate("/dashboard")
    }

    return (
        <>
            <Title style={{textAlign: "center", color:"#d46b08", paddingTop: "20px", textShadow: "3px 4px 8px rgba(81,67,21,0.6)", fontWeight: "700"}}>Employee Form</Title>
            <Form
                form={form}
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 12 }}
                layout="horizontal"
                onFinish={onFinish}
                initialValues={initialValues}
                style={{margin: "10px auto", backgroundColor: "#fff7e6", padding: '40px 20px 10px', width: "50%", borderRadius: "10px"}}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Designation"
                    name="designation"
                    rules={[{ required: true, message: 'Please input your designation!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="date_of_joining" label="Date Of Joining" {...config}>
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Address"
                    rules={[{ required: true, message: 'Please input address' }]}
                >
                    <Input.TextArea showCount maxLength={100} />
                </Form.Item>

                <Form.Item
                    name="city"
                    label="City"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Select placeholder="Select a city">
                        <Option value="Mumbai">Mumbai</Option>
                        <Option value="Pune">Pune</Option>
                        <Option value="Delhi">Delhi</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="date_of_birth" label="Date Of Birth" {...config}>
                    <DatePicker />
                </Form.Item>

                <Form.Item name="gender" label="Gender" rules={[{required: true}]}>
                    <Radio.Group>
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                    <Radio value="Other">Other</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="hobbies" label="Hobbies" rules={[{required: true}]}>
                    <Checkbox.Group>
                        <Row>
                            <Col>
                                <Checkbox value="Travel" style={{ lineHeight: '32px' }}>Travel</Checkbox>
                            </Col>
                            <Col>
                                <Checkbox value="Trekking" style={{ lineHeight: '32px' }}>Trekking</Checkbox>
                            </Col>
                            <Col>
                                <Checkbox value="Chess" style={{ lineHeight: '32px' }}>Chess</Checkbox>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Checkbox value="Sports" style={{ lineHeight: '32px' }}>Sports</Checkbox>
                            </Col>
                            <Col>
                                <Checkbox value="Music" style={{ lineHeight: '32px' }}>Music</Checkbox>
                            </Col>
                            <Col>
                                <Checkbox value="Dance" style={{ lineHeight: '32px' }}>Dance</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 9 }}>
                    <Button type="primary" htmlType="submit"  size="large" style={{marginRight: "10px", borderRadius: "5px", backgroundColor: "#fa541c", border: "none"}}>{btnText}</Button>
                    <Button danger size="large" onClick={handleCancel} style={{borderRadius: "5px"}} >Cancel</Button>
                </Form.Item>

            </Form>
        </>
    )
}

export default EmployeeForm;