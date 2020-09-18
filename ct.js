/* name of the URL parameter passed by advertisement campaigns */
const AD_ID_PARAM = 'p'

/* returns the URL parameter value or null */
const getAdID = () => (new URLSearchParams(document.location.search)).get(AD_ID_PARAM)

/* checks if links are relative or reference keycard.tech */
const isInternalLink = (element) => {
  let url = element.getAttribute('href')
  return url.startsWith('/') || url.includes('status.im')
}

const setAdIDParam = (id, element) => {
  let url = new URL(element.getAttribute('href'), document.location.origin)
  url.searchParams.set(AD_ID_PARAM, id)
  element.setAttribute('href', url.toString())
}

const addToInternalLinks = (id) => {
  elements = document.querySelectorAll('a')
  /* filter out non-internal links */
  cleanList = [...elements].filter(isInternalLink)
  /* set the AD campaign ID for all internal links */
  cleanList.forEach((element, idx) => setAdIDParam(id, element))
}

const addToExternalLinks = (id) => {
  document.querySelectorAll('a[href="https://play.google.com/store/apps/details?id=im.status.ethereum"]').forEach(function(element, idx) {
    let url = new URL(element.getAttribute('href'));
    url.searchParams.set("utm_campaign", id);
    element.setAttribute('href', url.toString())    
  });
  document.querySelectorAll('a[href="https://apps.apple.com/us/app/status-private-communication/id1178893006"]').forEach(function(element, idx) {
    let url = new URL(element.getAttribute('href'));
    url.searchParams.set("ct", id)
    element.setAttribute('href', url.toString())    
  });
}

(function() {
  let id = getAdID()
  /* we modify links only if our parameter is set. */
  if (id == null) { return }
  /* iterate over all <a> tags and update URLs
   * with AD parameter where necessary */
  addToInternalLinks(id);
  addToExternalLinks(id);
})()
