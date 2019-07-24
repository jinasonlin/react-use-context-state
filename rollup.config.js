import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: 'src/ContextState.jsx',
  output: [
    {
      file: 'dist/index.es.js',
      format: 'es',
    },
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
    },
  ],
  plugins: [
    peerDepsExternal(),
    babel({
      exclude: 'node_modules/**',
      // externalHelpers: true,
    }),
    resolve(),
    commonjs({
      namedExports: {
        'react': ['PureComponent', 'createContext', 'useContext', 'useReducer', 'useEffect', 'useCallback']
      }
    }),
    terser(),
  ],
};
