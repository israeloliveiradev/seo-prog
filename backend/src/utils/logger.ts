/**
 * logger.ts — Logger estruturado com níveis e timestamps.
 * Observabilidade: logs claros e rastreáveis em produção.
 */

type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  context: string;
  message: string;
  data?: unknown;
}

function formatLog(entry: LogEntry): string {
  const { timestamp, level, context, message, data } = entry;
  const dataStr = data ? ` | ${JSON.stringify(data)}` : '';
  return `[${timestamp}] [${level.padEnd(5)}] [${context}] ${message}${dataStr}`;
}

function createLogger(context: string) {
  const log = (level: LogLevel, message: string, data?: unknown): void => {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      context,
      message,
      data,
    };

    const formatted = formatLog(entry);

    if (level === 'ERROR') {
      console.error(formatted);
    } else if (level === 'WARN') {
      console.warn(formatted);
    } else {
      console.log(formatted);
    }
  };

  return {
    info:  (message: string, data?: unknown) => log('INFO',  message, data),
    warn:  (message: string, data?: unknown) => log('WARN',  message, data),
    error: (message: string, data?: unknown) => log('ERROR', message, data),
    debug: (message: string, data?: unknown) => log('DEBUG', message, data),
  };
}

export { createLogger };
export type Logger = ReturnType<typeof createLogger>;
