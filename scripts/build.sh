#!bin/sh

rm -rf ../packages
node build.js
node-sass --output-style compressed ../src/packages/server/browsersync/public/style.scss > ../packages/fis3-server-browsersync/public/style.css
