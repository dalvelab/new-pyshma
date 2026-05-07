const path = require('node:path');

module.exports = {
  apps: [
    {
      name: 'new-pyshma-web',
      cwd: path.join(__dirname, 'apps/web'),
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3001',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: '3001',
      },
    },
    // CMS пока не деплоим — раскомментировать, когда будем поднимать Strapi на VDS.
    // {
    //   name: 'new-pyshma-cms',
    //   cwd: path.join(__dirname, 'apps/cms'),
    //   script: 'npm',
    //   args: 'run start',
    //   instances: 1,
    //   exec_mode: 'fork',
    //   autorestart: true,
    //   watch: false,
    //   max_memory_restart: '768M',
    //   env: {
    //     NODE_ENV: 'production',
    //     HOST: '0.0.0.0',
    //     PORT: '1337',
    //   },
    // },
  ],
};
