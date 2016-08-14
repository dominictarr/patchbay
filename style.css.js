module.exports = `
  body {
    font-family: sans-serif;
  }

  .screen {
    position: absolute;
    top: 0px; bottom: 0px;
    left: 0px; right: 0px;
    overflow-y: hidden;
  }

  .column {
    display: flex;
    flex-direction: column;
    min-height: 0px;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .scroll-y {
    overflow-y: auto;
  }

  .scroll-x {
    overflow-x: auto;
  }

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  p {
    margin-top: .35ex;
  }

  hr {
    border: solid #eee;
    clear: both;
    border-width: 1px 0 0;
    height: 0;
    margin-bottom: .9em;
  }

  input, textarea {
    border: 1px solid #eee;
  }

  /* scrolling feeds, threads */

  .scroller {
    width: 100%;
  }

  .scroller__wrapper {
    flex: 1;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  /* --- hypertabs ------- */

  .hypertabs__tabs {
    overflow-y: hide;
  }

  .hypertabs > .row {
    flex-grow: 0; 
    flex-shrink: 0;
    margin: 0;
  }

  .hypertabs__tabs > * {
    max-width: 4em;
    overflow-x: hidden;
    margin-right: .5ex;
    padding-top: .1ex;
  }

  .hypertabs--selected {
    max-width: 4em;
    background: yellow;
    padding-left: .5ex;
    padding-right: .5ex;
  }

  /* compose */

  .compose {
    width: 100%;
  }

  /* messages */

  .message {
    display: block;
    flex-basis: 0;
    word-wrap: break-word; 
    display: inline-block;
    border: 1px solid #eee;
  }

  .message_meta input {
    font-size: .8em;
  }

  .message_meta {
    margin-left: auto;
  }

  .message_meta > * {
    margin-left: .5ex;
  }

  .message_actions {
    float: right;
    margin-right: .5ex;
    margin-bottom: .5ex;
  }

  .title {
    padding: .5ex;
  }

  .message img {
    max-width: 100%;
  }

  .actions > * {
    padding-left: 5px;
    margin-left: 1px;
  }

  .actions > :not(:last-child) {
    border-right: 2px solid #eee;
    padding-right: 5px;
  }

  .message > .title > .avatar {
    margin-left: 0;
  }

  .message_content {
    padding: .5ex;
  }

  /* -- suggest box */

  .suggest-box > * {
    margin: .5ex;
  }

  .suggest-box {
    width: 5em;
  }

  .suggest-box ul {
    list-style-type: none;
    padding-left: -2em;
  }

  .suggest-box .selected {
    background: yellow;
  }

  /* avatar */

  .avatar {
    display: flex;
    flex-direction: row;
  }

  .avatar--large {
    width: 10em;
    height: 10em;
  }

  .avatar--thumbnail {
    width: 2.5em;
    height: 2.5em;
    margin-right: .5ex;
  }

  .avatar--fullsize {
    width: 100%;
  }

  .profile {
    padding: .5ex;
    overflow: auto;
  }

  .profile input {
    width: 100%;
  }

  .profile__info {
    margin-left: .5em;
  }

  /* lightbox - used in message-confirm */

  .lightbox {
    overflow: auto;
    padding: 1em;
    background: white;
  }

  /* searchprompt */

  .searchprompt {
    width: 17em;
    margin-left: .5ex;
    margin-bottom: .5ex;
  }

  /* TextNodeSearcher highlights */

  .highlight {
    background: yellow;
  }

  /* --- network status --- */

  .status {
    width: 20px;
    height: 20px;
    background: green;
  }

  .menu {
    position: fixed;
    right: 10px;
    top: 10px;
  }

  .error {
    background: red;
  }

  /* avatar editor */

  .hypercrop__canvas {
    width: 100%;
  }

  /* gitssb */

  .git-table-wrapper {
    max-height: 12em;
    overflow: auto;
    word-break: break-all;
    margin: 1em 0;
  }

  .git-table-wrapper table {
    width: 100%;
  }

  /* --- network status --- */

  .status {
    width: .7em;
    height: .7em;
    position: fixed;
    right: .8em;
    top: .8em;
    border-radius: 100%;
    background: green;
  }

  .error {
    background: red;
  }

  /* invite codes */

  .hyperprogress__liquid {
    height: 1ex;
    background: blue;
  }

  /* themes */

  .theme {
    margin-left: 1ex;
  }

  .themes__form {
    margin: 1ex;
  }
`




