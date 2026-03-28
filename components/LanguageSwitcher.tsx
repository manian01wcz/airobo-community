'use client';

import {usePathname, useRouter} from '@/i18n/routing';
import {useParams} from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, {locale: newLocale});
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLanguage('zh')}
        className={`px-3 py-1 rounded ${
          locale === 'zh' ? 'bg-blue-600 text-white' : 'bg-gray-200'
        }`}
      >
        中文
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1 rounded ${
          locale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'
        }`}
      >
        English
      </button>
    </div>
  );
}
