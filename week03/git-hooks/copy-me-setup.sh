#/bin/bash
# Run setup script
export GITDIR="`pwd`/.git"

if [ ! -d "$GITDIR" ]; then
    echo "Error: Can't find .git directory"
    exit 1
fi

if [ -d git-hooks ]; then
    cd git-hooks
    ./setup.sh
else
    echo "Error: Can't find git-hooks directory"
    exit 1
fi;
