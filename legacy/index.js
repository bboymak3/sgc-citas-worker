var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../../.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../../.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// src/index.ts
var MODEL_ID = "@cf/meta/llama-3.2-3b-instruct";
var CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};
function getSystemPrompt(businessName, servicios) {
  const now = /* @__PURE__ */ new Date();
  const tz = "America/Santiago";
  const fmtDate = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" });
  const fmtTime = new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false });
  const fmtWeekday = new Intl.DateTimeFormat("es-CL", { timeZone: tz, weekday: "long" });
  const hoyStr = fmtDate.format(now);
  const horaChile = fmtTime.format(now);
  const diaHoy = fmtWeekday.format(now);
  const tzOffset = new Date(now.toLocaleString("en-US", { timeZone: tz })).getTime() - now.getTime();
  const chileNow = new Date(now.getTime() + tzOffset);
  const maniana = new Date(chileNow);
  maniana.setDate(maniana.getDate() + 1);
  const manianaDate = new Date(maniana.getTime() - tzOffset + now.getTimezoneOffset() * 6e4);
  const manianaStr = fmtDate.format(manianaDate);
  const manianaDia = fmtWeekday.format(manianaDate);
  const pasadoManianaDate = new Date(chileNow);
  pasadoManianaDate.setDate(pasadoManianaDate.getDate() + 2);
  const pasadoManianaFmt = new Date(pasadoManianaDate.getTime() - tzOffset + now.getTimezoneOffset() * 6e4);
  const pasadoManianaStr = fmtDate.format(pasadoManianaFmt);
  const pasadoManianaDia = fmtWeekday.format(pasadoManianaFmt);
  const diasSemana = ["domingo", "lunes", "martes", "mi\xE9rcoles", "jueves", "viernes", "s\xE1bado"];
  const mesNombres = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const [hoyAnio, hoyMes, hoyDia] = hoyStr.split("-").map(Number);
  const hoyLegible = `${hoyDia} de ${mesNombres[hoyMes - 1]} de ${hoyAnio}`;
  const [manAnio, manMes, manDia] = manianaStr.split("-").map(Number);
  const manianaLegible = `${manDia} de ${mesNombres[manMes - 1]} de ${manAnio}`;
  return `Eres un asistente de AGENDAMIENTO de CITAS de "${businessName}". Tu \xDANICA funci\xF3n es ayudar a los clientes a agendar citas. NADA m\xE1s.

FECHA Y HORA ACTUAL EN CHILE (America/Santiago):
- Hoy es ${diaHoy} ${hoyDia} de ${mesNombres[hoyMes - 1]} de ${hoyAnio} (${hoyStr})
- La hora actual en Chile es ${horaChile} hrs
- Ma\xF1ana es ${manianaDia} ${manianaLegible} (${manianaStr})
- Pasado ma\xF1ana es ${pasadoManianaDia} (${pasadoManianaStr})
- Los d\xEDas de atenci\xF3n son lunes a s\xE1bado (domingo cerrado)
- Horario: lunes a viernes 08:00-18:00, s\xE1bado 09:00-14:00
- USA SIEMPRE la fecha de Chile como referencia
- REGLA DE HORA: Si el cliente pide cita para HOY y ya pas\xF3 el horario de atenci\xF3n (18:00 entre semana, 14:00 s\xE1bado), sugiere MA\xD1ANA o el pr\xF3ximo d\xEDa h\xE1bil.
- NUNCA impidas agendar si la fecha es para un d\xEDa futuro en horario v\xE1lido. Solo rechaza si es HOY y ya cerraron.
- TODAS LAS CITAS SE AGENDAN \xDANICAMENTE EN EL A\xD1O 2026.

REGLAS ESTRICTAS:
1. Tu \xDANICA funci\xF3n es agendar citas. NUNCA hables de registrar veh\xEDculos, consultar veh\xEDculos, ni nada fuera de citas
2. NUNCA menciones bases de datos, registros, ni sistemas internos al cliente
3. Si preguntan por precios, muestra la LISTA DE SERVICIOS numerada con precios. ACLARA SIEMPRE que son referenciales.
4. Si preguntan algo fuera de citas: "Mi funci\xF3n es ayudarte a agendar una cita. \xBFEn qu\xE9 servicio est\xE1s interesado?"
5. Mant\xE9n SIEMPRE el contexto de la cita. NO repitas datos que ya tienes
6. S\xE9 conciso: m\xE1ximo 3-4 l\xEDneas por respuesta
7. El A\xD1O en el campo "anio" del JSON es SIEMPRE el a\xF1o del VEH\xCDCULO (fabricaci\xF3n). La fecha de la cita SIEMPRE debe estar en 2026. NUNCA confundas ambos.

LISTA DE SERVICIOS PRINCIPALES (precios REFERENCIALES):
1. Cambio de Aceite \u2014 $15.000
2. Revisi\xF3n General \u2014 $25.000
3. Scanner Diagn\xF3stico \u2014 $20.000
4. Frenos \u2014 $35.000
5. Revisi\xF3n El\xE9ctrica \u2014 $20.000
6. Aire Acondicionado \u2014 $25.000
7. Revisi\xF3n T\xE9cnica \u2014 $30.000
8. Servicio a Domicilio \u2014 $50.000
9. Otro (el cliente debe especificar)

El cliente puede elegir escribiendo el NUMERO del servicio o el NOMBRE completo o parcial del servicio. Si elige un n\xFAmero, asigna ese servicio. Si escribe parte del nombre, busca el mejor match de la lista.

SERVICIOS ADICIONALES (de la base de datos):
${servicios}

NOTA IMPORTANTE SOBRE PRECIOS:
- Los precios son REFERENCIALES. El costo final puede variar seg\xFAn el modelo del veh\xEDculo y repuestos necesarios.
- SERVICIO A DOMICILIO tiene un COSTO FIJO de $50.000 (traslado) que se SUMA al precio del servicio contratado. Inf\xF3rmalo siempre.
- Servicios con REPUESTOS: el precio var\xEDa seg\xFAn la marca y modelo del veh\xEDculo.
- Para cotizaci\xF3n exacta: llamar al +56939026185 o WhatsApp.
- SIEMPRE muestra el precio aproximado al confirmar la cita.

REGLAS CR\xCDTICAS DE FECHA Y HORA:
- Cuando el cliente diga "ma\xF1ana", "el martes", "este viernes", etc., SIEMPRE convierte a fecha num\xE9rica YYYY-MM-DD usando la fecha de referencia de arriba
- El campo fecha en el JSON DEBE SER SIEMPRE formato YYYY-MM-DD (ejemplo: 2026-06-23). NUNCA pongas "martes", "ma\xF1ana", "viernes", etc.
- El campo hora DEBE SER SIEMPRE formato HH:MM en 24 horas (ejemplo: 14:30). NUNCA pongas "3pm", "4:00 pm", etc. Convierte: 3pm=15:00, 10am=10:00, 12pm=12:00
- Si el cliente dice una hora como "a las 3" o "a las 4", asume PM (tarde) y convierte: 3\u219215:00, 4\u219216:00, 10\u219210:00 (AM si es ma\xF1ana)
- Si la fecha que pide el cliente es domingo, avisa que est\xE1n cerrados y sugiere lunes
- Si la hora pedida est\xE1 fuera de horario (antes de 08:00 o despu\xE9s de 18:00 entre semana, o antes de 09:00 o despu\xE9s de 14:00 s\xE1bado), sugiere el horario m\xE1s cercano

FLUJO DE AGENDAMIENTO (OBLIGATORIO este orden):
Paso 1: LO PRIMERO: pregunta si el servicio es EN TALLER o A DOMICILIO. Esto es lo primero siempre.
Paso 2: Muestra la LISTA NUMERADA de servicios para que el cliente elija por n\xFAmero o nombre.
Paso 3: Pregunta fecha y hora preferida (puede decir "ma\xF1ana", "el martes", etc.)
Paso 4: Pregunta datos del veh\xEDculo: patente, marca, modelo, a\xF1o, color
Paso 5: Pregunta nombre y apellido del cliente
Paso 6: Pregunta tel\xE9fono
Paso 7: Pregunta la direcci\xF3n (calle, n\xFAmero, comuna) \u2014 SIEMPRE, tanto para taller como domicilio.
Paso 8: Si es DOMICILIO, pregunta additionally punto de referencia (depto, casa, local, como llegar)
Paso 9: Pregunta qu\xE9 requerimientos tiene o qu\xE9 problema presenta el veh\xEDculo
Paso 10: VALIDA que tienes TODOS los datos obligatorios antes de generar JSON. Faltantes = pregunta lo que falta.
Paso 11: Muestra RESUMEN EN CUADRO con TODOS los datos + PRECIO APROXIMADO, y genera el JSON.

DATOS OBLIGATORIOS para generar JSON:
- patente, nombre, apellido, telefono, servicio, fecha, hora, tipo_atencion
- marca, modelo, anio, color (dejar "" si el cliente no sabe)
- direccion (SIEMPRE pedirla)
- referencia_direccion (solo si domicilio)
- requerimientos (lo que el cliente describa)

Si el cliente menciona datos al inicio, an\xF3talos y NO repitas. S\xE9 amable y fluido.

AL FINAL muestra el resumen ASI:
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
RESUMEN DE CITA:
Patente: ABC123 | Toyota Corolla 2020 (Blanco)
Cliente: Juan Perez | Tel: +56912345678
Direcci\xF3n: Av. Providencia 1234, Santiago
Servicio: Cambio de Aceite \u2014 $15.000
Atenci\xF3n: En Taller
Fecha: martes 23 de junio de 2026 a las 10:30 hrs
Requerimientos: Ruido en el motor al arrancar
Precio aproximado: $15.000 (referencial)
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

Si es domicilio, el resumen incluye direcci\xF3n completa y el precio se muestra asi:
Direcci\xF3n: Av. Providencia 1234, depto 402, Santiago
Referencia: Casa verde, port\xF3n negro, llegar por pasaje
Precio aproximado: $15.000 (servicio) + $50.000 (traslado) = $65.000 (referencial)

DESPUES del resumen, genera el JSON:

[CITA_JSON]
{"patente":"XXX","marca":"XXX","modelo":"XXX","anio":"XXXX","color":"XXX","nombre":"Nombre","apellido":"Apellido","telefono":"XXX","servicio":"XXX","fecha":"YYYY-MM-DD","hora":"HH:MM","tipo_atencion":"taller","direccion":"calle, numero, comuna","referencia_direccion":"","requerimientos":"XXX"}
[/CITA_JSON]

El campo tipo_atencion SIEMPRE debe ser "taller" o "domicilio". Nunca vacio.

Campos opcionales en el JSON: Si el cliente no proporciona algun dato, dejalo como string vacio "". NO inventes datos.
- referencia_direccion: obligatorio SOLO si tipo_atencion es "domicilio"
- marca, modelo, anio, color: si el cliente no los sabe, deja ""
- requerimientos: lo que el cliente describa sobre el problema

EJEMPLO CORRECTO (en taller):
[CITA_JSON]
{"patente":"ABC123","marca":"Toyota","modelo":"Corolla","anio":"2020","color":"Blanco","nombre":"Juan","apellido":"Perez","telefono":"+56912345678","servicio":"Cambio de Aceite","fecha":"2026-06-23","hora":"10:30","tipo_atencion":"taller","direccion":"Av. Providencia 1234, Santiago","referencia_direccion":"","requerimientos":"Ruido en el motor"}
[/CITA_JSON]

EJEMPLO CON DOMICILIO:
[CITA_JSON]
{"patente":"DEF456","marca":"Hyundai","modelo":"Tucson","anio":"2019","color":"Gris","nombre":"Maria","apellido":"Gonzalez","telefono":"+56998765432","servicio":"Scanner Diagn\xF3stico","fecha":"2026-06-23","hora":"15:00","tipo_atencion":"domicilio","direccion":"Av. Providencia 1234, Santiago","referencia_direccion":"Casa verde, porton negro","requerimientos":"No arranca el auto"}
[/CITA_JSON]

EJEMPLO INCORRECTO (NUNCA hagas esto):
{"fecha":"martes","hora":"3pm","tipo_atencion":""} \u2190 tipo_atencion vacio, hora incorrecta
{"fecha":"maniana","hora":"4:00 pm"} \u2190 ESTO ESTA MAL

Si falta algun dato obligatorio (patente, nombre, apellido, telefono, servicio, fecha, hora, tipo_atencion, direccion), NO generes el JSON. Pregunta por lo que falta.

RESPUESTAS:
- Usa emojis: \u{1F697} \u{1F527} \u{1F4C5} \u23F0 \u2705
- Al confirmar la cita, muestra la fecha en formato legible: "martes 23 de junio de 2026 a las 10:30 hrs"
- Cuando el cliente pregunte por precios, muestra SIEMPRE la lista numerada completa:
1. Cambio de Aceite \u2014 $15.000
2. Revisi\xF3n General \u2014 $25.000
3. Scanner Diagn\xF3stico \u2014 $20.000
4. Frenos \u2014 $35.000
5. Revisi\xF3n El\xE9ctrica \u2014 $20.000
6. Aire Acondicionado \u2014 $25.000
7. Revisi\xF3n T\xE9cnica \u2014 $30.000
8. Servicio a Domicilio \u2014 $50.000
9. Otro (especifique)`;
}
__name(getSystemPrompt, "getSystemPrompt");
async function consultarVehiculoEnTaller(env2, patente) {
  try {
    const pat = patente.toUpperCase().trim();
    const vehiculo = await env2.TALLER_DB.prepare(
      "SELECT v.*, c.nombre as cliente_nombre, c.telefono as cliente_telefono, c.rut as cliente_rut FROM sgc_ord_Vehiculos v LEFT JOIN sgc_ord_Clientes c ON v.cliente_id = c.id WHERE UPPER(v.patente_placa) = ? LIMIT 1"
    ).bind(pat).first();
    if (!vehiculo) {
      return { success: false, error: "Veh\xEDculo no encontrado en nuestra base de datos" };
    }
    const ultimaOrden = await env2.TALLER_DB.prepare(
      "SELECT numero_orden, fecha_ingreso, servicios_seleccionados, estado, monto_total FROM sgc_ord_OrdenesTrabajo WHERE patente_placa = ? ORDER BY id DESC LIMIT 1"
    ).bind(pat).first();
    const totalOrd = await env2.TALLER_DB.prepare(
      "SELECT COUNT(*) as cnt FROM sgc_ord_OrdenesTrabajo WHERE patente_placa = ?"
    ).bind(pat).first();
    const result = {
      id: vehiculo.id,
      patente_placa: vehiculo.patente_placa,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      anio: vehiculo.anio,
      cilindrada: vehiculo.cilindrada,
      combustible: vehiculo.combustible,
      kilometraje: vehiculo.kilometraje,
      color: vehiculo.color,
      cliente_id: vehiculo.cliente_id,
      fecha_registro: vehiculo.fecha_registro,
      cliente_nombre: vehiculo.cliente_nombre,
      cliente_telefono: vehiculo.cliente_telefono,
      cliente_rut: vehiculo.cliente_rut,
      total_ordenes: totalOrd?.cnt || 0,
      ultima_orden: ultimaOrden ? {
        numero_orden: ultimaOrden.numero_orden,
        fecha_ingreso: ultimaOrden.fecha_ingreso,
        servicios_seleccionados: ultimaOrden.servicios_seleccionados,
        estado: ultimaOrden.estado,
        monto_total: ultimaOrden.monto_total || 0
      } : void 0
    };
    return { success: true, vehiculo: result };
  } catch (error) {
    console.error("Error consultando veh\xEDculo en tallerv2_db:", error);
    return { success: false, error: "Error al consultar el veh\xEDculo: " + error.message };
  }
}
__name(consultarVehiculoEnTaller, "consultarVehiculoEnTaller");
async function consultarCitas(env2, filtro) {
  try {
    let query = "SELECT id, patente, nombre_cliente, telefono, servicio, fecha_cita, hora_cita, estado, observaciones, canal FROM sgc_cit_Citas WHERE estado NOT IN ('cancelada', 'no_asistio') AND fecha_cita >= ?";
    const now = /* @__PURE__ */ new Date();
    const chileStr = now.toLocaleString("es-CL", { timeZone: "America/Santiago" });
    const chile = new Date(chileStr);
    const hoyChile = `${chile.getFullYear()}-${String(chile.getMonth() + 1).padStart(2, "0")}-${String(chile.getDate()).padStart(2, "0")}`;
    const params = [hoyChile];
    if (filtro.patente) {
      query += " AND UPPER(patente) = ?";
      params.push(filtro.patente.toUpperCase().trim());
    } else if (filtro.telefono) {
      query += " AND telefono = ?";
      params.push(filtro.telefono.trim());
    }
    query += " ORDER BY fecha_cita ASC, hora_cita ASC LIMIT 10";
    const stmt = env2.DB.prepare(query);
    const result = await stmt.bind(...params).all();
    return result.results || [];
  } catch (error) {
    console.error("Error consultando citas:", error);
    return [];
  }
}
__name(consultarCitas, "consultarCitas");
async function enviarOrdenAGlobalprov2(env2, cita, vehiculoData) {
  try {
    const url = `${env2.GLOBALPROV2_URL}/api/public/crear-orden-express`;
    console.log("Enviando orden a Globalprov2:", url);
    const body = {
      patente: cita.patente,
      marca: vehiculoData?.marca || cita.marca || "",
      modelo: vehiculoData?.modelo || cita.modelo || "",
      cliente: cita.nombre_cliente,
      telefono: cita.telefono,
      direccion: cita.direccion || "",
      referencia_direccion: cita.referencia_direccion || "",
      notas_diagnostico: `Cita agendada via Chat IA | Servicio: ${cita.servicio} | Fecha: ${cita.fecha_cita} ${cita.hora_cita} | ${cita.observaciones || ""}`.trim(),
      express: true,
      fecha_ingreso: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      origen: "chat_ia"
    };
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const responseText = await response.text();
    console.log("Globalprov2 response status:", response.status, "body:", responseText);
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseErr) {
      console.error("Failed to parse Globalprov2 response:", parseErr);
      return { success: false, error: "Respuesta inv\xE1lida de Globalprov2: " + responseText.substring(0, 200) };
    }
    if (data.success && data.numero_orden) {
      console.log("Orden creada en Globalprov2, n\xFAmero:", data.numero_orden);
      return { success: true, numero_orden: data.numero_orden };
    } else {
      console.error("Globalprov2 rechaz\xF3 la orden:", JSON.stringify(data));
      return { success: false, error: data.error || "Error al crear orden en Globalprov2" };
    }
  } catch (error) {
    console.error("Error enviando orden a Globalprov2:", error.message, error.stack);
    return { success: false, error: "Error de conexi\xF3n con Globalprov2: " + error.message };
  }
}
__name(enviarOrdenAGlobalprov2, "enviarOrdenAGlobalprov2");
async function enviarWhatsApp(env2, telefono, mensaje) {
  try {
    const instanceId = env2.ULTRAMSG_INSTANCE_ID;
    const token = env2.ULTRAMSG_TOKEN;
    if (!instanceId || !token) {
      console.log("UltraMsg no configurado. Mensaje no enviado:", mensaje);
      return { success: false, error: "UltraMsg no configurado" };
    }
    let phone = telefono.replace(/[^0-9]/g, "");
    if (phone.startsWith("56") && phone.length === 11) {
      phone = "56" + phone;
    } else if (phone.startsWith("9") && phone.length === 9) {
      phone = "56" + phone;
    }
    const apiUrl = `https://api.ultramsg.com/${instanceId}/messages/chat`;
    const formData = new URLSearchParams();
    formData.append("token", token);
    formData.append("to", phone);
    formData.append("body", mensaje);
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString()
    });
    const data = await response.json();
    if (data.status === "success" || data.sent) {
      console.log("WhatsApp enviado a", phone);
      return { success: true };
    } else {
      console.error("UltraMsg error:", JSON.stringify(data));
      return { success: false, error: data.message || "Error al enviar WhatsApp" };
    }
  } catch (error) {
    console.error("Error enviando WhatsApp:", error);
    return { success: false, error: error.message };
  }
}
__name(enviarWhatsApp, "enviarWhatsApp");
async function getDisponibilidad(env2, fecha) {
  const dateObj = /* @__PURE__ */ new Date(fecha + "T12:00:00");
  const dias = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  const diaSemana = dias[dateObj.getDay()];
  const horario = await env2.DB.prepare("SELECT * FROM sgc_cit_horarios WHERE dia_semana = ?").bind(diaSemana).first();
  if (!horario || !horario.activo) {
    return { slots: [], cerrado: true };
  }
  const bloqueo = await env2.DB.prepare("SELECT * FROM sgc_cit_bloqueos WHERE fecha = ?").bind(fecha).first();
  if (bloqueo) {
    return { slots: [], cerrado: true };
  }
  const configMax = await env2.DB.prepare("SELECT valor FROM sgc_cit_config WHERE clave = 'max_citas_por_dia'").first();
  const maxCitas = configMax ? parseInt(configMax.valor) : 20;
  const citasExistentes = await env2.DB.prepare("SELECT hora_cita FROM sgc_cit_Citas WHERE fecha_cita = ? AND estado NOT IN ('cancelada')").bind(fecha).all();
  const horasOcupadas = new Set(citasExistentes.results.map((c) => c.hora_cita));
  const slots = [];
  const [aperturaH, aperturaM] = horario.hora_apertura.split(":").map(Number);
  const [cierreH, cierreM] = horario.hora_cierre.split(":").map(Number);
  const intervalo = horario.intervalo_minutos || 30;
  let currentMinutes = aperturaH * 60 + aperturaM;
  const endMinutes = cierreH * 60 + cierreM;
  const now = /* @__PURE__ */ new Date();
  const fechaMinima = new Date(now.getTime() + 2 * 60 * 60 * 1e3);
  while (currentMinutes + 60 <= endMinutes) {
    const h = Math.floor(currentMinutes / 60);
    const m = currentMinutes % 60;
    const horaStr = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    const slotTime = /* @__PURE__ */ new Date(fecha + "T" + horaStr + ":00");
    if (slotTime > fechaMinima) {
      const ocupadasEnSlot = Array.from(horasOcupadas).filter((oh) => {
        const [ohH, ohM] = oh.split(":").map(Number);
        const ohMinutes = ohH * 60 + ohM;
        return Math.abs(ohMinutes - currentMinutes) < 60;
      }).length;
      slots.push({
        hora: horaStr,
        disponibles: Math.max(0, maxCitas - ocupadasEnSlot),
        maximo: maxCitas
      });
    }
    currentMinutes += intervalo;
  }
  return { slots, cerrado: false };
}
__name(getDisponibilidad, "getDisponibilidad");
function handleCors() {
  return new Response(null, { headers: CORS_HEADERS });
}
__name(handleCors, "handleCors");
var index_default = {
  async fetch(request, env2) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (request.method === "OPTIONS") {
      return handleCors();
    }
    try {
      if (path === "/api/migrate" && request.method === "GET") {
        try {
          await env2.DB.prepare("ALTER TABLE sgc_cit_Citas ADD COLUMN tipo_atencion TEXT DEFAULT 'taller'").run();
          await env2.DB.prepare("ALTER TABLE sgc_cit_Citas ADD COLUMN direccion TEXT").run();
          await env2.DB.prepare("ALTER TABLE sgc_cit_Citas ADD COLUMN referencia_direccion TEXT").run();
          await env2.DB.prepare("ALTER TABLE sgc_cit_servicios_unificados ADD COLUMN origen TEXT DEFAULT 'manual'").run();
          await env2.DB.prepare("ALTER TABLE sgc_cit_Citas ADD COLUMN estado_aprobacion TEXT DEFAULT 'pendiente'").run();
          await env2.DB.prepare("ALTER TABLE sgc_cit_Citas ADD COLUMN motivo_rechazo TEXT").run();
          return new Response(JSON.stringify({ success: true, mensaje: "Migraciones aplicadas" }), {
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
          });
        } catch (e) {
          if (e.message?.includes("duplicate column") || e.message?.includes("already exists")) {
            return new Response(JSON.stringify({ success: true, mensaje: "Columnas ya existen" }), {
              headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
            });
          }
          throw e;
        }
      }
      if (path === "/api/servicios" && request.method === "GET") {
        const servicios = await env2.DB.prepare("SELECT * FROM sgc_cit_servicios_unificados WHERE activo = 1 ORDER BY orden ASC, id ASC").all();
        return new Response(JSON.stringify({ servicios: servicios.results }), {
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
        });
      }
      if (path === "/api/admin/servicios" && request.method === "GET") {
        const servicios = await env2.DB.prepare("SELECT * FROM sgc_cit_servicios_unificados ORDER BY orden ASC, id ASC").all();
        return new Response(JSON.stringify({ success: true, servicios: servicios.results, total: servicios.results.length }), {
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
        });
      }
      if (path === "/api/admin/servicios" && request.method === "POST") {
        const body = await request.json();
        if (!body.nombre || !body.nombre.trim()) {
          return new Response(JSON.stringify({ error: "Nombre del servicio requerido" }), {
            status: 400,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
          });
        }
        const maxOrd = await env2.DB.prepare("SELECT MAX(orden) as m FROM sgc_cit_servicios_unificados").first();
        const nextOrd = (maxOrd?.m || 0) + 1;
        const result = await env2.DB.prepare(
          "INSERT INTO sgc_cit_servicios_unificados (nombre, descripcion, categoria, precio, duracion_minutos, activo, origen, orden) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        ).bind(
          body.nombre.trim(),
          body.descripcion || "",
          body.categoria || "General",
          body.precio || 0,
          body.duracion_minutos || 60,
          body.activo !== void 0 ? body.activo : 1,
          body.origen || "manual",
          body.orden || nextOrd
        ).run();
        return new Response(JSON.stringify({ success: true, id: result.meta.last_row_id, mensaje: "Servicio creado" }), {
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
        });
      }
      const adminMatch = path.match(/^\/api\/admin\/servicios\/(\d+)$/);
      if (adminMatch && request.method === "PUT") {
        const id = parseInt(adminMatch[1]);
        const body = await request.json();
        const existing = await env2.DB.prepare("SELECT id FROM sgc_cit_servicios_unificados WHERE id = ?").bind(id).first();
        if (!existing) {
          return new Response(JSON.stringify({ error: "Servicio no encontrado" }), {
            status: 404,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
          });
        }
        const sets = [];
        const vals = [];
        if (body.nombre !== void 0) {
          sets.push("nombre = ?");
          vals.push(body.nombre.trim());
        }
        if (body.descripcion !== void 0) {
          sets.push("descripcion = ?");
          vals.push(body.descripcion);
        }
        if (body.categoria !== void 0) {
          sets.push("categoria = ?");
          vals.push(body.categoria);
        }
        if (body.precio !== void 0) {
          sets.push("precio = ?");
          vals.push(body.precio);
        }
        if (body.duracion_minutos !== void 0) {
          sets.push("duracion_minutos = ?");
          vals.push(body.duracion_minutos);
        }
        if (body.activo !== void 0) {
          sets.push("activo = ?");
          vals.push(body.activo);
        }
        if (body.orden !== void 0) {
          sets.push("orden = ?");
          vals.push(body.orden);
        }
        if (body.origen !== void 0) {
          sets.push("origen = ?");
          vals.push(body.origen);
        }
        if (sets.length > 0) {
          sets.push("updated_at = datetime('now')");
          vals.push(id);
          await env2.DB.prepare(`UPDATE sgc_cit_servicios_unificados SET ${sets.join(", ")} WHERE id = ?`).bind(...vals).run();
        }
        return new Response(JSON.stringify({ success: true, mensaje: "Servicio actualizado" }), {
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
        });
      }
      if (adminMatch && request.method === "DELETE") {
        const id = parseInt(adminMatch[1]);
        await env2.DB.prepare("DELETE FROM sgc_cit_servicios_unificados WHERE id = ?").bind(id).run();
        return new Response(JSON.stringify({ success: true, mensaje: "Servicio eliminado" }), {
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
        });
      }
      if (path === "/api/disponibilidad" && request.method === "GET") {
        const fecha = url.searchParams.get("fecha");
        if (!fecha) {
          return new Response(JSON.stringify({ error: "Fecha requerida (formato YYYY-MM-DD)" }), {
            status: 400,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
          });
        }
        const result = await getDisponibilidad(env2, fecha);
        return new Response(JSON.stringify(result), {
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
        });
      }
      if (path === "/api/consultar-vehiculo" && request.method === "POST") {
        const body = await request.json();
        if (!body.patente) {
          return new Response(JSON.stringify({ error: "Patente requerida" }), {
            status: 400,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
          });
        }
        const result = await consultarVehiculoEnTaller(env2, body.patente);
        return new Response(JSON.stringify(result), {
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
        });
      }
      if (path === "/api/consultar-citas" && request.method === "GET") {
        const patente = url.searchParams.get("patente");
        const telefono = url.searchParams.get("telefono");
        if (!patente && !telefono) {
          return new Response(JSON.stringify({ error: "Se requiere patente o tel\xE9fono" }), {
            status: 400,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
          });
        }
        const citas = await consultarCitas(env2, { patente: patente || void 0, telefono: telefono || void 0 });
        return new Response(JSON.stringify({ success: true, citas }), {
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
        });
      }
      if (path === "/api/agendar" && request.method === "POST") {
        const body = await request.json();
        if (!body.patente || !body.nombre || !body.telefono || !body.servicio || !body.fecha || !body.hora) {
          return new Response(JSON.stringify({
            error: "Faltan campos requeridos",
            requeridos: ["patente", "nombre", "telefono", "servicio", "fecha", "hora"]
          }), {
            status: 400,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
          });
        }
        const disp = await getDisponibilidad(env2, body.fecha);
        if (disp.cerrado) {
          return new Response(JSON.stringify({ error: "No hay disponibilidad para esa fecha" }), {
            status: 409,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
          });
        }
        const slot = disp.slots.find((s) => s.hora === body.hora);
        if (!slot || slot.disponibles <= 0) {
          return new Response(JSON.stringify({ error: "No hay cupos disponibles para esa hora" }), {
            status: 409,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
          });
        }
        const existente = await env2.DB.prepare(
          "SELECT id FROM sgc_cit_Citas WHERE patente = ? AND fecha_cita = ? AND hora_cita = ? AND estado NOT IN ('cancelada', 'no_asistio')"
        ).bind(body.patente.toUpperCase().trim(), body.fecha, body.hora).first();
        if (existente) {
          return new Response(JSON.stringify({ error: "Ya existe una cita para esa patente en ese horario" }), {
            status: 409,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
          });
        }
        const servicio = await env2.DB.prepare("SELECT duracion_minutos FROM sgc_cit_servicios_unificados WHERE nombre = ? AND activo = 1").bind(body.servicio).first();
        const duracion = servicio ? servicio.duracion_minutos : 60;
        const vehiculoResult = await consultarVehiculoEnTaller(env2, body.patente);
        const marcaAuto = vehiculoResult.vehiculo?.marca || body.marca || null;
        const modeloAuto = vehiculoResult.vehiculo?.modelo || body.modelo || null;
        const anioAuto = vehiculoResult.vehiculo?.anio || body.anio || null;
        const nombreCompleto = [body.nombre.trim(), body.apellido?.trim()].filter(Boolean).join(" ");
        const result = await env2.DB.prepare(`
          INSERT INTO sgc_cit_Citas (patente, marca, modelo, anio, color, nombre_cliente, telefono, email, servicio, fecha_cita, hora_cita, duracion_minutos, observaciones, canal, direccion, referencia_direccion, tipo_atencion)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          body.patente.toUpperCase().trim(),
          marcaAuto,
          modeloAuto,
          anioAuto,
          body.color || null,
          nombreCompleto,
          body.telefono.trim(),
          body.email || null,
          body.servicio,
          body.fecha,
          body.hora,
          duracion,
          body.requerimientos || body.observaciones || null,
          body.canal || "chat",
          body.direccion || null,
          body.referencia_direccion || null,
          body.tipo_atencion || "taller"
        ).run();
        const citaId = result.meta.last_row_id;
        const cita = await env2.DB.prepare("SELECT * FROM sgc_cit_Citas WHERE id = ?").bind(citaId).first();
        const ordenResult = await enviarOrdenAGlobalprov2(env2, cita, vehiculoResult.vehiculo);
        const numOrden = ordenResult.numero_orden ? String(ordenResult.numero_orden) : null;
        await env2.DB.prepare(
          "UPDATE sgc_cit_Citas SET orden_enviada = ?, numero_orden_sgc = ?, updated_at = datetime('now') WHERE id = ?"
        ).bind(ordenResult.success ? 1 : 0, numOrden, citaId).run();
        return new Response(JSON.stringify({
          success: true,
          mensaje: ordenResult.success ? "Cita agendada y orden creada exitosamente" : "Cita agendada (la orden se enviar\xE1 en breve)",
          cita: {
            id: citaId,
            patente: cita.patente,
            nombre: cita.nombre_cliente,
            telefono: cita.telefono,
            servicio: cita.servicio,
            fecha: cita.fecha_cita,
            hora: cita.hora_cita,
            estado: cita.estado
          },
          orden_globalprov2: ordenResult.success ? {
            numero: ordenResult.numero_orden,
            formato: "EXP" + String(ordenResult.numero_orden).padStart(6, "0")
          } : null,
          orden_error: ordenResult.error || null
        }), {
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
        });
      }
      if (path === "/api/chat" && request.method === "POST") {
        const { messages } = await request.json();
        if (!messages || messages.length === 0) {
          return new Response(JSON.stringify({ error: "No se proporcionaron mensajes" }), {
            status: 400,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
          });
        }
        const serviciosResult = await env2.DB.prepare("SELECT nombre, descripcion, duracion_minutos, precio, categoria FROM sgc_cit_servicios_unificados WHERE activo = 1 ORDER BY orden ASC, id ASC").all();
        const serviciosText = serviciosResult.results.map((s, i) => {
          const precioStr = s.precio > 0 ? `$${s.precio.toLocaleString("es-CL")} (ref.)` : "Consultar precio";
          return `${i + 1}. ${s.nombre} \u2014 ${s.descripcion || "Servicio profesional"} \u2014 ${precioStr} (${s.categoria || "General"}, ~${s.duracion_minutos} min)`;
        }).join("\n");
        const systemPrompt = getSystemPrompt(env2.BUSINESS_NAME, serviciosText);
        const chatMessages = [
          { role: "system", content: systemPrompt }
        ];
        for (const msg of messages) {
          if (msg.role !== "system") {
            chatMessages.push(msg);
          }
        }
        const aiResponse = await env2.AI.run(MODEL_ID, {
          messages: chatMessages,
          max_tokens: 512,
          stream: true
        });
        return new Response(aiResponse, {
          headers: {
            ...CORS_HEADERS,
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive"
          }
        });
      }
      if (path === "/api/citas/stats" && request.method === "GET") {
        const nowStat = /* @__PURE__ */ new Date();
        const chileStatStr = nowStat.toLocaleString("es-CL", { timeZone: "America/Santiago" });
        const chileStat = new Date(chileStatStr);
        const hoy = `${chileStat.getFullYear()}-${String(chileStat.getMonth() + 1).padStart(2, "0")}-${String(chileStat.getDate()).padStart(2, "0")}`;
        const [totalCitas, citasHoy, citasPendientes, ordenesEnviadas] = await Promise.all([
          env2.DB.prepare("SELECT COUNT(*) as total FROM sgc_cit_Citas").first(),
          env2.DB.prepare("SELECT COUNT(*) as total FROM sgc_cit_Citas WHERE fecha_cita = ?").bind(hoy).first(),
          env2.DB.prepare("SELECT COUNT(*) as total FROM sgc_cit_Citas WHERE estado = 'pendiente'").first(),
          env2.DB.prepare("SELECT COUNT(*) as total FROM sgc_cit_Citas WHERE orden_enviada = 1").first()
        ]);
        return new Response(JSON.stringify({
          total: totalCitas.total,
          hoy: citasHoy.total,
          pendientes: citasPendientes.total,
          ordenes_enviadas_globalprov2: ordenesEnviadas.total
        }), {
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
        });
      }
      if (path === "/api/citas/rango" && request.method === "GET") {
        const inicio = url.searchParams.get("inicio");
        const fin = url.searchParams.get("fin");
        if (!inicio || !fin) {
          return new Response(JSON.stringify({ error: "Par\xE1metros inicio y fin requeridos (YYYY-MM-DD)" }), {
            status: 400,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
          });
        }
        const citas = await env2.DB.prepare(
          "SELECT id, patente, marca, modelo, anio, color, nombre_cliente, telefono, servicio, fecha_cita, hora_cita, estado, observaciones, canal, duracion_minutos, tipo_atencion, direccion, referencia_direccion, created_at FROM sgc_cit_Citas WHERE fecha_cita >= ? AND fecha_cita <= ? AND estado NOT IN ('cancelada', 'no_asistio') ORDER BY fecha_cita, hora_cita"
        ).bind(inicio, fin).all();
        return new Response(JSON.stringify({ success: true, citas: citas.results }), {
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
        });
      }
      if (path === "/api/citas-admin" && request.method === "GET") {
        const estado = url.searchParams.get("estado") || "";
        const limit = parseInt(url.searchParams.get("limit") || "50");
        let query = "SELECT * FROM sgc_cit_Citas WHERE canal = 'chat'";
        const params = [];
        if (estado === "pendiente") query += " AND (estado_aprobacion = 'pendiente' OR estado_aprobacion IS NULL)";
        else if (estado === "aprobada") query += " AND estado_aprobacion = 'aprobada'";
        else if (estado === "rechazada") query += " AND estado_aprobacion = 'rechazada'";
        query += " ORDER BY created_at DESC LIMIT ?";
        params.push(limit);
        const citas = await env2.DB.prepare(query).bind(...params).all();
        const [totales, pendientes, aprobadas, rechazadas] = await Promise.all([
          env2.DB.prepare("SELECT COUNT(*) as c FROM sgc_cit_Citas WHERE canal = 'chat'").first(),
          env2.DB.prepare("SELECT COUNT(*) as c FROM sgc_cit_Citas WHERE canal = 'chat' AND (estado_aprobacion = 'pendiente' OR estado_aprobacion IS NULL)").first(),
          env2.DB.prepare("SELECT COUNT(*) as c FROM sgc_cit_Citas WHERE canal = 'chat' AND estado_aprobacion = 'aprobada'").first(),
          env2.DB.prepare("SELECT COUNT(*) as c FROM sgc_cit_Citas WHERE canal = 'chat' AND estado_aprobacion = 'rechazada'").first()
        ]);
        return new Response(JSON.stringify({
          success: true,
          citas: citas.results,
          stats: {
            total: totales?.c || 0,
            pendientes: pendientes?.c || 0,
            aprobadas: aprobadas?.c || 0,
            rechazadas: rechazadas?.c || 0
          }
        }), {
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
        });
      }
      if (path.match(/^\/api\/citas-admin\/\d+\/aprobar$/) && request.method === "POST") {
        const idMatch = path.match(/\/(\d+)\/aprobar$/);
        const id = parseInt(idMatch[1]);
        await env2.DB.prepare(
          "UPDATE sgc_cit_Citas SET estado_aprobacion = 'aprobada', estado = 'confirmada', updated_at = datetime('now') WHERE id = ?"
        ).bind(id).run();
        const cita = await env2.DB.prepare("SELECT * FROM sgc_cit_Citas WHERE id = ?").bind(id).first();
        let ordenCreada = false;
        if (cita && !cita.numero_orden_sgc) {
          console.log("Cita sin OT, creando orden en Globalprov2 para cita:", id);
          const vehiculoData = await consultarVehiculoEnTaller(env2, cita.patente);
          const ordenResult = await enviarOrdenAGlobalprov2(env2, cita, vehiculoData.vehiculo);
          if (ordenResult.success) {
            const numOrden = ordenResult.numero_orden ? String(ordenResult.numero_orden) : null;
            await env2.DB.prepare(
              "UPDATE sgc_cit_Citas SET orden_enviada = 1, numero_orden_sgc = ?, updated_at = datetime('now') WHERE id = ?"
            ).bind(numOrden, id).run();
            ordenCreada = true;
            console.log("Orden creada al aprobar cita:", id, "-> OT:", numOrden);
          } else {
            console.error("Error creando orden al aprobar cita:", id, ordenResult.error);
          }
        }
        if (cita && cita.telefono) {
          const tipoAtencion = cita.tipo_atencion === "domicilio" ? "a Domicilio" : "en Taller";
          const otLine = ordenCreada ? `
\u{1F4CB} Orden de Trabajo: EXP${String(cita.numero_orden_sgc || "").padStart(6, "0")}` : "";
          const msg = `\u2705 *Su cita ha sido APROBADA*

\u{1F527} Servicio: ${cita.servicio}
\u{1F4CD} Atenci\xF3n: ${tipoAtencion}
\u{1F4C5} Fecha: ${cita.fecha_cita}
\u23F0 Hora: ${cita.hora_cita}
\u{1F697} Veh\xEDculo: ${cita.patente}${cita.marca ? " " + cita.marca : ""}${cita.modelo ? " " + cita.modelo : ""}` + otLine + `

Lo esperamos. *Global Pro Automotriz*
\u{1F4DE} +56939026185`;
          await enviarWhatsApp(env2, cita.telefono, msg);
        }
        return new Response(JSON.stringify({
          success: true,
          mensaje: ordenCreada ? "Cita aprobada, orden de trabajo creada y notificaci\xF3n enviada" : "Cita aprobada y notificaci\xF3n enviada",
          orden_creada: ordenCreada
        }), {
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
        });
      }
      if (path.match(/^\/api\/citas-admin\/\d+\/rechazar$/) && request.method === "POST") {
        const idMatch = path.match(/\/(\d+)\/rechazar$/);
        const id = parseInt(idMatch[1]);
        const body = await request.json();
        const motivo = body?.motivo || "No especificado";
        await env2.DB.prepare(
          "UPDATE sgc_cit_Citas SET estado_aprobacion = 'rechazada', estado = 'cancelada', motivo_rechazo = ?, updated_at = datetime('now') WHERE id = ?"
        ).bind(motivo, id).run();
        const cita = await env2.DB.prepare("SELECT * FROM sgc_cit_Citas WHERE id = ?").bind(id).first();
        if (cita && cita.telefono) {
          const msg = `\u274C *Su cita ha sido RECHAZADA*

\u{1F527} Servicio: ${cita.servicio}
\u{1F4C5} Fecha: ${cita.fecha_cita}

Lamentamos las molestias. Para m\xE1s informaci\xF3n o reagendar, contacte directamente:
\u{1F4DE} *WhatsApp: +56939026185*
*Global Pro Automotriz*`;
          await enviarWhatsApp(env2, cita.telefono, msg);
        }
        return new Response(JSON.stringify({ success: true, mensaje: "Cita rechazada y notificaci\xF3n enviada por WhatsApp" }), {
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
        });
      }

      // ============================================================
      // WHATSAPP WEBHOOK (Evolution API v2)
      // ============================================================
      if (path === "/api/whatsapp/webhook" && request.method === "POST") {
        return await handleWhatsAppWebhook(request, env2);
      }
      if (path === "/api/whatsapp/test" && request.method === "GET") {
        return new Response(JSON.stringify({ ok: true, msg: "Webhook endpoint activo", time: new Date().toISOString() }), {
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
        });
      }

      return env2.ASSETS.fetch(request);
    } catch (error) {
      console.error("Worker error:", error);
      return new Response(JSON.stringify({ error: "Error interno", details: error.message }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
      });
    }
  }
};

// ============================================================
// WHATSAPP HANDLER + HELPERS (Evolution API v2)
// ============================================================
async function handleWhatsAppWebhook(request, env2) {
  try {
    const body = await request.json();
    // Evolution API v2 format:
    // { event: "messages.upsert", instance: "...", data: { key: {remoteJid, fromMe, id}, message: {...}, pushName } }
    
    if (body.event !== "messages.upsert") {
      return new Response("OK", { status: 200 });
    }
    
    const data = body.data || {};
    const key = data.key || {};
    
    // Ignorar mensajes propios del bot
    if (key.fromMe === true) {
      return new Response("OK", { status: 200 });
    }
    
    const remoteJid = key.remoteJid || "";
    // Solo procesar chats 1:1 (ignorar grupos)
    if (!remoteJid.includes("@s.whatsapp.net")) {
      return new Response("OK", { status: 200 });
    }
    
    const phone = remoteJid.replace("@s.whatsapp.net", "");
    const pushName = data.pushName || "";
    
    // Extraer texto (puede venir en conversation o extendedTextMessage.text)
    const msg = data.message || {};
    let text = "";
    if (msg.conversation) {
      text = msg.conversation;
    } else if (msg.extendedTextMessage && msg.extendedTextMessage.text) {
      text = msg.extendedTextMessage.text;
    } else if (msg.imageMessage && msg.imageMessage.caption) {
      text = msg.imageMessage.caption;
    } else if (msg.videoMessage && msg.videoMessage.caption) {
      text = msg.videoMessage.caption;
    }
    
    text = (text || "").trim();
    
    // Si no es texto, responder amablemente
    if (!text) {
      await enviarWhatsAppEvolution(env2, phone, 
        "👋 ¡Hola! Por ahora solo puedo procesar mensajes de texto. Escríbeme el servicio que necesitas y te ayudo a agendar tu cita."
      );
      return new Response("OK", { status: 200 });
    }
    
    // 1. Buscar o crear conversación
    const conversation = await getOrCreateWhatsAppConversation(env2, phone, pushName);
    if (conversation.status === "blocked") {
      return new Response("OK", { status: 200 });
    }
    
    // 2. Cargar historial (últimos 10 turnos = 20 mensajes)
    const history = await getWhatsAppHistory(env2, conversation.id, 6);
    
    // 3. Construir system prompt
    const serviciosResult = await env2.DB.prepare(
      "SELECT nombre, descripcion, duracion_minutos, precio, categoria FROM sgc_cit_servicios_unificados WHERE activo = 1 ORDER BY orden ASC, id ASC"
    ).all();
    const serviciosText = (serviciosResult.results || []).map((s, i) => {
      const precioStr = s.precio > 0 ? `$${s.precio.toLocaleString("es-CL")} (ref.)` : "Consultar precio";
      return `${i + 1}. ${s.nombre} — ${s.descripcion || "Servicio profesional"} — ${precioStr} (${s.categoria || "General"}, ~${s.duracion_minutos} min)`;
    }).join("\n");
    
    const systemPrompt = buildWhatsAppSystemPrompt(env2, serviciosText, conversation, pushName);
    
    // 4. Llamar a Llama 3.1 (mismo modelo del chat web)
    const chatMessages = [{ role: "system", content: systemPrompt }];
    for (const h of history) {
      chatMessages.push(h);
    }
    chatMessages.push({ role: "user", content: text });
    
    const aiResponse = await env2.AI.run("@cf/meta/llama-3.2-3b-instruct", {
      messages: chatMessages,
      max_tokens: 512
    });
    
    let reply = aiResponse.response || aiResponse || "Lo siento, no pude procesar tu mensaje. ¿Podrías repetirlo?";
    
    // 5. Limpiar formato markdown que WhatsApp no soporta
    reply = formatForWhatsApp(reply);
    
    // 6. Dividir si es muy largo (límite WhatsApp ~4096 chars, dejamos margen)
    if (reply.length > 3500) {
      const parts = [];
      let remaining = reply;
      while (remaining.length > 3500) {
        let cut = remaining.lastIndexOf("\n\n", 3500);
        if (cut < 1500) cut = remaining.lastIndexOf("\n", 3500);
        if (cut < 1500) cut = 3500;
        parts.push(remaining.slice(0, cut));
        remaining = remaining.slice(cut).trim();
      }
      parts.push(remaining);
      for (let i = 0; i < parts.length; i++) {
        await enviarWhatsAppEvolution(env2, phone, parts[i]);
        if (i < parts.length - 1) await new Promise(r => setTimeout(r, 500));
      }
    } else {
      await enviarWhatsAppEvolution(env2, phone, reply);
    }
    
    // 7. Guardar mensajes en D1
    await saveWhatsAppMessages(env2, conversation.id, text, reply);
    
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    // Siempre devolver 200 para que Evolution no reintente
    return new Response("OK", { status: 200 });
  }
}
__name(handleWhatsAppWebhook, "handleWhatsAppWebhook");

function buildWhatsAppSystemPrompt(env2, serviciosText, conversation, pushName) {
  const now = new Date();
  const tz = "America/Santiago";
  const fmtDate = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" });
  const fmtWeekday = new Intl.DateTimeFormat("es-CL", { timeZone: tz, weekday: "long" });
  const hoyStr = fmtDate.format(now);
  const diaHoy = fmtWeekday.format(now);
  const tzOffset = new Date(now.toLocaleString("en-US", { timeZone: tz })).getTime() - now.getTime();
  const chileNow = new Date(now.getTime() + tzOffset);
  const maniana = new Date(chileNow);
  maniana.setDate(maniana.getDate() + 1);
  const manianaStr = fmtDate.format(maniana);
  
  let clientContext = "Nuevo";
  if (conversation.client_context) {
    try {
      const ctx = JSON.parse(conversation.client_context);
      const parts = [];
      if (ctx.nombre) parts.push(ctx.nombre);
      if (ctx.patente) parts.push("pat:" + ctx.patente);
      if (ctx.marca) parts.push(ctx.marca + " " + (ctx.modelo || ""));
      if (parts.length > 0) clientContext = "Conocido: " + parts.join(", ");
    } catch (e) {}
  }
  
  return `Asistente WhatsApp de "${env2.BUSINESS_NAME}" (taller mecánico, Chile).

Fecha: ${diaHoy} ${hoyStr}. Mañana: ${manianaStr}.
Horario: Lun-Vie 8-18, Sab 9-14, Dom cerrado.

Servicios (precios ref.):
${serviciosText}

Reglas:
- Max 3-4 lineas por respuesta
- Agendar requiere: fecha, hora, servicio. Opcional: patente, marca, modelo
- Verifica fecha futura y horario abierto antes de confirmar
- Si faltan datos, pregunta uno a uno
- NUNCA inventes precios, solo usa la lista arriba
- Formato WhatsApp: *negrita* con asteriscos, NO usar markdown []() ni tablas
- Max 1 emoji por mensaje

Cliente: ${clientContext}. Nombre: ${pushName || "?"}. Tel: +${conversation.phone}.`;
}
__name(buildWhatsAppSystemPrompt, "buildWhatsAppSystemPrompt");

async function getOrCreateWhatsAppConversation(env2, phone, pushName) {
  // Buscar conversación existente
  let conv = await env2.DB.prepare(
    "SELECT * FROM sgc_cit_WhatsApp_conversations WHERE phone = ?"
  ).bind(phone).first();
  
  if (!conv) {
    // Crear nueva
    await env2.DB.prepare(
      "INSERT INTO sgc_cit_WhatsApp_conversations (phone, contact_name) VALUES (?, ?)"
    ).bind(phone, pushName || "").run();
    conv = await env2.DB.prepare(
      "SELECT * FROM sgc_cit_WhatsApp_conversations WHERE phone = ?"
    ).bind(phone).first();
  } else if (pushName && pushName !== conv.contact_name) {
    // Actualizar nombre si cambió
    await env2.DB.prepare(
      "UPDATE sgc_cit_WhatsApp_conversations SET contact_name = ? WHERE id = ?"
    ).bind(pushName, conv.id).run();
    conv.contact_name = pushName;
  }
  
  return conv;
}
__name(getOrCreateWhatsAppConversation, "getOrCreateWhatsAppConversation");

async function getWhatsAppHistory(env2, conversationId, limit) {
  const result = await env2.DB.prepare(
    "SELECT direction, content FROM sgc_cit_WhatsApp_messages WHERE conversation_id = ? ORDER BY created_at DESC LIMIT ?"
  ).bind(conversationId, limit).all();
  
  // Invertir para orden cronológico y mapear a formato AI
  const messages = (result.results || []).reverse().map(m => ({
    role: m.direction === "inbound" ? "user" : "assistant",
    content: m.content
  }));
  
  return messages;
}
__name(getWhatsAppHistory, "getWhatsAppHistory");

async function saveWhatsAppMessages(env2, conversationId, userMsg, botMsg) {
  // Guardar mensaje del usuario
  await env2.DB.prepare(
    "INSERT INTO sgc_cit_WhatsApp_messages (conversation_id, direction, content) VALUES (?, 'inbound', ?)"
  ).bind(conversationId, userMsg).run();
  
  // Guardar respuesta del bot
  await env2.DB.prepare(
    "INSERT INTO sgc_cit_WhatsApp_messages (conversation_id, direction, content) VALUES (?, 'outbound', ?)"
  ).bind(conversationId, botMsg).run();
  
  // Actualizar conversación
  await env2.DB.prepare(
    "UPDATE sgc_cit_WhatsApp_conversations SET last_message_at = datetime('now','-3 hours'), last_user_message = ?, last_bot_message = ?, total_messages = total_messages + 2 WHERE id = ?"
  ).bind(userMsg.slice(0, 500), botMsg.slice(0, 500), conversationId).run();
}
__name(saveWhatsAppMessages, "saveWhatsAppMessages");

async function enviarWhatsAppEvolution(env2, phone, text) {
  try {
    const instanceName = env2.EVOLUTION_INSTANCE_NAME || "make peueba";
    const apiKey = env2.EVOLUTION_API_KEY;
    const baseUrl = env2.EVOLUTION_API_URL;
    
    if (!apiKey || !baseUrl) {
      console.error("Evolution API no configurada. Falta EVOLUTION_API_KEY o EVOLUTION_API_URL");
      return { success: false, error: "Evolution API no configurada" };
    }
    
    // Limpiar número (solo dígitos)
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    
    const url = `${baseUrl}/message/sendText/${encodeURIComponent(instanceName)}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "apikey": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        number: cleanPhone,
        text: text
      })
    });
    
    const data = await response.json().catch(() => ({}));
    if (response.ok) {
      console.log(`WhatsApp enviado a ${cleanPhone}: ${text.slice(0, 50)}...`);
      return { success: true };
    } else {
      console.error("Evolution API error:", JSON.stringify(data));
      return { success: false, error: data.message || "Error al enviar" };
    }
  } catch (error) {
    console.error("Error enviarWhatsAppEvolution:", error);
    return { success: false, error: error.message };
  }
}
__name(enviarWhatsAppEvolution, "enviarWhatsAppEvolution");

function formatForWhatsApp(text) {
  // Convertir **bold** markdown a *bold* de WhatsApp
  text = text.replace(/\*\*(.+?)\*\*/g, "*$1*");
  // Convertir __bold__ a *bold*
  text = text.replace(/__(.+?)__/g, "*$1*");
  // Eliminar enlaces markdown [text](url) → solo text
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
  // Eliminar headers markdown ##
  text = text.replace(/^#{1,6}\s+/gm, "");
  // Eliminar bloques de código ```
  text = text.replace(/```[\s\S]*?```/g, (m) => m.replace(/```/g, "").trim());
  // Convertir listas - o * al inicio de línea (mantenerlas, WhatsApp las muestra ok)
  // Limitar múltiples saltos de línea consecutivos
  text = text.replace(/\n{3,}/g, "\n\n");
  return text.trim();
}
__name(formatForWhatsApp, "formatForWhatsApp");

export {
  index_default as default
};
//# sourceMappingURL=index.js.map
