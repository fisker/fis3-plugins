#!bin/sh

rm -rf ../packages
node-sass --output-style compressed ../src/packages/server/browsersync/public/style.scss > ../src/packages/server/browsersync/public/style.css
node build.js
