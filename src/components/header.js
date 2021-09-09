import * as React from "react"
import PropTypes from "prop-types"
import { useIntl } from 'react-intl';
import { useStaticQuery, graphql, Link } from 'gatsby';

import Logo from '../images/logo.svg'
import Aos from "aos";
import Anchor from "./anchor";
import NavBar from "./nav";

export function localizedPath(defaultLocale, locale, path) {
  const [, base] = path.split(`/`);
  if (locale === defaultLocale || base === locale) return path;
  return `/${locale}${path}`;
}

const LanguageSwitcher = ({ locales, location }) => {
  const { locale: currentLocale, defaultLocale } = useIntl();

  return (
    <>
      <div className="df ai-center lang-switcher">
        {locales.map((locale) => (
          <div key={locale} className={`lang-item mr-20 df ai-center tt-uc ${locale === currentLocale ? 'active' : ''}`}>
            <Link to={locale === defaultLocale
              ? location.pathname.replace(`/${currentLocale}`, '')
              : localizedPath(defaultLocale, locale, location.pathname)}>{locale}</Link>
          </div>
        ))}
      </div>
    </>
  );
};

const Header = ({ location }) => {
  const { formatMessage } = useIntl();

  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          i18nLocales {
            locales
          }
        }
      }
    }
  `);

  React.useEffect(() => {
    Aos.init({
      duration: 2000
    });
  }, []);

  return (
    <>
      <header data-sal="fade" data-sal-duration="300">
        <div>
          <div className="row">
            <div className="col-12">
              <div className="row ai-center jc-sb">
                <div className="col-auto">
                  <a href="/" className="logo df ai-center">
                    <img src={Logo} alt="Macarrow" />
                  </a>
                </div>
                <div className="col-auto">
                  <div className="row jc-sb ai-center">
                    <div className="col-auto">
                      <ul className="nav-list main-list df ai-center tt-uc">
                        <li className="nav-item"><Anchor className="anchor" anchor={'#work'} text={formatMessage({ id: 'work' })} /></li>
                        <li className="nav-item"><Anchor className="anchor" anchor={'#video'} text={formatMessage({ id: 'video' })} /></li>
                        <li className="nav-item"><Anchor className="anchor" anchor={'#contacts'} text={formatMessage({ id: 'contacts' })} /></li>
                      </ul>
                    </div>

                    <div className="col-auto">
                      <LanguageSwitcher location={location} locales={site.siteMetadata.i18nLocales.locales} />
                    </div>

                    <div className="col-auto">
                      <NavBar />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}


Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
