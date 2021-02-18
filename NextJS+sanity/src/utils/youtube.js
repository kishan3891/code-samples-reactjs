export function getYoutubeId(url) {
  const regex = /v=(.*)/g
  return regex.exec(url)[1]
}

export default {
  getYoutubeId,
}
