# Horizons Git Hooks

Git setup for Horizons students. It sets important global configs and installs
commit hooks for the current repository.

## Usage

```bash
./setup.sh
```

## Commit hook

We install commit hooks to prevent students from accidentally committing to
master locally. Pushing to master is disabled via the GitHub protected branches
so we disable committing to master locally to prevent confusion.

You can disable these commit hooks globally by running

```
./become-instructor.sh
```

