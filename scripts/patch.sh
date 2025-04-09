#! /bin/bash

# retry patch-package 3 times and capture the status code
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
  # log debug info on CI failure or vercel build failure
  if [ "$CI" = "true" ] || [ ! -z "$VERCEL_ENV" ]; then
    echo "DEBUG:"
    echo "$ pwd"
    pwd
    echo
    echo "$ ls"
    ls
    echo
  fi

  if [ "$CI" = "true" ]; then
    echo "patch-package status = $status, exiting with 0 due to CI=true"
    exit 0
  else
    exit $status
  fi
fi
