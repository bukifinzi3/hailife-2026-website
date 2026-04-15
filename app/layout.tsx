import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Clínica Oftalmologia São Paulo | Paraíso e Campo Belo | Agende Consulta WhatsApp',
  description: 'Clínica Hailife - Agende sua consulta de oftalmologia em São Paulo. Unidades Paraíso e Campo Belo. Atendimento pelas Dras. Simone Finzi e Liliana Campos.',
  keywords: 'oftalmologia são paulo, clínica oftalmologia paraíso, clínica oftalmologia campo belo, agendar consulta oftalmologia, dra simone finzi, dra liliana campos, oftalmologia whatsapp',
  openGraph: {
    title: 'Clínica Oftalmologia São Paulo | Paraíso e Campo Belo | Agende Consulta WhatsApp',
    description: 'Clínica Hailife - Agende sua consulta de oftalmologia em São Paulo. Unidades Paraíso e Campo Belo. Atendimento pelas Dras. Simone Finzi e Liliana Campos.',
    type: 'website',
    url: 'https://www.clinicahailife.com.br',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}