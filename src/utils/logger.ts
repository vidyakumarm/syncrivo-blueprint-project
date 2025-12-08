/**
 * Centralized logging utility for SyncRivo application
 * Provides structured logging with consistent formatting
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  component: string;
  message: string;
  data?: unknown;
  userId?: string;
  sessionId?: string;
}

class Logger {
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    console.log('📝 [Logger] Initialized', {
      sessionId: this.sessionId,
      timestamp: new Date().toISOString()
    });
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private createLogEntry(
    level: LogLevel,
    component: string,
    message: string,
    data?: unknown,
    userId?: string
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      component,
      message,
      data,
      userId,
      sessionId: this.sessionId
    };
  }

  private formatLog(entry: LogEntry): string {
    const emoji = this.getLogEmoji(entry.level);
    return `${emoji} [${entry.component}] ${entry.message}`;
  }

  private getLogEmoji(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG: return '🔍';
      case LogLevel.INFO: return 'ℹ️';
      case LogLevel.WARN: return '⚠️';
      case LogLevel.ERROR: return '❌';
      default: return '📝';
    }
  }

  debug(component: string, message: string, data?: unknown, userId?: string) {
    const entry = this.createLogEntry(LogLevel.DEBUG, component, message, data, userId);
    console.log(this.formatLog(entry), entry);
  }

  info(component: string, message: string, data?: unknown, userId?: string) {
    const entry = this.createLogEntry(LogLevel.INFO, component, message, data, userId);
    console.log(this.formatLog(entry), entry);
  }

  warn(component: string, message: string, data?: unknown, userId?: string) {
    const entry = this.createLogEntry(LogLevel.WARN, component, message, data, userId);
    console.warn(this.formatLog(entry), entry);
  }

  error(component: string, message: string, data?: unknown, userId?: string) {
    const entry = this.createLogEntry(LogLevel.ERROR, component, message, data, userId);
    console.error(this.formatLog(entry), entry);
  }

  // Page navigation logging
  pageView(pageName: string, path: string, userId?: string) {
    this.info('PageView', `User visited ${pageName}`, {
      path,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    }, userId);
  }

  // User interaction logging
  userAction(component: string, action: string, data?: unknown, userId?: string) {
    this.info('UserAction', `${action} in ${component}`, data, userId);
  }

  // API call logging
  apiCall(endpoint: string, method: string, data?: unknown, userId?: string) {
    this.info('ApiCall', `${method} ${endpoint}`, data, userId);
  }

  // Error handling
  apiError(endpoint: string, method: string, error: unknown, userId?: string) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    this.error('ApiError', `${method} ${endpoint} failed`, {
      error: errorMessage,
      stack: errorStack
    }, userId);
  }

  // Performance logging
  performance(component: string, metric: string, value: number, userId?: string) {
    this.info('Performance', `${component} ${metric}`, {
      value,
      unit: 'ms'
    }, userId);
  }
}

// Create and export singleton instance
export const logger = new Logger();

// Convenience exports for common logging patterns
export const logPageView = (pageName: string, path: string, userId?: string) =>
  logger.pageView(pageName, path, userId);

export const logUserAction = (component: string, action: string, data?: unknown, userId?: string) =>
  logger.userAction(component, action, data, userId);

export const logApiCall = (endpoint: string, method: string, data?: unknown, userId?: string) =>
  logger.apiCall(endpoint, method, data, userId);

export const logError = (component: string, message: string, error?: unknown, userId?: string) =>
  logger.error(component, message, error, userId);