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
      <div className="min-h-[70vh] flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-[#2A3500] border-2 border-[#D4FF1F] flex items-center justify-center mx-auto mb-6 glow-pulse">
            <CheckCircle2 size={36} className="text-[#D4FF1F]" />
          </div>
          <h2 className="font-display font-extrabold text-4xl text-white uppercase mb-3">Torneo Creado!</h2>
          <p className="text-[#D5DBB8] text-sm mb-6">
            <strong className="text-[#D4FF1F]">{form.nombre}</strong> ha sido registrado exitosamente.
          </p>
          <button
            onClick={() => { setDone(false); setStep(0); setForm({ nombre: '', categoria: 'Sub-17', fechaInicio: '', fechaFin: '', formato: 'eliminacion', totalEquipos: '8', descripcion: '' }); }}
            className="px-6 py-2.5 rounded-lg bg-[#D4FF1F] text-[#0F1408] font-bold text-sm hover:opacity-90 transition-opacity label-caps"
          >
            Crear otro torneo
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <span className="label-caps text-[#D4FF1F]">Crear</span>
        <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white uppercase tracking-tight leading-none mt-2">
          Nuevo Torneo
        </h1>
      </motion.div>

      {/* Stepper */}
      <div className="flex items-center gap-0 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1">
              <div className={[
                'w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold border-2 transition-all',
                i < step   ? 'bg-[#D4FF1F] border-[#D4FF1F] text-[#0F1408]' :
                i === step ? 'border-[#D4FF1F] text-[#D4FF1F] bg-[#2A3500]' :
                             'border-[#7A8A55] text-[#A5B084] bg-[#191D10]',
              ].join(' ')}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={['text-[9px] font-medium uppercase tracking-wider whitespace-nowrap', i === step ? 'text-[#D4FF1F]' : 'text-[#A5B084]'].join(' ')}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={['flex-1 h-px mx-2 mb-4', i < step ? 'bg-[#D4FF1F80]' : 'bg-[#7A8A55]'].join(' ')} />
            )}
          </div>
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card p-6 rounded-xl"
      >
        {step === 0 && (
          <div className="flex flex-col gap-5">
            <div>
              <label className="block label-caps text-[#A5B084] mb-2">Nombre del Torneo *</label>
              <input
                value={form.nombre}
                onChange={e => update('nombre', e.target.value)}
                placeholder="Ej: Copa Futuro Sub-17 2026"
                className="w-full bg-[#0A0F00] border border-[#7A8A55] rounded-lg px-4 py-3 text-sm text-white placeholder-[#A5B084] focus:outline-none focus:border-[#D4FF1F] transition-colors"
              />
            </div>
            <div>
              <label className="block label-caps text-[#A5B084] mb-2">Categoria</label>
              <div className="flex flex-wrap gap-2">
                {categorias.map(c => (
                  <button key={c} onClick={() => update('categoria', c)}
                    className={['px-3 py-1.5 rounded-full text-xs font-medium border transition-all label-caps',
                      form.categoria === c ? 'bg-[#D4FF1F] text-[#0F1408] border-[#D4FF1F]' : 'bg-transparent text-[#D5DBB8] border-[#7A8A55] hover:border-[#A5B084] hover:text-white'].join(' ')}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block label-caps text-[#A5B084] mb-2">Fecha Inicio</label>
                <input type="date" value={form.fechaInicio} onChange={e => update('fechaInicio', e.target.value)}
                  className="w-full bg-[#0A0F00] border border-[#7A8A55] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4FF1F] transition-colors" />
              </div>
              <div>
                <label className="block label-caps text-[#A5B084] mb-2">Fecha Fin</label>
                <input type="date" value={form.fechaFin} onChange={e => update('fechaFin', e.target.value)}
                  className="w-full bg-[#0A0F00] border border-[#7A8A55] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4FF1F] transition-colors" />
              </div>
            </div>
            <div>
              <label className="block label-caps text-[#A5B084] mb-2">Descripcion</label>
              <textarea value={form.descripcion} onChange={e => update('descripcion', e.target.value)}
                placeholder="Describe el torneo..." rows={3}
                className="w-full bg-[#0A0F00] border border-[#7A8A55] rounded-lg px-4 py-3 text-sm text-white placeholder-[#A5B084] focus:outline-none focus:border-[#D4FF1F] transition-colors resize-none" />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-3">
            <p className="label-caps text-[#A5B084] mb-2">Formato del Torneo</p>
            {formatos.map(f => (
              <button key={f.value} onClick={() => update('formato', f.value)}
                className={['text-left p-4 rounded-xl border transition-all',
                  form.formato === f.value ? 'border-[#D4FF1F] bg-[#2A3500]' : 'border-[#7A8A55] bg-[#0A0F00] hover:border-[#A5B084]'].join(' ')}>
                <div className="flex items-center gap-3 mb-1">
                  <Layers size={16} className={form.formato === f.value ? 'text-[#D4FF1F]' : 'text-[#A5B084]'} />
                  <span className={['font-display font-bold uppercase tracking-wide', form.formato === f.value ? 'text-[#D4FF1F]' : 'text-white'].join(' ')}>
                    {f.label}
                  </span>
                  {form.formato === f.value && <span className="ml-auto text-[#D4FF1F] text-xs">✓</span>}
                </div>
                <p className="text-xs text-[#D5DBB8] ml-7">{f.desc}</p>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div>
              <label className="block label-caps text-[#A5B084] mb-2">Numero de Equipos</label>
              <div className="flex flex-wrap gap-2">
                {['4', '8', '16', '32'].map(n => (
                  <button key={n} onClick={() => update('totalEquipos', n)}
                    className={['px-6 py-3 rounded-lg text-base font-mono font-bold border transition-all',
                      form.totalEquipos === n ? 'bg-[#D4FF1F] text-[#0F1408] border-[#D4FF1F]' : 'bg-[#0A0F00] text-[#D5DBB8] border-[#7A8A55] hover:border-[#A5B084] hover:text-white'].join(' ')}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-[#7A8A55] p-4 bg-[#0A0F00]">
              <p className="label-caps text-[#A5B084] mb-3">Resumen</p>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between"><span className="text-[#A5B084]">Torneo</span><span className="text-white font-medium">{form.nombre || '-'}</span></div>
                <div className="flex justify-between"><span className="text-[#A5B084]">Categoria</span><span className="text-white">{form.categoria}</span></div>
                <div className="flex justify-between"><span className="text-[#A5B084]">Formato</span><span className="text-white">{formatos.find(f => f.value === form.formato)?.label}</span></div>
                <div className="flex justify-between"><span className="text-[#A5B084]">Equipos</span><span className="text-[#D4FF1F] font-mono font-bold">{form.totalEquipos}</span></div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#2A3500] border border-[#D4FF1F] flex items-center justify-center mx-auto mb-4">
              <Trophy size={28} className="text-[#D4FF1F]" />
            </div>
            <h3 className="font-display font-extrabold text-3xl text-white uppercase mb-2">Todo listo</h3>
            <p className="text-sm text-[#D5DBB8] mb-6">
              Confirma la creacion de <strong className="text-[#D4FF1F]">{form.nombre}</strong>
            </p>
            <button onClick={() => setDone(true)}
              className="w-full py-4 rounded-xl bg-[#D4FF1F] text-[#0F1408] font-display font-extrabold text-xl uppercase tracking-wider hover:opacity-90 active:scale-[0.98] transition-all glow-green-lg">
              Crear Torneo
            </button>
          </div>
        )}
      </motion.div>

      {step < 3 && (
        <div className="flex justify-between mt-5">
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
            className="px-4 py-2 rounded-lg text-sm text-[#A5B084] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            Atras
          </button>
          <button onClick={() => setStep(s => Math.min(3, s + 1))} disabled={step === 0 && !form.nombre.trim()}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#D4FF1F] text-[#0F1408] font-bold text-sm hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity label-caps">
            Siguiente <ChevronRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
