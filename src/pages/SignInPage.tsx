import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { Logo } from '../components/ui';

/**
 * Sign-in page.
 * BACKEND: POST /api/auth/login { email, password } → { token, user }
 * Google OAuth uses VITE_GOOGLE_CLIENT_ID (see API_INTEGRATION.md).
 */
export default function SignInPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="auth-wrap">
      <div className="card card--glow auth-card">
        <div className="center mb-16">
          <Logo />
        </div>
        <h1 className="center">{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h1>
        <p className="muted small center mt-8">
          {mode === 'signin'
            ? 'Sign in to save gadgets, ask AI, and join the community.'
            : 'Join 25,000+ smart gadget buyers across Nigeria.'}
        </p>

        <button
          className="btn btn--outline btn--block mt-20"
          onClick={() => console.info('[mock] Google OAuth — uses VITE_GOOGLE_CLIENT_ID')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Continue with Google
        </button>

        <div className="auth-divider">or continue with email</div>

        {submitted ? (
          <div className="callout callout--green flex items-center gap-10">
            <CheckCircle2 size={17} className="green" /> Check your email to continue. (Backend auth pending integration.)
          </div>
        ) : (
          <form className="flex-col gap-12" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <div className="field">
              <label>Email address</label>
              <div className="search-input-wrap">
                <Mail size={15} />
                <input className="input" type="email" required placeholder="you@example.com" />
              </div>
            </div>
            <div className="field">
              <label>Password</label>
              <div className="search-input-wrap">
                <Lock size={15} />
                <input className="input" type="password" required minLength={8} placeholder="••••••••" />
              </div>
            </div>
            <button className="btn btn--primary btn--block btn--lg" type="submit">
              <Sparkles size={15} /> {mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>
        )}

        <p className="center small muted mt-16">
          {mode === 'signin' ? (
            <>New to GadgetHub?{' '}
              <button className="blue" style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }} onClick={() => setMode('signup')}>
                Create an account
              </button>
            </>
          ) : (
            <>Already have an account?{' '}
              <button className="blue" style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }} onClick={() => setMode('signin')}>
                Sign in
              </button>
            </>
          )}
        </p>
        <p className="center tiny muted-2 mt-12">
          By continuing you agree to our <Link to="/terms" className="blue">Terms of Use</Link> and{' '}
          <Link to="/privacy" className="blue">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
