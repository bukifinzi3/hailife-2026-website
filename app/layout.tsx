import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clínica Oftalmologia São Paulo | Paraíso e Campo Belo | Agende Consulta WhatsApp',
  description: 'Clínica Hailife - Agende sua consulta de oftalmologia em São Paulo. Unidades Paraíso e Campo Belo. Atendimento pelas Dras. Simone Finzi e Liliana Campos.',
  keywords: 'oftalmologia são paulo, clínica oftalmologia paraíso, clínica oftalmologia campo belo, agendar consulta oftalmologia, dra simone finzi, dra liliana campos, oftalmologia whatsapp',
  openGraph: {
    title: 'Clínica Oftalmologia São Paulo | Paraíso e Campo Belo | Agende Consulta WhatsApp',
    description: 'Clínica Hailife - Agende sua consulta de oftalmologia em São Paulo. Unidades Paraíso e Campo Belo. Atendimento pelas Dras. Simone Finzi e Liliana Campos.',
    url: 'https://www.clinicahailife.com.br',
    siteName: 'Clínica Hailife',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Clínica Oftalmologia São Paulo | Paraíso e Campo Belo | Agende Consulta WhatsApp',
    description: 'Clínica Hailife - Agende sua consulta de oftalmologia em São Paulo. Unidades Paraíso e Campo Belo. Atendimento pelas Dras. Simone Finzi e Liliana Campos.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  verification: {
    google: 'verification-code-here',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}