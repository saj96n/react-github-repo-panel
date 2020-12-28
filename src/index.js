import React from 'react'
import PropTypes from "prop-types";
import { licenseSVG, githubSVG, watchSVG, starSVG, forkSVG, updateSVG } from './svglib.js'
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
            repoName: undefined,
            stars_count: undefined,
            pushed_at: undefined,
            ready: false,
            watchers_count: undefined
        };
    }

    static propTypes = {
        username: PropTypes.string.isRequired,
        reponame: PropTypes.string.isRequired,
        center: PropTypes.bool,
        squareAvatar: PropTypes.bool,
        descriptionLine: PropTypes.number,
        showLanguage: PropTypes.bool,
        showLicense: PropTypes.bool
    };

    static defaultProps = {
        username: "",
        reponame: "",
        center: false,
        squareAvatar: false,
        descriptionLine: 2,
        showLanguage: true,
        showLicense: true
    };

    componentDidMount() {
        fetch("https://api.github.com/repos/" + this.props.username + "/" + this.props.reponame)
            .then(res => res.json())
            .then(data => {
                let licenseName = data.license === null ? undefined : data.license.spdx_id;
                this.setState({
                    avatar_url: data.owner.avatar_url,
                    description: data.description,
                    forks_count: this.solveCount(data.forks_count),
                    language: data.language,
                    license: licenseName,
                    repoName: data.name,
                    stars_count: this.solveCount(data.stargazers_count),
                    pushed_at: data.pushed_at.slice(2, 10),
                    ready: true,
                    watchers_count: this.solveCount(data.watchers_count)
                });
            }).catch(error => console.error(error));
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

    renderCardHeader() {
        let userLink = "https://github.com/" + this.props.username;
        let repoLink = "https://github.com/" + this.props.username + "/" + this.state.repoName;

        let renderLanguage = this.props.showLanguage
            && this.state.language !== undefined
            && this.state.language !== null;

        let languageSpan = renderLanguage ? <span className="githubCardHeaderStatus">
            <span style={{ backgroundColor: githubColors[this.state.language] }} /><strong>{this.state.language}</strong>
        </span> : undefined;

        let renderLicense = this.props.showLicense
            && this.state.license !== undefined
            && this.state.license !== "NOASSERTION";

        let licenseSpan = renderLicense
            ? <span className="githubCardHeaderStatus">
                {licenseSVG}<strong>{this.state.license}</strong>
            </span>
            : undefined;

        let secondLine = ((renderLanguage && renderLicense && (this.state.repoName.length > 15))
            || ((renderLanguage || renderLicense) && (this.state.repoName.length > 20)))
            ? <p style={{ marginTop: '-7px', transform: 'translateX(-3px)' }}>
                {languageSpan}
                {licenseSpan}
            </p>
            : undefined;

        let firstLineChildren = [<a className="githubCardRepoName"
            href={repoLink} target="_blank">
            <strong >{this.state.repoName}</strong>
        </a>];

        if (secondLine === undefined) {
            firstLineChildren.push(languageSpan)
            firstLineChildren.push(licenseSpan)
        }

        return (<div className="githubCardHeader">
            <a className="githubCardAvatar"
                style={{ marginTop: secondLine ? '7px' : '' }}
                href={userLink}
                target="_blank">
                <img src={this.state.avatar_url}
                    style={{ borderRadius: this.props.squareAvatar ? "5px" : "50%" }} />
            </a>
            <a className="githubCardBottonStar"
                href={repoLink} target="_blank">Star {githubSVG}</a>
            <p>{firstLineChildren}</p>
            {secondLine}
            <p>Created by&nbsp;
                <a className="githubCardCreator"
                    href={userLink}
                    target="_blank">{this.props.username}</a>
            </p>
        </div>);
    }

    renderCardContent() {
        return (<div className="githubCardContent">
            <p style={{ WebkitLineClamp: this.props.descriptionLine }}>{this.state.description}</p>
        </div>
        );
    }

    renderCardFooter() {
        return (<div className="githubCardFooter">
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
        </div>);
    }

    render() {
        if (this.state.ready === false) { return (<div />); }

        return (<div className="githubCard"
            style={{ margin: this.props.center ? "0 auto" : "" }}>
            {this.renderCardHeader()}
            {this.renderCardContent()}
            {this.renderCardFooter()}
        </div>);
    }
}

export { RepoCard }
