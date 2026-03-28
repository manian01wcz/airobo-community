'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', type: 'INDIVIDUAL' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        memberLevel: 'PAID_INDIVIDUAL',
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || '注册失败，请重试');
      setLoading(false);
    } else {
      router.push('/zh/auth/signin?registered=1');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <Link href="/zh" className="flex items-center gap-2 w-fit">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="font-bold text-gray-900 text-lg">AIROBO</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">加入社区</h1>
            <p className="text-sm text-gray-500 mb-2">MVP阶段完全免费，立即体验全部功能</p>
            <div className="mb-5 px-3 py-2 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700">
              🎉 现在注册即可免费获得付费会员权益，包括发布内容、应用对接、开通AI助手
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">您的姓名</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="真实姓名"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="至少6位"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">我的身份</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'INDIVIDUAL', label: '个人/专家', icon: '👤' },
                    { value: 'COMPANY', label: '企业/机构', icon: '🏢' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm({ ...form, type: opt.value })}
                      className={`flex items-center gap-2 px-3 py-2.5 border rounded-lg text-sm transition ${
                        form.type === opt.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <span>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-full hover:bg-blue-700 transition disabled:opacity-60 text-sm"
              >
                {loading ? '注册中...' : '免费加入'}
              </button>
            </form>

            <p className="mt-4 text-xs text-gray-400 text-center">
              注册即表示同意 <a href="#" className="text-blue-600 hover:underline">用户协议</a> 和 <a href="#" className="text-blue-600 hover:underline">隐私政策</a>
            </p>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                已有账号？{' '}
                <Link href="/zh/auth/signin" className="text-blue-600 font-semibold hover:underline">
                  立即登录
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
