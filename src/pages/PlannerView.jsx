import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Icon } from '../components/Icon'

function PlannerTask({ task, onToggle, onRemove }) {
  return (
    <div className="card px-4 py-3 flex items-center gap-3">
      <button
        onClick={() => onToggle(task.id)}
        role="checkbox"
        aria-checked={task.done}
        aria-label={`Mark "${task.text}" as ${task.done ? 'incomplete' : 'done'}`}
        className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
          task.done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400'
        }`}
      >
        {task.done && <Icon name="check" size={13} className="text-white" />}
      </button>

      <span
        className={`flex-1 text-sm ${
          task.done ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'
        }`}
      >
        {task.text}
      </span>

      <span className="text-xs text-slate-400 dark:text-slate-500">{task.date}</span>

      <button
        onClick={() => onRemove(task.id)}
        className="text-slate-400 hover:text-red-500 p-1.5 rounded-md transition-colors"
        aria-label={`Delete task: ${task.text}`}
      >
        <Icon name="trash" size={14} />
      </button>
    </div>
  )
}

export function PlannerView() {
  const { state, update } = useApp()
  const [input, setInput] = useState('')
  const tasks = state.plannerTasks ?? []

  const addTask = () => {
    if (!input.trim()) return
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      done: false,
      date: new Date().toISOString().slice(0, 10),
    }
    update((s) => ({ ...s, plannerTasks: [...(s.plannerTasks ?? []), newTask] }))
    setInput('')
  }

  const toggleTask = (id) =>
    update((s) => ({
      ...s,
      plannerTasks: s.plannerTasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    }))

  const removeTask = (id) =>
    update((s) => ({ ...s, plannerTasks: s.plannerTasks.filter((t) => t.id !== id) }))

  const today = new Date().toISOString().slice(0, 10)
  const todayTasks = tasks.filter((t) => t.date === today)
  const olderTasks = tasks.filter((t) => t.date !== today)
  const todayDone = todayTasks.filter((t) => t.done).length

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">📅 Daily Planner</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        Plan your study goals for today and track what you've done.
      </p>

      {/* Add task */}
      <div className="flex gap-3 mb-8">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a study task for today…"
          className="input flex-1"
          aria-label="New study task"
        />
        <button onClick={addTask} className="btn-primary flex-shrink-0">
          <Icon name="plus" size={16} />
          Add
        </button>
      </div>

      {/* Today */}
      {todayTasks.length > 0 && (
        <section className="mb-6" aria-label="Today's tasks">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300">Today — {today}</h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {todayDone}/{todayTasks.length} done
            </span>
          </div>
          <div className="space-y-2">
            {todayTasks.map((t) => (
              <PlannerTask key={t.id} task={t} onToggle={toggleTask} onRemove={removeTask} />
            ))}
          </div>
        </section>
      )}

      {/* Older */}
      {olderTasks.length > 0 && (
        <section aria-label="Previous tasks">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3">Previous</h2>
          <div className="space-y-2">
            {olderTasks.map((t) => (
              <PlannerTask key={t.id} task={t} onToggle={toggleTask} onRemove={removeTask} />
            ))}
          </div>
        </section>
      )}

      {tasks.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            No tasks yet. Add your first study task above!
          </p>
        </div>
      )}
    </div>
  )
}
