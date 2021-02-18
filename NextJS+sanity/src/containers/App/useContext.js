import React from 'react'
import Router from 'next/router'
import useLocalStorage from 'utils/localStorage'
import { lightTheme as theme } from 'src/theme'

const CLOSE_MENUS_ON_RESIZE = true

export const defaultState = {
  isMounted: false,
  isNavMenuOpen: false,
  isNewsletterOpen: false,
  isContactDialogOpen: false,
}

export default (initialState = defaultState) => {
  const [isMounted, setIsMounted] = React.useState(initialState.isMounted)
  const [isNavMenuOpen, setIsNavMenuOpen] = React.useState(initialState.isNavMenuOpen)
  const [isContactDialogOpen, setIsContactDialogOpen] = React.useState(
    initialState.isContactDialogOpen,
  )
  const [viewedNewsletter, setViewedNewsletter] = useLocalStorage('viewedNewsletter', false)
  const [isNewsletterOpen, setIsNewsletterOpen] = React.useState(initialState.isNewsletterOpen)
  const [isHeaderHidden, setIsHeaderHidden] = React.useState(false)
  const [cartProduct, setCartProduct] = useLocalStorage('cartProduct', null)
  const newsletterTimeout = React.useRef(null)

  // Helpers

  const closeAllMenus = () => {
    setIsNavMenuOpen(false)
  }

  // Private handlers

  const handleMount = React.useCallback(() => {
    setIsMounted(true)
  }, [])

  const handleResize = React.useCallback(() => {
    if (CLOSE_MENUS_ON_RESIZE) {
      closeAllMenus()
    }
  }, [])

  const handleScroll = React.useCallback(() => {
    if (window.scrollY > 0 && isHeaderHidden) {
      setIsHeaderHidden(false)
    } else if (window.scrollY === 0 && !isNavMenuOpen) {
      setIsHeaderHidden(true)
    }
  }, [isHeaderHidden, isNavMenuOpen])

  const handleRouteChangeStart = React.useCallback(() => {
    closeAllMenus()
  }, [])

  const handleRouteChangeComplete = React.useCallback(() => {}, [])

  // Mount hook

  React.useEffect(() => {
    handleMount()
    handleScroll()

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, { passive: true })
    Router.events.on('routeChangeStart', handleRouteChangeStart)
    Router.events.on('routeChangeComplete', handleRouteChangeComplete)

    // show newsletter if user has not previously closed it after 10 seconds
    if (!viewedNewsletter) {
      newsletterTimeout.current = setTimeout(() => setIsNewsletterOpen(true), 10000)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      Router.events.off('routeChangeStart', handleRouteChangeStart)
      Router.events.off('routeChangeComplete', handleRouteChangeComplete)
      clearTimeout(newsletterTimeout.current)
    }
  }, [
    handleMount,
    handleResize,
    handleRouteChangeStart,
    handleRouteChangeComplete,
    viewedNewsletter,
    handleScroll,
  ])

  // Public handlers

  const onShadeChange = React.useCallback(shade => {
    if (shade === 'dark') {
      document.documentElement.style.setProperty('--block-shade', theme.palette.common.white)
    } else if (shade === 'light') {
      document.documentElement.style.setProperty('--block-shade', theme.palette.common.black)
    }
  }, [])

  const onAppBarBurgerClick = React.useCallback(() => {
    setIsNavMenuOpen(prev => !prev)
    setIsHeaderHidden(false)
  }, [])

  const onNavMenuClose = React.useCallback(() => {
    setIsNavMenuOpen(false)
  }, [])

  const onNavMenuExited = React.useCallback(() => {
    // This callback is run only once the component has unmounted.
    // A good place to reset it's component state.
  }, [])

  const onNewsletterOpen = React.useCallback(() => {
    setIsNewsletterOpen(true)
  }, [])

  const onNewsletterClose = React.useCallback(() => {
    setIsNewsletterOpen(false)
    setViewedNewsletter(true)
  }, [setViewedNewsletter])

  const onContactDialogOpen = React.useCallback(() => {
    setIsContactDialogOpen(true)
  }, [])

  const onContactDialogClose = React.useCallback(() => {
    setIsContactDialogOpen(false)
  }, [])

  const onAddProductToCart = React.useCallback(
    (product, variant) => {
      setCartProduct({ product, variant })
      Router.push('/checkout')
    },
    [setCartProduct],
  )

  return {
    isMounted,
    isNavMenuOpen,
    isNewsletterOpen,
    isContactDialogOpen,
    onAppBarBurgerClick,
    onNavMenuClose,
    onNavMenuExited,
    onNewsletterOpen,
    onNewsletterClose,
    onShadeChange,
    onContactDialogOpen,
    onContactDialogClose,
    isHeaderHidden,
    cartProduct,
    onAddProductToCart,
  }
}
