import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-28 min-h-screen">
      <SwaggerUI url="https://project-kkp.github.io/api/swagger.json" />
    </div>
  );
}
