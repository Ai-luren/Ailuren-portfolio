import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  // 开发服务使用站点根路径；构建产物保留相对路径，以便 GitHub Pages 根目录发布。
  base: command === 'build' ? './' : '/',
  plugins: [react()],
  assetsInclude: ['**/*.glb']
}));
