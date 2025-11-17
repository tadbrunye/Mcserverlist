'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { Gamepad2, Plus, User, LogOut, LayoutDashboard, BarChart3 } from 'lucide-react'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              MCServerList
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Servers
            </Link>
            <Link href="/promoted" className="text-sm font-medium hover:text-primary transition-colors">
              Promoted
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link href="/servers/add">
                  <Button size="sm" className="rounded-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Server
                  </Button>
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium hidden md:inline">
                    {session.user.name}
                  </span>
                  <Link href="/dashboard">
                    <Button variant="ghost" size="sm" title="My Dashboard">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                  </Link>
                  {session.user.role === 'ADMIN' && (
                    <Link href="/admin">
                      <Button variant="ghost" size="sm" title="Admin Dashboard">
                        <LayoutDashboard className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  <Link href="/profile">
                    <Button variant="ghost" size="sm" title="Profile">
                      <User className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => signOut()} title="Sign Out">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <Link href="/auth/signin">
                <Button size="sm" className="rounded-full">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
