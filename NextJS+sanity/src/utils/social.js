export default {
  facebookShare(url) {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank'
    )
  },
  twitterShare(url, text = '', hashtags = []) {
    window.open(
      `https://twitter.com/share?text=${text}&url=${encodeURIComponent(
        url
      )}&hashtags=${hashtags.join(',')}`,
      '_blank'
    )
  },
  copyToClipBoard(string) {
    const el = document.createElement('textarea')
    el.value = string
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  },
}
