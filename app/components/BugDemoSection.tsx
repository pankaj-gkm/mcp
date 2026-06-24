'use client'

import { useState } from 'react'

interface Expense {
  id: number
  description: string
  amount: number
}

export default function BugDemoSection() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [syncStatus, setSyncStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [syncError, setSyncError] = useState('')

  function addExpense(e: React.FormEvent) {
    e.preventDefault()
    if (!description || !amount) return

    // parseFloat preserves cents (12.50, 24.99); parseInt would truncate them
    const parsedAmount = parseFloat(amount)

    setExpenses(prev => [
      ...prev,
      { id: Date.now(), description, amount: parsedAmount },
    ])
    setDescription('')
    setAmount('')
  }

  async function syncToCloud() {
    setSyncStatus('loading')
    setSyncError('')
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expenses }),
      })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error ?? `HTTP ${response.status}`)
      }
      setSyncStatus('idle')
    } catch (err) {
      setSyncStatus('error')
      setSyncError(err instanceof Error ? err.message : 'Sync failed')
    }
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <section id="demo" className="py-24 px-6 border-t border-[#222]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-semibold text-[#aa3bff] mb-2 tracking-widest uppercase">
            Step 1
          </p>
          <h2 className="text-3xl font-bold mb-3">Record a Bug with Jam</h2>
          <p className="text-gray-400 max-w-2xl">
            Use Jam to record your session with this expense tracker. It has subtle bugs —
            try adding decimal amounts and then sync to cloud.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Instructions */}
          <div className="space-y-4">
            <div className="rounded-xl border border-[#222] bg-[#111] p-5">
              <h3 className="text-xs font-semibold text-gray-300 mb-4 uppercase tracking-wider">
                How to record
              </h3>
              <ol className="space-y-3 text-sm text-gray-400">
                {[
                  'Install the Jam Chrome extension',
                  'Click the Jam icon and start recording',
                  'Add expenses with decimal amounts (e.g. $12.50, $24.99)',
                  'Notice the total looks wrong',
                  'Click "Sync to Cloud" — observe the error',
                  'Stop recording and copy the Jam link',
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[#aa3bff] font-mono text-xs mt-0.5 shrink-0">
                      {i + 1}.
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.04] p-4">
              <p className="text-xs font-semibold text-yellow-400 mb-1.5">⚠ Intentional Bugs</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                This demo contains deliberate bugs for Jam to capture. Paste the Jam link into
                the analyzer below to see Claude diagnose them with full context.
              </p>
            </div>
          </div>

          {/* Expense Tracker */}
          <div className="rounded-xl border border-[#222] bg-[#111] overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#222] flex items-center gap-2">
              <span>💰</span>
              <span className="font-medium text-sm">Expense Tracker</span>
            </div>

            <form onSubmit={addExpense} className="px-5 py-4 border-b border-[#222] space-y-2.5">
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-[#aa3bff]/40 transition-colors"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Amount ($)"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="flex-1 bg-[#0a0a0a] border border-[#222] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-[#aa3bff]/40 transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#aa3bff] text-white text-sm rounded-lg font-medium hover:bg-[#9932ee] transition-colors"
                >
                  Add
                </button>
              </div>
            </form>

            <div className="px-5 py-3 min-h-[120px]">
              {expenses.length === 0 ? (
                <p className="text-sm text-gray-700 text-center py-8">No expenses yet</p>
              ) : (
                <div className="space-y-2.5">
                  {expenses.map(expense => (
                    <div key={expense.id} className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">{expense.description}</span>
                      <span className="text-white font-mono">${expense.amount}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-5 py-4 border-t border-[#222] flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-600 mb-0.5">Total</div>
                <div className="text-lg font-semibold text-white font-mono">${total}</div>
              </div>
              <button
                onClick={syncToCloud}
                disabled={syncStatus === 'loading' || expenses.length === 0}
                className="px-4 py-2 border border-[#333] text-sm rounded-lg text-gray-400 hover:border-[#aa3bff]/40 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {syncStatus === 'loading' ? 'Syncing...' : 'Sync to Cloud'}
              </button>
            </div>

            {syncStatus === 'error' && (
              <div className="px-5 pb-4">
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2">
                  <p className="text-xs text-red-400 font-mono">Error: {syncError}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
