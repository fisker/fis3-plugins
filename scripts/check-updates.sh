#!bin/sh

cd ..
ncu -r https://registry.npm.taobao.org --loglevel warn --newest

cd packages

for file in ./*
do
  if test -d $file
  then
    cd $file
    ncu --registry https://registry.npm.taobao.org --loglevel warn --newest
    cd ..
  fi
done
