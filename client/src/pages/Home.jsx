import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  Form,
  Input,
  Radio,
  Switch,
  Slider,
  Select,
  message,
} from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Home = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleSubmit = (values) => {
    setLoading(true);
    axios
      .post(`http://localhost:5000/users`, values)
      .then((res) => {
        setLoading(false);
        message.success("User Added Successfully!");
        // history.push("/list");
      })
      .catch((error) => {
        setLoading(false);
        message.error(error);
      });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Book Shop</h1>
      <Form {...layout} onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input a book title",
            },
          ]}
        >
          <Input placeholder="Please input a book title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input a description",
              // type: "email",
            },
          ]}
        >
          <Input placeholder="Please input a description" />
        </Form.Item>
        <Form.Item
          name="genres"
          label="Genres"
          rules={[
            {
              required: true,
              message: "Please select your genre",
              type: "array",
            },
          ]}
        >
          <Select mode="multiple" placeholder="Please select you genre">
            <Select.Option value="Horror">Horror</Select.Option>
            <Select.Option value="Romance">Romance</Select.Option>
            <Select.Option value="Fiction">Fiction</Select.Option>
            <Select.Option value="NonFiction">NonFiction</Select.Option>
            <Select.Option value="Religion">Religion</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="review" label="Review">
          <Slider />
        </Form.Item>
        <Form.Item
          name="notificaiton"
          label="Notificaiton"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <div style={{ textAlign: "right" }}>
          <Button type="primary" loading={loading} htmlType="submit">
            Save
          </Button>{" "}
          <Button type="danger" htmlType="button" onClick={handleCancel}>
            Back
          </Button>
        </div>
      </Form>
      {/* </Modal> */}
    </div>
  );
};

export default Home;
