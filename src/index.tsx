import React, { ReactElement, useCallback } from "react";
import {
  licenseSVG,
  githubSVG,
  watchSVG,
  starSVG,
  forkSVG,
  updateSVG,
} from "./svglib";
import { githubColors } from "./colors";

import "./index.scss";

function solveCount(count) {
  const countNumber = parseInt(count);

  let countString = "";

  if (countNumber > 1000000) {
    countString = Math.round(countNumber / 1000000) + "M";
  } else if (countNumber > 1000) {
    countString = Math.round(countNumber / 1000) + "K";
  } else {
    countString = countNumber.toString();
  }

  return countString;
}

const _defaultClass = "repo-widget";

function RepoCard({
  repo,
  center = false,
  squareAvatar = false,
  descriptionLine = 2,
  showLanguage = true,
  showLicense = true,
  className = _defaultClass,
}: RepoCardProps) {
  const avatar_url = repo.owner.avatarUrl;
  const description = repo.description;
  const forks_count = repo.forks.totalCount;
  const language =
    repo.primaryLanguage === null ? "" : repo.primaryLanguage.name;
  const license =
    repo.licenseInfo === null ? undefined : repo.licenseInfo.spdxId;
  const repoName = repo.name;
  const stars_count = solveCount(repo.stargazerCount);
  const pushed_at = repo.pushedAt.slice(2, 10);
  const watchers_count = solveCount(repo.watchers.totalCount);
  const username = repo.owner.login;

  const renderCardHeader = useCallback(() => {
    let userLink = "https://github.com/" + username;
    let repoLink = "https://github.com/" + username + "/" + repoName;
    let renderLanguage =
      showLanguage && language !== undefined && language !== null;
    let languageSpan = renderLanguage ? (
      <span className={`${className}__headerStatus`} key="1">
        <span
          style={{
            backgroundColor: githubColors[language],
          }}
        />
        <strong>{language}</strong>
      </span>
    ) : null;
    let renderLicense =
      showLicense && license !== undefined && license !== "NOASSERTION";
    let licenseSpan = renderLicense ? (
      <span className={`${className}__headerStatus`} key="2">
        {licenseSVG}
        <strong>{license}</strong>
      </span>
    ) : null;
    let secondLine =
      (renderLanguage && renderLicense && repoName.length > 15) ||
      ((renderLanguage || renderLicense) && repoName.length > 20) ? (
        <p
          className={`${className}__cardP`}
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
      <a
        className={`${className}__repo`}
        key="0"
        href={repoLink}
        target="_blank"
        rel="noopener"
      >
        <strong>{repoName}</strong>
      </a>,
    ];

    if (secondLine === undefined) {
      languageSpan && firstLineChildren.push(languageSpan);
      licenseSpan && firstLineChildren.push(licenseSpan);
    }

    return (
      <div>
        <a
          className={`${className}__avatar`}
          style={{
            marginTop: secondLine ? "7px" : "",
          }}
          href={userLink}
          target="_blank"
          rel="noopener"
        >
          <img
            src={`${avatar_url}&s=144`}
            alt={`@${username}`}
            style={{
              borderRadius: squareAvatar ? "5px" : "50%",
            }}
          />
        </a>
        <a
          className={`${className}__buttonStar`}
          href={repoLink}
          target="_blank"
          rel="noopener"
        >
          Star {githubSVG}
        </a>
        <p className={`${className}__cardP`}>{firstLineChildren}</p>
        {secondLine}
        <p className={`${className}__cardP`}>
          Created by&nbsp;
          <a
            className={`${className}__creator`}
            href={userLink}
            target="_blank"
            rel="noopener"
          >
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
      <div className={`${className}__content`}>
        <p
          className={`${className}__contentP`}
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
      <div className={`${className}__footer`}>
        <span className={`footerStatus`}>
          {watchSVG} Watch <strong>{watchers_count}</strong>
        </span>
        <span className={`footerStatus`}>
          {starSVG} Stars <strong>{stars_count}</strong>
        </span>
        <span className={`footerStatus`}>
          {forkSVG} Forks <strong>{forks_count}</strong>
        </span>
        <div className={`${className}__spacer`} />
        <span className={`footerStatus update`}>
          {updateSVG} {pushed_at}
        </span>
      </div>
    );
  }, [watchers_count, stars_count, pushed_at, forks_count]);

  return (
    <div
      className={className}
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
  className: string;
}

export { RepoCard };
