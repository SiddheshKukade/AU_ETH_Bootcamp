## NOTE: Please check your answers twice before sending PR because we can't verify your answer. PLAY FAIR

## 👨‍💻 Prerequisites

-   [Alchemy University Bootcamp Student or Instructor](https://university.alchemy.com/)

## How to Contribute

-   Take a look at the existing [Issues](https://github.com/SiddheshKukade/AU_ETH_Bootcamp/issues) or [create a new issue](https://github.com/SiddheshKukade/AU_ETH_Bootcamp/issues/new/)!
-   [Fork the Repo](https://github.com/SiddheshKukade/AU_ETH_Bootcamp). Then, create a branch for any issue that you are working on. Finally, commit your work.
-   Create a **[Pull Request](https://github.com/SiddheshKukade/AU_ETH_Bootcamp)** (_PR_), which will be promptly reviewed and given suggestions for improvements by the community.

## ⭐ HOW TO MAKE A PULL REQUEST:

**1.** Start by making a Fork of the [**AU_ETH_Bootcamp**](https://github.com/SiddheshKukade/AU_ETH_Bootcamp) repository. Click on the <a href="https://github.com/SiddheshKukade/AU_ETH_Bootcamp"><img src="https://i.imgur.com/G4z1kEe.png" height="21" width="21"></a>Fork symbol at the top right corner.

**2.** Clone your new fork of the repository in the terminal/CLI on your computer with the following command:

```bash
git clone https://github.com/<your-github-username>/AU_ETH_Bootcamp
```

**3.** Navigate to the newly created seeit project directory:

```bash
cd AU_ETH_Bootcamp
```

**4.** Set upstream command:

```bash
git remote add upstream https://github.com/SiddheshKukade/AU_ETH_Bootcamp
```

**5.** Create a new branch:

```bash
git checkout -b YourBranchName
```

**6.** Sync your fork or your local repository with the origin repository:

-   In your forked repository, click on "Fetch upstream"
-   Click "Fetch and merge"

### Alternatively, Git CLI way to Sync forked repository with origin repository:

```bash
git fetch upstream
```

```bash
git merge upstream/main
```

### [Github Docs](https://docs.github.com/en/github/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github) for Syncing

**7.** Make your changes to the source code.

**8.** Stage your changes:

⚠️ **Make sure** not to commit `package.json` or `package-lock.json` file

⚠️ **Make sure** not to run the commands `git add .` or `git add *`

> Instead, stage your changes for each file/folder
>
> By using public path it means it will add all files and folders under that folder, it is better to be specific

```bash
git add public
```

_or_

```bash
git add "<files_you_have_changed>"
```

**9.** Commit your changes:

```bash
git commit -m "<your_commit_message>"
```

**10.** Push your local commits to the remote repository:

```bash
git push origin YourBranchName
```

**11.** Create a [Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)!

--

## 💥 Issues

In order to discuss changes, you are welcome to [open an issue](https://github.com/SiddheshKukade/AU_ETH_Bootcamp/issues/new/) about what you would like to contribute. Enhancements are always encouraged and appreciated.

## All the best! 🥇
