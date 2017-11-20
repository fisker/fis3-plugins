#!bin/sh

cd ..
ncu -r https://registry.npm.taobao.org

cd packages

for file in ./*
do
  if test -d $file
  then
    cd $file
    npm-check-updates -r https://registry.npm.taobao.org
    cd ..
  fi
done
