for (const link of document.getElementsByTagName('link')) {
  const rel = link.getAttribute('rel')
  const href = link.getAttribute('href')
  if (href !== null && (rel === 'icon' || rel === 'shortcut icon')) {
    const url = new URL(href, document.location.href).toString()
    console.log('%c[favicons]:', 'color: #1f78ff', url)
    GM_setValue(url, url)
  }
}
