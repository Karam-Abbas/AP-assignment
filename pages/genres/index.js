import axios from "axios";
import React from "react";
import Link from "next/link";
import { Layout, Typography, Card, Row, Col } from 'antd';
import { TagOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;

const GenresPage = ({ genres }) => {
  return (
    <Layout className="min-h-screen">
      <Content className="p-8">
        <div className="container mx-auto">
          <Title level={1} className="text-center mb-8">
            <TagOutlined className="mr-2" />
            Browse by Genre
          </Title>

          <Row gutter={[24, 24]} justify="center">
            {genres.map((genre) => (
              <Col xs={24} sm={12} md={8} lg={6} key={genre.id}>
                <Link href={`/genres/${genre.id}`}>
                  <Card 
                    hoverable
                    className="h-full"
                  >
                    <Card.Meta
                      title={genre.name}
                      description={`Genre ID: ${genre.id}`}
                    />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default GenresPage;

export async function getServerSideProps() {
  const genres = await axios.get("http://localhost:3000/api/genres");
  return {
    props: { genres: genres.data },
  };
}