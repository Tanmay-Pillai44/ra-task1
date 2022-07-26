import { Button, Form, Input, Typography, notification } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup, reset } from '../redux/authSlice';
import { useEffect } from 'react';
import Spinner from '../spinner/Spinner';

const { Title } = Typography;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 16,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 16,
        },
        sm: {
            span: 14,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 14,
            offset: 0,
        },
        sm: {
            span: 8,
            offset: 6,
        },
    },
};

const Signup = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isError, isLoading, isSuccess } = useSelector((state) => state.auth)

    useEffect(() => {

        if(isError) {
            notification.success({
                message: "Failed to Register",
                duration: "3"
            })
        }

        if(isSuccess) {
            navigate('/login')
            notification.success({
                message: 'Successfully Registered, Please Login',
                duration: "3"
            })
        }
        dispatch(reset())

    }, [isError, isSuccess, navigate, dispatch])

    const onFinish = (values) => {

        const userData = {
            email: values.email,
            username: values.username,
            password: values.password
        }
        dispatch(signup(userData))
    };

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems:"center"}}>
            <Title style={{color: "#ff7875", textAlign: "center", margin: "40px auto 0px", textShadow: "3px 4px 8px rgba(81,67,21,0.6)", fontWeight: "700"}}>Welcome Please Register Yourself !</Title>
            <div style={{margin: "-40px auto 20px"}}>
                <img src="https://c.tenor.com/AvHPuvcRU4wAAAAi/cute-penguin.gif" alt="" height="200" width="200" />
            </div>
            <div style={{backgroundColor: "#fff1f0", padding: "40px 0px", width:"50%", margin: "auto", borderRadius:"20px", boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"}}>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" style={{marginBottom: "10px"}}>
                            Register
                        </Button> <br/>
                        Already Registered ? <Link to="/login">Click here to login</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Signup;