import React, { useCallback } from "react";
import {
  licenseSVG,
  githubSVG,
  watchSVG,
  starSVG,
  forkSVG,
  updateSVG,
} from "./svglib";
import { githubColors } from "./colors";
import "./githubcard.css";

function solveCount(count) {
  const countNumber = parseInt(count);

  let countString = "";

  if (countNumber > 1000000) {
    countString = Math.round(countNumber / 1000000) + "M";
  } else if (countNumber > 1000) {
    countString = Math.round(countNumber / 1000) + "K";
  }

  return countString;
}

function RepoCard({
  repo,
  center = false,
  squareAvatar = false,
  descriptionLine = 2,
  showLanguage = true,
  showLicense = true,
}: RepoCardProps) {
  const avatar_url = repo.owner.avatarUrl;
  const description = repo.description;
  const forks_count = repo.forks.totalCount;
  const language = repo.primaryLanguage?.name;
  const license =
    repo.licenseInfo === null ? undefined : repo.licenseInfo.spdxId;
  const repoName = repo.name;
  const stars_count = solveCount(repo.stargazerCount);
  const pushed_at = repo.pushedAt.slice(2, 10);
  const watchers_count = solveCount(repo.watchers?.totalCount);
  const username = repo.owner.login;

  const renderCardHeader = useCallback(() => {
    let userLink = "https://github.com/" + username;
    let repoLink = "https://github.com/" + username + "/" + repoName;
    let renderLanguage =
      showLanguage && language !== undefined && language !== null;
    let languageSpan = renderLanguage ? (
      <span key="1" className="githubCardHeaderStatus">
        <span
          style={{
            backgroundColor: githubColors[language],
          }}
        />
        <strong>{language}</strong>
      </span>
    ) : (
      <></>
    );
    let renderLicense =
      showLicense && license !== undefined && license !== "NOASSERTION";
    let licenseSpan = renderLicense ? (
      <span key="2" className="githubCardHeaderStatus">
        {licenseSVG}
        <strong>{license}</strong>
      </span>
    ) : (
      <></>
    );
    let secondLine =
      (renderLanguage && renderLicense && repoName.length > 15) ||
      ((renderLanguage || renderLicense) && repoName.length > 20) ? (
        <p
          className="githubCardP"
          style={{
            marginTop: "-7px",
            transform: "translateX(-3px)",
          }}
        >
          {languageSpan}
          {licenseSpan}
        </p>
      ) : undefined;
    let firstLineChildren = [
      <a className="githubCardRepoName" key="0" href={repoLink} target="_blank">
        <strong>{repoName}</strong>
      </a>,
    ];

    if (secondLine === undefined) {
      firstLineChildren.push(languageSpan);
      firstLineChildren.push(licenseSpan);
    }

    return (
      <div className="githubCardHeader">
        <a
          className="githubCardAvatar"
          style={{
            marginTop: secondLine ? "7px" : "",
          }}
          href={userLink}
          target="_blank"
        >
          <img
            src={avatar_url}
            style={{
              borderRadius: squareAvatar ? "5px" : "50%",
            }}
          />
        </a>
        <a className="githubCardBottonStar" href={repoLink} target="_blank">
          Star {githubSVG}
        </a>
        <p className="githubCardP">{firstLineChildren}</p>
        {secondLine}
        <p className="githubCardP">
          Created by&nbsp;
          <a className="githubCardCreator" href={userLink} target="_blank">
            {username}
          </a>
        </p>
      </div>
    );
  }, [
    username,
    repoName,
    avatar_url,
    license,
    language,
    showLanguage,
    showLicense,
    squareAvatar,
  ]);
  const renderCardContent = useCallback(() => {
    return (
      <div className="githubCardContent">
        <p
          className="githubCardContentP"
          style={{
            WebkitLineClamp: descriptionLine,
          }}
        >
          {description}
        </p>
      </div>
    );
  }, [description, descriptionLine]);
  const renderCardFooter = useCallback(() => {
    return (
      <div className="githubCardFooter">
        <span className="githubCardFooterStatus">
          {watchSVG} Watch <strong>{watchers_count}</strong>
        </span>
        <span className="githubCardFooterStatus">
          {starSVG} Stars <strong>{stars_count}</strong>
        </span>
        <span className="githubCardFooterStatus">
          {forkSVG} Forks <strong>{forks_count}</strong>
        </span>
        <span className="githubCardFooterUpdate">
          {updateSVG} {pushed_at}
        </span>
      </div>
    );
  }, [watchers_count, stars_count, pushed_at, forks_count]);

  return (
    <div
      className="githubCard"
      style={{
        margin: center ? "0 auto" : "",
      }}
    >
      {renderCardHeader()}
      {renderCardContent()}
      {renderCardFooter()}
    </div>
  );
}

interface RepoCardProps {
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
  };
  center: boolean;
  squareAvatar: boolean;
  descriptionLine: number;
  showLanguage: boolean;
  showLicense: boolean;
}

export { RepoCard };
