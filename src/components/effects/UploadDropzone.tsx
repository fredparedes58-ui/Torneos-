import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from 'react';
import { Upload, X, FileText, Video, FileCode, CheckCircle2 } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;     // bytes
  type: string;
  progress: number; // 0-100
  status: 'uploading' | 'done' | 'error';
}

interface Props {
  accept?: string;
  maxSizeMB?: number;
  multiple?: boolean;
  onComplete?: (files: UploadedFile[]) => void;
}

function formatBytes(b: number): string {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  if (b < 1024 * 1024 * 1024) return `${(b / (1024 * 1024)).toFixed(1)} MB`;
  return `${(b / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function iconFor(type: string, name: string) {
  if (type.startsWith('video/')) return Video;
  if (type === 'application/pdf' || name.endsWith('.pdf')) return FileText;
  return FileCode;
}

export default function UploadDropzone({
  accept = 'video/mp4,application/pdf,.md,.markdown',
  maxSizeMB = 2048,
  multiple = true,
  onComplete,
}: Props) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((picked: FileList | File[]) => {
    const list = Array.from(picked).filter(f => f.size <= maxSizeMB * 1024 * 1024);
    const newOnes: UploadedFile[] = list.map(f => ({
      id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 7)}`,
      name: f.name,
      size: f.size,
      type: f.type,
      progress: 0,
      status: 'uploading',
    }));
    setFiles(prev => multiple ? [...prev, ...newOnes] : newOnes);

    // simulate per-file progress
    newOnes.forEach(uf => {
      const tick = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f.id !== uf.id) return f;
          const next = Math.min(100, f.progress + Math.floor(8 + Math.random() * 14));
          const done = next >= 100;
          if (done) clearInterval(tick);
          return { ...f, progress: next, status: done ? 'done' : 'uploading' };
        }));
      }, 220);
    });

    setTimeout(() => onComplete?.(newOnes), 2400);
  }, [maxSizeMB, multiple, onComplete]);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault(); setDragging(false);
    if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) addFiles(e.target.files);
    e.target.value = '';
  };

  const removeFile = (id: string) => setFiles(prev => prev.filter(f => f.id !== id));

  return (
    <div className="space-y-4">
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={[
          'rounded-2xl border-2 border-dashed p-8 md:p-12 text-center cursor-pointer transition-all group',
          dragging
            ? 'border-[#22D3EE] bg-[#0E2F3A] scale-[1.01] glow-cyan'
            : 'border-[#22D3EE]/40 bg-gradient-to-br from-[#0E2F3A] to-[#152849] hover:border-[#22D3EE]',
        ].join(' ')}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />
        <div className={[
          'w-16 h-16 rounded-2xl bg-[#22D3EE]/15 border border-[#22D3EE]/50 flex items-center justify-center mx-auto mb-4 transition-transform',
          dragging ? 'scale-125 rotate-3' : 'group-hover:scale-110',
        ].join(' ')}>
          <Upload size={28} className="text-[#22D3EE]" />
        </div>
        <h3 className="headline-mega text-2xl md:text-3xl gradient-text-cream mb-2">
          {dragging ? 'Suelta para subir' : 'Sube tu análisis o video'}
        </h3>
        <p className="text-sm text-[#CBDDF0] max-w-md mx-auto mb-4">
          Arrastra archivos aquí o haz click para seleccionar. Los publicaremos en tu portal scout.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono text-[#8FA3C0]">
          <span className="px-2 py-0.5 rounded-full border border-[#2A4570]">MP4 hasta {maxSizeMB >= 1024 ? `${maxSizeMB/1024}GB` : `${maxSizeMB}MB`}</span>
          <span className="px-2 py-0.5 rounded-full border border-[#2A4570]">PDF</span>
          <span className="px-2 py-0.5 rounded-full border border-[#2A4570]">Markdown</span>
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map(f => {
            const Icon = iconFor(f.type, f.name);
            const isDone = f.status === 'done';
            return (
              <div key={f.id}
                className={[
                  'flex items-center gap-3 p-3 rounded-xl border transition-colors',
                  isDone
                    ? 'border-[#84FF6E]/50 bg-[#84FF6E]/5'
                    : 'border-[#2A4570] bg-[#152849]/60',
                ].join(' ')}>
                <div className={[
                  'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                  isDone ? 'bg-[#84FF6E]/15 text-[#84FF6E]' : 'bg-[#22D3EE]/15 text-[#22D3EE]',
                ].join(' ')}>
                  {isDone ? <CheckCircle2 size={20} /> : <Icon size={20} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-medium text-white truncate">{f.name}</p>
                    <span className="text-[10px] font-mono text-[#8FA3C0] shrink-0">{formatBytes(f.size)}</span>
                  </div>
                  <div className="h-1 bg-[#0A1628] rounded-full overflow-hidden">
                    <div
                      className={[
                        'h-full transition-all duration-200',
                        isDone ? 'bg-[#84FF6E]' : 'bg-gradient-to-r from-[#22D3EE] to-[#84FF6E]',
                      ].join(' ')}
                      style={{ width: `${f.progress}%` }}
                    />
                  </div>
                  <p className="text-[10px] font-mono text-[#8FA3C0] mt-1">
                    {isDone ? 'Publicado · visible en tu portal' : `Subiendo... ${f.progress}%`}
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(f.id); }}
                  className="w-8 h-8 rounded-lg hover:bg-[#1E3560] flex items-center justify-center text-[#8FA3C0] hover:text-white transition-colors shrink-0"
                  aria-label="Eliminar"
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
