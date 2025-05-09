import React from "react";
import useSWR from "swr";
import { Card, Typography, Spin, Alert, Row, Col, Divider } from 'antd';

const { Title, Text, Paragraph } = Typography;

const DirectorsPage = () => {
  const { data, error, isLoading } = useSWR("/api/directors", (url) => fetch(url).then((res) => res.json()));

  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed to load the directors data"
        type="error"
        showIcon
        className="m-4"
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" tip="Loading directors..." />
      </div>
    );
  }

  return (
    <div className="p-8">
      <Title level={2} className="text-center mb-8">
        All Directors
      </Title>
      
      <Row gutter={[24, 24]} justify="center">
        {data.map((director) => (
          <Col xs={24} sm={12} lg={8} xxl={6} key={director.id}>
            <Card 
              hoverable
              className="h-full"
              title={
                <Title level={4} className="mb-0">
                  Director Details
                </Title>
              }
            >
              <div className="space-y-4">
                <div>
                  <Text type="secondary">ID</Text>
                  <Paragraph strong>{director.id}</Paragraph>
                  <Divider style={{ margin: '12px 0' }} />
                </div>

                <div>
                  <Text type="secondary">Name</Text>
                  <Paragraph strong>{director.name}</Paragraph>
                  <Divider style={{ margin: '12px 0' }} />
                </div>

                <div>
                  <Text type="secondary">Biography</Text>
                  <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}>
                    {director.biography}
                  </Paragraph>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DirectorsPage;

