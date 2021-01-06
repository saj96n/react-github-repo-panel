# react-repo-widget ![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg) ![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-pink.svg)

![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)
![forthebadge](https://forthebadge.com/images/badges/powered-by-coffee.svg)

A beautiful card that displays Github repository infos.

<p align="center"><img src="docs/demo.png" alt="demo"></p>

## Demo Show

- **Online** [Demo Website](https://saj96n.github.io/react-repo-widget/)

- **Local**

  ```shell
  git clone https://github.com/saj96n/react-repo-widget.git
  cd react-repo-widget
  npm i
  npm start
  ```

  open `localhost:3001`

## How to Use 🍕

1. install

   ```shell
   npm i react-repo-widget
   ```

1. import

   ```javascript
   import import { RepoCard } from 'react-repo-widget'
   ```

1. use
   ```javascript
   <RepoCard repo={repoData} />
   ```
   repo prop data structure
   ```ts
   repo: {
    name: string;
    owner: {
      avatarUrl: string;
      login: string;
    };
    description: string;
    forks: { totalCount: number };
    primaryLanguage: { name: string };
    licenseInfo: { spdxId: string };
    pushedAt: string;
    stargazerCount: number;
    watchers: { totalCount: number };
    }
   ```

## Settings 🔨

|     Parameter     |  Type   | Default | Description                                 |
| :---------------: | :-----: | :-----: | :------------------------------------------ |
|      `repo`       | Object  |   ""    | Repository data.                            |
|     `center`      | Boolean |  false  | If card is aligned center.                  |
|  `squareAvatar`   | Boolean |  false  | If avatar is displayed with square outline. |
| `descriptionLine` | Number  |    2    | The maximum line of repo description.       |
|  `showLanguage`   | Boolean |  true   | If the repo language is displayed.          |
|   `showLicense`   | Boolean |  true   | If the repo license is displayed.           |
