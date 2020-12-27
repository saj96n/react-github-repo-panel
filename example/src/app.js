import React from 'react'
import { render } from 'react-dom'
import { RepoCard } from '../../src'

const App = () => <RepoCard username="InfiniteSynthesis" reponame="starlight"/>
render(<App />, document.getElementById('root'))