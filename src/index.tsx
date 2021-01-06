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

import styled from "styled-components";

const Card = styled.div`
  width: 400px;
  padding: 8px 8px 0;
  border: thin solid #eee;
  border-color: #eee #ddd #bbb;
  border-radius: 5px;
  background-color: white;
  font-family: "Helvetica Nenu", Hevetica, Arial, sans-serif;
  box-shadow: rgba(0, 0, 0, 0.14) 0 1px 3px;
  box-sizing: content-box;
  a {
    text-decoration: none;
    outline: 0;
  }
  .githubCardP {
    margin: 3px 0 4px 0;
    color: #555;
    line-height: 1.2;
    display: -webkit-box !important;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  .githubCardSVG {
    height: 1em;
    display: inline-block;
    vertical-align: -0.125em;
    overflow: visible;
  }
`;

const Avatar = styled.a`
  float: left;
  & > img {
    width: 48px;
    height: 48px;
    margin-right: 9px;
  }
`;

const User = styled.a`
  color: #707070;
`;

const StarButton = styled.a`
  padding: 4px 8px 4px 7px;
  color: #555;
  text-shadow: 0 1px 0 #fff;
  border: 1px solid #d4d4d4;
  border-radius: 3px;
  float: right;
  font-size: 13px;
  font-weight: 700;
  line-height: 14px;
  background-color: #e6e6e6;
  background-image: linear-gradient(#fafafa, #eaeaea);
`;

const HeaderStatus = styled.span`
  font-size: 12px;
  color: #797979;
  & > span {
    width: 1em;
    height: 1em;
    margin: 0 5px;
    border-radius: 50%;
    display: inline-block;
    vertical-align: -0.067em;
  }
  & > svg {
    margin: 0 5px;
  }
`;

const RepoName = styled.a`
  margin-right: 5px;
  font-size: 18px;
  line-height: 1.4;
  color: #292f33;
`;

const Content = styled.div`
  padding: 6px 0 10px;
  & > p {
    margin: 0 5px 0 0;
    font: 18px/24px Georgia, "Times New Roman", Palatino, serif;
    color: #555;
    display: -webkit-box !important;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
  }
`;

const Footer = styled.div`
  border-top: thin solid #eee;
  padding: 8px 0 6px;
`;

const FooterStatus = styled.span`
  font-size: 14px;
  padding-right: 10px;
  text-transform: uppercase;
  color: #555;
  line-height: 1.2;
`;

const FooterDate = styled(FooterStatus)`
  float: right;
`;

function solveCount(count) {
  const countNumber = parseInt(count);

  let countString = "";

  if (countNumber > 1000000) {
    countString = Math.round(countNumber / 1000000) + "M";
  } else if (countNumber > 1000) {
    countString = Math.round(countNumber / 1000) + "K";
  } else {
    countString = countNumber.toString()
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
  const language = repo.primaryLanguage === null ? "" : repo.primaryLanguage.name;
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
      <HeaderStatus key="1">
        <span
          style={{
            backgroundColor: githubColors[language],
          }}
        />
        <strong>{language}</strong>
      </HeaderStatus>
    ) : null;
    let renderLicense =
      showLicense && license !== undefined && license !== "NOASSERTION";
    let licenseSpan = renderLicense ? (
      <HeaderStatus key="2">
        {licenseSVG}
        <strong>{license}</strong>
      </HeaderStatus>
    ) : null;
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
      <RepoName key="0" href={repoLink} target="_blank">
        <strong>{repoName}</strong>
      </RepoName>,
    ];

    if (secondLine === undefined) {
      languageSpan && firstLineChildren.push(languageSpan);
      licenseSpan && firstLineChildren.push(licenseSpan);
    }

    return (
      <div>
        <Avatar
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
        </Avatar>
        <StarButton href={repoLink} target="_blank">
          Star {githubSVG}
        </StarButton>
        <p className="githubCardP">{firstLineChildren}</p>
        {secondLine}
        <p className="githubCardP">
          Created by&nbsp;
          <User href={userLink} target="_blank">
            {username}
          </User>
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
      <Content>
        <p
          className="githubCardContentP"
          style={{
            WebkitLineClamp: descriptionLine,
          }}
        >
          {description}
        </p>
      </Content>
    );
  }, [description, descriptionLine]);
  const renderCardFooter = useCallback(() => {
    return (
      <Footer>
        <FooterStatus>
          {watchSVG} Watch <strong>{watchers_count}</strong>
        </FooterStatus>
        <FooterStatus>
          {starSVG} Stars <strong>{stars_count}</strong>
        </FooterStatus>
        <FooterStatus>
          {forkSVG} Forks <strong>{forks_count}</strong>
        </FooterStatus>
        <FooterDate>
          {updateSVG} {pushed_at}
        </FooterDate>
      </Footer>
    );
  }, [watchers_count, stars_count, pushed_at, forks_count]);

  return (
    <Card
      style={{
        margin: center ? "0 auto" : "",
      }}
    >
      {renderCardHeader()}
      {renderCardContent()}
      {renderCardFooter()}
    </Card>
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
