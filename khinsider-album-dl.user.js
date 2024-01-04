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
// @version 1.0.0
// ==/UserScript==
!function(){"use strict";const e=(e,t)=>{const n=document.querySelector(e);if(n instanceof Element)return n;throw new Error(t)},t=(e,l)=>{const r=n(document.createElement(e),l.styles,l.classlist);return"string"==typeof l.innerText&&(r.innerText=l.innerText),l.children?.forEach((e=>{r.appendChild(t(e.tagName,e))})),r},n=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return(arguments.length>2&&void 0!==arguments[2]?arguments[2]:[]).forEach((t=>{e.classList.add(t)})),Object.entries(t).forEach((t=>{let[n,l]=t;"string"==typeof l&&e.style.setProperty(n,l)})),e};(async()=>{const n=e("audio","Failed to find audio element!");(e=>{const n=t("button",{children:[{tagName:"b",innerText:"Download Album"},{tagName:"i",classlist:["material-icons"],innerText:"file_download",styles:{color:"blue","padding-top":"0px"}}],styles:{display:"flex","padding-left":"0.5rem",gap:"0.3rem","align-items":"center","justify-content":"center"}});return e.innerHTML="",e.style.marginBottom="1.25em",e.appendChild(n),n})(e(".albumMassDownload","Failed to find albumMassDownload element!")).addEventListener("click",(()=>{document.querySelectorAll("#songlist > tbody > tr").forEach(((e,t)=>{const l=e.querySelector(".clickable-row > a"),r=e.querySelector(".playTrack");null!==l&&null!==r&&"songlist_header"!==e.id&&(r.click(),GM_download({name:`${t} - ${l.innerText}.mp3`,url:n.src}))})),n.pause()}))})()}();