import { useRef } from 'react'
import { toast } from 'sonner'
import { useApp } from '../context/AppContext'
import { Icon } from './Icon'
import { ProgressSchema, formatZodError } from '../schemas/progressSchema'

export function ExportButton() {
  const { state } = useApp()

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'frontend-roadmap-progress.json'
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Progress exported!', { description: 'frontend-roadmap-progress.json downloaded.' })
  }

  return (
    <button onClick={handleExport} className="btn-secondary text-sm">
      <Icon name="download" size={15} />
      Export
    </button>
  )
}

export function ImportButton() {
  const { update } = useApp()
  const inputRef = useRef(null)

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      // 1. Parse JSON
      let raw
      try {
        raw = JSON.parse(ev.target.result)
      } catch {
        toast.error('Import failed — invalid JSON', {
          description: 'The file could not be parsed. Make sure it is a valid JSON file.',
        })
        return
      }

      // 2. Validate against schema
      const result = ProgressSchema.safeParse(raw)

      if (!result.success) {
        toast.error('Import failed — schema mismatch', {
          description: formatZodError(result.error),
        })
        return
      }

      // 3. Merge validated (unknown keys already stripped by Zod)
      update((s) => ({ ...s, ...result.data }))
      toast.success('Progress imported!', { description: 'Your progress has been restored.' })
    }

    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <>
      <button onClick={() => inputRef.current?.click()} className="btn-secondary text-sm">
        <Icon name="upload" size={15} />
        Import
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
        aria-label="Import progress JSON"
      />
    </>
  )
}
