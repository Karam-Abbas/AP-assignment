import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { Layout, Typography, Card, Row, Col, Spin, Alert, Rate, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const GenreDetailsPage = () => {
  const router = useRouter();
  const value = router.query.id;
  const { data, error, isLoading } = useSWR(`/api/movies`, (url) => fetch(url).then(res => res.json()));

  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed to load movies"
        type="error"
        showIcon
        className="m-4"
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" tip="Loading movies..." />
      </div>
    );
  }

  const movies = data.filter((movie) => movie.genreId === value);

  return (
    <Layout className="min-h-screen">
      <Content className="p-8">
        <div className="container mx-auto">
          <div className="mb-8">
            <Link href="/genres">
              <Button icon={<ArrowLeftOutlined />} size="large">
                Back to Genres
              </Button>
            </Link>
          </div>

          <Title level={1} className="text-center mb-8">
            Genre: {value}
          </Title>

          <Row gutter={[24, 24]}>
            {movies.map((movie, index) => (
              <Col xs={24} sm={12} lg={8} key={movie.id || index}>
                <Link href={`/movies/${movie.id}`}>
                  <Card 
                    hoverable
                    className="h-full"
                    cover={
                      movie.posterUrl && (
                        <img
                          alt={movie.title}
                          src={movie.posterUrl}
                          className="h-64 object-cover"
                        />
                      )
                    }
                  >
                    <Card.Meta
                      title={movie.title}
                      description={
                        <>
                          {movie.description && (
                            <Paragraph ellipsis={{ rows: 2 }} className="text-gray-600">
                              {movie.description}
                            </Paragraph>
                          )}
                          <div className="flex justify-between items-center mt-4">
                            {movie.releaseYear && (
                              <span className="text-gray-500">
                                Released: {movie.releaseYear}
                              </span>
                            )}
                            {movie.rating && (
                              <Rate 
                                disabled 
                                defaultValue={movie.rating / 2} 
                                allowHalf 
                                className="text-sm"
                              />
                            )}
                          </div>
                        </>
                      }
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

export default GenreDetailsPage;