import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Head, Loader, Nav, Social, Blog, Footer } from '@components';
import { GlobalStyle, theme } from '@styles';
import { Keysho } from 'keysho';
import 'keysho/dist/index.css';
import ConfettiExplosion from '@reonomy/react-confetti-explosion';

// https://medium.com/@chrisfitkin/how-to-smooth-scroll-links-in-gatsby-3dc445299558
if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  require('smooth-scroll')('a[href*="#"]');
}

const ConfettiContainer = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SkipToContentLink = styled.a`
  position: absolute;
  top: auto;
  left: -999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: -99;
  &:focus,
  &:active {
    top: 0;
    left: 0;
    width: auto;
    height: auto;
    padding: 18px 23px;
    outline: 0;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    overflow: auto;
    transition: var(--transition);
    z-index: 99;
  }
`;
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({ children, location, home }) => {
  const isHome = location.pathname === '/';
  const [isLoading, setIsLoading] = useState(isHome);
  const [isExploding, setIsExploding] = useState(false);

  const ACTION_MAP = {
    throw_confetti: () => {
      setIsExploding(true);

      setTimeout(() => {
        setIsExploding(false);
      }, 3500);
    },
  };

  // Sets target="_blank" rel="noopener noreferrer" on external links
  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));

    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }

    handleExternalLinks();
  }, [isLoading]);

  return (
    <>
      <Head />

      <div id="root">
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <SkipToContentLink href="#content">Skip to Content</SkipToContentLink>

          {isLoading && isHome ? (
            <Loader finishLoading={() => setIsLoading(false)} />
          ) : (
            <StyledContent>
              <Nav isHome={isHome} />
              <Social isHome={isHome} />
              <Blog isHome={isHome} />

              <div id="content">
                {children}
                <Footer home={home} />
              </div>
            </StyledContent>
          )}
          {isExploding && (
            <ConfettiContainer>
              <ConfettiExplosion force={0.8} />
            </ConfettiContainer>
          )}
        </ThemeProvider>
      </div>
      <Keysho config_uuid="9842636c-ff7b-11ec-8c11-aab15eb75f91" actionMap={ACTION_MAP} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
