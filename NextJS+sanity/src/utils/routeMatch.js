// TODO: This should be replaced with something more sophisticated when needed

export default function(href) {
  return href.replace(/^\/(?!news\/).*/g, '/[slug]').replace(/^\/(news)\/.*/g, 'news/[slug]')
}
