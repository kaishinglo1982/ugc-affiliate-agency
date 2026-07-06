'use client'

import { useState, useRef, useEffect } from 'react'
import { allAgents } from '@/lib/agents'
import { getAgentCommand } from '@/lib/agents/commands'

interface Message {
  id: string
  role: 'user' | 'agent'
  agent?: string
  content: string
  timestamp: Date
}

export function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedAgent, setSelectedAgent] = useState(allAgents[0]?.agent || '')
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !selectedAgent) return

    const userMessage: Message = {
      id: Math.random().toString(36).slice(2),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/v1/agents/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent: selectedAgent,
          userMessage: input,
          context: getAgentCommand(selectedAgent),
        }),
      })

      if (!response.ok) throw new Error('Failed to get agent response')

      const agentContent = await response.text()

      const agentMessage: Message = {
        id: Math.random().toString(36).slice(2),
        role: 'agent',
        agent: selectedAgent,
        content: agentContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, agentMessage])
    } catch (error) {
      console.error('[v0] Agent chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).slice(2),
          role: 'agent',
          agent: selectedAgent,
          content: 'Error communicating with agent. Please try again.',
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const agentGroups = {
    Content: allAgents.filter((a) => a.category === 'Content'),
    Shop: allAgents.filter((a) => a.category === 'Shop'),
    Growth: allAgents.filter((a) => a.category === 'Growth'),
    'Social Media': allAgents.filter((a) => a.category === 'Social Media'),
  }

  const selectedAgentData = allAgents.find((a) => a.agent === selectedAgent)

  const handleClearChat = () => {
    if (confirm('Clear all messages in this conversation?')) {
      setMessages([])
    }
  }

  const handleExportChat = () => {
    const chatData = {
      agent: selectedAgent,
      exportDate: new Date().toISOString(),
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
        timestamp: m.timestamp.toISOString(),
      })),
    }
    const dataStr = JSON.stringify(chatData, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${selectedAgent}-chat-${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  return (
    <div className="flex h-screen gap-0">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          showSidebar ? 'w-80' : 'w-0'
        } overflow-hidden border-r border-white/10 bg-white/[0.02] flex flex-col`}
      >
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-black uppercase text-gold">Agents</h2>
          <p className="mt-1 text-sm text-bone/50">Select an agent to chat with</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {Object.entries(agentGroups).map(([category, agents]) => (
            <div key={category}>
              <p className="label px-2">{category}</p>
              <div className="mt-2 space-y-1">
                {agents.map((agent) => (
                  <button
                    key={agent.agent}
                    onClick={() => setSelectedAgent(agent.agent)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                      selectedAgent === agent.agent
                        ? 'bg-gold text-background font-bold'
                        : 'text-bone/70 hover:bg-white/[0.05] hover:text-bone'
                    }`}
                  >
                    {agent.agent}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => setShowSidebar(false)}
            className="text-xs text-bone/40 hover:text-bone/60 uppercase tracking-wider"
          >
            Hide Sidebar
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-white/10 p-6 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-4">
            {!showSidebar && (
              <button
                onClick={() => setShowSidebar(true)}
                className="text-xs text-bone/40 hover:text-bone/60 uppercase tracking-wider"
              >
                Show Sidebar
              </button>
            )}
            <div>
              <h1 className="text-2xl font-black uppercase">
                {selectedAgent || 'Select an agent'}
              </h1>
              {selectedAgentData && (
                <p className="mt-1 text-xs text-gold uppercase tracking-widest">
                  {selectedAgentData.category} • {selectedAgentData.output.length} capabilities
                </p>
              )}
              <p className="mt-1 text-sm text-bone/50">Interactive agent conversation</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleClearChat}
              disabled={messages.length === 0}
              className="px-4 py-2 rounded-lg bg-red-900/20 text-red-300 text-xs uppercase font-bold hover:bg-red-900/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Clear conversation"
            >
              Clear
            </button>
            <button
              onClick={handleExportChat}
              disabled={messages.length === 0}
              className="px-4 py-2 rounded-lg bg-blue-900/20 text-blue-300 text-xs uppercase font-bold hover:bg-blue-900/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Export as JSON"
            >
              Export
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <p className="text-3xl font-black uppercase text-gold/30 mb-2">Start Chatting</p>
                <p className="text-bone/40">Select an agent and type your message to begin</p>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group`}>
                <div
                  className={`max-w-2xl rounded-3xl px-6 py-4 ${
                    msg.role === 'user'
                      ? 'bg-gold text-background'
                      : 'bg-white/[0.05] border border-white/10 text-bone'
                  }`}
                >
                  {msg.role === 'agent' && (
                    <p className="text-xs font-bold text-gold/80 mb-2 uppercase tracking-wide">
                      {msg.agent}
                    </p>
                  )}
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <div className="flex items-center justify-between gap-3 mt-3">
                    <p className="text-xs opacity-50">
                      {msg.timestamp.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </p>
                    <button
                      onClick={() => handleCopyMessage(msg.content)}
                      className="text-xs opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded bg-white/10 hover:bg-white/20"
                      title="Copy message"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/[0.05] border border-white/10 rounded-3xl px-6 py-4">
                <p className="text-xs font-bold text-gold/80 mb-2 uppercase tracking-wide">
                  {selectedAgent}
                </p>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gold animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gold animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-6 bg-white/[0.02]">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading || !selectedAgent}
              placeholder="Send a message to the agent..."
              className="flex-1 rounded-full bg-white/[0.05] border border-white/10 px-6 py-3 text-bone placeholder-bone/40 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !selectedAgent || !input.trim()}
              className="px-8 py-3 rounded-full bg-gold text-background font-bold uppercase text-sm tracking-wider hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
