import React from 'react';
import githubMark from '../../../static/images/github-mark.svg';
import { GITHUB_URL } from '../../../config';

export const GithubLogo: React.FC = () => (
    <a href={GITHUB_URL} rel="noreferrer" target="_blank" data-tooltip="Project Repo" className="tooltip-bottom">
        <img src={githubMark} alt='Github | Project Repo' style={{ maxHeight: 30 }}/>
    </a>
);
