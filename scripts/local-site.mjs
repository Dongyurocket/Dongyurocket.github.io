import http from 'node:http';
import { spawn } from 'node:child_process';

const host = '127.0.0.1';
const port = 4321;
const siteUrl = `http://${host}:${port}/`;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isServerReady() {
  return new Promise((resolve) => {
    const request = http.get(siteUrl, (response) => {
      response.resume();
      resolve(true);
    });

    request.on('error', () => resolve(false));
    request.setTimeout(1200, () => {
      request.destroy();
      resolve(false);
    });
  });
}

async function waitForServer(timeoutMs = 30000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (await isServerReady()) {
      return true;
    }
    await wait(500);
  }
  return false;
}

function openBrowser() {
  if (process.platform === 'win32') {
    const child = spawn(process.env.ComSpec ?? 'cmd.exe', ['/d', '/s', '/c', `start "" "${siteUrl}"`], {
      detached: true,
      stdio: 'ignore',
    });
    child.unref();
    return;
  }

  if (process.platform === 'darwin') {
    const child = spawn('open', [siteUrl], {
      detached: true,
      stdio: 'ignore',
    });
    child.unref();
    return;
  }

  const child = spawn('xdg-open', [siteUrl], {
    detached: true,
    stdio: 'ignore',
  });
  child.unref();
}

function startDevServer() {
  if (process.platform === 'win32') {
    return spawn(
      process.env.ComSpec ?? 'cmd.exe',
      ['/d', '/s', '/c', `npm run dev -- --host ${host} --port ${port}`],
      {
        stdio: 'inherit',
      },
    );
  }

  return spawn(
    'npm',
    ['run', 'dev', '--', '--host', host, '--port', String(port)],
    {
      stdio: 'inherit',
    },
  );
}

if (await isServerReady()) {
  console.log(`检测到本地网站已在运行：${siteUrl}`);
  openBrowser();
  process.exit(0);
}

console.log(`正在启动本地网站：${siteUrl}`);

const child = startDevServer();

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    child.kill(signal);
  });
}

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

const ready = await waitForServer();

if (!ready) {
  console.error('本地网站启动超时，请检查终端输出。');
  child.kill('SIGTERM');
  process.exit(1);
}

console.log(`浏览器即将打开：${siteUrl}`);
openBrowser();
