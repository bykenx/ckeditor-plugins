const typescript = require('@rollup/plugin-typescript')

let hasGenerateDts = false

module.exports = [
  createConfig('cjs'),
  createConfig('esm'),
]

function createConfig(format) {
  const config = {
    input: 'src/index.ts',
    external: ['umi-request'],
    plugins: [
      typescript({ 
        tsconfig: './tsconfig.json',
        declaration: !hasGenerateDts,
        declarationMap: !hasGenerateDts,
      })
    ],
    output: [
      {
        file: `dist/index.${format}.js`,
        format,
        ...(format === 'cjs' ?  { exports: 'auto' } : {}),
        sourcemap: false,
      },
    ],
  }
  hasGenerateDts = true
  return config
}