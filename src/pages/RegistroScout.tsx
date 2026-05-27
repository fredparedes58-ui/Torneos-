import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, ChevronRight, ChevronLeft, User, Building2, Mail, Phone,
  MapPin, Award, Target, Video, BarChart3, Upload,
  Play, Bell, Sparkles as SparkIcon, Shield, Crown, Eye,
} from 'lucide-react';
import FloatingOrbs from '../components/effects/FloatingOrbs';
import Sparkles from '../components/effects/Sparkles';
import Avatar from '../components/effects/Avatar';

type Tipo = 'individual' | 'empresa';

interface FormData {
  tipo: Tipo;
  // Individual
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  licencia: string;
  // Empresa
  razonSocial: string;
  cif: string;
  contacto: string;
  web: string;
  // Especialización
  categorias: string[];
  regiones: string[];
  posiciones: string[];
  // Suscripción
  plan: 'free' | 'pro' | 'enterprise';
}

const categorias = ['Sub-13','Sub-15','Sub-17','Sub-19','Sub-21','Senior'];
const regiones = ['Cataluña','Madrid','C. Valenciana','Andalucía','País Vasco','Castilla y León','Cantabria','Asturias','Balears'];
const posiciones = ['Portero','Defensa','Mediocampista','Delantero','Comodín'];

const planes = [
  {
    value: 'free', label: 'Free', precio: '€0',
    color: '#8FA3C0',
    desc: 'Acceso al catalogo publico y 3 reports IA al mes.',
    features: ['Catalogo nacional', '3 informes IA/mes', 'Streaming basico'],
  },
  {
    value: 'pro', label: 'Pro', precio: '€49/mes',
    color: '#22D3EE',
    desc: 'Para scouts individuales activos. Acceso completo + publicacion.',
    features: ['Todo Free', 'Informes IA ilimitados', 'Publica tus videos + analisis', 'Notificaciones jugadores objetivo', 'Heatmaps PHV', 'Export PDF/CSV'],
    popular: true,
  },
  {
    value: 'enterprise', label: 'Enterprise', precio: '€499/mes',
    color: '#A855F7',
    desc: 'Para clubes y agencias. Team + integraciones.',
    features: ['Todo Pro', '10 cuentas scout', 'API integraciones', 'Soporte dedicado', 'White-label opcional'],
  },
];

const steps = ['Tipo', 'Datos', 'Especializacion', 'Plan', 'Confirmacion'];

export default function RegistroScout() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<FormData>({
    tipo: 'individual',
    nombre: '', apellidos: '', email: '', telefono: '', licencia: '',
    razonSocial: '', cif: '', contacto: '', web: '',
    categorias: ['Sub-17'], regiones: ['Cataluña'], posiciones: [],
    plan: 'pro',
  });

  const update = (key: keyof FormData, value: any) => setForm(f => ({ ...f, [key]: value }));
  const toggleArr = (key: 'categorias' | 'regiones' | 'posiciones', value: string) => {
    setForm(f => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter(v => v !== value) : [...f[key], value],
    }));
  };

  const planSelected = planes.find(p => p.value === form.plan)!;
  const nombreCuenta = form.tipo === 'individual'
    ? `${form.nombre} ${form.apellidos}`.trim() || 'Scout'
    : form.razonSocial || 'Tu empresa';

  // ━━━━━━━ DONE state: Portal Scout preview ━━━━━━━
  if (done) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <FloatingOrbs variant="green" intensity="medium" />

        <div className="relative p-4 md:p-8 max-w-[1400px] mx-auto space-y-8">
          {/* Welcome banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-3xl border border-[#22D3EE] bg-gradient-to-br from-[#0E2F3A] via-[#152849] to-[#1E3560] p-8 md:p-12 overflow-hidden glow-cyan-lg"
          >
            <Sparkles count={20} color="#22D3EE" />
            <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#22D3EE] opacity-20 blur-[100px]" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#A855F7] opacity-20 blur-[100px]" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-[#22D3EE] flex items-center justify-center shrink-0 glow-cyan-lg">
                <CheckCircle2 size={42} className="text-[#0A1628]" />
              </div>
              <div className="flex-1">
                <span className="label-caps text-[#84FF6E] mb-2 block">Cuenta activada</span>
                <h1 className="headline-mega text-4xl md:text-6xl gradient-text-cream leading-[0.9] mb-3">
                  Bienvenido<span className="italic-accent">,<br />{nombreCuenta}.</span>
                </h1>
                <p className="text-base text-[#CBDDF0] font-body max-w-2xl">
                  Tu cuenta {form.tipo === 'individual' ? 'individual' : 'empresarial'} esta lista. Plan <strong className="text-[#22D3EE]">{planSelected.label}</strong>. Cubres {form.categorias.length} categorias en {form.regiones.length} regiones.
                </p>
              </div>
              <div className="text-right hidden md:block">
                <Avatar seed={form.tipo === 'individual' ? 47 : 23} size={72} ring="lime" />
                <p className="label-caps text-[#22D3EE] mt-2">ID #SCT-{Math.floor(Math.random() * 9000 + 1000)}</p>
              </div>
            </div>
          </motion.div>

          {/* Portal Scout preview */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          >
            <span className="label-caps text-[#22D3EE] mb-2 block flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE] pulse-dot" />
              Portal Scout · Tu acceso ahora
            </span>
            <h2 className="headline-mega text-3xl md:text-5xl gradient-text-cream mb-6">
              Que puedes hacer.
            </h2>
          </motion.div>

          {/* 4 capabilities grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            initial="hidden" animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          >
            {[
              { icon: Video,      title: 'Videos auto-generados',  desc: 'Highlights de cada partido del torneo generados por IA. Disponibles en tiempo real.', color: '#22D3EE', count: '142', countLabel: 'clips esta semana' },
              { icon: BarChart3,  title: 'Informes IA',             desc: 'Reportes tecnicos por jugador con correccion PHV, heatmaps y estadisticas avanzadas.', color: '#84FF6E', count: '38',  countLabel: 'jugadores nuevos hoy' },
              { icon: Upload,     title: 'Publica tu contenido',    desc: 'Sube tus propios videos y analisis. Visibles para tu red o publicos segun configuracion.', color: '#FCD34D', count: '0',    countLabel: 'tus publicaciones' },
              { icon: Bell,       title: 'Alertas inteligentes',    desc: 'Te avisamos cuando un jugador de tu radar marca, lesiona o cambia de equipo.',         color: '#A855F7', count: '6',    countLabel: 'jugadores en seguimiento' },
            ].map(c => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.title}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
                  className="relative glass-card rounded-2xl p-5 hover:border-[#22D3EE]/40 transition-all group overflow-hidden"
                >
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity"
                       style={{ background: c.color }} />
                  <div className="stat-ring mb-4" style={{ color: c.color, background: c.color + '15' }}>
                    <Icon size={26} />
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-white uppercase tracking-tight mb-2 leading-tight">{c.title}</h3>
                  <p className="text-xs text-[#CBDDF0] leading-relaxed mb-4">{c.desc}</p>
                  <div className="pt-3 border-t border-[#2A4570]">
                    <p className="font-mono font-bold text-2xl" style={{ color: c.color }}>{c.count}</p>
                    <p className="label-caps text-[#8FA3C0] text-[10px] mt-1">{c.countLabel}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Recent videos preview */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="label-caps text-[#8FA3C0] block mb-1">Generados hoy</span>
                <h2 className="headline-mega text-3xl text-white">
                  Highlights <span className="italic-accent">con IA</span>
                </h2>
              </div>
              <button className="label-caps text-[#22D3EE] flex items-center gap-1.5 hover:gap-2.5 transition-all">
                Ver todos <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { titulo: 'GOLAZO de chilena · Marc Bellini',     torneo: 'MIC Football',        duracion: '0:45', visualizaciones: '1.2k', color: '#22D3EE' },
                { titulo: 'Triplete Marcus Vane vs Atletico Sur', torneo: 'Liga Invierno 2026',  duracion: '1:12', visualizaciones: '893',  color: '#84FF6E' },
                { titulo: 'Atajada milagrosa · Axel Drake',       torneo: 'Bilbao Intl. Cup',    duracion: '0:32', visualizaciones: '562',  color: '#A855F7' },
              ].map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.08 }}
                  className="rounded-2xl overflow-hidden border border-[#2A4570] bg-[#152849] hover:border-[#22D3EE] transition-all duration-400 group cursor-pointer"
                >
                  <div className="aspect-video relative pitch-bg overflow-hidden">
                    <div className="absolute inset-0 stadium-overlay" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="play-btn" aria-label="Play">
                        <Play size={22} fill="currentColor" />
                      </button>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-full bg-[#0A1628]/80 backdrop-blur text-[10px] font-mono font-bold uppercase tracking-wider"
                            style={{ color: v.color, border: `1px solid ${v.color}60` }}>
                        IA · {v.torneo}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-[#0A1628]/80 backdrop-blur text-[10px] font-mono font-bold text-white">
                      {v.duracion}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-base text-white uppercase tracking-tight leading-tight mb-2 group-hover:text-[#22D3EE] transition-colors">
                      {v.titulo}
                    </h3>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#8FA3C0]">
                      <span className="flex items-center gap-1"><Eye size={10} /> {v.visualizaciones}</span>
                      <span>Auto-generado</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Upload your own */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="rounded-2xl border-2 border-dashed border-[#22D3EE]/40 bg-gradient-to-br from-[#0E2F3A] to-[#152849] p-8 md:p-12 text-center hover:border-[#22D3EE] transition-colors cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#22D3EE]/15 border border-[#22D3EE]/50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload size={28} className="text-[#22D3EE]" />
            </div>
            <h3 className="headline-mega text-2xl md:text-3xl gradient-text-cream mb-2">
              Sube tu primer analisis
            </h3>
            <p className="text-sm text-[#CBDDF0] max-w-md mx-auto mb-4">
              Comparte tus videos, informes en PDF o notas tecnicas. La comunidad de {planSelected.label === 'Free' ? '500+' : '2.4k+'} scouts los descubrira.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono text-[#8FA3C0]">
              <span className="px-2 py-0.5 rounded-full border border-[#2A4570]">MP4 hasta 2GB</span>
              <span className="px-2 py-0.5 rounded-full border border-[#2A4570]">PDF hasta 25MB</span>
              <span className="px-2 py-0.5 rounded-full border border-[#2A4570]">Markdown</span>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/portal"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl cta-neon label-caps glow-cyan hover:scale-[1.03] transition-transform btn-shimmer relative overflow-hidden"
              >
                <span className="relative z-[1]">Entrar al Portal Scout →</span>
              </Link>
              <button
                onClick={() => { setDone(false); setStep(0); }}
                className="inline-flex items-center gap-2 text-xs text-[#8FA3C0] hover:text-white transition-colors"
              >
                <ChevronLeft size={12} /> Volver al inicio
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ━━━━━━━ Wizard ━━━━━━━
  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingOrbs variant="green" intensity="subtle" />

      <div className="relative p-4 md:p-8 max-w-3xl mx-auto">
        {/* Hero header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <span className="label-caps text-[#22D3EE] mb-3 flex items-center gap-2 text-glow-cyan">
            <span className="w-2 h-2 rounded-full bg-[#22D3EE] pulse-dot" />
            Acceso scouting · Krujens
          </span>
          <h1 className="headline-mega text-5xl md:text-7xl leading-[0.85]">
            <span className="gradient-text-cream">Registro</span>
            <br />
            <span className="italic-accent">Scout / Empresa.</span>
          </h1>
          <p className="text-base text-[#CBDDF0] mt-4 max-w-xl">
            Crea tu cuenta y accede al <strong className="text-white">Portal Scout</strong>: videos auto-generados, informes IA y publicacion de tu propio contenido.
          </p>
        </motion.div>

        {/* Stepper */}
        <div className="flex items-center gap-0 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1">
                <div className={[
                  'w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono font-bold border-2 transition-all',
                  i < step   ? 'bg-[#22D3EE] border-[#22D3EE] text-[#0A1628] glow-cyan' :
                  i === step ? 'border-[#22D3EE] text-[#22D3EE] bg-[#0E2F3A] glow-cyan' :
                               'border-[#496588] text-[#8FA3C0] bg-[#152849]',
                ].join(' ')}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={['text-[9px] font-medium uppercase tracking-wider whitespace-nowrap', i === step ? 'text-[#22D3EE]' : 'text-[#8FA3C0]'].join(' ')}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={['flex-1 h-px mx-2 mb-4', i < step ? 'bg-[#22D3EE]' : 'bg-[#496588]'].join(' ')} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="glass-card-bright rounded-2xl p-6 md:p-8"
          >
            {/* Step 0: tipo */}
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="headline-mega text-2xl text-white">Que tipo de cuenta necesitas?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { value: 'individual' as const, icon: User,      title: 'Soy un scout', desc: 'Cuenta individual para analistas, ojeadores y profesionales independientes.', color: '#22D3EE' },
                    { value: 'empresa' as const,    icon: Building2, title: 'Soy una empresa', desc: 'Cuenta corporativa para clubes, academias y agencias de scouting.', color: '#A855F7' },
                  ].map(o => {
                    const Icon = o.icon;
                    const active = form.tipo === o.value;
                    return (
                      <button key={o.value} onClick={() => update('tipo', o.value)}
                        className={['text-left p-5 rounded-2xl border-2 transition-all',
                          active ? 'border-current bg-[#0E2F3A] glow-cyan' : 'border-[#496588] bg-[#152849] hover:border-[#22D3EE]/50'].join(' ')}
                        style={{ color: active ? o.color : undefined }}>
                        <Icon size={32} className="mb-3" style={{ color: o.color }} />
                        <h3 className="font-display font-extrabold text-xl uppercase tracking-tight mb-1" style={{ color: active ? o.color : '#FFFFFF' }}>
                          {o.title}
                        </h3>
                        <p className="text-xs text-[#CBDDF0]">{o.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 1: datos */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="headline-mega text-2xl text-white">
                  {form.tipo === 'individual' ? 'Datos personales' : 'Datos de la empresa'}
                </h2>
                {form.tipo === 'individual' ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Nombre" value={form.nombre} onChange={v => update('nombre', v)} placeholder="Marcos" icon={<User size={14} />} />
                      <Field label="Apellidos" value={form.apellidos} onChange={v => update('apellidos', v)} placeholder="García Pérez" />
                    </div>
                    <Field label="Email *" value={form.email} onChange={v => update('email', v)} placeholder="scout@ejemplo.com" type="email" icon={<Mail size={14} />} />
                    <Field label="Teléfono" value={form.telefono} onChange={v => update('telefono', v)} placeholder="+34 600 000 000" type="tel" icon={<Phone size={14} />} />
                    <Field label="Licencia / Credencial Scout" value={form.licencia} onChange={v => update('licencia', v)} placeholder="UEFA Scout #12345 (opcional)" icon={<Shield size={14} />} />
                  </>
                ) : (
                  <>
                    <Field label="Razón Social *" value={form.razonSocial} onChange={v => update('razonSocial', v)} placeholder="FC Barcelona S.A.D." icon={<Building2 size={14} />} />
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="CIF *" value={form.cif} onChange={v => update('cif', v)} placeholder="A12345678" />
                      <Field label="Sitio web" value={form.web} onChange={v => update('web', v)} placeholder="fcbarcelona.com" />
                    </div>
                    <Field label="Email de contacto *" value={form.email} onChange={v => update('email', v)} placeholder="scouting@empresa.com" type="email" icon={<Mail size={14} />} />
                    <Field label="Persona de contacto" value={form.contacto} onChange={v => update('contacto', v)} placeholder="Director Deportivo" icon={<User size={14} />} />
                  </>
                )}
              </div>
            )}

            {/* Step 2: Especialización */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="headline-mega text-2xl text-white">Qué cubres en tu scouting?</h2>

                <ChipSelect
                  label="Categorías"
                  icon={<Award size={13} />}
                  options={categorias}
                  selected={form.categorias}
                  toggle={v => toggleArr('categorias', v)}
                  color="#22D3EE"
                />
                <ChipSelect
                  label="Regiones"
                  icon={<MapPin size={13} />}
                  options={regiones}
                  selected={form.regiones}
                  toggle={v => toggleArr('regiones', v)}
                  color="#A855F7"
                />
                <ChipSelect
                  label="Posiciones de interés"
                  icon={<Target size={13} />}
                  options={posiciones}
                  selected={form.posiciones}
                  toggle={v => toggleArr('posiciones', v)}
                  color="#84FF6E"
                />
              </div>
            )}

            {/* Step 3: Plan */}
            {step === 3 && (
              <div className="space-y-5">
                <h2 className="headline-mega text-2xl text-white">Elige tu plan</h2>
                <div className="space-y-3">
                  {planes.map(p => {
                    const active = form.plan === p.value;
                    return (
                      <button key={p.value} onClick={() => update('plan', p.value as any)}
                        className={['relative w-full text-left p-5 rounded-2xl border-2 transition-all overflow-hidden',
                          active ? 'border-current bg-[#0E2F3A]' : 'border-[#496588] bg-[#152849] hover:border-[#22D3EE]/50'].join(' ')}
                        style={{ color: active ? p.color : undefined }}>
                        {p.popular && (
                          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#22D3EE] text-[#0A1628] text-[9px] font-mono font-bold uppercase tracking-widest">
                            Más popular
                          </span>
                        )}
                        <div className="flex items-center gap-3 mb-2">
                          {p.value === 'enterprise' ? <Crown size={20} style={{ color: p.color }} /> :
                           p.value === 'pro'        ? <SparkIcon size={20} style={{ color: p.color }} /> :
                                                      <Shield size={20} style={{ color: p.color }} />}
                          <h3 className="font-display font-extrabold text-xl uppercase tracking-tight" style={{ color: active ? p.color : '#FFFFFF' }}>
                            {p.label}
                          </h3>
                          <span className="ml-auto font-mono font-bold text-lg" style={{ color: p.color }}>{p.precio}</span>
                        </div>
                        <p className="text-xs text-[#CBDDF0] mb-3 ml-8">{p.desc}</p>
                        <ul className="ml-8 space-y-1">
                          {p.features.map(f => (
                            <li key={f} className="text-[11px] text-[#CBDDF0] flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full" style={{ background: p.color }} />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Confirmación */}
            {step === 4 && (
              <div className="text-center py-4">
                <div className="w-20 h-20 rounded-2xl bg-[#0E2F3A] border-2 border-[#22D3EE] flex items-center justify-center mx-auto mb-5 glow-cyan">
                  <Shield size={36} className="text-[#22D3EE]" />
                </div>
                <h2 className="headline-mega text-3xl gradient-text-cream mb-2">Casi listo.</h2>
                <p className="text-sm text-[#CBDDF0] mb-6 max-w-md mx-auto">
                  Revisa el resumen antes de activar tu cuenta.
                </p>
                <div className="rounded-2xl border border-[#2A4570] bg-[#0A1628]/60 p-5 text-left space-y-3 mb-6">
                  <Resumen k="Tipo de cuenta"      v={form.tipo === 'individual' ? 'Scout individual' : 'Empresa / Club'} />
                  <Resumen k={form.tipo === 'individual' ? 'Nombre' : 'Razón Social'} v={nombreCuenta} />
                  <Resumen k="Email"               v={form.email || '—'} />
                  <Resumen k="Categorías"          v={form.categorias.join(', ') || '—'} />
                  <Resumen k="Regiones"            v={form.regiones.join(', ') || '—'} />
                  <Resumen k="Posiciones"          v={form.posiciones.join(', ') || 'Todas'} />
                  <Resumen k="Plan"                v={`${planSelected.label} · ${planSelected.precio}`} accent={planSelected.color} />
                </div>
                <button onClick={() => setDone(true)}
                  className="relative w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl cta-neon font-display font-extrabold text-xl uppercase tracking-wider glow-cyan-lg hover:scale-[1.02] active:scale-[0.98] transition-all btn-shimmer overflow-hidden">
                  <Sparkles count={6} color="#0A1628" />
                  <span className="relative z-[1]">Activar cuenta</span>
                </button>
                <p className="text-[10px] font-mono text-[#8FA3C0] mt-3">
                  Al activar aceptas los Términos de Servicio + Política de Datos (RGPD + LO 8/2021)
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        {step < 4 && (
          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[#8FA3C0] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <ChevronLeft size={14} /> Atrás
            </button>
            <button onClick={() => setStep(s => Math.min(4, s + 1))}
              disabled={(step === 1 && form.tipo === 'individual' && !form.nombre.trim()) ||
                        (step === 1 && form.tipo === 'empresa' && !form.razonSocial.trim()) ||
                        (step === 1 && !form.email.trim())}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg cta-neon label-caps disabled:opacity-30 disabled:cursor-not-allowed transition-opacity glow-cyan">
              Siguiente <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ━━━━━━━ Helpers ━━━━━━━

function Field({ label, value, onChange, placeholder, type = 'text', icon }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; icon?: React.ReactNode }) {
  return (
    <div>
      <label className="label-caps text-[#8FA3C0] mb-2 flex items-center gap-1.5">
        {icon}{label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0A1628] border border-[#496588] rounded-lg px-4 py-3 text-sm text-white placeholder-[#8FA3C0] focus:outline-none focus:border-[#22D3EE] transition-colors"
      />
    </div>
  );
}

function ChipSelect({ label, icon, options, selected, toggle, color }: { label: string; icon: React.ReactNode; options: string[]; selected: string[]; toggle: (v: string) => void; color: string }) {
  return (
    <div>
      <label className="label-caps text-[#8FA3C0] mb-2 flex items-center gap-1.5">
        {icon}{label} <span className="text-[#496588]">· {selected.length} seleccionada{selected.length !== 1 ? 's' : ''}</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map(o => {
          const active = selected.includes(o);
          return (
            <button key={o} onClick={() => toggle(o)}
              className={['px-3 py-1.5 rounded-full text-xs font-mono border transition-all',
                active ? '' : 'bg-transparent text-[#CBDDF0] border-[#496588] hover:border-[#22D3EE]/50 hover:text-white'].join(' ')}
              style={active ? { background: color, color: '#0A1628', borderColor: color } : {}}>
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Resumen({ k, v, accent }: { k: string; v: string; accent?: string }) {
  return (
    <div className="flex items-start justify-between gap-3 text-xs">
      <span className="label-caps text-[#8FA3C0] shrink-0">{k}</span>
      <span className="text-right text-white font-medium" style={accent ? { color: accent } : {}}>{v}</span>
    </div>
  );
}
