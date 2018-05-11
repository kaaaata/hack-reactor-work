import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
 		{props.repos.map((repo, index) => 
 			<div key={Math.random()} className={index % 2 === 0 ? 'repo1' : 'repo2'}>
 				Repo #{index + 1}: <a href={repo.html_url}>{repo.name}</a><br/>
 				By: <u>{repo.owner.login}</u> | Stars: {repo.stargazers_count}<br/>
 			</div>
 		)}
  </div>
)

export default RepoList;