import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { IntlProvider } from 'react-intl';

import { getCurrentLangKey } from 'ptz-i18n';

import Header from "./header"
import "../styles/index.sass"

import enMessages from '../intl/en';
import ruMessages from '../intl/ru';

function getLocaleMessages(locale) {
  if (locale === 'ru') return ruMessages;
  return enMessages;
}

const Layout = ({ children, location, locale = 'en' }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          i18nLocales {
            defaultLocale
            locales
          }
        }
      }
    }
  `)

  const messages = getLocaleMessages(locale);

  const { locales, defaultLocale } = data.site.siteMetadata.i18nLocales;
  const currentUserLocale = getCurrentLangKey(locales, defaultLocale, location.pathname);

  return (
    <>
      <IntlProvider defaultLocale={defaultLocale} locale={currentUserLocale} messages={messages}>
        <Header siteTitle={data.site.siteMetadata.title} location={location} />
        {children}
      </IntlProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
