import typescript from 'rollup-plugin-typescript2'
<<<<<<< HEAD
import commonjs from 'rollup-plugin-commonjs'
=======
// import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
// import sourceMaps from 'rollup-plugin-sourcemaps'
>>>>>>> b41439904108de01217abf294989ee1b1e54ecfb
import pkg from './package.json'
export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
        },
        {
            file: pkg.module,
            format: 'es',
        },
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
        typescript({
            typescript: require('typescript'),
        }),
<<<<<<< HEAD
        commonjs()
=======
        commonjs(),
        // resolve(),
        // sourceMaps()
>>>>>>> b41439904108de01217abf294989ee1b1e54ecfb
    ],
}