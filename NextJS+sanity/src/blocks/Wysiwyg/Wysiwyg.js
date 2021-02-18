import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import BlockContent from '@sanity/block-content-to-react'
import { Section, Container, MediaLoader, Media } from 'components'
import { transformMedia } from 'utils/sanity'
import { useRouter } from 'next/router'

export const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  content: {
    color: theme.palette.text.primary,
    '& p': theme.typography.body1,
    '& h1': theme.typography.h3,
    '& h2': theme.typography.h4,
    '& h3': theme.typography.h5,
    '& h4': theme.typography.h6,
    '& h5': theme.typography.h6,
    '& h6': theme.typography.h6,
  },
  html: {
    '& iframe': {},
  },
}))

const HtmlSerializer = props => {
  const { node } = props
  const classes = useStyles()
  /* eslint-disable react/no-danger */
  return <div className={classes.html} dangerouslySetInnerHTML={{ __html: node.content }} />
}

HtmlSerializer.propTypes = {
  node: PropTypes.object.isRequired,
}

/*  eslint-disable react/prop-types */
const serializers = {
  marks: {
    center: props => {
      const { _type, mark, children } = props
      return React.createElement(_type, { style: { display: 'block', textAlign: mark } }, children)
    },
  },
  types: {
    code: props => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
    imageMedia: props => {
      const media = transformMedia(props.node)
      return (
        <MediaLoader>
          <Media component="picture" {...media} />
        </MediaLoader>
      )
    },
    html: HtmlSerializer,
  },
}

const WysiwygBlock = props => {
  const { content } = props
  const classes = useStyles()
  const router = useRouter()
  
  React.useEffect(() => {
    var button = document.getElementById("test-driveform");
    var virtualButton = document.getElementById("virtual-meetingform");
    var contactButton = document.getElementById("contactform");
    if (button) {
      button.addEventListener("submit", myFunction);
      function myFunction(e) {
        e.preventDefault();
        router.push("/testdrive-requested");
      }
    } else if (virtualButton) {
      virtualButton.addEventListener("submit", handleMeetingSubmit);
      function handleMeetingSubmit(e) {
        e.preventDefault();
        router.push("/meeting-requested");
      }
    } else if (contactButton) {
      contactButton.addEventListener("submit", handleContactSubmit);
      function handleContactSubmit(e) {
        e.preventDefault();
        router.push("/contact-requested");
      }
    }
  }, []);
  

  return (
    <Section className={classes.root}>
      <Container className={classes.content}>
        <BlockContent blocks={content} serializers={serializers} />
      </Container>
    </Section>
  )
}

WysiwygBlock.propTypes = {
  content: PropTypes.array.isRequired,
}

export default WysiwygBlock
