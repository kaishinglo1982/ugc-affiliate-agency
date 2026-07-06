'use client'
import { useState } from 'react'
import {
  videoJobs,
  avatarProfiles,
  voiceProfiles,
  subtitleAssets,
  brollAssets,
  renderPresets,
} from '@/data/enterprise'
import type { VideoJob } from '@/data/enterprise'

type AssetsTab = 'subtitles' | 'broll' | 'presets'

const statusColors: Record<string, string> = {
  pending: 'bg-amber-400/20 text-amber-400 border-amber-400/30',
  rendering: 'bg-sky-400/20 text-sky-400 border-sky-400/30',
  completed: 'bg-emerald-400/20 text-emerald-400 border-emerald-400/30',
  failed: 'bg-rose-400/20 text-rose-400 border-rose-400/30',
  active: 'bg-emerald-400/20 text-emerald-400 border-emerald-400/30',
  error: 'bg-rose-400/20 text-rose-400 border-rose-400/30',
  generating: 'bg-sky-400/20 text-sky-400 border-sky-400/30',
}

const providerColors: Record<string, string> = {
  heygen: 'text-violet-400',
  synthesia: 'text-sky-400',
  'd-id': 'text-amber-400',
  kling: 'text-rose-400',
  mock: 'text-bone/30',
  elevenlabs: 'text-emerald-400',
  openai: 'text-emerald-400',
  'google-tts': 'text-sky-400',
  microsoft: 'text-blue-400',
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded border ${
        statusColors[status] || 'text-bone/40 border-bone/20'
      }`}
    >
      {status}
    </span>
  )
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-ash rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all bg-gold"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-[10px] text-bone/40 w-8 text-right">{value}%</span>
    </div>
  )
}

function JobCard({ job, expanded, onToggle }: { job: VideoJob; expanded: boolean; onToggle: () => void }) {
  return (
    <div
      className="bg-coal border border-ash rounded-xl overflow-hidden cursor-pointer transition-all hover:border-bone/20"
      onClick={onToggle}
    >
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-bone truncate">{job.title}</h4>
            <p className="text-[10px] text-bone/30 mt-0.5">
              {job.platform} &middot; {job.format}
            </p>
          </div>
          <StatusBadge status={job.status} />
        </div>

        {job.status === 'rendering' && <ProgressBar value={job.progress} />}

        <div className="flex items-center justify-between text-[10px] text-bone/30">
          <span>Created {new Date(job.createdAt).toLocaleDateString()}</span>
          {job.completedAt && (
            <span>Completed {new Date(job.completedAt).toLocaleDateString()}</span>
          )}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-ash px-4 py-3 bg-smoke/30 space-y-2 text-xs text-bone/70">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-bone/30 block">Script ID</span>
              <span>{job.scriptId}</span>
            </div>
            <div>
              <span className="text-[10px] text-bone/30 block">Avatar ID</span>
              <span>{job.avatarId}</span>
            </div>
            <div>
              <span className="text-[10px] text-bone/30 block">Voice ID</span>
              <span>{job.voiceId}</span>
            </div>
            <div>
              <span className="text-[10px] text-bone/30 block">Format</span>
              <span>{job.format}</span>
            </div>
          </div>
          {job.error && (
            <div className="bg-rose-400/10 border border-rose-400/20 rounded-lg p-2 text-rose-400 text-[10px]">
              {job.error}
            </div>
          )}
          {job.outputUrl && (
            <a
              href={job.outputUrl}
              className="inline-block text-gold hover:text-gold/80 text-[10px] underline"
            >
              View Output &rarr;
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default function UgcStudioPage() {
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set())
  const [assetsTab, setAssetsTab] = useState<AssetsTab>('subtitles')

  const toggleJob = (id: string) => {
    setExpandedJobs((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const pendingJobs = videoJobs.filter((j) => j.status === 'pending')
  const renderingJobs = videoJobs.filter((j) => j.status === 'rendering')
  const completedJobs = videoJobs.filter((j) => j.status === 'completed' || j.status === 'failed')

  const activeAvatars = avatarProfiles.filter((a) => a.status === 'active').length
  const activeVoices = voiceProfiles.filter((v) => v.status === 'active').length

  return (
    <div className="min-h-screen bg-ink p-6 md:p-8 font-mono tracking-widest">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ── Header ── */}
        <div>
          <h1 className="text-3xl font-bold text-bone">UGC STUDIO</h1>
          <p className="text-bone/40 mt-1 text-sm">
            Create and manage AI-generated video content
          </p>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-coal border border-ash rounded-xl p-4 flex flex-col gap-1">
            <span className="text-[10px] text-bone/30 uppercase tracking-[0.2em]">
              Active Avatars
            </span>
            <span className="text-2xl font-bold text-gold">
              {activeAvatars}
            </span>
          </div>
          <div className="bg-coal border border-ash rounded-xl p-4 flex flex-col gap-1">
            <span className="text-[10px] text-bone/30 uppercase tracking-[0.2em]">
              Voice Profiles
            </span>
            <span className="text-2xl font-bold text-sky-400">
              {activeVoices}
            </span>
          </div>
          <div className="bg-coal border border-ash rounded-xl p-4 flex flex-col gap-1">
            <span className="text-[10px] text-bone/30 uppercase tracking-[0.2em]">
              Pending Jobs
            </span>
            <span className="text-2xl font-bold text-amber-400">
              {pendingJobs.length + renderingJobs.length}
            </span>
          </div>
          <div className="bg-coal border border-ash rounded-xl p-4 flex flex-col gap-1">
            <span className="text-[10px] text-bone/30 uppercase tracking-[0.2em]">
              Completed Today
            </span>
            <span className="text-2xl font-bold text-emerald-400">
              {completedJobs.filter(
                (j) =>
                  j.completedAt &&
                  new Date(j.completedAt).toDateString() === new Date().toDateString()
              ).length}
            </span>
          </div>
        </div>

        {/* ── Video Jobs Kanban ── */}
        <section>
          <h2 className="text-lg font-bold text-bone mb-5">VIDEO JOBS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pending */}
            <div className="bg-coal/50 border border-ash rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-amber-400">Pending</h3>
                <span className="text-[10px] text-bone/30 bg-smoke px-2 py-0.5 rounded-full">
                  {pendingJobs.length}
                </span>
              </div>
              <div className="space-y-3">
                {pendingJobs.length === 0 ? (
                  <p className="text-xs text-bone/20 text-center py-6">No pending jobs</p>
                ) : (
                  pendingJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      expanded={expandedJobs.has(job.id)}
                      onToggle={() => toggleJob(job.id)}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Rendering */}
            <div className="bg-coal/50 border border-ash rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-sky-400">Rendering</h3>
                <span className="text-[10px] text-bone/30 bg-smoke px-2 py-0.5 rounded-full">
                  {renderingJobs.length}
                </span>
              </div>
              <div className="space-y-3">
                {renderingJobs.length === 0 ? (
                  <p className="text-xs text-bone/20 text-center py-6">No jobs rendering</p>
                ) : (
                  renderingJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      expanded={expandedJobs.has(job.id)}
                      onToggle={() => toggleJob(job.id)}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Completed */}
            <div className="bg-coal/50 border border-ash rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-emerald-400">Completed</h3>
                <span className="text-[10px] text-bone/30 bg-smoke px-2 py-0.5 rounded-full">
                  {completedJobs.length}
                </span>
              </div>
              <div className="space-y-3">
                {completedJobs.length === 0 ? (
                  <p className="text-xs text-bone/20 text-center py-6">No completed jobs</p>
                ) : (
                  completedJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      expanded={expandedJobs.has(job.id)}
                      onToggle={() => toggleJob(job.id)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Avatars ── */}
        <section>
          <h2 className="text-lg font-bold text-bone mb-5">AVATARS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {avatarProfiles.map((avatar) => (
              <div
                key={avatar.id}
                className="bg-coal border border-ash rounded-xl p-5 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-smoke border border-ash flex items-center justify-center text-bone/30 text-xs uppercase">
                      {avatar.name.slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-bone">{avatar.name}</h3>
                      <span
                        className={`text-[10px] ${
                          providerColors[avatar.provider] || 'text-bone/30'
                        }`}
                      >
                        {avatar.provider}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        avatar.status === 'active'
                          ? 'bg-emerald-400'
                          : avatar.status === 'error'
                          ? 'bg-rose-400'
                          : 'bg-amber-400 animate-pulse'
                      }`}
                    />
                    <StatusBadge status={avatar.status} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {avatar.niche.map((n) => (
                    <span
                      key={n}
                      className="text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 rounded-full bg-ash/40 text-bone/50"
                    >
                      {n}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {avatar.platform.map((p) => (
                    <span
                      key={p}
                      className="text-[10px] px-2 py-0.5 rounded border border-ash text-bone/40"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                <div className="text-[10px] text-bone/30 flex items-center gap-3 pt-1 border-t border-ash/50">
                  <span>{avatar.gender}</span>
                  <span>{avatar.ageGroup}</span>
                  <span>{avatar.style}</span>
                  <span>{avatar.language}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Voices ── */}
        <section>
          <h2 className="text-lg font-bold text-bone mb-5">VOICE PROFILES</h2>
          <div className="bg-coal border border-ash rounded-xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ash text-[10px] text-bone/30 uppercase tracking-[0.2em]">
                  <th className="text-left p-4 font-medium">Name</th>
                  <th className="text-left p-4 font-medium">Provider</th>
                  <th className="text-left p-4 font-medium">Language</th>
                  <th className="text-left p-4 font-medium">Accent</th>
                  <th className="text-left p-4 font-medium">Speed / Pitch</th>
                  <th className="text-right p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {voiceProfiles.map((voice, i) => (
                  <tr
                    key={voice.id}
                    className={`border-b border-ash/50 transition-all hover:bg-smoke/30 ${
                      i === voiceProfiles.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="p-4 text-bone font-medium">{voice.name}</td>
                    <td className="p-4">
                      <span
                        className={`text-xs ${
                          providerColors[voice.provider] || 'text-bone/40'
                        }`}
                      >
                        {voice.provider}
                      </span>
                    </td>
                    <td className="p-4 text-bone/70 text-xs">{voice.language}</td>
                    <td className="p-4 text-bone/70 text-xs capitalize">{voice.accent}</td>
                    <td className="p-4 text-bone/70 text-xs">
                      {voice.speed.toFixed(2)} / {voice.pitch.toFixed(2)}
                    </td>
                    <td className="p-4 text-right">
                      <StatusBadge status={voice.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Assets ── */}
        <section>
          <h2 className="text-lg font-bold text-bone mb-5">ASSETS</h2>

          {/* Sub-tabs */}
          <div className="flex items-center gap-2 mb-5">
            {(['subtitles', 'broll', 'presets'] as AssetsTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setAssetsTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-150 uppercase tracking-[0.1em] ${
                  assetsTab === tab
                    ? 'bg-gold text-ink shadow-lg shadow-gold/20'
                    : 'bg-smoke text-bone/40 hover:text-bone/70 hover:bg-ash'
                }`}
              >
                {tab === 'subtitles' ? 'Subtitles' : tab === 'broll' ? 'B-Roll' : 'Render Presets'}
              </button>
            ))}
          </div>

          {/* Subtitles */}
          {assetsTab === 'subtitles' && (
            <div className="bg-coal border border-ash rounded-xl overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ash text-[10px] text-bone/30 uppercase tracking-[0.2em]">
                    <th className="text-left p-4 font-medium">ID</th>
                    <th className="text-left p-4 font-medium">Video ID</th>
                    <th className="text-left p-4 font-medium">Language</th>
                    <th className="text-left p-4 font-medium">Format</th>
                    <th className="text-right p-4 font-medium">File</th>
                  </tr>
                </thead>
                <tbody>
                  {subtitleAssets.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-xs text-bone/20">
                        No subtitle assets
                      </td>
                    </tr>
                  ) : (
                    subtitleAssets.map((sub, i) => (
                      <tr
                        key={sub.id}
                        className={`border-b border-ash/50 transition-all hover:bg-smoke/30 ${
                          i === subtitleAssets.length - 1 ? 'border-b-0' : ''
                        }`}
                      >
                        <td className="p-4 text-bone/50 text-[10px]">{sub.id}</td>
                        <td className="p-4 text-bone/70 text-xs">{sub.videoId}</td>
                        <td className="p-4 text-bone/70 text-xs">{sub.language}</td>
                        <td className="p-4">
                          <span className="text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 rounded bg-ash/40 text-bone/50">
                            {sub.format}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <a
                            href={sub.url}
                            className="text-[10px] text-gold hover:text-gold/80 underline"
                          >
                            Download
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* B-Roll */}
          {assetsTab === 'broll' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {brollAssets.length === 0 ? (
                <div className="col-span-full bg-coal border border-ash rounded-xl p-6 text-center text-xs text-bone/20">
                  No B-roll assets
                </div>
              ) : (
                brollAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="bg-coal border border-ash rounded-xl p-5 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-bone/30 uppercase tracking-[0.1em]">
                        {asset.type}
                      </span>
                      <span className="text-[10px] text-bone/30">{asset.source}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {asset.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-ash/40 text-bone/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-ash/50 text-[10px] text-bone/30">
                      <span>Duration: {asset.duration}s</span>
                      <a
                        href={asset.url}
                        className="text-gold hover:text-gold/80 underline"
                      >
                        Preview
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Render Presets */}
          {assetsTab === 'presets' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderPresets.length === 0 ? (
                <div className="col-span-full bg-coal border border-ash rounded-xl p-6 text-center text-xs text-bone/20">
                  No render presets
                </div>
              ) : (
                renderPresets.map((preset) => (
                  <div
                    key={preset.id}
                    className="bg-coal border border-ash rounded-xl p-5 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-bone">{preset.name}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded border border-ash text-bone/40">
                        {preset.format}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                      <span className="text-bone/40">Resolution</span>
                      <span className="text-bone/70 text-right">{preset.resolution}</span>
                      <span className="text-bone/40">FPS</span>
                      <span className="text-bone/70 text-right">{preset.fps}</span>
                      <span className="text-bone/40">Bitrate</span>
                      <span className="text-bone/70 text-right">{preset.bitrate}</span>
                      <span className="text-bone/40">Codec</span>
                      <span className="text-bone/70 text-right uppercase">{preset.codec}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>

      </div>
    </div>
  )
}
