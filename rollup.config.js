const ts = require('rollup-plugin-typescript2')
const { dependencies } = require('./package.json')

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
    },
    {
      file: 'dist/index.js',
      format: 'esm',
    },
  ],
  plugins: [ts()],
  external: ['path', 'mime-db'],
}
