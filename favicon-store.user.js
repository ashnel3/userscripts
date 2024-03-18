// ==UserScript==
// @description Store favicon URLs
// @name favicon-store
// @namespace https://github.com/ashnel3/userscripts#readme
// @author ashnel3
// @grant GM_setValue
// @match *://**/*
// @copyright MIT
// @version 1.0.0
// ==/UserScript==
!function(){for(const t of document.getElementsByTagName("link")){const o=t.getAttribute("rel"),e=t.getAttribute("href");if(null!==e&&("icon"===o||"shortcut icon"===o)){const t=new URL(e,document.location.href).toString();console.log("%c[favicons]:","color: #1f78ff",t),GM_setValue(t,t)}}}();