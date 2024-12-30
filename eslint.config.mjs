// eslint.config.mjs
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import globals from 'globals'
import importPlugin from 'eslint-plugin-import'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
})

// JavaScript 전용 설정
const jsConfig = {
  files: ['**/*.{js,jsx,mjs}'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.node,
      React: true,
      JSX: true
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  },
  plugins: {
    import: importPlugin
  },
  rules: {
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    'no-console': 'warn',
    'no-debugger': 'warn',
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/default': 'error',
    'import/namespace': 'error'
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~', '.'],
          ['@', './src']
        ],
        extensions: ['.js', '.jsx', '.mjs']
      }
    }
  }
}

// Next.js 설정
const nextConfig = compat.config({
  extends: ['next/core-web-vitals'],
  parserOptions: {
    requireConfigFile: false
  }
})

// 최종 설정 병합
const eslintConfig = [
  ...nextConfig,
  jsConfig,
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/build/**']
  }
]

export default eslintConfig
