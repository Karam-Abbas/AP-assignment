import React from "react";
import axios from "axios";
import Link from "next/link";
import { Layout, Typography, Card, Rate, Descriptions, Tag, Button } from 'antd';
import { ArrowLeftOutlined, UserOutlined, CalendarOutlined, TagOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const MovieDetails = ({ movie }) => {
  return (
    <Layout className="min-h-screen">
      <Content className="p-8">
        <div className="container mx-auto max-w-4xl">
          <Link href="/movies">
            <Button 
              icon={<ArrowLeftOutlined />} 
              className="mb-4"
              size="large"
            >
              Back to Movies
            </Button>
          </Link>

          <Card
            cover={
              movie.posterUrl && (
                <img
                  alt={movie.title}
                  src={movie.posterUrl}
                  className="h-96 object-cover object-center"
                />
              )
            }
          >
            <Title level={2}>{movie.title}</Title>

            <Descriptions column={1} className="mb-4">
              <Descriptions.Item label={<div className="flex flex-row gap-2 items-center justify-center"><UserOutlined /> Director</div>}>
                <Link href={`${movie.id}/director`}>
                  <Tag color="blue" className="cursor-pointer">
                    View Director Details
                  </Tag>
                </Link>
              </Descriptions.Item>

              <Descriptions.Item label={<div className="flex flex-row gap-2 items-center justify-center"><CalendarOutlined /> Release Year</div>}>
                {movie.releaseYear}
              </Descriptions.Item>

              <Descriptions.Item label={<div className="flex flex-row gap-2 items-center justify-center"><TagOutlined /> Genre</div>}>
                <Tag color="green">{movie.genreId}</Tag>
              </Descriptions.Item>

              <Descriptions.Item label="Rating">
                <Rate 
                  disabled 
                  defaultValue={movie.rating / 2} 
                  allowHalf 
                />
                <span className="ml-2">({movie.rating}/10)</span>
              </Descriptions.Item>
            </Descriptions>

            <Card title="Description" className="mt-4">
              <Paragraph>{movie.description}</Paragraph>
            </Card>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default MovieDetails;

export async function getStaticProps(context) {
  const id = context.params.id;
  const movie = await axios.get(`http://localhost:3000/api/movies/${id}`);
  return {
    props: { movie: movie.data },
  };
}

export const getStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          id: "1",
        },
      },
      {
        params: {
          id: "2",
        },
      },
    ],
    fallback: "blocking", 
  };
};
