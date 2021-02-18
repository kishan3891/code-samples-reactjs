const parent = (value, key) => `'${key || value}': ^->.${value}`
const link = `link{label, href}`
const breakpoints = `xs, sm, md, lg, xl`
const cta = `icon, ${link}`
const date = `'date': _createdAt`
const key = `'key': _key`
const slug = `'slug': slug.current`
const media = `breakpoints{${breakpoints}}, src, responsive, _type == 'videoMedia' => {'component': 'video'}, properties, alt`
const article = `'key': _id, ${date}, 'published': coalesce(published, _createdAt), featuredImage, fitFeaturedImage, ${slug}, tags, title`
const navigationItems = `primaryItems[]{icon, ${link}}, secondaryLinks[]{label, href}, tertiaryLinks[]{label, href}`
const navigation = `desktop{${navigationItems}}, mobile{${navigationItems}}`
const footer = `socialLinks, footerLinks`
const global = `legal, translations`
const product = `title, description, available, features, variants[]{name, images[]{${key}, responsive, src}, 'color': color.hex}, included, keyFeatures[]{${key}, name, value, unit}, ${slug}, price, oldPrice, specs[]{${key}, name, value}, attachment{'href': file.asset->url, label}`
const HeroBlock = `backgroundMedia[0]{${media}}, headline, text, layoutDesktop, layoutMobile, disableAnimation, cta{${cta}}, shade`
const HeaderBlock = `backgroundMedia[0]{${media}}, headline, subheadline, showLogo, cta{${cta}}, secondaryCta{${cta}}`
const WysiwygBlock = `content`
const StoriesBlock = `headline, stories[]{${key}, ${parent(
  'featuredImage.asset->url',
  'featuredImage',
)}, ${parent('featuredImage.alt', 'featuredImageAlt')}, ${parent('title')}, ${parent(
  'tag',
)}, ${parent('slug.current', 'slug')}, ${slug}}`
const GalleryMenuBlock = `items[]{${key}, link, 'media': media[0]{${media}}, featured}`
const ArticleSliderBlock = `headline, ${link}, tag, 'articles': *['event' in tags]{${article}} | order(published desc)` // 'event' SHOULD NOT BE HARD CODED
const ArticleListBlock = `headline, tags, 'articles': *[_type == "news"]{${article}} | order(published desc)`
const ProductBlock = `product->{${product}}, backgroundMedia[0]{${media}}, orderUrl`
const ProductListBlock = `products[]->{${product}},`
const QuoteBlock = `quote`
const GalleryBlock = `headline, items[]{${key}, featured, 'media': media[0]{${media}, url}}`
const LinkListBlock = `headline, links[]{${key}, icon, description, link}`
const GridContentBlock = `headline, items[]{${key}, title, text, layout, media[0]{${media}}}`
const SlideshowBlock = `headline, images[]{${key}, ${media}}, keyFeatures[]{${key}, icon, iconText, text}`
const ListBlock = `items[]{${key}, title, description, value}`
const NewsletterBlock = `headline, text, showContactType, mailchimpUrl, successMessage`

const blocks = {
  HeroBlock,
  HeaderBlock,
  WysiwygBlock,
  StoriesBlock,
  GalleryMenuBlock,
  ArticleSliderBlock,
  ArticleListBlock,
  ProductBlock,
  ProductListBlock,
  QuoteBlock,
  GalleryBlock,
  LinkListBlock,
  GridContentBlock,
  SlideshowBlock,
  ListBlock,
  NewsletterBlock,
}
const blocksQuery = Object.keys(blocks).map(type => ` _type == "${type}" => {${blocks[type]}}`)
const page = currentSlug => {
  const query = `*[_type == "page" && slug.current == "${currentSlug}"]{title, ${slug}, description, featuredImage, blocks[]{_type, ${key}, ${blocksQuery}}, properties}[0]`
  return query
}
const globals = `{'navigation': *[_type == 'navigation']{${navigation}}[0], 'global': *[_type == 'global']{${global}}[0], 'footer': *[_type == 'footer']{${footer}}[0]}`
const news = currentSlug =>
  `*[_type == "news" && slug.current == "${currentSlug}"]{title, ${slug}, description, featuredImage, 'headerMedia': headerMedia[0]{${media}}, ${date}, 'published': coalesce(published, _createdAt), block{_type, ${key}, ${blocksQuery}}}[0]`
const getNews = (start = 0, end = '') =>
  `*[_type == "news"]{${article}} | order(published desc) | [${start}..${end}]`
const getProduct = productSlug =>
  `*[_type == "product" && slug.current == "${productSlug}"]{${product}}[0]`
export default {
  globals,
  blocks,
  page,
  news,
  getProduct,
  getNews,
}
