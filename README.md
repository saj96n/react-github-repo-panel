# react-github-repo-cards

![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)
![forthebadge](https://forthebadge.com/images/badges/powered-by-coffee.svg)

A beautiful card that displays Github repository infos.

## How to Use 🍕

1. import
    ```javascript
    import import { RepoCard } from 'react-github-repo-cards'
    ```

2. use
    ```javascript
    <RepoCard username="InfiniteSynthesis" reponame="react-github-repo-cards" />
    ```

## Settings 🔨

| Parameter   | Type           | Default  | Description|
| :----------: |:---:| :---:| --- |
| `username` | String | "" | User name of this repository. |
| `reponame` | String | "" | Name of the repository. |
| `center` | Boolean | false | If card is aligned center. |
| `squareAvatar` | Boolean | false | If avatar is displayed with square outline. |
| `descriptionLine` | Number | 2 | The maximum line of repo description. |
