import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json'
var rollup_config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: './dist/index.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: './dist/index.mjs',
        format: 'es',
        sourcemap: true
      }
    ],
    external: ['aptos', '@manahippo/move-to-ts', 'big-integer', 'cross-fetch'],
    plugins: [typescript(),json()]
  }
];
export { rollup_config as default };
