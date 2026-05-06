/**
 * index.ts — Entry point do Worker Service.
 * Importa validação de env (fail-fast) antes de qualquer outra coisa.
 */

// Polyfill para WebSocket em Node.js < 22
import WebSocket from 'ws';
// @ts-ignore
globalThis.WebSocket = WebSocket;

// CRÍTICO: importar env primeiro para validar antes de qualquer inicialização
import './config/env';
import { startWorker } from './worker/worker';

startWorker();
