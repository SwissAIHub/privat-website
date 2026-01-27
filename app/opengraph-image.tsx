import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Florian Schatz'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          fontFamily: 'Georgia, serif',
          color: '#E8E8E8',
          padding: '80px',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 'normal', marginBottom: 24 }}>
          Florian Schatz
        </div>
        <div style={{ fontSize: 28, color: '#8A8A8A' }}>
          AI Implementation. Regulated Finance. Complyr.
        </div>
        <div style={{ fontSize: 20, color: '#606060', marginTop: 16 }}>
          Flums, Schweiz
        </div>
      </div>
    ),
    { ...size }
  )
}
