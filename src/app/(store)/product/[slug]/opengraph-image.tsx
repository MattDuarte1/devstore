import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { env } from '@/env'
import { ImageResponse } from 'next/og'
import colors from 'tailwindcss/colors'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`)

  const products = await response.json()

  return products
}

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

  const productImageURL = new URL(product.image, env.APP_URL).toString()
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: colors.zinc['950'],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img src={productImageURL} alt="" style={{ width: '100%' }} />
      </div>
    ),
    {
      ...size,
    },
  )
}
