import { Card, Avatar, Typography, Button, Modal, Form, Input } from "antd";
import { MdDelete, MdEdit } from "react-icons/md";
import { useState } from "react";

const { Title, Text, Link } = Typography;

function UserProfile({ user, onDelete, onEdit }) {
  const avatarUrl = `https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    form.setFieldsValue(user)
    setIsModalOpen(true);
  };

  const Onhandle = () => {
    form
      .validateFields()
      .then((values) => {
        onEdit(user.id, values)
        setIsModalOpen(false)
      });
  };

  return (
    <>
      <Card
        hoverable
        style={{ width: 350, margin: "20px auto", borderRadius: "12px" }}
        cover={<Avatar src={avatarUrl} size={200} style={{ margin: "10px auto" }} />}
        actions={[
          <Button
            type="default"
            shape="circle"
            icon={<MdEdit size={20} />}
            onClick={showModal}
          />,
          <Button
            danger
            type="primary"
            shape="circle"
            icon={<MdDelete size={20} />}
            onClick={() => onDelete(user.id)}
          />,
        ]}
      >
        <Title level={4}>{user.name}</Title>
        <Text type="secondary">@{user.username}</Text>
        <br /><br />
        <Text><strong>Email:</strong> {user.email}</Text><br />
        <Text><strong>Phone:</strong> {user.phone}</Text><br />
        <Text>
          <strong>Website:</strong>{" "}
          <Link href={`https://${user.website}`} target="_blank">
            {user.website}
          </Link>
        </Text>
        <br />
        <Text>
          <strong>Address:</strong><br />
          {user.address.street}, {user.address.city}
        </Text>
        <br />
        <Text><strong>Company:</strong> {user.company.name}</Text>
      </Card>

      {/* Edit Modal */}
      <Modal
        title="Edit User"
        open={isModalOpen}
        onOk={Onhandle}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="website" label="Website">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UserProfile;
