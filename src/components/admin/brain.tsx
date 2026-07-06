'use client'

import { useState, useMemo } from 'react'
import { mockKnowledge, defaultCategories, type KnowledgeEntry } from '@/lib/brain/knowledge'

export function BrainDashboard() {
  const [knowledge, setKnowledge] = useState<KnowledgeEntry[]>(mockKnowledge)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedConfidence, setSelectedConfidence] = useState<string>('')
  const [showNew, setShowNew] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const filtered = useMemo(() => {
    return knowledge.filter((entry) => {
      const matchesSearch =
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = !selectedCategory || entry.category === selectedCategory
      const matchesConfidence = !selectedConfidence || entry.confidence_level === selectedConfidence

      return matchesSearch && matchesCategory && matchesConfidence
    })
  }, [knowledge, searchQuery, selectedCategory, selectedConfidence])

  const stats = {
    total: knowledge.length,
    published: knowledge.filter((k) => k.status === 'published').length,
    verified: knowledge.filter((k) => k.verified).length,
    categories: new Set(knowledge.map((k) => k.category)).size,
  }

  return (
    <main className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div>
          <p className="label">Collective Intelligence System</p>
          <h1 className="mt-3 text-5xl font-black uppercase">Who Knows Brain</h1>
          <p className="mt-3 max-w-2xl text-bone/70">
            Centralized knowledge repository for brand strategy, product insights, agent configurations, and operational processes. Search, curate, and manage institutional knowledge.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-xs uppercase tracking-widest text-bone/50">Total Entries</p>
            <p className="mt-2 text-3xl font-black text-gold">{stats.total}</p>
            <p className="mt-1 text-xs text-bone/40">knowledge pieces stored</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-xs uppercase tracking-widest text-bone/50">Published</p>
            <p className="mt-2 text-3xl font-black text-bone">{stats.published}</p>
            <p className="mt-1 text-xs text-bone/40">ready for use</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-xs uppercase tracking-widest text-bone/50">Verified</p>
            <p className="mt-2 text-3xl font-black text-bone">{stats.verified}</p>
            <p className="mt-1 text-xs text-bone/40">quality assured</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-xs uppercase tracking-widest text-bone/50">Categories</p>
            <p className="mt-2 text-3xl font-black text-bone">{stats.categories}</p>
            <p className="mt-1 text-xs text-bone/40">knowledge domains</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-bone/50">Search Knowledge</label>
            <input
              type="text"
              placeholder="Search by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mt-3 w-full rounded-lg bg-white/5 px-4 py-3 text-sm text-bone placeholder:text-bone/30 focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-xs uppercase tracking-widest text-bone/50">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mt-2 w-full rounded-lg bg-white/5 px-4 py-2 text-sm text-bone focus:outline-none focus:ring-2 focus:ring-gold/50"
              >
                <option value="">All Categories</option>
                {defaultCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-bone/50">Confidence</label>
              <select
                value={selectedConfidence}
                onChange={(e) => setSelectedConfidence(e.target.value)}
                className="mt-2 w-full rounded-lg bg-white/5 px-4 py-2 text-sm text-bone focus:outline-none focus:ring-2 focus:ring-gold/50"
              >
                <option value="">All Levels</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="flex items-end">
              <button className="w-full rounded-lg bg-gold/20 px-4 py-2 text-sm font-bold text-gold hover:bg-gold/30 transition-colors">
                + Add Knowledge
              </button>
            </div>
          </div>
        </div>

        {/* Knowledge Entries */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold uppercase text-bone">
              {filtered.length} Result{filtered.length !== 1 ? 's' : ''}
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
              <p className="text-sm text-bone/50">No knowledge entries match your filters.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((entry) => (
                <div
                  key={entry.id}
                  className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-gold/30 hover:bg-white/[0.04] transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-bold text-bone">{entry.title}</h3>
                        <span className="px-2 py-1 rounded text-xs font-bold uppercase tracking-widest bg-gold/20 text-gold">
                          {entry.category}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-widest ${
                            entry.confidence_level === 'high'
                              ? 'bg-green-900/20 text-green-300'
                              : entry.confidence_level === 'medium'
                                ? 'bg-yellow-900/20 text-yellow-300'
                                : 'bg-red-900/20 text-red-300'
                          }`}
                        >
                          {entry.confidence_level}
                        </span>
                        {entry.verified && (
                          <span className="px-2 py-1 rounded text-xs font-bold uppercase tracking-widest bg-blue-900/20 text-blue-300">
                            Verified
                          </span>
                        )}
                      </div>

                      <p className="mt-3 text-sm text-bone/70">{entry.summary || entry.content.substring(0, 150)}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-full bg-white/10 text-xs text-bone/60 hover:text-bone/80 cursor-pointer transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center gap-6 text-xs text-bone/50">
                        <span>Accessed {entry.access_count || 0}x</span>
                        {entry.source && <span>Source: {entry.source}</span>}
                        <span>Updated {new Date(entry.updated_at || entry.created_at || '').toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="ml-4 flex gap-2">
                      <button className="px-3 py-2 rounded-lg bg-white/10 text-xs font-bold text-bone hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100">
                        View
                      </button>
                      <button className="px-3 py-2 rounded-lg bg-white/10 text-xs font-bold text-bone hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
