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
            name: undefined,
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
        descriptionLine: PropTypes.number
    };

    static defaultProps = {
        username: "",
        reponame: "",
        center: false,
        squareAvatar: false,
        descriptionLine: 2
    };

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
        if (this.state.ready === false) {
            return (<div />);
        }

        let licenseSpan = (this.state.license === undefined || this.state.license === "NOASSERTION")
            ? undefined
            : <span className="githubCardHeaderStatus">
                {licenseSVG}<strong>{this.state.license}</strong>
            </span>;


        let languageColor = this.state.language === undefined
            ? undefined : githubColors[this.state.language];

        let languageSpan = this.state.language === undefined
            ? undefined : <span className="githubCardHeaderStatus">
                <div style={{ backgroundColor: languageColor }} /><strong>{this.state.language}</strong>
            </span>;

        return (<div className="githubCard"
            style={{ margin: this.props.center ? "0 auto" : "" }}>
            <div className="githubCardHeader">
                <a className="githubCardAvatar"
                    href={"https://github.com/" + this.props.username}
                    target="_blank">
                    <img src={this.state.avatar_url}
                        style={{ borderRadius: this.props.squareAvatar ? "5px" : "50%" }} />
                </a>
                <p>
                    <a className="githubCardRepoName"
                        href={"https://github.com/" + this.props.username + "/" + this.props.reponame} target="_blank">
                        <strong >{this.props.reponame}</strong>
                    </a>
                    {languageSpan}
                    {licenseSpan}
                    <a className="githubCardBottonStar"
                        href={"https://github.com/" + this.props.username + "/" + this.props.reponame} target="_blank">Star {githubSVG}</a>
                </p>
                <p>Created by&nbsp;
                    <a className="githubCardCreater"
                        href={"https://github.com/" + this.props.username}
                        target="_blank">{this.props.username}
                    </a>
                </p>
            </div>
            {this.renderCardContent()}
            {this.renderCardFooter()}
        </div>);
    }
}

export { RepoCard }
