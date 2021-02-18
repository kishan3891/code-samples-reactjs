import React from 'react'
import PropTypes from 'prop-types'
import ArticleList from './ArticleList'
import { transformMedia } from 'utils/sanity'
import groq from 'api/sanity/groq'
import sanity from 'api/sanity'

const PAGINATION_COUNT = 12

const EnhancedArticleList = ({ tags, articles: initialArticles, ...other }) => {
  const [filter, setFilter] = React.useState({ tags: [] })
  const [page, setPage] = React.useState(0)
  const [articles, setArticles] = React.useState(initialArticles)

  React.useEffect(() => {
    const start = page * PAGINATION_COUNT
    const end = (page + 1) * PAGINATION_COUNT - 1
    sanity.fetch(groq.getNews(start, end)).then(response => {
      setArticles(response)
    })
  }, [page])

  function changeFilterTagHandler(event, value) {
    setFilter({ tags: value })
  }

  function changePageHandler(event, value) {
    setPage(value - 1)
  }

  return (
    <ArticleList
      onChangeFilter={changeFilterTagHandler}
      onChangePage={changePageHandler}
      paginationCount={PAGINATION_COUNT}
      totalArticles={initialArticles.length}
      tags={tags}
      filter={filter}
      articles={articles.map(article => ({
        ...article,
        href: `/news/${article.slug}`,
        featuredImage: transformMedia({
          responsive: true,
          src: article.featuredImage,
        }),
      }))}
      {...other}
    />
  )
}

EnhancedArticleList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  articles: PropTypes.array.isRequired,
}

export default EnhancedArticleList
