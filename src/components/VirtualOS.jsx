import React, { useState, useEffect, useRef, Component, useCallback } from 'react'
import {
    Terminal as TerminalIcon, Folder, User, Maximize2, X, Minus,
    Zap, Cpu, HardDrive, Wifi, Lock, ArrowRight, Power, RefreshCw,
    Music, Settings, Play, SkipBack, SkipForward, Volume2, Search,
    Layout, Monitor, ShieldCheck, Database, Sliders, Plus, Trash2, Save,
    Github, Linkedin, Phone, Mail, Send, Github as GithubIcon, Activity
} from 'lucide-react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useDragControls } from 'framer-motion'

// --- Storage Helper ---
const STORAGE_KEY = 'heffernan_os_user_data_v12'
const SYSTEM_PASSWORD = '509021'

const DEFAULT_USER = {
    name: 'Arjun Jha',
    role: 'Full Stack Frontend Developer',
    email: 'arjunjha509010@gmail.com',
    phone: '7366873744',
    github: 'https://github.com/ArjunJha-5090',
    linkedin: 'https://www.linkedin.com/in/arjun-jha-191512295/',
    bio: `I am a first-year B.Tech CSE Core student at SRM Institute of Science and Technology, Chennai. I am a Full Stack Frontend Developer with a tech stack including HTML, CSS, JavaScript, React, C, C++, and Python.

In college, I am active in:
- Deputy Head, Alumni Outreach (International Student Chapter - Directorate of International Relations)
- CSI Committee member (Aaruush Technomanagement Fest)
- AARUUSH TECH TEAM - Team Envision
- Member, Directorate of Alumni Affairs
- Contributor, THE HELPERS (SRM's biggest student-run community)

I completed my schooling from Gyan Niketan Patna, where I served as:
- Head Boy (2024-2025)
- Deputy Head Boy (2023-2024)
- House Captain (2022-2023)`,
    projects: [
        { title: 'portfolio-v5', desc: 'Personal high-fidelity 3D portfolio with OS theme.', url: 'https://arjunjha-5090.github.io/portfolio/', tags: 'React, Three.js, Framer' },
        { title: 'meditracker', desc: 'Healthcare application with dashboard and tracking.', url: 'https://medication-tracker-ui-nc51.vercel.app/', tags: 'React, Vite, Tailwind' },
        { title: 'AaruushPortal', desc: 'Technomanagement fest management system.', url: 'WIP', tags: 'React, Node, Supabase' }
    ]
}

function Window({ title, children, onClose, id, activeWindow, setActiveWindow, isMinimized }) {
    const isFocused = activeWindow === id
    const dragControls = useDragControls()

    if (isMinimized) return null

    return (
        <motion.div
            drag
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onPointerDown={() => setActiveWindow(id)}
            className={`os-window ${isFocused ? 'focused' : ''}`}
            style={{ zIndex: isFocused ? 100 : 10 }}
        >
            <div className="window-title" onPointerDown={(e) => {
                if (window.playOsClick) window.playOsClick()
                dragControls.start(e)
            }} style={{ cursor: 'grab', userSelect: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Zap size={14} color="#7aa2f7" />
                    <span>{title}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Minus size={14} style={{ cursor: 'pointer' }} onClick={() => setActiveWindow(null)} />
                    <Maximize2 size={14} style={{ cursor: 'pointer' }} />
                    <X size={14} style={{ cursor: 'pointer' }} onClick={onClose} />
                </div>
            </div>
            <div className="window-content glass-effect">
                {children}
            </div>
        </motion.div>
    )
}

function BootScreen({ onComplete }) {
    const [logs, setLogs] = useState([])
    useEffect(() => {
        const bootLines = [
            "[    0.000000] BIOS: Arjun Jha Elite Edition",
            "[    0.124512] CPU: Distributed Network Core",
            "[    0.452123] MEM: High-speed Neural Cache",
            "[    0.875412] DISK: Persistent Cloud Storage",
            "[    1.564123] INIT: Synchronizing User Identity...",
            "[    1.897451] GPU: Advanced Render Pipeline",
            "[    2.231412] SUCCESS: Elite System Ready."
        ]

        let i = 0
        const interval = setInterval(() => {
            if (i < bootLines.length) {
                setLogs(prev => [...prev, bootLines[i]])
                i++
            } else {
                clearInterval(interval)
                setTimeout(onComplete, 800)
            }
        }, 80)
        return () => clearInterval(interval)
    }, [onComplete])

    return (
        <div style={{ background: '#000', color: '#7aa2f7', padding: '2rem', height: '100%', fontFamily: 'JetBrains Mono, monospace', fontSize: '14px' }}>
            {logs.map((line, idx) => <p key={idx}>{line}</p>)}
        </div>
    )
}

function LoginScreen({ onLogin, userName }) {
    const [isLoggingIn, setIsLoggingIn] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        setIsLoggingIn(true)
        setTimeout(() => {
            onLogin()
        }, 1500)
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="login-screen-elite" style={{
            backgroundColor: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: '100%', width: '100%',
            fontFamily: '"JetBrains Mono", monospace'
        }}>
            <div className="scanline" />
            <div className="login-box-hardware" style={{
                border: '1px solid #333',
                backgroundColor: '#111',
                width: '600px', height: '400px',
                borderRadius: '8px',
                padding: '2rem',
                position: 'relative',
                boxShadow: '0 0 50px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.5)',
                display: 'flex', flexDirection: 'column'
            }}>
                {/* Hardware details */}
                <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: '5px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: isLoggingIn ? '#9ece6a' : '#f7768e' }} />
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#333' }} />
                </div>
                <div style={{ position: 'absolute', top: 10, right: 10, color: '#444', fontSize: '10px' }}>
                    ARJUN_OS.SYS | BUILD 10.4.9
                </div>

                <div style={{ flex: 1, color: '#7aa2f7', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                    <div>
                        <span style={{ color: '#9ece6a' }}>root@arjun-system</span><span style={{ color: '#fff' }}>:~#</span> ./boot_sequence.sh
                    </div>

                    <div style={{ opacity: 0.8, fontSize: '12px' }}>
                        <div>[ OK ] Initializing core microservices...</div>
                        <div>[ OK ] Loading graphic sub-routines...</div>
                        <div>[ OK ] Establishing neural uplink...</div>
                        <div>[ WAIT ] Awaiting user authentication...</div>
                    </div>

                    {!isLoggingIn ? (
                        <form onSubmit={(e) => {
                            if (window.playOsClick) window.playOsClick();
                            handleLogin(e);
                        }} style={{ marginTop: 'auto', borderTop: '1px solid #333', paddingTop: '1rem' }}>
                            <div style={{ color: '#fff', marginBottom: '1rem' }}>USER: {userName}</div>
                            <button type="submit" className="login-btn-elite" style={{
                                backgroundColor: '#7aa2f7', color: '#000', border: 'none',
                                padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer'
                            }}>
                                [ ENTER SYSTEM ]
                            </button>
                        </form>
                    ) : (
                        <div style={{ marginTop: 'auto', borderTop: '1px solid #333', paddingTop: '1rem' }}>
                            <div className="auth-sequence">
                                <motion.div
                                    animate={{
                                        color: ['#f7768e', '#e0af68', '#7aa2f7', '#9ece6a'],
                                        textShadow: ['0 0 8px currentColor', '0 0 4px currentColor', '0 0 8px currentColor', '0 0 10px currentColor']
                                    }}
                                    transition={{ duration: 1.4 }}
                                    style={{ fontSize: '12px', fontWeight: 'bold' }}
                                >
                                    DECRYPTING SECURE PAYLOAD... [ BYPASSING FIREWALL ]
                                </motion.div>
                                <div style={{ width: '100%', height: '4px', background: '#111', marginTop: '12px', borderRadius: '4px', overflow: 'hidden' }}>
                                    <motion.div style={{ height: '100%', background: '#9ece6a', boxShadow: '0 0 10px #9ece6a' }}
                                        initial={{ width: '0%' }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 1.4, ease: 'linear' }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

function ContactForm({ email }) {
    const [status, setStatus] = useState('idle') // idle | sending | success | error
    const [errorMsg, setErrorMsg] = useState('')
    const [form, setForm] = useState({ name: '', email: '', message: '' })

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('sending')
        setErrorMsg('')
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "e2950185-b692-4e48-8d3e-41b2d52cdda8",
                    name: form.name,
                    email: form.email,
                    message: form.message,
                }),
            });
            const result = await response.json();
            if (result.success) {
                setStatus('success')
                setForm({ name: '', email: '', message: '' })
            } else {
                throw new Error(result.message || 'Submission failed')
            }
        } catch (err) {
            setStatus('error')
            setErrorMsg(err.message || 'Transmission failed. Please try again.')
        }
    }

    return (
        <div className="contact-app">
            {status === 'success' ? (
                <div className="success-msg">
                    <ShieldCheck size={48} color="#9ece6a" />
                    <h2>Transmission Successful</h2>
                    <p>Message delivered securely to {email}</p>
                    <button onClick={() => setStatus('idle')}>New Message</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="contact-form-elite">
                    <div className="field">
                        <label>NAME</label>
                        <input name="name" placeholder="Identify yourself..." value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="field">
                        <label>EMAIL</label>
                        <input name="email" type="email" placeholder="Return signal address..." value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="field">
                        <label>MESSAGE</label>
                        <textarea name="message" placeholder="Your transmission..." rows={5} value={form.message} onChange={handleChange} required />
                    </div>
                    {status === 'error' && <p style={{ color: '#f7768e', fontSize: '12px' }}>⚠ {errorMsg}</p>}
                    <button type="submit" disabled={status === 'sending'}>
                        {status === 'sending' ? <><RefreshCw size={16} className="spin" /> TRANSMITTING...</> : <><Send size={16} /> SEND TRANSMISSION</>}
                    </button>
                </form>
            )}
        </div>
    )
}

function MatrixBackground() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        canvas.width = 400
        canvas.height = 400

        const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const fontSize = 10
        const columns = canvas.width / fontSize
        const drops = Array(Math.floor(columns)).fill(1)

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = '#1abc9c'
            ctx.font = fontSize + 'px JetBrains Mono'

            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length))
                ctx.fillText(text, i * fontSize, drops[i] * fontSize)
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0
                }
                drops[i]++
            }
        }
        const interval = setInterval(draw, 33)
        return () => clearInterval(interval)
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                opacity: 0.15,
                borderRadius: '50%',
                pointerEvents: 'none',
                maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)'
            }}
        />
    )
}

function Terminal() {
    const [history, setHistory] = useState([])
    const [input, setInput] = useState('')
    const inputRef = useRef(null)

    useEffect(() => {
        let i = 0;
        const initialText = [
            { text: "Initializing secure connection...", type: "system" },
            { text: "Bypassing mainframe firewalls... [OK]", type: "system" },
            { text: "Access granted. Welcome to Nexus Terminal. Type 'help' to see available commands.", type: "system" }
        ];

        const timer = setInterval(() => {
            if (i < initialText.length) {
                setHistory(prev => [...prev, initialText[i]])
                i++;
            } else {
                clearInterval(timer)
            }
        }, 500)

        // Graceful mobile-safe auto-focus after window animation
        const focusTimer = setTimeout(() => {
            if (inputRef.current) {
                try { inputRef.current.focus() } catch (e) { /* ignore mobile focus block */ }
            }
        }, 600)

        return () => {
            clearInterval(timer)
            clearTimeout(focusTimer)
        }
    }, [])

    const handleCommand = (e) => {
        e.preventDefault()
        const cmdString = input.trim()
        const cmd = cmdString.toLowerCase()
        let response = { text: `Runtime error: Command '${cmd}' not recognized in core.`, type: "error" }

        if (cmd === '') return;

        if (cmd === 'help') response = { text: "Protocol: ls, clear, whoami, github, analyze, ping, sudo, date, matrix, cat <file>, theme <color>", type: "system" }
        else if (cmd === 'ls') response = { text: "arjun_bio.md  projects_db/  contact_form.exe  curriculum_vitae.pdf", type: "file" }
        else if (cmd === 'whoami') response = { text: "Arjun Jha - Elite Developer\nB.Tech CSE Core @ SRMIST", type: "system" }
        else if (cmd === 'github') response = { text: "Opening https://github.com/ArjunJha-5090...", type: "system" }
        else if (cmd === 'analyze') response = { text: "[ OK ] CPU: Optimal. [ OK ] MEMORY: Secure. [ OK ] THREAT LEVEL: Zero.", type: "system" }
        else if (cmd === 'ping') response = { text: "Pinging root network... 12ms latency. Connection stable.", type: "system" }
        else if (cmd === 'sudo') response = { text: `user is not in the sudoers file. This incident will be reported to the Architect.`, type: "error" }
        else if (cmd === 'date') response = { text: new Date().toString(), type: "system" }
        else if (cmd === 'matrix') response = { text: "Wake up Neo...\nThe Matrix has you.\nFollow the white rabbit.", type: "system" }
        else if (cmd.startsWith('cat ')) {
            const file = cmdString.substring(4).trim();
            if (file === 'arjun_bio.md') response = { text: "Name: Arjun Jha\nDesignation: Full Stack Developer\nStatus: Online & Ready for Deployment.", type: "file" }
            else if (file === 'contact_form.exe') response = { text: "Warning: Binary file. Cannot render in text mode.", type: "error" }
            else response = { text: `cat: ${file}: No such file or directory`, type: "error" }
        }
        else if (cmd.startsWith('theme ')) {
            const color = cmdString.substring(6).trim();
            const validColors = {
                'red': '#f7768e', 'green': '#9ece6a', 'blue': '#7aa2f7',
                'yellow': '#e0af68', 'purple': '#bb9af7', 'cyan': '#7dcfff'
            }
            if (validColors[color.toLowerCase()]) {
                document.documentElement.style.setProperty('--os-accent', validColors[color.toLowerCase()]);
                response = { text: `System theme dynamically updated to ${color.toUpperCase()}.`, type: "system" }
            } else {
                response = { text: `Invalid theme color. Available: red, green, blue, yellow, purple, cyan.`, type: "error" }
            }
        }
        else if (cmd === 'clear') { setHistory([]); setInput(''); return; }

        setHistory(prev => [...prev, { text: `root@elite-os:# ${cmdString}`, type: "input" }, response])
        setInput('')
        if (cmd === 'github') window.open('https://github.com/ArjunJha-5090', '_blank')
    }

    return (
        <div className="terminal-elite">
            <div className="terminal-history">
                {history.map((line, i) => <p key={i} className={line.type}>{line.text}</p>)}
            </div>
            <form onSubmit={handleCommand} className="terminal-input-row">
                <span># </span>
                <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} />
            </form>
        </div>
    )
}

function VirtualOSInner() {
    const [stage, setStage] = useState('boot')
    const [userData] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : DEFAULT_USER
    })
    const [openWindows, setOpenWindows] = useState([])
    const [activeWindow, setActiveWindow] = useState(null)
    const [time, setTime] = useState(new Date())
    const [hexString, setHexString] = useState('0x000000')
    const [matrixStreams, setMatrixStreams] = useState([])
    const [showWipAlert, setShowWipAlert] = useState(false)

    useEffect(() => {
        // Welcome Voice Note on initial desktop load
        if (stage === 'desktop') {
            try {
                const msg = new SpeechSynthesisUtterance("Welcome to Nexus Prime. Architect systems are online.");
                msg.rate = 1.0;
                msg.pitch = 0.8;
                msg.volume = 0.6;
                // Optional: Try to find a specific robotic voice if available
                const voices = window.speechSynthesis.getVoices();
                const engVoice = voices.find(v => v.lang.includes('en') && v.name.includes('Google')) || voices[0];
                if (engVoice) msg.voice = engVoice;
                window.speechSynthesis.speak(msg);
            } catch {
                // Ignore if browser blocks auto-play
            }
        }
    }, [stage])

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
            setHexString('0x' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0'))
            setMatrixStreams(prev => {
                const newStream = Array.from({ length: 4 }, () =>
                    Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0')
                ).join(':');
                return [...prev.slice(-2), `NET_OP[${newStream}]`]
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    // SFX
    const clickAudio = useRef(null)
    useEffect(() => {
        clickAudio.current = new Audio('/sounds/click.mp3')
        clickAudio.current.volume = 1.0
    }, [])

    const playClick = useCallback(() => {
        if (!clickAudio.current) return
        clickAudio.current.currentTime = 0
        clickAudio.current.play().catch(() => { })
    }, [])

    // Expose globally so Login screen can trigger it without prop drilling
    useEffect(() => {
        window.playOsClick = playClick;
        return () => { delete window.playOsClick; }
    }, [playClick])

    const icons = [
        { id: 'about', name: 'Identity.md', icon: <User /> },
        { id: 'projects', name: 'Repo.db', icon: <Folder /> },
        { id: 'contact', name: 'Connect.exe', icon: <Send /> },
        { id: 'terminal', name: 'Terminal', icon: <TerminalIcon /> },
        { id: 'music', name: 'Atmosphere', icon: <Activity /> }
    ]

    const toggleWindow = (id) => {
        if (openWindows.includes(id)) setActiveWindow(id)
        else { setOpenWindows([...openWindows, id]); setActiveWindow(id); }
    }

    const closeWindow = (id) => {
        setOpenWindows(openWindows.filter(w => w !== id))
        if (activeWindow === id) setActiveWindow(null)
    }

    if (stage === 'boot') return <BootScreen onComplete={() => setStage('login')} />
    if (stage === 'login') return <LoginScreen onLogin={() => setStage('desktop')} userName={userData.name} />

    return (
        <div className="os-container-elite">
            <div className="scanline" />

            <div className="os-header-elite glass-effect">
                <div className="header-left" style={{ cursor: 'pointer' }} onClick={() => setStage('login')}>
                    <Zap size={16} color="#7aa2f7" />
                    <span className="elite-name">ARJUN JHA // <strong style={{ color: '#f7768e', textShadow: '0 0 5px #f7768e' }}>NEXUS PRIME OVERRIDE</strong></span>
                </div>
                <div className="header-right">
                    <div className="network-stats">
                        <span className="stat">LATENCY: 12ms</span>
                        <span className="stat">SIGNAL: 100%</span>
                    </div>
                    <span className="elite-time">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                </div>
            </div>

            <div className="os-desktop-elite">
                {/* CENTER WIDGET */}
                <div className="center-widget">
                    <MatrixBackground />
                    <div className="center-widget-content glass-effect">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ display: 'flex' }}
                        >
                            <Cpu size={48} color="var(--os-accent)" />
                        </motion.div>
                        <div className="rings">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="ring r1" />
                            <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="ring r2" />
                            <motion.div animate={{ rotate: 180 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} className="ring r3" />
                            <motion.div animate={{ rotate: -180, scale: [1, 1.05, 1] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} className="ring r2" style={{ border: '1px solid rgba(247, 118, 142, 0.3)' }} />
                        </div>
                        <div className="widget-text" style={{ position: 'absolute', top: '110%', left: '50%', transform: 'translateX(-50%)', width: '300px', bottom: 'auto' }}>
                            <h3>CORE SYSTEM ACTIVE</h3>
                            <p style={{ fontFamily: 'JetBrains Mono', color: '#9ece6a', margin: '4px 0', fontSize: '12px' }}>ADDR: {hexString}</p>
                            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#7aa2f7', opacity: 0.8, marginTop: '8px' }}>
                                {matrixStreams.map((s, i) => <div key={i}>{s}</div>)}
                                <div className="blink-cursor" style={{ display: 'inline-block', width: '8px', height: '12px', background: '#7aa2f7', marginTop: '4px' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="desktop-icons-elite">
                    {icons.map((item) => (
                        <div key={item.id} className="elite-icon" onClick={() => {
                            if (window.playOsClick) window.playOsClick();
                            toggleWindow(item.id);
                        }}>
                            <div className="icon-box glass-effect">{item.icon}</div>
                            <span>{item.name}</span>
                        </div>
                    ))}

                    <div className="divider" />

                    <div className="social-box glass-effect">
                        <a href={userData.github} target="_blank" rel="noreferrer"><GithubIcon size={20} /></a>
                        <a href={userData.linkedin} target="_blank" rel="noreferrer"><Linkedin size={20} /></a>
                        <a href={`mailto:${userData.email}`}><Mail size={20} /></a>
                    </div>
                </div>

                {/* Dashboard Sidebar */}
                <div className="elite-dashboard glass-effect">
                    <div className="dash-section">
                        <h5>SYSTEM RESOURCE</h5>
                        <div className="dash-bar"><span>CPU</span><motion.div animate={{ width: ['10%', '60%', '30%'] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ backgroundColor: '#f7768e' }} /></div>
                        <div className="dash-bar"><span>MEM</span><motion.div animate={{ width: '45%' }} transition={{ duration: 0 }} style={{ backgroundColor: '#e0af68' }} /></div>
                        <div className="dash-bar"><span>NET</span><motion.div animate={{ width: ['2%', '80%', '5%'] }} transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }} style={{ backgroundColor: '#7dcfff' }} /></div>
                    </div>
                    <div className="dash-section">
                        <h5>IDENTITY LOCK</h5>
                        <p>STATUS: <span style={{ color: '#9ece6a' }}>SECURE</span></p>
                        <p>ACCESS: ARCHITECT</p>
                    </div>
                    <div className="dash-section contact-mini">
                        <h5>CONTACT DATA</h5>
                        <p><Phone size={12} /> {userData.phone}</p>
                        <p><Mail size={12} /> {userData.email}</p>
                    </div>

                    <div className="dash-section ai-blueprint" style={{ marginTop: 'auto', textAlign: 'center', opacity: 0.8 }}>
                        <h5 style={{ marginBottom: '0.5rem' }}>NEURAL SIGNATURE</h5>
                        <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--os-accent)', boxShadow: '0 0 15px rgba(122, 162, 247, 0.2)' }}>
                            <img src="/blueprint_face.png" alt="AI Neural Blueprint" style={{ width: '100%', height: 'auto', display: 'block', filter: 'hue-rotate(15deg) contrast(1.2)' }} />
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {openWindows.map(id => (
                        <Window
                            key={id} id={id}
                            title={icons.find(i => i.id === id)?.name || id}
                            activeWindow={activeWindow} setActiveWindow={setActiveWindow}
                            onClose={() => closeWindow(id)}
                        >
                            {id === 'about' && (
                                <div className="markdown-elite about-layout">
                                    <div className="about-image-container glass-effect">
                                        <img src={userData.avatar_url || "/profile.jpg"} alt={userData.name} className="profile-image" onError={(e) => { e.target.src = 'https://github.com/identicons/arjunjha.png' }} />
                                    </div>
                                    <div className="about-text-content">
                                        <div className="tech-pills" style={{ marginBottom: '1.5rem' }}>
                                            {['HTML', 'CSS', 'JavaScript', 'React', 'C', 'C++', 'Python'].map(t => <span key={t}>{t}</span>)}
                                        </div>
                                        <h1>{userData.name.toUpperCase()}</h1>
                                        <h4>SRM Institute of Science and Technology // Chennai</h4>
                                        <h5 style={{ color: 'var(--os-accent)', marginTop: '4px', marginBottom: '1rem', letterSpacing: '2px', opacity: 0.8 }}>2025-2029</h5>
                                        <p className="bio-text">{userData.bio}</p>
                                    </div>
                                </div>
                            )}
                            {id === 'projects' && (
                                <div className="repo-explorer">
                                    {userData.projects.map((p, i) => (
                                        <div key={i} className="repo-card glass-effect" onClick={() => {
                                            if (p.url === 'WIP') {
                                                if (window.playOsClick) window.playOsClick();
                                                setShowWipAlert(true);
                                            } else if (p.url && p.url !== '#') {
                                                if (window.playOsClick) window.playOsClick();
                                                window.open(p.url, '_blank');
                                            }
                                        }}>
                                            <div className="repo-header">
                                                <Folder size={20} color="#7aa2f7" />
                                                <h3>{p.title}</h3>
                                            </div>
                                            <p>{p.desc}</p>
                                            <div className="repo-tags">
                                                {(p.tags || 'React').split(',').map(t => <span key={t}>{t.trim()}</span>)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {id === 'contact' && <ContactForm email={userData.email} />}
                            {id === 'terminal' && <Terminal />}

                            {id === 'music' && (
                                <div className="music-v3" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div className="visualizer-v3" style={{ height: '60px' }}>
                                        {[...Array(20)].map((_, i) => <motion.div key={i} animate={{ scaleY: [0.1, 1, 0.1] }} transition={{ duration: 0.5 + i * 0.05, repeat: Infinity }} />)}
                                    </div>
                                    <h3 style={{ textAlign: 'center', color: 'var(--os-accent)', letterSpacing: '2px', fontSize: '12px' }}>ATMOSPHERE_SYNCH.SYSTEM</h3>
                                    <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(122, 162, 247, 0.2)', minHeight: '350px' }}>
                                        <iframe style={{ borderRadius: '12px', width: '100%', height: '352px' }} src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                                    </div>
                                </div>
                            )}
                        </Window>
                    ))}
                </AnimatePresence>
            </div>

            <div className="elite-taskbar glass-effect">
                <div className="taskbar-inner">
                    <div className="taskbar-start glass-effect"><Zap size={20} color="#7aa2f7" /></div>
                    <div className="taskbar-slots">
                        {openWindows.map(id => (
                            <motion.div
                                layoutId={id} key={id}
                                className={`task-slot glass-effect ${activeWindow === id ? 'active' : ''}`}
                                onClick={() => {
                                    if (window.playOsClick) window.playOsClick();
                                    setActiveWindow(id);
                                }}
                            >
                                {icons.find(i => i.id === id)?.icon}
                            </motion.div>
                        ))}
                    </div>
                    <div className="taskbar-uptime">
                        UPTIME: 99.99%
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showWipAlert && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9998, pointerEvents: 'auto' }}
                            onClick={() => setShowWipAlert(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: '-50%', x: '-50%' }}
                            animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
                            exit={{ opacity: 0, scale: 0.8, y: '-50%', x: '-50%' }}
                            style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 9999, background: 'rgba(10, 10, 15, 0.95)', border: '1px solid #f7768e', boxShadow: '0 0 30px rgba(247, 118, 142, 0.3)', padding: '2rem', borderRadius: '12px', textAlign: 'center', color: '#f7768e', fontFamily: 'JetBrains Mono', minWidth: '350px' }}
                        >
                            <Lock size={48} style={{ marginBottom: '1rem', color: '#f7768e' }} />
                            <h2 style={{ margin: '0 0 1rem 0', letterSpacing: '2px' }}>ACCESS DENIED</h2>
                            <p style={{ opacity: 0.9, color: '#c0caf5', marginBottom: '2rem', fontSize: '14px' }}>WORK UNDER PROCESS:<br />This project is currently in development.</p>
                            <button
                                onClick={() => {
                                    if (window.playOsClick) window.playOsClick();
                                    setShowWipAlert(false);
                                }}
                                style={{ background: 'transparent', border: '1px solid #f7768e', color: '#f7768e', padding: '0.5rem 2rem', cursor: 'pointer', fontFamily: 'inherit', borderRadius: '4px', letterSpacing: '1px' }}
                                onMouseOver={(e) => { e.target.style.background = '#f7768e'; e.target.style.color = '#000'; }}
                                onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#f7768e'; }}
                            >
                                ACKNOWLEDGE
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }
    static getDerivedStateFromError(error) {
        console.error("ErrorBoundary caught an error:", error);
        return { hasError: true, error }
    }
    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', color: '#f7768e', background: '#000', minHeight: '100vh', fontFamily: '"JetBrains Mono", monospace', overflow: 'auto' }}>
                    <h2>SYSTEM FAILURE</h2>
                    <p style={{ opacity: 0.7 }}>A critical error occurred in the window manager.</p>
                    <pre style={{ background: '#111', padding: '1rem', marginTop: '1rem', border: '1px solid #333', fontSize: '11px', whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br /><br />
                        {this.state.error && this.state.error.stack}
                    </pre>
                </div>
            )
        }
        return this.props.children
    }
}

export default function VirtualOS() {
    return (
        <ErrorBoundary>
            <VirtualOSInner />
        </ErrorBoundary>
    )
}
