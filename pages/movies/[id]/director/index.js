import React from "react";
import axios from "axios";
import { Layout, Typography, Card, Descriptions, Button } from 'antd';
import { ArrowLeftOutlined, UserOutlined, IdcardOutlined, BookOutlined } from '@ant-design/icons';
import Link from "next/link";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const DirectorDetails = ({ director }) => {
  return (
    <Layout className="min-h-screen">
      <Content className="p-8">
        <div className="container mx-auto max-w-3xl">
          <Link href={`/movies`}>
            <Button 
              icon={<ArrowLeftOutlined />} 
              className="mb-4"
              size="large"
            >
              Back to Movies
            </Button>
          </Link>

          <Card>
            <Title level={2} className="flex items-center gap-2 mb-6">
              <UserOutlined />
              Director Details
            </Title>

            <Descriptions 
              bordered 
              column={1}
              labelStyle={{ fontWeight: 'bold' }}
            >
              <Descriptions.Item 
                label={<span><IdcardOutlined className="mr-2" />ID</span>}
              >
                {director.id}
              </Descriptions.Item>

              <Descriptions.Item 
                label={<span><UserOutlined className="mr-2" />Name</span>}
              >
                {director.name}
              </Descriptions.Item>

              <Descriptions.Item 
                label={<span><BookOutlined className="mr-2" />Biography</span>}
              >
                <Paragraph>{director.biography}</Paragraph>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default DirectorDetails;

// Keep the existing getServerSideProps
export async function getServerSideProps(context) {
  const id = context.query.id;
  const response = await axios.get(
    `http://localhost:3000/api/directors/${id}`
  );
  return {
    props: {
      director: response.data
    },
  };
}