# Marp Editor for Standard Notes

<div align="center">

[![Release](https://img.shields.io/github/release/theodorechu/marp-editor.svg)](https://github.com/theodorechu/marp-editor/releases)
[![License](https://img.shields.io/github/license/theodorechu/marp-editor?color=blue)](https://github.com/theodorechu/marp-editor/blob/main/LICENSE)
[![Status](https://img.shields.io/badge/status-open%20beta-brightgreen.svg)](https://marpeditor.com/#installation)
[![Cost](https://img.shields.io/badge/cost-free-darkgreen.svg)](https://marpeditor.com/#installation)
[![GitHub issues](https://img.shields.io/github/issues/theodorechu/marp-editor.svg)](https://github.com/theodorechu/marp-editor/issues/)
[![Slack](https://img.shields.io/badge/slack-standardnotes-CC2B5E.svg?style=flat&logo=slack)](https://standardnotes.org/slack)
[![Downloads](https://img.shields.io/github/downloads/theodorechu/marp-editor/total.svg?style=flat)](https://github.com/theodorechu/marp-editor/releases)
[![GitHub Stars](https://img.shields.io/github/stars/theodorechu/marp-editor?style=social)](https://github.com/theodorechu/marp-editor)

</div>

## Introduction

The Marp Editor is an **unofficial** [editor](https://standardnotes.org/help/77/what-are-editors) for [Standard Notes](https://standardnotes.org), a free, [open-source](https://standardnotes.org/knowledge/5/what-is-free-and-open-source-software), and [end-to-end encrypted](https://standardnotes.org/knowledge/2/what-is-end-to-end-encryption) notes app.

Try the demo at [demo.marpeditor.com](https://demo.marpeditor.com) or learn more at [marpeditor.com](https://marpeditor.com).

The Marp Editor is used to create presentation slides using [Marpit Markdown](https://marpit.marp.app/markdown).

For a full tutorial on how to use Marpit Markdown, please see the [official Marpit documentation](https://marpit.marp.app/markdown).

The Marp Editor is built with React, TypeScript, Sass, and [Marp](https://marp.app).

## Features

- Create presentation slides using [Marpit Markdown](https://marpit.marp.app/markdown).
- Three modes: Edit, Split, and View.
- Button to download the slides as an HTML file with presentation tools: buttons for previous slide, next slide, toggle fullscreen, and open presenter view. Provided by Bespoke and Screenfull as is usually included by Marp.
- Button to print the slides. To save the slides as a PDF, use Microsoft Edge or Chrome.

## Installation

1. Register for an account at Standard Notes using the [Desktop App](https://standardnotes.org/download) or [Web app](https://app.standardnotes.org). Remember to use a strong and memorable password.
2. In the bottom left corner of the app, click **Extensions**.
3. Click **Import Extension**.
4. Paste this into the input box:
   ```
   https://notes.theochu.com/p/PvmDopgufD
   ```
   or paste this into the input box on **desktop**:
   ```
   https://raw.githubusercontent.com/TheodoreChu/marp-editor/main/public/demo.ext.json
   ```
5. Press Enter or Return on your keyboard.
6. Click **Install**.
7. At the top of your note, click **Editor**, then click **Marp Editor**.
8. When prompted to activate the extension, click **Continue**.

After you have installed the editor on the web or desktop app, it will automatically sync to your [mobile app](https://standardnotes.org/download) after you sign in.

## Example

Paste this into the Marp Editor to see an example of what you can do with it:

````md
---
marp: true
theme: gaia
_class: lead
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.jpg')
---

# **Marp Editor for Standard Notes**

Powered by [Marp](https://marp.app), a Markdown Presentation Ecosystem

https://marpeditor.com

---

# How to write slides

Split pages by horizontal ruler (`---`). It's very simple! :slightly_smiling_face:

```md
# Slide 1

Text for Slide 1

---

# Slide 2

Text for Slide 2
```

---

# Features

- Create presentation slides using [Marpit Markdown](https://marpit.marp.app/markdown).
- Three modes: Edit, Split, and View.
- Button to download the slides as an HTML file
  - HTML file comes with presentation tools: buttons for previous slide, next slide, toggle fullscreen, and open presenter view.
    - Provided by Bespoke and Screenfull as is usually included by Marp.
- Button to print the slides. To save the slides as a PDF, use Microsoft Edge or Chrome.

---

# Features Continued

- CommonMark provided by Markdown-It
- Inline HTML and CSS
- Math provided by $\KaTeX$
- GitHub Emoji support :smile:
````

## Development

**Prerequisites:** Install [Node.js](https://nodejs.org/en/), [Yarn](https://classic.yarnpkg.com/en/docs/install/), and [Git](https://github.com/git-guides/install-git) on your computer.

The general instructions setting up an environment to develop Standard Notes extensions can be found [here](https://docs.standardnotes.org/extensions/local-setup). You can also follow these instructions:

1. Fork the [repository](https://github.com/theodorechu/marp-editor) on GitHub.
2. [Clone](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) your fork of the repository.
3. Run `cd marp-editor` to enter the `marp-editor` directory.
4. Run `yarn install` to install the dependencies on your machine as they are described in `yarn.lock`.

### Testing in the browser

1. To run the app in development mode, run `yarn start` and visit http://localhost:3001. Press `ctrl/cmd + C` to exit development mode.

### Testing in the Standard Notes app

1.  Create an `ext.json` in the `public` directory. You have three options:
    1.  Use `sample.ext.json`.
    2.  Create `ext.json` as a copy of `sample.ext.json`.
    3.  Follow the instructions [here](https://docs.standardnotes.org/extensions/local-setup) with `url: "http://localhost:3000/index.html"`.
2.  Install http-server using `sudo npm install -g http-server` then run `yarn server` to serve the `./build` directory at http://localhost:3000.
3.  To build the app, run `yarn build`.
4.  Install the editor into the [web](https://app.standardnotes.org) or [desktop](https://standardnotes.org/download) app with `http://localhost:3000/sample.ext.json` or with your custom `ext.json`. Press `ctrl/cmd + C` to shut down the server.

### Deployment

1. To make the source code prettier, run `yarn pretty`.
2. To the deploy the build into the `gh-pages` branch of your repository on GitHub, run `yarn deploy-stable`.
3. To deploy the build into to the `dev` branch for testing, run `yarn deploy-dev`.
4. To deploy the built into the `build` branch for distributing, run `yarn deploy-build` for distributing builds.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

#### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## License

Copyright (c) Theodore Chu. All Rights Reserved. Licensed under [AGPL-3.0](https://github.com/TheodoreChu/marp-editor/blob/main/LICENSE) or later.

## Acknowledgements

Early stages of this editor were based heavily on the Standard Notes [Markdown Basic Editor](https://github.com/standardnotes/markdown-basic). The Markdown Basic Editor is licensed under AGPL-3.0 and is available for use through [Standard Notes Extended](https://standardnotes.org/extensions).

## Further Resources

- [GitHub](https://github.com/TheodoreChu/marp-editor) for the source code of the Marp Editor
- [GitHub Issues](https://github.com/TheodoreChu/marp-editor/issues) for reporting issues concerning the Marp Editor
- [Docs](https://docs.theochu.com/marp-editor) for how to use the Marp Editor
- [Contact](https://theochu.com/contact) for how to contact the developer of the Marp Editor
- [Marp Editor To do List](https://github.com/TheodoreChu/marp-editor/projects/1) for the roadmap of the Marp Editor
- [Standard Notes Slack](https://standardnotes.org/slack) for connecting with the Standard Notes Community
- [Standard Notes Help](https://standardnotes.org/help) for help with issues related to Standard Notes but unrelated to this editor
