#! /bin/bash

for i in {1..3}; do
  patch-package
  status=$?
  if [ $status -eq 0 ]; then
    break
  else
    echo "patch-package attempt $i failed"
    [ $i -lt 3 ] && echo "retrying..." && sleep 1
  fi
done

if [ $status -ne 0 ]; then
  if [ "$CI" = "true" ]; then
    echo "patch-package status = $status, exiting with 0 due to CI=true"

    echo "DEBUG:"
    echo "$ pwd"
    pwd
    echo
    echo "$ ls"
    ls
    echo

    exit 0
  else
    exit $status
  fi
fi
