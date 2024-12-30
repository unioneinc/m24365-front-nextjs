import path from 'path'
import { fileURLToPath } from 'url'
import bundleAnalyzer from '@next/bundle-analyzer'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  productionBrowserSourceMaps: true,
  compiler: {
    styledComponents: true
  },

  // 추가된 설정들
  output: 'standalone', // Docker 배포를 위한 standalone 모드
  poweredByHeader: false, // 보안을 위해 X-Powered-By 헤더 제거
  compress: true, // 응답 압축
  generateEtags: true, // 캐싱을 위한 ETag 생성

  // 이미지 최적화 설정
  images: {
    domains: ['your-domain.com'], // 이미지 도메인 설정
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    unoptimized: true
  },

  // 헤더 보안 및 CORS 설정 추가
  async headers() {
    return [
      {
        source: '/api/:path*', // API 요청 경로에 대한 헤더 설정
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' }, // 모든 도메인 허용 (필요 시 도메인으로 변경)
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' }, // 허용할 HTTP 메서드
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' }, // 허용할 요청 헤더
          { key: 'Access-Control-Expose-Headers', value: 'Authorization' }, // 클라이언트가 접근할 수 있는 응답 헤더
          { key: 'X-Frame-Options', value: 'DENY' }, // 보안 헤더
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
        ]
      }
    ]
  },

  // Rewrites 설정
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*', // 프록시 경로
  //       destination: 'https://dev.m24365.biz/api/:path*', // 백엔드 API 서버
  //     },
  //   ];
  // },

  // 기존 webpack 설정
  webpack: (config, { dev, isServer }) => {
    // 기존 설정 유지...

    // 프로덕션 빌드 최적화 수정
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        minimizer: [
          ...(config.optimization.minimizer || []),
          new CssMinimizerPlugin({
            minimizerOptions: {
              preset: [
                'default',
                {
                  discardComments: { removeAll: true },
                  normalizeWhitespace: true,
                  minifyFontValues: true,
                  minifyGradients: true
                }
              ]
            }
          })
        ],
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            default: false,
            vendors: false,
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
              reuseExistingChunk: true
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              chunks: 'all',
              priority: 10,
              enforce: true,
              reuseExistingChunk: true
            },
            styles: {
              name: 'styles',
              test: /\.(css|scss|sass)$/,
              chunks: 'all',
              enforce: true
            }
          }
        },
        runtimeChunk: {
          name: 'runtime'
        }
      }
    }

    // 개발 환경 설정 강화
    if (dev) {
      config.watchOptions = {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: ['**/node_modules', '**/.git', '**/.next', '**/dist', '**/build', '**/coverage']
      }
    }

    return config
  },

  // 기존 sassOptions 유지
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')]
  },

  // 실험적 기능 설정
  experimental: {
    optimizeCss: true, // CSS 최적화
    scrollRestoration: true, // 스크롤 복원
    workerThreads: true // 워커 스레드 사용
  }
}

// ES 모듈 문법으로 내보내기
const config = process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig
export default config
