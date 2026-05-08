import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, Trophy, Layers } from 'lucide-react';

const steps = ['Informacion', 'Formato', 'Equipos', 'Confirmacion'];

interface FormData {
  nombre: string;
  categoria: string;
  fechaInicio: string;
  fechaFin: string;
  formato: string;
  totalEquipos: string;
  descripcion: string;
}

const categorias = ['Sub-13', 'Sub-15', 'Sub-17', 'Sub-19', 'Sub-21', 'Senior', 'Veteranos'];
const formatos = [
  { value: 'eliminacion', label: 'Eliminacion Directa', desc: 'El perdedor es eliminado. El ganador avanza.' },
  { value: 'liga',        label: 'Liga Regular',         desc: 'Todos contra todos. Se acumula puntos.' },
  { value: 'grupos',      label: 'Grupos + Playoffs',    desc: 'Fase de grupos seguida de eliminacion directa.' },
];

export default function NuevoTorneo() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<FormData>({
    nombre: '', categoria: 'Sub-17', fechaInicio: '', fechaFin: '',
    formato: 'eliminacion', totalEquipos: '8', descripcion: '',
  });

  const update = (key: keyof FormData, value: string) => setForm(f => ({ ...f, [key]: value }));

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-[#1E2800] border-2 border-[#C8FF00] flex items-center justify-center mx-auto mb-6 glow-pulse">
            <CheckCircle2 size={36} className="text-[#C8FF00]" />
          </div>
          <h2 className="font-display font-extrabold text-4xl text-[#E8E8FF] uppercase mb-3">
            Torneo Creado!
          </h2>
          <p className="text-[#4A4A70] text-sm mb-6">
            <strong className="text-[#C8FF00]">{form.nombre}</strong> ha sido registrado exitosamente.
            Ya puedes gestionar equipos y programar partidos.
          </p>
          <button
            onClick={() => { setDone(false); setStep(0); setForm({ nombre: '', categoria: 'Sub-17', fechaInicio: '', fechaFin: '', formato: 'eliminacion', totalEquipos: '8', descripcion: '' }); }}
            className="px-6 py-2.5 rounded-lg bg-[#C8FF00] text-[#07070F] font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Crear otro torneo
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-xs font-mono text-[#4A4A70] uppercase tracking-widest mb-1">Crear</p>
        <h1 className="font-display font-extrabold text-5xl text-[#E8E8FF] uppercase tracking-tight leading-none">
          Nuevo Torneo
        </h1>
      </motion.div>

      {/* Stepper */}
      <div className="flex items-center gap-0 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1">
              <div className={[
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold border-2 transition-all',
                i < step   ? 'bg-[#C8FF00] border-[#C8FF00] text-[#07070F]' :
                i === step ? 'border-[#C8FF00] text-[#C8FF00] bg-[#1E2800]' :
                             'border-[#2A2A45] text-[#2A2A45] bg-[#0E0E1C]',
              ].join(' ')}>
                {i < step ? 'OK' : i + 1}
              </div>
              <span className={['text-[9px] font-medium uppercase tracking-wider whitespace-nowrap', i === step ? 'text-[#C8FF00]' : 'text-[#4A4A70]'].join(' ')}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={['flex-1 h-px mx-2 mb-4', i < step ? 'bg-[#C8FF0060]' : 'bg-[#1C1C32]'].join(' ')} />
            )}
          </div>
        ))}
      </div>

      {/* Form card */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="rounded-xl border border-[#1C1C32] bg-[#0E0E1C] p-6"
      >
        {/* Step 0 — Info */}
        {step === 0 && (
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-mono text-[#4A4A70] uppercase tracking-widest mb-2">Nombre del Torneo *</label>
              <input
                value={form.nombre}
                onChange={e => update('nombre', e.target.value)}
                placeholder="Ej: Copa Futuro Sub-17 2026"
                className="w-full bg-[#13131F] border border-[#1C1C32] rounded-lg px-4 py-2.5 text-sm text-[#E8E8FF] placeholder-[#4A4A70] focus:outline-none focus:border-[#C8FF00] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#4A4A70] uppercase tracking-widest mb-2">Categoria</label>
              <div className="flex flex-wrap gap-2">
                {categorias.map(c => (
                  <button key={c} onClick={() => update('categoria', c)}
                    className={['px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
                      form.categoria === c ? 'bg-[#1E2800] text-[#C8FF00] border-[#C8FF0040]' : 'bg-[#13131F] text-[#4A4A70] border-[#1C1C32] hover:border-[#2A2A45] hover:text-[#E8E8FF]'].join(' ')}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#4A4A70] uppercase tracking-widest mb-2">Fecha Inicio</label>
                <input type="date" value={form.fechaInicio} onChange={e => update('fechaInicio', e.target.value)}
                  className="w-full bg-[#13131F] border border-[#1C1C32] rounded-lg px-4 py-2.5 text-sm text-[#E8E8FF] focus:outline-none focus:border-[#C8FF00] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-mono text-[#4A4A70] uppercase tracking-widest mb-2">Fecha Fin</label>
                <input type="date" value={form.fechaFin} onChange={e => update('fechaFin', e.target.value)}
                  className="w-full bg-[#13131F] border border-[#1C1C32] rounded-lg px-4 py-2.5 text-sm text-[#E8E8FF] focus:outline-none focus:border-[#C8FF00] transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono text-[#4A4A70] uppercase tracking-widest mb-2">Descripcion</label>
              <textarea value={form.descripcion} onChange={e => update('descripcion', e.target.value)}
                placeholder="Describe el torneo..." rows={3}
                className="w-full bg-[#13131F] border border-[#1C1C32] rounded-lg px-4 py-2.5 text-sm text-[#E8E8FF] placeholder-[#4A4A70] focus:outline-none focus:border-[#C8FF00] transition-colors resize-none" />
            </div>
          </div>
        )}

        {/* Step 1 — Formato */}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <p className="text-xs font-mono text-[#4A4A70] uppercase tracking-widest mb-2">Formato del Torneo</p>
            {formatos.map(f => (
              <button key={f.value} onClick={() => update('formato', f.value)}
                className={['text-left p-4 rounded-xl border transition-all',
                  form.formato === f.value ? 'border-[#C8FF0060] bg-[#1E2800]' : 'border-[#1C1C32] bg-[#13131F] hover:border-[#2A2A45]'].join(' ')}>
                <div className="flex items-center gap-3 mb-1">
                  <Layers size={16} className={form.formato === f.value ? 'text-[#C8FF00]' : 'text-[#4A4A70]'} />
                  <span className={['font-semibold text-sm', form.formato === f.value ? 'text-[#C8FF00]' : 'text-[#E8E8FF]'].join(' ')}>{f.label}</span>
                  {form.formato === f.value && <span className="ml-auto text-[#C8FF00] text-xs">OK</span>}
                </div>
                <p className="text-xs text-[#4A4A70] ml-7">{f.desc}</p>
              </button>
            ))}
          </div>
        )}

        {/* Step 2 — Equipos */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-mono text-[#4A4A70] uppercase tracking-widest mb-2">Numero de Equipos</label>
              <div className="flex flex-wrap gap-2">
                {['4', '8', '16', '32'].map(n => (
                  <button key={n} onClick={() => update('totalEquipos', n)}
                    className={['px-5 py-3 rounded-lg text-sm font-mono font-bold border transition-all',
                      form.totalEquipos === n ? 'bg-[#1E2800] text-[#C8FF00] border-[#C8FF0040]' : 'bg-[#13131F] text-[#4A4A70] border-[#1C1C32] hover:border-[#2A2A45] hover:text-[#E8E8FF]'].join(' ')}>
                    {n}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#4A4A70] mt-2 font-mono">Los equipos se pueden agregar despues de crear el torneo</p>
            </div>
            <div className="rounded-xl border border-[#1C1C32] p-4 bg-[#13131F]">
              <p className="text-xs font-mono text-[#4A4A70] uppercase tracking-widest mb-3">Resumen</p>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between"><span className="text-[#4A4A70]">Torneo</span><span className="text-[#E8E8FF] font-medium">{form.nombre || '-'}</span></div>
                <div className="flex justify-between"><span className="text-[#4A4A70]">Categoria</span><span className="text-[#E8E8FF]">{form.categoria}</span></div>
                <div className="flex justify-between"><span className="text-[#4A4A70]">Formato</span><span className="text-[#E8E8FF]">{formatos.find(f => f.value === form.formato)?.label}</span></div>
                <div className="flex justify-between"><span className="text-[#4A4A70]">Equipos</span><span className="text-[#C8FF00] font-mono font-bold">{form.totalEquipos}</span></div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 — Confirm */}
        {step === 3 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#1E2800] border border-[#C8FF0040] flex items-center justify-center mx-auto mb-4">
              <Trophy size={28} className="text-[#C8FF00]" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#E8E8FF] uppercase mb-2">Todo listo</h3>
            <p className="text-sm text-[#4A4A70] mb-6">
              Confirma la creacion de <strong className="text-[#C8FF00]">{form.nombre}</strong>
            </p>
            <button onClick={() => setDone(true)}
              className="w-full py-3 rounded-xl bg-[#C8FF00] text-[#07070F] font-display font-extrabold text-xl uppercase tracking-wider hover:opacity-90 active:scale-[0.98] transition-all">
              Crear Torneo
            </button>
          </div>
        )}
      </motion.div>

      {/* Navigation */}
      {step < 3 && (
        <div className="flex justify-between mt-5">
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
            className="px-4 py-2 rounded-lg text-sm text-[#4A4A70] hover:text-[#E8E8FF] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            Atras
          </button>
          <button onClick={() => setStep(s => Math.min(3, s + 1))} disabled={step === 0 && !form.nombre.trim()}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#C8FF00] text-[#07070F] font-bold text-sm hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity">
            Siguiente <ChevronRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
