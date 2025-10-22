
// js/settings.js
(() => {
  const KEY = 'icm_settings_v2';

  function get() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch { return {}; }
  }
  function set(obj) {
    localStorage.setItem(KEY, JSON.stringify(obj || {}));
  }

  if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().catch(()=>{});
  }

  window.__settings = { get, set, KEY };
})();
