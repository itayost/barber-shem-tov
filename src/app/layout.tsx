import { Heebo } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

// Hebrew font setup
const heebo = Heebo({
  subsets: ['hebrew'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-heebo',
  display: 'swap',
});

export const metadata = {
  title: 'עיצוב שיער מדויק | ספר מודרני ויוקרתי בתל אביב',
  description: 'חווית הספרות המובילה של תל אביב, שבה אומנות מסורתית פוגשת סגנון עכשווי. הזמינו תור עוד היום.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable}`}>
      <body className="bg-charcoal text-offwhite font-heebo">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}