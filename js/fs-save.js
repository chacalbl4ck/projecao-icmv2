
// js/fs-save.js
(() => {
  const DB_NAME = 'projection-icm';
  const STORE = 'fs';
  const KEY = 'dataJsonHandle';

  function idbOpen() {
    return new Promise((res, rej) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(STORE);
      req.onerror = () => rej(req.error);
      req.onsuccess = () => res(req.result);
    });
  }
  async function idbGet(key) {
    const db = await idbOpen();
    return new Promise((res, rej) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).get(key);
      req.onsuccess = () => res(req.result || null);
      req.onerror = () => rej(req.error);
    });
  }
  async function idbSet(key, val) {
    const db = await idbOpen();
    return new Promise((res, rej) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(val, key);
      tx.oncomplete = () => res();
      tx.onerror = () => rej(tx.error);
    });
  }
  async function idbDel(key) {
    const db = await idbOpen();
    return new Promise((res, rej) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(key);
      tx.oncomplete = () => res();
      tx.onerror = () => rej(tx.error);
    });
  }

  const hasFS = ('showSaveFilePicker' in window) && ('showOpenFilePicker' in window);

  async function pickExistingDataJson() {
    if (!hasFS) return null;
    const [handle] = await window.showOpenFilePicker({
      multiple: false,
      types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }]
    });
    await idbSet(KEY, handle);
    return handle;
  }

  async function getSavedHandle() {
    if (!hasFS) return null;
    try {
      const handle = await idbGet(KEY);
      return handle || null;
    } catch { return null; }
  }

  async function saveWithBackend(dataObj) {
    try {
      const resp = await fetch('/api/save-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataObj)
      });
      if (!resp.ok) return false;
      const j = await resp.json();
      return !!(j && j.ok);
    } catch { return false; }
  }

  async function saveWithFSAccess(dataObj) {
    if (!hasFS) return false;
    let handle = await getSavedHandle();
    if (!handle) {
      handle = await window.showSaveFilePicker({
        suggestedName: 'data.json',
        types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }]
      });
      await idbSet(KEY, handle);
    }
    const perm = await handle.requestPermission({ mode: 'readwrite' });
    if (perm !== 'granted') {
      await idbDel(KEY);
      return false;
    }
    const writable = await handle.createWritable();
    await writable.write(new Blob([JSON.stringify(dataObj, null, 2)], { type: 'application/json' }));
    await writable.close();
    return true;
  }

  function saveAsDownload(dataObj) {
    const blob = new Blob([JSON.stringify(dataObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = 'data.json';
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
    return true;
  }

  async function saveDataJson(dataObj) {
    // 1) tenta backend
    if (await saveWithBackend(dataObj)) {
      (window.showToast||console.log)('Dados salvos no servidor.');
      return { ok: true, mode: 'backend' };
    }
    // 2) tenta File System Access API (Chrome/Edge + localhost/https)
    if (await saveWithFSAccess(dataObj)) {
      (window.showToast||console.log)('Dados gravados no arquivo local.');
      return { ok: true, mode: 'fs-access' };
    }
    // 3) fallback: download
    saveAsDownload(dataObj);
    (window.showToast||console.log)('Dados exportados como download.');
    return { ok: true, mode: 'download' };
  }

  window.__fsSave = {
    pickExistingDataJson,
    saveDataJson
  };
})();
