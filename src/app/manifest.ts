import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Karan Raj KR | Founder, KĀRYO',
    short_name: 'Karan Raj KR',
    description: 'Karan Raj KR is an Founder, KĀRYO building with Python, FastAPI, and Next.js. Founder of KĀRYO. B.Tech CSE (AI/ML) student at NIAT–S-VYASA University, Bengaluru.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
