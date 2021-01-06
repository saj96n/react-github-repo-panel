import React, { ReactElement, useCallback, useState } from "react";
import "../App.css";
import { RepoCard } from "../../../src";

const repo = {
  description: "A beautiful card that displays Github repository infos.",
  name: "react-repo-widget",
  stargazerCount: 0,
  watchers: { totalCount: 0 },
  pushedAt: "2020-12-28T19:58:07Z",
  primaryLanguage: { name: "JavaScript" },
  owner: {
    avatarUrl: "https://avatars0.githubusercontent.com/u/4128552?v=4",
    login: "saj96n",
  },
  licenseInfo: { spdxId: "MIT" },
  forks: { totalCount: 0 },
};

function App() {
  const [center, setCenter] = useState(true);
  const [squareAvatar, setSquareAvatar] = useState(false);
  const [descriptionLine, setDescriptionLine] = useState(2);
  const [showLanguage, setShowLanguage] = useState(true);
  const [showLicense, setShowLicense] = useState(true);
  const [repocard, setRepocard] = useState<ReactElement>();
  const [key, setKey] = useState(0);

  const handleSubmit = () => {
    setKey(key + 1);
    setRepocard(
      <RepoCard
        key={key}
        repo={repo}
        center={center}
        squareAvatar={squareAvatar}
        descriptionLine={descriptionLine}
        showLanguage={showLanguage}
        showLicense={showLicense}
      />
    );
  };

  return (
    <div className="demoWrapper">
      <div className="demoInfoPanel">
        <h1>react-github-repo-panel</h1>
        <p>
          <a
            href="https://www.npmjs.com/package/react-repo-widget"
            target="_blank"
          >
            Npm
          </a>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <a href="https://github.com/saj96n/react-repo-widget" target="_blank">
            Github
          </a>
        </p>
      </div>
      <div className="demoSettingPanel">
        <label>
          Center:{" "}
          <input
            name="center"
            type="checkbox"
            checked={center}
            onChange={() => setCenter(!center)}
          />
        </label>
        <label>
          &nbsp;&nbsp;&nbsp;&nbsp;SquareAvatar:{" "}
          <input
            name="squareAvatar"
            type="checkbox"
            checked={squareAvatar}
            onChange={() => setSquareAvatar(!squareAvatar)}
          />
        </label>
        <label>
          &nbsp;&nbsp;&nbsp;&nbsp;Show Language:{" "}
          <input
            name="showLanguage"
            type="checkbox"
            checked={showLanguage}
            onChange={() => setShowLanguage(!showLanguage)}
          />
        </label>
        <label>
          &nbsp;&nbsp;&nbsp;&nbsp;Show License:{" "}
          <input
            name="showLicense"
            type="checkbox"
            checked={showLicense}
            onChange={() => setShowLicense(!showLicense)}
          />
        </label>
        <label>
          Description Line:&nbsp;
          <input
            name="descriptionLine"
            type="number"
            value={descriptionLine}
            onChange={event => setDescriptionLine(parseInt(event.target.value))}
          />
        </label>
        <div className="demoRenderWrapper">
          <input type="submit" value="Render" onClick={handleSubmit} />
        </div>
      </div>
      <div className="demonShowPanel">{repocard}</div>
    </div>
  );
}

export default App;
