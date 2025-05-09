import React from "react";
import Link from "next/link";
import { Button, Result } from 'antd';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link href="/">
            <Button type="primary" size="large">
              Back to Home
            </Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFoundPage;