import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function Welcome() {
    const navigate = useNavigate()
    const riderRef = useRef(null)

    useEffect(() => {
        const link = document.createElement('link')
        link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap'
        link.rel = 'stylesheet'
        document.head.appendChild(link)
        return () => document.head.removeChild(link)
    }, [])

    useEffect(() => {
        let pos = 0
        let dir = 1
        const interval = setInterval(() => {
            pos += dir * 0.5
            if (pos > 20 || pos < 0) dir *= -1
            if (riderRef.current) {
                riderRef.current.style.transform = `translateX(${pos}px)`
            }
        }, 50)
        return () => clearInterval(interval)
    }, [])

    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#fff9f6', minHeight: '100vh', overflowX: 'hidden' }}>

            {/* NAV */}
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 40px', background: 'rgba(255,249,246,0.95)', backdropFilter: 'blur(8px)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #f5ede9' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 900, color: '#ff4d2d' }}>Rasmalai</div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => navigate('/siqnin')}
                        style={{ padding: '8px 20px', border: '1.5px solid #ff4d2d', borderRadius: '50px', background: 'transparent', color: '#ff4d2d', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}
                    >Log in</button>
                    <button
                        onClick={() => navigate('/siqnup')}
                        style={{ padding: '8px 20px', border: '1.5px solid #ff4d2d', borderRadius: '50px', background: '#ff4d2d', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}
                    >Get started</button>
                </div>
            </nav>

            {/* HERO */}
            <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '60px 40px 48px', gap: '40px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'inline-block', background: '#fff0ec', color: '#993C1D', border: '1px solid #F0997B', borderRadius: '50px', padding: '5px 16px', fontSize: '12px', fontWeight: 500, marginBottom: '20px' }}>
                        🍽️ Real-time food delivery
                    </div>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px', color: '#1a1a1a' }}>
                        Craving something<br /><span style={{ color: '#ff4d2d' }}>delicious?</span>
                    </h1>
                    <p style={{ fontSize: '15px', color: '#777', lineHeight: 1.7, marginBottom: '28px', fontWeight: 300, maxWidth: '380px' }}>
                        Order from the best local restaurants. Track your delivery live on the map. Pay securely with Razorpay.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => navigate('/siqnup')}
                            style={{ padding: '13px 32px', background: '#ff4d2d', color: '#fff', border: 'none', borderRadius: '50px', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 500, cursor: 'pointer', boxShadow: '0 4px 20px rgba(255,77,45,0.3)' }}
                        >Order now →</button>
                        <button
                            onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                            style={{ padding: '13px 32px', background: '#fff', color: '#1a1a1a', border: '1.5px solid #e0e0e0', borderRadius: '50px', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 500, cursor: 'pointer' }}
                        >How it works</button>
                    </div>
                </div>

                {/* PHONE MOCKUP */}
                <div style={{ flex: 1, minWidth: '260px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '230px', background: '#fff', borderRadius: '28px', border: '2px solid #f0e8e5', padding: '18px', boxShadow: '0 8px 40px rgba(255,77,45,0.12)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 900, color: '#ff4d2d' }}>Rasmalai</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 1.5s ease infinite' }}></div>
                                <span style={{ fontSize: '10px', color: '#22c55e' }}>Live</span>
                            </div>
                        </div>
                        {/* MAP */}
                        <div style={{ background: '#e8f4e8', borderRadius: '14px', height: '130px', position: 'relative', overflow: 'hidden', marginBottom: '12px' }}>
                            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '14px', background: '#d4c9b8', transform: 'translateY(-50%)' }}></div>
                            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '14px', background: '#d4c9b8', transform: 'translateX(-50%)' }}></div>
                            {[{ top: '14px', left: '18px' }, { top: '16px', right: '22px', w: '14px' }, { bottom: '18px', left: '28px', w: '12px' }, { bottom: '14px', right: '18px', w: '16px' }].map((t, i) => (
                                <div key={i} style={{ position: 'absolute', width: t.w || '18px', height: t.w || '18px', borderRadius: '50%', background: '#5DCAA5', opacity: 0.8, top: t.top, bottom: t.bottom, left: t.left, right: t.right }}></div>
                            ))}
                            <div style={{ position: 'absolute', top: '48px', left: '56px', right: '50px', height: '2px', background: '#ff4d2d', borderRadius: '2px' }}></div>
                            <div ref={riderRef} style={{ position: 'absolute', top: '32px', left: '42px', width: '28px', height: '28px', borderRadius: '50%', background: '#ff4d2d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🛵</div>
                            <div style={{ position: 'absolute', top: '68px', right: '34px', width: '22px', height: '22px', borderRadius: '50%', background: '#1D9E75', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>📍</div>
                        </div>
                        {/* ORDER CARD */}
                        <div style={{ background: '#fff9f6', borderRadius: '12px', padding: '10px 12px', border: '1px solid #f5ede9' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                                <div style={{ fontSize: '13px', fontWeight: 500 }}>Chicken Biryani</div>
                                <div style={{ fontSize: '10px', background: '#fff0ec', color: '#993C1D', borderRadius: '50px', padding: '2px 8px', border: '1px solid #F0997B' }}>Out for delivery</div>
                            </div>
                            <div style={{ fontSize: '11px', color: '#aaa', marginBottom: '8px' }}>NH5, Shimla · 1 item · ₹199</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', borderRadius: '8px', padding: '6px 10px', border: '1px solid #e8e8e8' }}>
                                <span style={{ fontSize: '10px', color: '#aaa' }}>Delivery OTP</span>
                                <span style={{ fontSize: '13px', fontWeight: 500, color: '#ff4d2d', letterSpacing: '3px' }}>4 2 7 8</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '28px 40px', background: '#fff', borderTop: '1px solid #f5ede9', borderBottom: '1px solid #f5ede9', flexWrap: 'wrap', gap: '16px' }}>
                {[{ n: '500+', l: 'Restaurants' }, { n: '30 min', l: 'Avg delivery' }, { n: '10k+', l: 'Happy customers' }, { n: '100%', l: 'Secure payments' }].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 900, color: '#ff4d2d' }}>{s.n}</div>
                        <div style={{ fontSize: '12px', color: '#aaa', marginTop: '3px' }}>{s.l}</div>
                    </div>
                ))}
            </div>

            {/* FEATURES */}
            <section style={{ padding: '60px 40px', background: '#fff9f6' }}>
                <p style={{ fontSize: '11px', fontWeight: 500, color: '#ff4d2d', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center', marginBottom: '8px' }}>Why Rasmalai</p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, textAlign: 'center', marginBottom: '40px', color: '#1a1a1a' }}>Everything built in</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '16px', maxWidth: '700px', margin: '0 auto' }}>
                    {[
                        { icon: '📍', title: 'Live tracking', desc: 'Watch your rider move in real-time on the map' },
                        { icon: '🔐', title: 'OTP delivery', desc: 'Secure handoff with one-time password via email' },
                        { icon: '💳', title: 'Razorpay', desc: 'UPI, cards, and cash on delivery all supported' },
                        { icon: '⚡', title: 'Real-time updates', desc: 'Socket.io powered — no refresh needed' },
                    ].map((f, i) => (
                        <div key={i} style={{ background: '#fff', border: '1px solid #f5ede9', borderRadius: '18px', padding: '24px 18px', textAlign: 'center' }}>
                            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#fff0ec', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: '20px' }}>{f.icon}</div>
                            <div style={{ fontSize: '14px', fontWeight: 500, color: '#1a1a1a', marginBottom: '6px' }}>{f.title}</div>
                            <p style={{ fontSize: '12px', color: '#aaa', lineHeight: 1.5 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" style={{ padding: '60px 40px', background: '#fff' }}>
                <p style={{ fontSize: '11px', fontWeight: 500, color: '#ff4d2d', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center', marginBottom: '8px' }}>How it works</p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, textAlign: 'center', marginBottom: '40px', color: '#1a1a1a' }}>Order in 3 simple steps</h2>
                <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '600px', margin: '0 auto', flexWrap: 'wrap', gap: '8px' }}>
                    {[
                        { n: '1', title: 'Browse & order', desc: 'Search food, add to cart, pay securely' },
                        { n: '2', title: 'Track live', desc: 'Watch your rider on the real-time map' },
                        { n: '3', title: 'OTP delivery', desc: 'Confirm with OTP, enjoy your meal' },
                    ].map((s, i) => (
                        <div key={i} style={{ flex: 1, minWidth: '140px', textAlign: 'center', position: 'relative', padding: '0 12px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ff4d2d', color: '#fff', fontSize: '16px', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>{s.n}</div>
                            {i < 2 && <div style={{ position: 'absolute', top: '20px', left: '60%', right: '-20%', height: '1px', background: '#ffd5cb' }}></div>}
                            <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '5px', color: '#1a1a1a' }}>{s.title}</div>
                            <p style={{ fontSize: '12px', color: '#aaa', lineHeight: 1.5 }}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* THREE ROLES */}
            <section style={{ padding: '60px 40px', background: '#fff9f6' }}>
                <p style={{ fontSize: '11px', fontWeight: 500, color: '#ff4d2d', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center', marginBottom: '8px' }}>Built for everyone</p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, textAlign: 'center', marginBottom: '40px', color: '#1a1a1a' }}>Three roles, one platform</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px', maxWidth: '700px', margin: '0 auto' }}>
                    {[
                        { bg: '#fff0ec', tag: 'Customer', tagColor: '#993C1D', title: 'Order food', desc: 'Browse restaurants, track delivery live, pay securely.', feats: ['Live map tracking', 'Razorpay & COD', 'OTP secure delivery'], dotBg: '#ff4d2d' },
                        { bg: '#e1f5ee', tag: 'Shop owner', tagColor: '#0F6E56', title: 'Manage shop', desc: 'Add items, manage orders, assign delivery boys.', feats: ['Real-time orders', 'Delivery assignment', 'Order status control'], dotBg: '#1D9E75' },
                        { bg: '#e6f1fb', tag: 'Delivery boy', tagColor: '#185FA5', title: 'Earn daily', desc: 'Accept nearby orders, deliver, track your earnings.', feats: ['Nearby assignments', 'Daily earnings chart', 'OTP verification'], dotBg: '#378ADD' },
                    ].map((r, i) => (
                        <div key={i} style={{ background: r.bg, borderRadius: '18px', padding: '24px', border: '1px solid #f5ede9' }}>
                            <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', color: r.tagColor, marginBottom: '8px' }}>{r.tag}</div>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, marginBottom: '8px', color: '#1a1a1a' }}>{r.title}</div>
                            <p style={{ fontSize: '12px', color: '#666', lineHeight: 1.5, marginBottom: '14px' }}>{r.desc}</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {r.feats.map((f, j) => (
                                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#444' }}>
                                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: r.dotBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#fff', flexShrink: 0 }}>✓</div>
                                        {f}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '64px 40px', background: '#ff4d2d', textAlign: 'center' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>Hungry? Let's fix that.</h2>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px', fontWeight: 300 }}>Join thousands ordering every day across India.</p>
                <button
                    onClick={() => navigate('/signup')}
                    style={{ padding: '15px 48px', background: '#fff', color: '#ff4d2d', border: 'none', borderRadius: '50px', fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 500, cursor: 'pointer' }}
                >Get started for free</button>
            </section>

            {/* FOOTER */}
            <footer style={{ padding: '22px 40px', background: '#1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 900, color: '#ff4d2d' }}>Rasmalai</div>
                <div style={{ fontSize: '12px', color: '#555' }}>© 2026 Rasmalai · Made with ❤️ in India</div>
            </footer>

            <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
        </div>
    )
}

export default Welcome