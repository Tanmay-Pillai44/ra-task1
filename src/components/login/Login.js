import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/userSlice';
import { useEffect } from 'react';


const { Title } = Typography;


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user.user)

    useEffect(() => {
        if(user) {
            navigate("/dashboard")
        }
    }, [navigate, user])

    const onFinish = (values) => {
        dispatch(login({...values, loggedIn: true}))
        notification.success({
            message: "You have been logged in !",
            duration: "3"
        })
        console.log('Received values of form: ', values);
    };

    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: '80vh'}}>
            <Title style={{color: "#13c2c2", textAlign: "center", margin: "40px auto 0px"}}>Welcome Please Login to Proceed !</Title>
            <div style={{margin: " 0px auto 20px"}}>
                <img src="https://c.tenor.com/AvHPuvcRU4wAAAAi/cute-penguin.gif" alt="" height="200" width="200" />
            </div>
            <div style={{backgroundColor: "#e6f7ff", padding: "40px 0px", width:"40%", margin: "auto", borderRadius:"20px", boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"}}>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    wrapperCol={{
                        span: 8,
                    }}
                >
                    <Form.Item
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                        ]}
                        wrapperCol={{
                            offset: 6,
                            span: 12,
                        }}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                        ]}
                        wrapperCol={{
                            offset: 6,
                            span: 12,
                        }}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 6,
                            span: 12,
                        }}
                    >
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Link className="login-form-forgot" to="">Forgot password</Link>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 6,
                            span: 12,
                        }}
                    >
                        <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;