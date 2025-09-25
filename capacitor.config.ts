import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.davidbarszczak.tictactoe',
  appName: 'tic-tac-toe',
  webDir: 'dist-capacitor',
  plugins: {
    StatusBar: {
      style: 'DEFAULT',
      overlaysWebView: false // Important: false allows content to go under status bar
    }
  }
};

export default config;
