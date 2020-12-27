import React from 'react'
import { render } from 'react-dom'
import { RepoCard } from '../../src'
import './app.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reponame: 'starlight',
            username: 'InfiniteSynthesis',
            center: true,
            squareAvatar: false,
            descriptionLine: 2,
            repocard: undefined,
            key: 0
        };
    }

    handleInputChange = (event) => {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        let key = this.state.key + 1
        console.log(this.state)
        this.setState({
            key: key,
            repocard: <RepoCard key={key}
                username={this.state.username}
                reponame={this.state.reponame}
                center={this.state.center}
                squareAvatar={this.state.squareAvatar}
                descriptionLine={this.state.descriptionLine} />
        });
    }

    render() {
        return (
            <div className="demoWrapper">
                <div className="demoInfoPanel">
                    <h1 align="center">react-github-repo-cards</h1>
                    <p align="center">
                        <a href="https://www.npmjs.com/package/react-github-repo-cards" target="_blank">Npm</a>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <a href="https://github.com/InfiniteSynthesis/react-github-repo-cards" target="_blank">Github</a>
                    </p>
                </div>
                <div className="demoSettingPanel">
                    <label>
                        User Name:&nbsp;<input name="username"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Repo Name:&nbsp;<input name="reponame"
                            type="text"
                            value={this.state.reponame}
                            onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Center: <input
                            name="center"
                            type="checkbox"
                            checked={this.state.center}
                            onChange={this.handleInputChange} />
                        &nbsp;&nbsp;&nbsp;&nbsp;SquareAvatar: <input
                            name="squareAvatar"
                            type="checkbox"
                            checked={this.state.squareAvatar}
                            onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Description Line:&nbsp;<input name="descriptionLine"
                            type="text"
                            value={this.state.descriptionLine}
                            onChange={this.handleInputChange} />
                    </label>
                    <div className="demoRenderWrapper">
                        <input type="submit" value="Render" onClick={this.handleSubmit} />
                    </div>
                </div>
                <div className="demonShowPanel">
                    {this.state.repocard}
                </div>
            </div>
        );
    }
}

render(<App />, document.getElementById('root'))
