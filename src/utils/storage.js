export function saveState(state) {
  try {
    sessionStorage.setItem("appState", JSON.stringify(state));
  } catch (e) {
    console.warn("Could not save state", e);
  }
}

export function loadState() {
  try {
    const s = sessionStorage.getItem("appState");
    return s ? JSON.parse(s) : null;
  } catch (e) {
    console.warn("Could not load state", e);
    return null;
  }
}