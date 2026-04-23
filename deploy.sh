#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist


git init
git add -A
git commit -m 'deploy'

# если вы деплоите на https://<USERNAME>.github.io
git push -f git@github.com:johan-nik.github.io/test-task-registr-proteil.github.io.git main


cd -