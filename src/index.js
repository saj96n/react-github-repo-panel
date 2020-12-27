import React from 'react'
import { licenseSVG, watchSVG, starSVG, forkSVG, updateSVG } from './svglib.js'
import { githubColors } from './colors.js'
import './githubcard.css'

class RepoCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar_url: undefined,
            description: undefined,
            forks_count: undefined,
            language: undefined,
            license: undefined,
            name: undefined,
            stars_count: undefined,
            pushed_at: undefined,
            watchers_count: undefined
        };
    }

    componentDidMount() {
        fetch("https://api.github.com/repos/" + this.props.username + "/" + this.props.reponame)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    avatar_url: data.owner.avatar_url,
                    description: data.description,
                    forks_count: this.solveCount(data.forks_count),
                    language: data.language,
                    license: data.license.spdx_id,
                    name: data.name,
                    stars_count: this.solveCount(data.stargazers_count),
                    pushed_at: data.pushed_at.slice(2, 10),
                    watchers_count: this.solveCount(data.watchers_count)
                });
            });
    }

    solveCount(count) {
        let countNumber = parseInt(count);
        if (countNumber > 1000000) {
            countNumber = Math.round(countNumber / 1000000) + 'M';
        } else if (countNumber > 1000) {
            countNumber = Math.round(countNumber / 1000) + "K";
        }
        return countNumber;
    }

    render() {
        let licenseSpan = this.state.license === undefined
            ? undefined
            : <span className="githubCardHeaderStatus">
                {licenseSVG}<strong>{this.state.license}</strong>
            </span>;

        let languageColor = this.state.language === undefined
            ? undefined : githubColors[this.state.language];

        return (<div className="githubCard">
            <div className="githubCardHeader">
                <a className="githubCardAvatar"
                    href={"https://github.com/" + this.props.username}
                    target="_blank">
                    <img src={this.state.avatar_url} />
                </a>
                <p>
                    <strong className="githubCardRepoName">
                        <a href={"https://github.com/" + this.props.username + "/" + this.props.reponame} target="_blank">{this.props.reponame}</a>
                    </strong>
                    <span className="githubCardHeaderStatus">
                        <div style={{ backgroundColor: languageColor }} /><strong>{this.state.language}</strong>
                    </span>
                    {licenseSpan}
                </p>
                <p>Created by&nbsp;
                    <a href={"https://github.com/" + this.props.username}
                        target="_blank">{this.props.username}
                    </a>
                </p>
            </div>
            <div className="githubCardContent">
                <p>{this.state.description}</p>
            </div>
            <div className="githubCardFooter">
                <span className="githubCardFooterStatus">
                    {watchSVG} Watch <strong>{this.state.watchers_count}</strong>
                </span>
                <span className="githubCardFooterStatus">
                    {starSVG} Stars <strong>{this.state.stars_count}</strong>
                </span>
                <span className="githubCardFooterStatus">
                    {forkSVG} Forks <strong>{this.state.forks_count}</strong>
                </span>
                <span className="githubCardFooterUpdate">
                    {updateSVG} {this.state.pushed_at}
                </span>
            </div>
        </div>);
    }
}

export { RepoCard }