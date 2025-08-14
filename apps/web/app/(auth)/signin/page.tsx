'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { API_URL, jsonFetch } from '@/lib/api';

const schema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormValues = z.infer<typeof schema>;

export default function SignInPage() {
  const [isPending, startTransition] = useTransition();
  const [subError, setSubError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    // Placeholder for Google OAuth implementation
    toast({
      title: 'Google Sign In',
      description: 'Google OAuth integration coming soon!'
    });
    setTimeout(() => setIsLoading(false), 1000);
  };

  async function onSubmit(values: FormValues) {
    setSubError(null);
    startTransition(async () => {
      const res = await jsonFetch<{ jwt: string }>(`${API_URL}/user/signin`, {
        method: 'POST',
        body: values,
      });

      if (!res.ok) {
        const message = typeof res.error === 'object' && res.error && 'message' in (res.error as any)
          ? (res.error as any).message
          : 'Sign in failed';
        setSubError(message);
        toast({ title: 'Sign in failed', description: message });
        return;
      }

      const token = res.data?.jwt;
      if (token) {
        localStorage.setItem('jwt', token);
      }
      toast({ title: 'Welcome back', description: 'Signed in successfully.' });
      window.location.assign('/');
    });
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/20 ring-1 ring-rose-400/40 shadow-lg shadow-rose-500/25">
            <Shield className="h-6 w-6 text-rose-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Welcome back</h1>
          <p className="text-sm text-rose-100/70">Sign in to access your Better-Uptime dashboard</p>
        </div>
        <div className="relative">
          {/* Enhanced pinkish glow behind the card */}
          <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[32px] bg-[radial-gradient(70%_70%_at_30%_10%,rgba(244,63,94,0.25),transparent_70%)] blur-2xl" />
          <div className="rounded-2xl border border-rose-300/20 bg-[linear-gradient(135deg,rgba(244,63,94,0.15),rgba(236,72,153,0.1),rgba(17,24,39,0.9))] shadow-2xl backdrop-blur-sm ring-1 ring-rose-400/10">
            <div className="px-6 pt-6">
              <h2 className="text-lg font-semibold text-white">Sign in</h2>
              <p className="text-sm text-rose-100/60">Use your account credentials</p>
            </div>
            <div className="px-6 pb-6 pt-4">
              {/* Google OAuth Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-lg border border-rose-300/30 bg-white/5 text-white hover:bg-rose-500/10 hover:border-rose-300/50 hover:scale-[1.02] transition-all duration-200 backdrop-blur-sm"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-rose-300/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-rose-100/60">Or continue with email</span>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-rose-100">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="you@example.com"
                              autoComplete="email"
                              {...field}
                              className="pl-9 rounded-lg border border-rose-300/30 bg-gray-800/60 text-white placeholder:text-rose-100/40 focus-visible:border-rose-400 focus-visible:ring-2 focus-visible:ring-rose-400/30 transition-all duration-200 hover:border-rose-300/50"
                            />
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-rose-300">@</span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-rose-100">Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            autoComplete="current-password"
                            {...field}
                            className="rounded-lg border border-rose-300/30 bg-gray-800/60 text-white placeholder:text-rose-100/40 focus-visible:border-rose-400 focus-visible:ring-2 focus-visible:ring-rose-400/30 transition-all duration-200 hover:border-rose-300/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {subError ? (
                    <p className="text-sm text-rose-400">{subError}</p>
                  ) : null}

                  <Button
                    type="submit"
                    className="w-full rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 text-white transition-all duration-200 hover:scale-[1.02] hover:from-rose-400 hover:to-pink-500 focus:ring-2 focus:ring-rose-400/50 shadow-lg shadow-rose-500/25"
                    disabled={isPending}
                  >
                    {isPending ? 'Signing in…' : 'Sign in'}
                  </Button>

                  <p className="text-center text-sm text-gray-400">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="text-rose-400 hover:underline">Sign up</Link>
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
