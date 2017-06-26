# Week 1 Setup

🐞 Consult this [handy Git troubleshooting guide](https://github.com/horizons-school-of-technology/git-prepwork/blob/master/troubleshoot.md)
if you encounter any issues during setup 🐞

1. Make sure you've completed the [Git Prepwork](https://github.com/horizons-school-of-technology/git-prepwork) exercise before proceeding.
1. Open your terminal and go to your Horizons directory (i.e folder)

    ```bash
    cd horizons
    ```

1. Clone the `week01` repository

    ```bash
    git clone git@github.com:horizons-school-of-technology/week01.git
    ```

1. Go into the the `week01` directory

    ```bash
    cd week01
    ```

1. Create your own branch with your GitHub username

    ```bash
    git checkout -b YOUR GITHUB USERNAME HERE
    ```


1. Set-up your Git environment

    ```bash
    ./setup.sh
    ```

1. Push your branch to GitHub

    ```bash
    git push -u origin
    ```

1. Open `week01/day1/git.html` in your browser and note that there is a failing test.

1. Open `week01/day1/git.js` and fix the code by deleting the appropriate line.

1. Refresh `week01/day1/git.html` in your browser and make sure the test is passing.

1. Commit your changes to Git.

    ```bash
    git add --all
    git commit -m "Fix code"
    ```

1. Check that your repository is clean (i.e. all of your changes have been saved to git).

    ```bash
    git status
    ```

    You should see:

    ```
    nothing to commit, working directory clean
    ```

1. Push your changes again

    ```bash
    git push origin
    ```

Congratulations, you're ready to work on Week 1 exercises!
