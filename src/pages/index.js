import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Keysho } from 'keysho';
import ConfettiExplosion from '@reonomy/react-confetti-explosion';
import 'keysho/dist/index.css';
import { Layout, Hero, About, Jobs, Featured, Projects, Contact } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
  position: relative;
`;

const ConfettiContainer = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: absolute;
  width: 100vw;
  height: 100vh;
`;

const IndexPage = ({ location }) => {
  const [isExploding, setIsExploding] = React.useState(false);

  const ACTION_MAP = {
    trigger_confetti: () => {
      setIsExploding(true);

      setTimeout(() => {
        setIsExploding(false);
      }, 3500);
    },
  };

  return (
    <>
      <Layout location={location} home>
        {isExploding && (
          <ConfettiContainer>
            <ConfettiExplosion force={0.8} />
          </ConfettiContainer>
        )}
        <StyledMainContainer className="fillHeight">
          <Hero />
          <About />
          <Jobs />
          <Featured />
          <Projects />
          <Contact />
        </StyledMainContainer>
      </Layout>
      <Keysho config_uuid="9842636c-ff7b-11ec-8c11-aab15eb75f91" actionMap={ACTION_MAP} />
    </>
  );
};

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
