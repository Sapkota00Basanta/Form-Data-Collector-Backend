import type { CodegenConfig } from '@graphql-codegen/cli';
import path from 'path';

const config: CodegenConfig = {
  overwrite: true,
  schema: `${path.join(process.cwd(), 'src/graphql/schema.graphql')}`,
  // schema: `${path.join(process.cwd(), 'src/graphql/schema.ts')}`,
  // schema: 'http://localhost:8000/graphql',
  // documents: 'src/**/!(*.d).{ts,tsx}',
  generates: {
    'src/types/graphql/schema.interface.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
