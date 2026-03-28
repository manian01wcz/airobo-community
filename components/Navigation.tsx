'use client';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const locale = pathname.startsWith('/en') ? 'en' : 'zh';
  const otherLocale = locale === 'zh' ? 'en' : 'zh';
  const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-gray-900 text-lg hidden sm:block">AIROBO</span>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-xs mx-4 hidden md:block">
            <div className="relative">
              <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder={t('search')}
                className="w-full pl-9 pr-3 py-1.5 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link href={`/${locale}`} className="flex flex-col items-center px-3 py-1 text-gray-500 hover:text-black transition group">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
              <span className="text-xs mt-0.5">{t('home')}</span>
            </Link>
            <Link href={`/${locale}/connect`} className="flex flex-col items-center px-3 py-1 text-gray-500 hover:text-black transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
              <span className="text-xs mt-0.5">{t('network')}</span>
            </Link>
            <Link href={`/${locale}/match`} className="flex flex-col items-center px-3 py-1 text-gray-500 hover:text-black transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-2.18c.07-.44.18-.88.18-1.36C18 2.05 15.96 0 13.36 0c-1.46 0-2.35.77-3.36 1.85C8.99.77 8.1 0 6.64 0 4.04 0 2 2.05 2 4.64c0 .48.11.92.18 1.36H0v14h20V6zm-7.82-4.5c.9 0 1.82.73 1.82 2.14 0 .6-.16 1.07-.34 1.36H11.5c-.2-.28-.34-.76-.34-1.36 0-1.41.92-2.14 1.82-2.14h.2zM6.18 2.14C7.08 2.14 8 2.87 8 4.28c0 .6-.14 1.08-.34 1.36H5.34C5.16 5.35 5 4.88 5 4.28c0-1.41.92-2.14 1.82-2.14h.36zM2 18V8h8v10H2zm10 0V8h8v10h-8z"/></svg>
              <span className="text-xs mt-0.5">{t('match')}</span>
            </Link>
            <Link href={`/${locale}/events`} className="flex flex-col items-center px-3 py-1 text-gray-500 hover:text-black transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>
              <span className="text-xs mt-0.5">{t('events')}</span>
            </Link>

            <div className="w-px h-8 bg-gray-200 mx-1" />

            {/* Lang toggle */}
            <Link href={otherPath} className="text-xs text-gray-500 hover:text-blue-600 px-2 font-medium">
              {otherLocale === 'en' ? 'EN' : '中'}
            </Link>

            {/* Auth buttons */}
            <Link href={`/${locale}/auth/signin`} className="text-sm text-blue-600 font-semibold px-3 py-1.5 rounded-full border border-blue-600 hover:bg-blue-50 transition ml-1">
              {t('signin')}
            </Link>
            <Link href={`/${locale}/auth/signup`} className="text-sm bg-blue-600 text-white font-semibold px-3 py-1.5 rounded-full hover:bg-blue-700 transition">
              {t('join')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-2 flex flex-col gap-1">
            <Link href={`/${locale}`} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">{t('home')}</Link>
            <Link href={`/${locale}/match`} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">{t('match')}</Link>
            <Link href={`/${locale}/events`} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">{t('events')}</Link>
            <div className="flex gap-2 px-4 pt-2">
              <Link href={`/${locale}/auth/signin`} className="flex-1 text-center text-sm text-blue-600 font-semibold py-1.5 border border-blue-600 rounded-full">{t('signin')}</Link>
              <Link href={`/${locale}/auth/signup`} className="flex-1 text-center text-sm bg-blue-600 text-white font-semibold py-1.5 rounded-full">{t('join')}</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
