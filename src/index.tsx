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

// import styled from "styled-components";

import styles from "./index.module.css";

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
      <span className={styles.headerStatus} key="1">
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
      <span className={styles.headerStatus} key="2">
        {licenseSVG}
        <strong>{license}</strong>
      </span>
    ) : null;
    let secondLine =
      (renderLanguage && renderLicense && repoName.length > 15) ||
      ((renderLanguage || renderLicense) && repoName.length > 20) ? (
        <p
          className={styles.cardP}
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
        className={styles.repo}
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
          className={styles.avatar}
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
          className={styles.buttonStar}
          href={repoLink}
          target="_blank"
          rel="noopener"
        >
          Star {githubSVG}
        </a>
        <p className={styles.cardP}>{firstLineChildren}</p>
        {secondLine}
        <p className={styles.cardP}>
          Created by&nbsp;
          <a
            className={styles.creator}
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
      <div className={styles.content}>
        <p
          className={styles.contentP}
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
      <div className={styles.footer}>
        <span className={styles.footerStatus}>
          {watchSVG} Watch <strong>{watchers_count}</strong>
        </span>
        <span className={styles.footerStatus}>
          {starSVG} Stars <strong>{stars_count}</strong>
        </span>
        <span className={styles.footerStatus}>
          {forkSVG} Forks <strong>{forks_count}</strong>
        </span>
        <div className={styles.spacer} />
        <span className={`${styles.footerStatus} ${styles.update}`}>
          {updateSVG} {pushed_at}
        </span>
      </div>
    );
  }, [watchers_count, stars_count, pushed_at, forks_count]);

  return (
    <div
      className={styles.card}
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
