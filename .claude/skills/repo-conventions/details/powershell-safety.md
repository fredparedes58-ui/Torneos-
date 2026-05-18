# PowerShell + UTF-8: zona peligrosa

Lección aprendida por las malas. Esta página existe para que NO se repita.

## El problema

Cuando se ejecuta un script PowerShell que hace replace masivo en archivos con tildes o emojis:

1. PowerShell por defecto usa codificación Windows-1252 o UTF-8 con BOM.
2. Los archivos del proyecto están en UTF-8 sin BOM.
3. El pipeline lee el archivo, lo procesa, lo escribe → en el camino, los caracteres no-ASCII (tildes, ñ, emojis) se corrompen.
4. Resultado: `é` se convierte en `Ã©`, `ñ` en `Ã±`, etc.

## Cuándo está prohibido usar PowerShell

| Operación | OK con PowerShell? |
|---|---|
| Listar archivos (`ls`, `Get-ChildItem`) | ✅ |
| Git operations (`git status`, `git diff`) | ✅ |
| `npm install`, `npm run build` | ✅ |
| Buscar texto en archivos (`Select-String` simple) | ✅ (lectura) |
| **Replace en archivos con tildes** | 🚨 NO |
| **Replace en archivos con emojis** | 🚨 NO |
| **Escribir archivos con strings que contengan tildes** | 🚨 NO |

## Alternativas seguras para replace masivo

### 1. Claude Code con str_replace tool (recomendado)

```
"Reemplaza todas las apariciones de 'X' por 'Y' en estos archivos"
```

Claude Code usa la tool directamente, sin pasar por PowerShell.

### 2. Editor (VSCode) directamente

Find & Replace en VSCode respeta la codificación del archivo.

### 3. `sed` en WSL o Git Bash

Si tienes WSL o Git Bash instalado, `sed` con `LANG=es_ES.UTF-8` respeta UTF-8.

### 4. Script Python con encoding explícito

```python
# scripts/replace.py
import pathlib

for path in pathlib.Path('src').rglob('*.tsx'):
    text = path.read_text(encoding='utf-8')
    text = text.replace('viejo', 'nuevo')
    path.write_text(text, encoding='utf-8', newline='\n')
```

Ejecutado con `python scripts/replace.py` desde PowerShell, pero el procesamiento es en Python con encoding explícito.

## Cómo detectar corrupción ya ocurrida

```bash
# Caracteres sospechosos:
grep -rE "Ã[©¡­³¼±¨ª]" src/

# Si hay match → algún archivo está corrupto
```

## Si un PR introduce corrupción

```
🚨 BLOCKER — UTF-8 corruption: <archivo>:<línea>

Caracteres `Ã©`, `Ã±` o similares detectados. Esto sucede cuando el 
archivo se editó via PowerShell con encoding incorrecto.

Fix:
1. Revertir el archivo a su versión anterior limpia: 
   git checkout HEAD~1 -- <archivo>
2. Re-aplicar los cambios usando Claude Code directamente o VSCode.
3. NO usar PowerShell para este archivo.

Si la corrupción está en muchos archivos: ejecutar fix automático:
   git restore <archivos>
   # Y re-aplicar cambios uno por uno
```

## Regla mental

**Para cualquier operación que toque contenido de archivos con texto en español o emojis: NO PowerShell.**

PowerShell para: build, install, deploy, git. Punto.
