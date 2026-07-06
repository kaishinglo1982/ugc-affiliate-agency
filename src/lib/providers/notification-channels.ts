export interface NotificationMessage {
  title: string
  body: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  link?: string
}

export interface NotificationChannel {
  type: string
  send(message: NotificationMessage, config: Record<string, string>): Promise<{ success: boolean; error: string | null }>
  verify(config: Record<string, string>): Promise<boolean>
}

class InAppChannel implements NotificationChannel {
  type = 'in-app'
  async send(message: NotificationMessage, config: Record<string, string>): Promise<{ success: boolean; error: string | null }> {
    return { success: true, error: null }
  }
  async verify(config: Record<string, string>): Promise<boolean> { return true }
}

class EmailChannel implements NotificationChannel {
  type = 'email'
  async send(message: NotificationMessage, config: Record<string, string>): Promise<{ success: boolean; error: string | null }> {
    console.log(`[EMAIL] To: ${config.address}, Subject: ${message.title}`)
    return { success: true, error: null }
  }
  async verify(config: Record<string, string>): Promise<boolean> { return !!config.address }
}

class SlackChannel implements NotificationChannel {
  type = 'slack'
  async send(message: NotificationMessage, config: Record<string, string>): Promise<{ success: boolean; error: string | null }> {
    return { success: true, error: null }
  }
  async verify(config: Record<string, string>): Promise<boolean> { return !!config.webhook }
}

class DiscordChannel implements NotificationChannel {
  type = 'discord'
  async send(message: NotificationMessage, config: Record<string, string>): Promise<{ success: boolean; error: string | null }> {
    return { success: true, error: null }
  }
  async verify(config: Record<string, string>): Promise<boolean> { return !!config.webhook }
}

class TelegramChannel implements NotificationChannel {
  type = 'telegram'
  async send(message: NotificationMessage, config: Record<string, string>): Promise<{ success: boolean; error: string | null }> {
    return { success: true, error: null }
  }
  async verify(config: Record<string, string>): Promise<boolean> { return !!config.botToken && !!config.chatId }
}

class WhatsAppChannel implements NotificationChannel {
  type = 'whatsapp'
  async send(message: NotificationMessage, config: Record<string, string>): Promise<{ success: boolean; error: string | null }> {
    return { success: true, error: null }
  }
  async verify(config: Record<string, string>): Promise<boolean> { return !!config.phoneNumberId }
}

const channelMap: Record<string, NotificationChannel> = {
  'in-app': new InAppChannel(),
  email: new EmailChannel(),
  slack: new SlackChannel(),
  discord: new DiscordChannel(),
  telegram: new TelegramChannel(),
  whatsapp: new WhatsAppChannel(),
}

export function getNotificationChannel(type: string): NotificationChannel {
  return channelMap[type] || channelMap['in-app']
}
