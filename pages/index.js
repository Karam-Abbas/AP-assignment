import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { Typography, Button, Card, Rate, Row, Col, Layout } from 'antd';
import { FireOutlined, AppstoreOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

export default function Home({movies}) {
  const router = useRouter();

  return (
    <Layout className="min-h-screen">
      <Content className="p-8">
        <div className="container mx-auto">
          <Title level={1} className="text-center mb-8">
            <FireOutlined className="mr-2 text-orange-500" />
            Trending Movies
          </Title>

          <div className="flex gap-4 mb-8">
            <Button 
              type="primary" 
              size="large"
              icon={<AppstoreOutlined />}
              onClick={() => router.push("/genres")}
            >
              Browse Genres
            </Button>
            <Button 
              type="primary"
              size="large"
              icon={<UnorderedListOutlined />}
              href="/movies"
            >
              All Movies
            </Button>
            <Button 
              type="primary"
              size="large"
              icon={<UserOutlined />}
              href="/directors"
            >
              Directors
            </Button>
          </div>

          <Row gutter={[24, 24]}>
            {movies.map((movie, index) => (
              <Col xs={24} sm={12} lg={8} key={movie.id || index}>
                <Link href={`/movies/${movie.id}`} style={{ display: 'block' }}>
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
}


export async function getStaticProps() {
  const movies = await axios.get("http://localhost:3000/api/trendy");
  if(!movies){
    return {
      notFound:true,
    }
  } 
  return {
    props: {
      movies:movies.data
    },revalidate:20,
  };
}