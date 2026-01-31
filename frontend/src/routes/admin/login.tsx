import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useAuthStore } from '@/features/auth'
import { apiClient } from '@/lib/api-client'
import { Button, Input, Label, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/lib/ui'
import { Lock, Mail, Eye, EyeOff, ArrowLeft, KeyRound } from 'lucide-react'

export const Route = createFileRoute('/admin/login')({
  component: AdminLogin,
})

function AdminLogin() {
  const navigate = useNavigate()
  const { login, isAuthenticated, user, isLoading, error, clearError } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Forgot password state
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [forgotStep, setForgotStep] = useState<'email' | 'otp' | 'success'>('email')
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotError, setForgotError] = useState('')
  const [forgotSuccess, setForgotSuccess] = useState('')
  const [devOtp, setDevOtp] = useState('')

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      navigate({ to: '/admin/dashboard' })
    }
  }, [isAuthenticated, user, navigate])

  useEffect(() => {
    clearError()
  }, [clearError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login(email, password)
    if (success) {
      // Will redirect via the useEffect
    }
  }

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setForgotLoading(true)
    setForgotError('')
    setDevOtp('')

    try {
      const response = await apiClient.post<{
        success: boolean
        data: { message: string; _dev?: { otp: string } }
      }>('/auth/password-reset/request', { email: forgotEmail })

      setForgotSuccess(response.data.message)
      // In dev mode, show the OTP
      if (response.data._dev?.otp) {
        setDevOtp(response.data._dev.otp)
      }
      setForgotStep('otp')
    } catch (err) {
      setForgotError(err instanceof Error ? err.message : 'Failed to send OTP')
    } finally {
      setForgotLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setForgotLoading(true)
    setForgotError('')

    try {
      await apiClient.post('/auth/password-reset/reset', {
        email: forgotEmail,
        otp,
        newPassword,
      })

      setForgotSuccess('Password reset successful! You can now login.')
      setForgotStep('success')
    } catch (err) {
      setForgotError(err instanceof Error ? err.message : 'Failed to reset password')
    } finally {
      setForgotLoading(false)
    }
  }

  const resetForgotPassword = () => {
    setShowForgotPassword(false)
    setForgotStep('email')
    setForgotEmail('')
    setOtp('')
    setNewPassword('')
    setForgotError('')
    setForgotSuccess('')
    setDevOtp('')
  }

  // Forgot Password View
  if (showForgotPassword) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <KeyRound className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <CardDescription>
              {forgotStep === 'email' && 'Enter your email to receive a reset code'}
              {forgotStep === 'otp' && 'Enter the OTP and your new password'}
              {forgotStep === 'success' && 'Password reset successful'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {forgotStep === 'email' && (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="admin@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {forgotError && (
                  <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                    {forgotError}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={forgotLoading}>
                  {forgotLoading ? 'Sending...' : 'Send Reset Code'}
                </Button>

                <button
                  type="button"
                  onClick={resetForgotPassword}
                  className="flex w-full items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </button>
              </form>
            )}

            {forgotStep === 'otp' && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                {devOtp && (
                  <div className="rounded-lg bg-blue-500/10 p-3 text-sm text-blue-600">
                    <strong>Dev Mode OTP:</strong> {devOtp}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="otp">OTP Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    minLength={8}
                    required
                  />
                </div>

                {forgotError && (
                  <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                    {forgotError}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={forgotLoading}>
                  {forgotLoading ? 'Resetting...' : 'Reset Password'}
                </Button>

                <button
                  type="button"
                  onClick={() => setForgotStep('email')}
                  className="flex w-full items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              </form>
            )}

            {forgotStep === 'success' && (
              <div className="space-y-4">
                <div className="rounded-lg bg-green-500/10 p-3 text-sm text-green-600">
                  {forgotSuccess}
                </div>
                <Button onClick={resetForgotPassword} className="w-full">
                  Back to Login
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Login View
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Sign in to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
