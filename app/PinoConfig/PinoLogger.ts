import pino from 'pino'

const transport = pino.transport({
  target: 'pino/file',
  options: { destination: `./tmp/logs/pinoLogs.log`, mkdir: true },
})
const PinoLogger = pino(transport)

export default PinoLogger
