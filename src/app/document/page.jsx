// pages/api-docs/index.js

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import swaggerSpec from '../../lib/swaggerOptions'; // Ajusta la ruta según tu estructura

export default function SwaggerPage() {
  return <SwaggerUI spec={swaggerSpec} />;
}
