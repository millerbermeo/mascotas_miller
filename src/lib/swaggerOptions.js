import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentación de la API',
      version: '1.0.0',
      description: 'Documentación para tus APIs',
    },
  },
  apis: ['./pages/api/*/*.js'], // Ajusta la ruta donde están definidos tus endpoints de API
};

const specs = swaggerJsdoc(options);

// Documentación específica para las operaciones CRUD de Mascotas
specs.paths['/pets'] = {
  post: {
    summary: 'Crear una nueva mascota',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              race_id: { type: 'integer' },
              category_id: { type: 'integer' },
              gender_id: { type: 'integer' },
              photo: { type: 'string' },
            },
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Mascota creada exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                race_id: { type: 'integer' },
                category_id: { type: 'integer' },
                gender_id: { type: 'integer' },
                photo: { type: 'string' },
              },
            },
          },
        },
      },
      '400': {
        description: 'Entrada inválida',
      },
      '500': {
        description: 'Error interno del servidor',
      },
    },
  },
};

specs.paths['/pets/{id}'] = {
  get: {
    summary: 'Obtener una mascota por ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    responses: {
      '200': {
        description: 'Mascota encontrada',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                race_id: { type: 'integer' },
                category_id: { type: 'integer' },
                gender_id: { type: 'integer' },
                photo: { type: 'string' },
              },
            },
          },
        },
      },
      '404': {
        description: 'Mascota no encontrada',
      },
      '500': {
        description: 'Error interno del servidor',
      },
    },
  },
  delete: {
    summary: 'Eliminar una mascota por ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    responses: {
      '200': {
        description: 'Mascota eliminada exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
              },
            },
          },
        },
      },
      '500': {
        description: 'Error interno del servidor',
      },
    },
  },
  put: {
    summary: 'Actualizar una mascota por ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              race_id: { type: 'integer' },
              category_id: { type: 'integer' },
              gender_id: { type: 'integer' },
              photo: { type: 'string' },
            },
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Mascota actualizada exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
              },
            },
          },
        },
      },
      '400': {
        description: 'Entrada inválida',
      },
      '404': {
        description: 'Mascota no encontrada',
      },
      '500': {
        description: 'Error interno del servidor',
      },
    },
  },
};

// Documentación específica para las operaciones CRUD de Usuarios
specs.paths['/users'] = {
  post: {
    summary: 'Crear un nuevo usuario',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              username: { type: 'string' },
              password: { type: 'string' },
              // Añadir más propiedades según los datos necesarios para la creación de usuarios
            },
          },
        },
      },
    },
    responses: {
      '201': {
        description: 'Usuario creado exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                username: { type: 'string' },
                // Añadir más propiedades según los datos necesarios para la creación de usuarios
              },
            },
          },
        },
      },
      '500': {
        description: 'Error interno del servidor',
      },
    },
  },
};

specs.paths['/users/{id}'] = {
  get: {
    summary: 'Obtener un usuario por ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    responses: {
      '200': {
        description: 'Usuario encontrado',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                username: { type: 'string' },
                // Añadir más propiedades según los datos necesarios para los usuarios
              },
            },
          },
        },
      },
      '404': {
        description: 'Usuario no encontrado',
      },
      '500': {
        description: 'Error interno del servidor',
      },
    },
  },
  delete: {
    summary: 'Eliminar un usuario por ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    responses: {
      '200': {
        description: 'Usuario eliminado exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
              },
            },
          },
        },
      },
      '500': {
        description: 'Error interno del servidor',
      },
    },
  },
  put: {
    summary: 'Actualizar un usuario por ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              username: { type: 'string' },
              // Añadir más propiedades según los datos necesarios para la actualización de usuarios
            },
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Usuario actualizado exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
              },
            },
          },
        },
      },
      '400': {
        description: 'Entrada inválida',
      },
      '404': {
        description: 'Usuario no encontrado',
      },
      '500': {
        description: 'Error interno del servidor',
      },
    },
  },
};

// Documentación específica para las operaciones CRUD de Categorías
specs.paths['/categories'] = {
  post: {
    summary: 'Crear una nueva categoría',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              // Añadir más propiedades según los datos necesarios para la creación de categorías
            },
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Categoría creada exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                // Añadir más propiedades según los datos necesarios para la creación de categorías
              },
            },
          },
        },
      },
      '500': {
        description: 'Error interno del servidor',
      },
    },
  },
};

specs.paths['/categories/{id}'] = {
  get: {
    summary: 'Obtener una categoría por ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    responses: {
      '200': {
        description: 'Categoría encontrada',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                // Añadir más propiedades según los datos necesarios para las categorías
              },
            },
          },
        },
      },
      '404': {
        description: 'Categoría no encontrada',
      },
      '500': {
        description: 'Error interno del servidor',
      },
    },
  },
  delete: {
    summary: 'Eliminar una categoría por ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    responses: {
      '200': {
        description: 'Categoría eliminada exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
              },
            },
          },
        },
      },
      '500': {
        description: 'Error interno del servidor',
      },
    },
  },
  put: {
    summary: 'Actualizar una categoría por ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              // Añadir más propiedades según los datos necesarios para la actualización de categorías
            },
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Categoría actualizada exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
              },
            },
          },
        },
      },
      '400': {
        description: 'Entrada inválida',
      },
      '404': {
        description: 'Categoría no encontrada',
      },
      '500': {
        description: 'Error interno del servidor',
      },
    },
  },
};

// Documentación específica para las operaciones CRUD de Razas
specs.paths['/races'] = {
  post: {
    summary: 'Crear una nueva raza',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              // Añadir más propiedades según los datos necesarios para la creación de razas
            },
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Raza creada exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                // Añadir más propiedades según los datos necesarios para la creación de razas
              },
            },
          },
        },
      },
      '500': {
        description: 'Error interno del servidor',
      },
    },
  },
};

specs.paths['/races/{id}'] = {
  get: {
    summary: 'Obtener una raza por ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    responses: {
      '200': {
        description: 'Raza encontrada',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                // Añadir más propiedades según los datos necesarios para las razas
              },
            },
          },
        },
      },
      '404': {
        description: 'Raza no encontrada',
      },
      '500': {
        description: 'Error interno del servidor',
      },
    },
  },
  delete: {
    summary: 'Eliminar una raza por ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    responses: {
      '200': {
        description: 'Raza eliminada exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
              },
            },
          },
        },
      },
      '500': {
        description: 'Error interno del servidor',
      },
    },
  },
  put: {
    summary: 'Actualizar una raza por ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              // Añadir más propiedades según los datos necesarios para la actualización de razas
            },
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Raza actualizada exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
              },
            },
          },
        },
      },
      '400': {
        description: 'Entrada inválida',
      },
      '404': {
        description: 'Raza no encontrada',
      },
      '500': {
        description: 'Error interno del servidor',
      },
    },
  },
};

// Documentación específica para las operaciones CRUD de Géneros
specs.paths['/genders'] = {
  post: {
    summary: 'Crear un nuevo género',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              // Añadir más propiedades según los datos necesarios para la creación de géneros
            },
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Género creado exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                // Añadir más propiedades según los datos necesarios para la creación de géneros
              },
            },
          },
        },
      },
      '500': {
        description: 'Error interno del servidor',
      },
    },
  },
};

specs.paths['/genders/{id}'] = {
  get: {
    summary: 'Obtener un género por ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    responses: {
      '200': {
        description: 'Género encontrado',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                // Añadir más propiedades según los datos necesarios para los géneros
              },
            },
          },
        },
      },
      '404': {
        description: 'Género no encontrado',
      },
      '500': {
        description: 'Error interno del servidor',
      },
    },
  },
  delete: {
    summary: 'Eliminar un género por ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    responses: {
      '200': {
        description: 'Género eliminado exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
              },
            },
          },
        },
      },
      '500': {
        description: 'Error interno del servidor',
      },
    },
  },
  put: {
    summary: 'Actualizar un género por ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'integer',
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              // Añadir más propiedades según los datos necesarios para la actualización de géneros
            },
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Género actualizado exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
              },
            },
          },
        },
      },
      '400': {
        description: 'Entrada inválida',
      },
      '404': {
        description: 'Género no encontrado',
      },
      '500': {
        description: 'Error interno del servidor',
      },
    },
  },
};

export default specs;
