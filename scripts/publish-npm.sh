#!bin/sh

cd ../packages

for file in ./*
do
  if test -d $file
  then
    cd $file
    npm publish --registry=https://registry.npmjs.org/
    cd ..
  fi
done
