import fs from 'fs';
import path from 'path';
import https from 'https';
import { createHash } from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');
let siteId = '504e0dda-30fb-4589-bfad-9e2e9bf9e6ed'; // The site ID from the last anonymous deploy

function sha1(content) { return createHash('sha1').update(content).digest('hex'); }
function getAllFiles(dir, base = dir, result = []) {
  if (!fs.existsSync(dir)) return result;
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) getAllFiles(fullPath, base, result);
    else result.push({ fullPath, relativePath: '/' + path.relative(base, fullPath).replace(/\\/g, '/') });
  }
  return result;
}

function httpsPost(hostname, path, body) {
  return new Promise((resolve) => {
    const req = https.request({ hostname, path, method: 'POST', headers: { 'Content-Type': 'application/json' } }, (res) => {
      let data = ''; res.on('data', chunk => data += chunk); res.on('end', () => resolve(JSON.parse(data || '{}')));
    });
    req.write(JSON.stringify(body)); req.end();
  });
}

function httpsUpload(hostname, filePath, content) {
  return new Promise((resolve) => {
    const req = https.request({ hostname, path: filePath, method: 'PUT', headers: { 'Content-Type': 'application/octet-stream', 'Content-Length': content.length } }, (res) => {
      res.on('data', () => {}); res.on('end', () => resolve(res.statusCode));
    });
    req.write(content); req.end();
  });
}

async function deploy() {
  const files = getAllFiles(DIST_DIR);
  const fileHashes = {}, fileContents = {};
  for (const { fullPath, relativePath } of files) {
    const content = fs.readFileSync(fullPath);
    fileHashes[relativePath] = sha1(content);
    fileContents[relativePath] = content;
  }
  
  const deployRes = await httpsPost('api.netlify.com', `/api/v1/sites/${siteId}/deploys`, { files: fileHashes, draft: false });
  if (!deployRes.id) { console.error('Deploy failed', deployRes); return; }
  
  const requiredHashes = deployRes.required || [];
  for (const hash of requiredHashes) {
    const filePath = Object.keys(fileHashes).find(k => fileHashes[k] === hash);
    await httpsUpload('api.netlify.com', `/api/v1/deploys/${deployRes.id}/files${filePath}`, fileContents[filePath]);
  }
  console.log('Deployed successfully to', siteId);
}
deploy();
