import { UserButton } from '@clerk/nextjs'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0d0d12' }}>
      <header
        className="border-b px-6 py-4"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <a href="/boards" className="text-xl font-bold text-white">
            ZenBoard
          </a>
          <UserButton />
        </nav>
      </header>
      <main className="py-6 max-w-7xl mx-auto">{children}</main>
    </div>
  )
}
