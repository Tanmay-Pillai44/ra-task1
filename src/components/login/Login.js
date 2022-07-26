import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../redux/authSlice';
import { useEffect } from 'react';
import Spinner from '../spinner/Spinner';


const { Title } = Typography;


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError, isLoading, isSuccess } = useSelector((state) => state.auth)


    useEffect(() => {
        if(isError) {
            notification.error({
                message: "Wrong Credentials",
                duration: "3"
            })
        }
        if(isSuccess) {
            navigate('/dashboard')
            notification.success({
                message: 'Successfully Logged In',
                duration: "3"
            })
        }
        dispatch(reset())

    }, [ isError, isSuccess, navigate, dispatch])

    const onFinish = (values) => {
        const userData = {
            username: values.username,
            password: values.password
        }
        dispatch(login(userData))
    };

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center"}}>
            <Title style={{color: "#13c2c2", textAlign: "center", margin: "40px auto 0px", textShadow: "3px 4px 8px rgba(81,67,21,0.6)", fontWeight: "700"}}>Welcome Back ! Please Login to Proceed !</Title>
            <div style={{margin: "30px auto"}}>
                <img src="https://c.tenor.com/tM6pDOQYblQAAAAC/welcome-back-awesome.gif" alt="" height="200" width="400" />
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
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{marginBottom: "10px"}}>Log in</Button> <br/>
                        Or <Link to="/signup">Register Now !</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;