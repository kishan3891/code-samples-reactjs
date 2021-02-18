import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Section,
  Container,
  Media,
  MediaLoader,
  ButtonBase,
  Gallery,
  GalleryItem,
  SectionHeadline,
  IconButton,
  Dialog,
} from 'components'
import Youtube from 'react-youtube'
import { CloseIcon, PlayIcon } from 'components/icons'
import propTypes from 'api/propTypes'
import { getYoutubeId } from 'utils/youtube'
import AspectRatio from '@oakwood/oui/AspectRatio'
import { DialogContent, DialogTitle, useTheme, useMediaQuery } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  root: {},
  content: {},
  item: {
    display: 'block',
  },
  openedMedia: {},
  galleryMedia: {
    objectFit: 'cover',
  },
  dialogContent: {
    display: 'flex',
    alignItems: 'center',
  },
  playIcon: {
    ...theme.mixins.absoluteCover(),
    color: theme.palette.primary.light,
    margin: 'auto',
    width: 56,
    height: 56,
  },
}))

const GalleryBlock = props => {
  const { items, onClickMedia, onCloseDialog, index = null, dialogOpen, headline } = props
  const classes = useStyles()
  const theme = useTheme()
  const mdUp = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Section className={classes.root}>
      {headline && <SectionHeadline>{headline}</SectionHeadline>}
      <Container maxWidth="lg" className={classes.content}>
        <Gallery>
          {items.map((item, i) => {
            const { component, autoPlay } = item.media
            const isVideo = component === 'video'
            const isUrl = typeof item.media === 'string'
            return (
              <GalleryItem featured={item.featured} key={item.key}>
                <ButtonBase
                  component="div"
                  onClick={() => onClickMedia(i)}
                  className={classes.item}
                >
                  {item.media.breakpoints && (
                    <MediaLoader width={1} height={item.featured ? 0.5 : 1} lazy>
                      <Media
                        component="picture"
                        className={classes.galleryMedia}
                        {...item.media}
                        muted
                        autoPlay
                        loop
                        playsInline
                      />
                    </MediaLoader>
                  )}
                  {isVideo && !autoPlay && <PlayIcon className={classes.playIcon} />}
                  {isUrl && (
                    <>
                      <MediaLoader width={1} height={item.featured ? 0.5 : 1} lazy>
                        <Media
                          component="img"
                          className={classes.galleryMedia}
                          src={`https://img.youtube.com/vi/${getYoutubeId(
                            item.media,
                          )}/maxresdefault.jpg`}
                        />
                      </MediaLoader>
                      <PlayIcon className={classes.playIcon} />
                    </>
                  )}
                </ButtonBase>
              </GalleryItem>
            )
          })}
        </Gallery>
        <Dialog
          fullScreen={!mdUp}
          fullWidth
          maxWidth="lg"
          open={dialogOpen}
          onClose={onCloseDialog}
        >
          <DialogTitle>
            <IconButton color="inherit" onClick={onCloseDialog}>
              <CloseIcon className={classes.closeDialogButton} />
            </IconButton>
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            {index !== null && items[index].media.breakpoints && (
              <Media
                component="picture"
                {...items[index].media}
                autoPlay
                controls
                muted={false}
                playsInline={false}
                className={classes.openedMedia}
              />
            )}
            {index !== null && typeof items[index].media === 'string' && (
              <AspectRatio width={16} height={9} className={classes.youtubeContainer}>
                <Youtube
                  className={classes.youtube}
                  opts={{ width: '100%', height: '100%', playerVars: { autoplay: true } }}
                  videoId={getYoutubeId(items[index].media)}
                />
              </AspectRatio>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </Section>
  )
}

GalleryBlock.propTypes = {
  headline: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      media: PropTypes.oneOfType([propTypes.media, PropTypes.string]),
      featured: PropTypes.bool,
      key: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onClickMedia: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  index: PropTypes.number,
  dialogOpen: PropTypes.bool,
}

export default GalleryBlock
