export const AGENTOS_EVENTS = {
  AGENT_REGISTERED: 'agentos.agent.registered',
  AGENT_UNREGISTERED: 'agentos.agent.unregistered',
  AGENT_STATUS_CHANGED: 'agentos.agent.status_changed',
  AGENT_TASK_CREATED: 'agentos.task.created',
  AGENT_TASK_COMPLETED: 'agentos.task.completed',
  AGENT_TASK_FAILED: 'agentos.task.failed',
  AGENT_MEMORY_UPDATED: 'agentos.memory.updated',
  AGENT_LOG_CREATED: 'agentos.log.created',
  AGENT_PERMISSION_CHANGED: 'agentos.permission.changed',
  AGENT_CHAT_MESSAGE: 'agentos.chat.message',
  AGENT_MONITORING_ALERT: 'agentos.monitoring.alert',
  AGENT_HEALTH_CHECK: 'agentos.health.check',
} as const
