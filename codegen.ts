import type { CodegenConfig } from '@graphql-codegen/cli';
import path from 'path';

const config: CodegenConfig = {
  overwrite: true,
  schema: `${path.join(process.cwd(), 'src/graphql/schema.graphql')}`,
  generates: {
    'src/types/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
