import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.localbuddy.pro',
  appName: 'Local Buddy Pro',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
