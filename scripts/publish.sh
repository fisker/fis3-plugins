#!bin/sh

cd ../packages

for file in ./*
do
  if test -d $file
  then
    cd $file
    npm --registry=https://registry.npmjs.org/ publish
    cd ..
  fi
done
