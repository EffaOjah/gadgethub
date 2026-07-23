import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Send, BadgeCheck, ShieldCheck, Star, Mic } from 'lucide-react';
import { Robot, IconTile } from '../components/ui';
import { askAi } from '../services';

interface ChatMessage {
  id: number;
  role: 'user' | 'ai';
  text: string;
}

const SUGGESTIONS = [
  'Best laptop for architecture', 'iPhone vs Samsung', 'Gaming laptop under ₦800k',
  'Earbuds with best battery', 'Is UK used iPhone safe?', 'Best phone for video editing under ₦900k',
];

const WELCOME =
  "Hi! I'm GadgetHub AI — your smart gadget advisor for Nigeria. Ask me about any phone, laptop, smartwatch, or audio gear. I combine verified owner reviews, seller availability, warranty behaviour, and current Nigerian price ranges to help you buy right the first time.";

export default function AiAdvisorPage() {
  const [params] = useSearchParams();
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 0, role: 'ai', text: WELCOME }]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const askedRef = useRef(false);

  const ask = async (question: string) => {
    if (!question.trim() || thinking) return;
    setMessages((m) => [...m, { id: nextId.current++, role: 'user', text: question }]);
    setInput('');
    setThinking(true);
    try {
      const answer = await askAi(question);
      setMessages((m) => [...m, { id: nextId.current++, role: 'ai', text: answer }]);
    } finally {
      setThinking(false);
    }
  };

  // Auto-ask when arriving with ?q=
  useEffect(() => {
    const q = params.get('q');
    if (q && !askedRef.current) {
      askedRef.current = true;
      void ask(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, thinking]);

  return (
    <section className="section" style={{ paddingTop: 24 }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <div className="center">
          <Robot size={84} />
          <h1 style={{ fontSize: '1.7rem', fontWeight: 800, marginTop: 8 }}>
            Ask <span className="blue">GadgetHub AI</span> <span className="badge badge--new">NEW</span>
          </h1>
          <p className="muted small mt-8">Smart. Fast. Unbiased. Built on real reviews and trusted seller data.</p>
          <div className="flex justify-between wrap gap-10 mt-16" style={{ justifyContent: 'center' }}>
            <span className="flex items-center gap-6 tiny muted"><IconTile tone="green" size={24}><BadgeCheck size={12} /></IconTile> Real owner reviews</span>
            <span className="flex items-center gap-6 tiny muted"><IconTile tone="blue" size={24}><ShieldCheck size={12} /></IconTile> Verified seller checks</span>
            <span className="flex items-center gap-6 tiny muted"><IconTile tone="amber" size={24}><Star size={12} /></IconTile> Confidence scores</span>
          </div>
        </div>

        <div className="ai-panel mt-20" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="chat-shell">
            <div className="chat-log" ref={logRef} style={{ padding: 20 }}>
              {messages.map((m) => (
                <div key={m.id} className={`chat-msg${m.role === 'user' ? ' chat-msg--user' : ''}`}>
                  {m.role === 'ai' && <Robot size={34} />}
                  <div className="chat-bubble">{m.text}</div>
                </div>
              ))}
              {thinking && (
                <div className="chat-msg">
                  <Robot size={34} />
                  <div className="chat-bubble">
                    <span className="typing-dots"><i /><i /><i /></span>
                  </div>
                </div>
              )}
            </div>
            <form
              className="flex gap-10"
              style={{ padding: 16, borderTop: '1px solid var(--border)' }}
              onSubmit={(e) => { e.preventDefault(); void ask(input); }}
            >
              <input
                className="input"
                placeholder="Ask our AI Advisor anything…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="button" className="nav__icon-btn" aria-label="Voice input"><Mic size={16} /></button>
              <button className="btn btn--primary" type="submit" disabled={thinking}>
                <Send size={14} /> Ask AI
              </button>
            </form>
          </div>
        </div>

        <div className="flex wrap gap-8 mt-16" style={{ justifyContent: 'center' }}>
          {SUGGESTIONS.map((s) => (
            <button key={s} className="chip" onClick={() => void ask(s)}>{s}</button>
          ))}
        </div>

        <p className="center tiny muted-2 mt-16">
          GadgetHub AI gives buying guidance, not guarantees. Always confirm condition, warranty and
          seller verification before payment. <Link to="/how-it-works" className="blue">How it works →</Link>
        </p>
        <div className="flex gap-10 mt-12" style={{ justifyContent: 'center' }}>
          <Link to="/compare" className="btn btn--outline btn--sm">Compare Gadgets</Link>
          <Link to="/sellers" className="btn btn--outline btn--sm">Find Trusted Sellers</Link>
          <Link to="/reviews" className="btn btn--outline btn--sm">Read Owner Reviews</Link>
        </div>
      </div>
    </section>
  );
}
