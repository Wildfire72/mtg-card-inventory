const { app, BrowserWindow } = require('electron');
const path = require('path');

const Database = require('better-sqlite3');
const db = new Database('collection.db');

// Create table if not exists
//card_id links to scryfall
//printing is the version of the card (set, art); might be irrelevant depending on card_id
//foil is a boolean where 0 is non-foil, 1 is foil
//location: user inputted (ex: Box 1)
db.prepare(`
  CREATE TABLE IF NOT EXISTS collection (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_id TEXT NOT NULL, 
    card_name TEXT NOT NULL,
    printing TEXT NOT NULL,
    foil INTEGER NOT NULL,
    location TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    notes TEXT
);
`).run();

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});