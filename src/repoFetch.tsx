import React, { useEffect, useState } from "react";
import { Repo, RepoCard, RepoCardProps } from "./repoCard";

async function fetchRepo(login: string, reponame: string): Promise<Repo> {
  const data = await fetch(`https://api.github.com/repos/${login}/${reponame}`);
  const json = await data.json();
  // Because of using different Github API some keys have to be renamed
  json.owner.avatarUrl = json.owner.avatar_url;
  json.forks = { totalCount: json.forks };
  json.primaryLanguage = { name: json.language };
  json.licenseInfo = { spdxId: json.license.spdx_id };
  json.watchers = { totalCount: json.watchers };
  json.pushedAt = json.pushed_at;
  json.stargazerCount = json.stargazers_count;
  return json as Repo;
}

function RepoCardFetch({ login, reponame, ...props }: RepoCardFetchProps) {
  let repoData: any = {};

  const [repo, setRepo] = useState(repoData);

  useEffect(() => {
    const fetchData = async () => {
      const repo = await fetchRepo(login, reponame);
      setRepo(repo);
    };
    fetchData();
  }, []);

  return <>{repo.name && <RepoCard {...props} repo={repo} />}</>;
}

interface RepoCardFetchProps extends RepoCardProps {
  login: string;
  reponame: string;
}

export { RepoCardFetch };
