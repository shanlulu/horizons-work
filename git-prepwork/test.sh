#/bin/bash

if [ ! `wc -c < EDITME.txt` -gt 27 ]; then
  echo 'EDITME.txt has not been updated'
  exit 1
fi

if [[ ! -n `find . -maxdepth 1 -iname SETUPDONE.txt` ]]; then
  echo 'You have not configured your Git repository yet. Run ./setup.sh'
  exit 1
fi

echo "Congratulations! You have now created the necessary files."
echo "Make sure you commit and push your changes to GitHub."
