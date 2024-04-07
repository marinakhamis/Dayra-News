import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

import dayjs from 'dayjs';
import { DislikeOutlined, FacebookFilled, ImportOutlined, LikeOutlined, MailOutlined, TwitterOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Image, Avatar } from 'antd';
import TextArea from 'antd/es/input/TextArea';
//style
import "./_index.scss"
const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // Get item from state (Because I pass the item object as required in the task )
    const location = useLocation();
    const { item } = location.state

    // Comments 
    const [comments, setComments] = useState([]);

    // Form 
    const [form] = Form.useForm();

    // Handle Submit 
    const handleSubmit = (values) => {
        const { name, email, message } = values;
        const commentId = uuidv4(); // Generate a unique identifier for the comment
        const commentDate = new Date(); // Get the current date and time
        // Update the comments in local storage
        const storedComments = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
        const updatedComments = [...storedComments, { id: commentId, name, email, message, date: commentDate }];
        localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));

        // Update the state
        setComments(updatedComments);

        // Reset the form
        form.resetFields();
    };

    useEffect(() => {
        // Retrieve comments from local storage when the component mounts
        const storedComments = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
        setComments(storedComments);
    }, [id]);

    return (
        <div className='ctr my-5'>
            {/* Start Heading  */}
            <h1 className='h1 fw-bolder'> {item?.title} </h1>
            {item?.author && <p className='my-5 text__muted'>
                By <span className='text__primary'> {item?.author} </span>
                Published on {dayjs(`${item?.publishedAt}`).format("MMMM DD,YYYY")}
            </p>}
            {/* End Heading  */}

            <hr />
            {/* Start Content */}
            <div className="details-ctr mt-5 p-0">
                <div className="d-flex flex-row flex-md-nowrap flex-wrap gap-5 overflow-x-hidden">

                    {/* Contact info  */}
                    <div className="col-md-2 col-12 border__muted d-flex flex-column p-0" style={{ height: "fit-content" }}>
                        <div className="br__bottom fw-bolder text-center h1 p-5">
                            23
                            <br />
                            shares
                        </div>
                        <div className="text__muted br__bottom py-2 px-3">
                            <MailOutlined /> Email
                        </div>
                        <div className="text__muted br__bottom py-2 px-3">
                            <FacebookFilled /> Facebook
                        </div>
                        <div className="text__muted br__bottom py-2 px-3">
                            <TwitterOutlined /> Twitter
                        </div>
                        <div className="text__muted py-2 px-3">
                            <ImportOutlined /> More
                        </div>
                    </div>
                    {/* Contact info  */}

                    <div className="col-md-10 col-12 d-flex flex-column gap-5">
                        {item?.urlToImage &&
                            <div className='details-img'>
                                <Image width="100%" height="100%" alt={item?.title} src={item?.urlToImage} />
                            </div>
                        }
                        <p className='m-0'>  {item?.description ?? item?.title}</p>
                        <div className='d-flex flex-row flex-wrap gap-3'>
                            <Button type="primary" style={{ backgroundColor: "#1ca257" }} icon={<LikeOutlined />}>
                                I found this helpful
                            </Button>
                            <Button type="primary" style={{ backgroundColor: "#eaeae9", color: "gray" }} icon={<DislikeOutlined />}>
                                I did not found this helpful
                            </Button>
                        </div>

                        {/* Start Comments Display  */}
                        <div>
                            <p className='fs-20'> Comments </p>
                            {comments?.length > 0 ?
                                <div className='d-flex flex-column gap-3'>
                                    {comments?.map((item) => (
                                        <div key={item?.id} className='border__muted p-5'>
                                            <div>
                                                <Avatar
                                                    size="large"
                                                    icon={<UserOutlined />}
                                                />
                                                <span className='text-body px-2 fw-bold'>   {item?.name} </span>
                                                <span className='text__muted px-2 '>   {dayjs(item?.date).format("MMMM DD, YYYY")} </span>
                                            </div>

                                            <p className='px-5 mx-5'> {item?.message}</p>
                                        </div>
                                    ))}
                                </div>
                                :
                                <Alert
                                    style={{ width: "fit-content" }}
                                    message="There are no comments yet, Start the Conversation !"
                                    type="warning" />
                            }
                        </div>
                        {/* End  Comments Display  */}

                        {/* Start Form  */}
                        <Form
                            onFinish={handleSubmit}
                            form={form}
                            className='col-md-10 col-12'
                            initialValues={{
                                name: null,
                                email: null,
                                message: null
                            }}
                        >
                            <p className='fs-20'> Join the conversation!</p>
                            <Form.Item
                                className='col-md-5 col-12'
                                name="name"
                                rules={[{
                                    required: true,
                                    message: "Required!",
                                },
                                {
                                    max: 255,
                                    message: "MaxLength is 255 characters ",
                                },
                                ]}
                            >
                                <Input className="py-3" placeholder="Name" />
                            </Form.Item>
                            <Form.Item
                                className='col-md-5 col-12'
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Required!",
                                    },
                                    {
                                        type: "email",
                                        message: "Please entera valid Email!",
                                    },
                                ]}
                            >
                                <Input className="py-3 d-inline" placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="message"
                                rules={[
                                    {
                                        required: true,
                                        message: "Required!",
                                    },
                                    {
                                        max: 4000,
                                        message: "MaxLength is 4000 characters",
                                    },
                                ]}
                            >
                                <TextArea className="py-3" rows={6} placeholder="Message" />
                            </Form.Item>

                            <Form.Item>
                                <Button type='primary' htmlType="submit">Send </Button>
                            </Form.Item>
                        </Form>
                        {/* End  Form  */}

                    </div>

                </div>
            </div>
            {/* End Content */}


        </div>
    );
};


export default Details;