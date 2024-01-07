// ==UserScript==
// @description Download khinsider albums
// @name khinsider-album-dl
// @namespace https://github.com/ashnel3/userscripts#readme
// @author ashnel3
// @icon https://downloads.khinsider.com/images/favicon.ico
// @grant GM_download
// @match https://downloads.khinsider.com/game-soundtracks/album/*
// @exclude https://downloads.khinsider.com/game-soundtracks/album/**/*
// @run-at document-end
// @copyright MIT
// @version 1.0.1
// ==/UserScript==
!function(){"use strict";const e=(e,t)=>{const n=document.querySelector(e);if(n instanceof Element)return n;throw new Error(t??`Assertion Failed! unable to find element at "${e}"!`)},t=(e,l)=>{const r=n(document.createElement(e),l.styles,l.classlist);return"string"==typeof l.innerText&&(r.innerText=l.innerText),l.children?.forEach((e=>{r.appendChild(t(e.tagName,e))})),r},n=(e,t,n)=>(n?.forEach((t=>{e.classList.add(t)})),Object.entries(t??{}).forEach((t=>{let[n,l]=t;"string"==typeof l&&e.style.setProperty(n,l)})),e),l=e("audio"),r=e(".albumMassDownload"),o=t("button",{children:[{tagName:"b",innerText:"Download Album"},{tagName:"i",classlist:["material-icons"],innerText:"file_download",styles:{color:"blue","padding-top":"0px"}}],styles:{display:"flex","padding-left":"0.5rem",gap:"0.3rem","align-items":"center","justify-content":"center"}});o.addEventListener("click",(()=>{document.querySelectorAll("#songlist > tbody > tr").forEach(((e,t)=>{const n=e.querySelector(".clickable-row > a"),r=e.querySelector(".playTrack");null!==n&&null!==r&&"songlist_header"!==e.id&&(r.click(),GM_download({name:`${t} - ${n.innerText}.mp3`,url:l.src}))})),l.pause()})),r.innerHTML="",r.style.marginBottom="1rem",r.appendChild(o),console.log("%c[khinsider-album-dl]:","color: #1f78ff","initialized!")}();