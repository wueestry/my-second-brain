#!/usr/bin/env bash

git pull
git fetch upstream
git rebase upstream/v4

echo "Press enter to push changes to the remote repo [Y/n]"
read confirm
if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
  git push --force
  echo "Exited and pushed all changes to remote."
else
  echo "Exited without pushing changes."
  exit 1
fi
