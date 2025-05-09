import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Layout, Typography, Card, Select, Button, Rate, Row, Col } from 'antd';
import { FireOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Option } = Select;

const MoviesPage = ({ allMovies, genres }) => {
  const [movies, setMovies] = useState(allMovies);

  const handleGenreChange = (value) => {
    if (value !== 'All') {
      const genreId = genres.find((g) => g.name === value).id;
      const filteredMovies = allMovies.filter((movie) => movie.genreId === genreId);
      setMovies(filteredMovies);
    } else {
      setMovies(allMovies);
    }
  };

  return (
    <Layout className="min-h-screen">
      <Content className="p-8">
        <div className="container mx-auto">
          <Title level={1} className="text-center mb-8">
            All Movies
          </Title>

          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button 
                type="primary" 
                icon={<FireOutlined />}
                size="large"
              >
                Trendy Movies
              </Button>
            </Link>

            <Select
              defaultValue="All"
              style={{ width: 200 }}
              size="large"
              onChange={handleGenreChange}
            >
              <Option value="All">All Genres</Option>
              {genres.map((genre) => (
                <Option key={genre.id} value={genre.name}>
                  {genre.name}
                </Option>
              ))}
            </Select>
          </div>

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

export default MoviesPage;

export async function getStaticProps() {
  const movies = await axios.get("http://localhost:3000/api/movies");
  const genres = await axios.get("http://localhost:3000/api/genres");
  if (!movies) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      allMovies: movies.data,
      genres:genres.data
    },
    revalidate: 20,
  };
}
