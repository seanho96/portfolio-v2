---
title: 'What I Learned At Work Today #1'
description: Individual Component Contexts
date: '2021-05-25'
draft: false
slug: '/blog/individual-component-contexts'
tags:
  - Learnings
---

## What I Learned At Work Today #1

Today I learned that the React `useContext` can be used not only to store global state which was how I've normally seen it been used, such that:

```jsx

ReactDOM.render(
  <GlobalContext.Provider>
    <App />
  </GlobalContext.Provider>,
  document.getElementById('root')
);

```

But it can also be used in more local components to share state across the child and parent components as well. A simple example I came across was in an accordion component where each of the inner components of the accordion had to know the `toggleShow` state of the accordion item in order to conditionally render out different UI elements.

```jsx
import React, { useState, useContext, createContext } from 'react';
import { Container, Frame, Title, Item, Inner, Header, Body } from './styles/accordion';

const ToggleContext = createContext();

export default function Accordion({ children, ...restProps }) {
  return (
    <Container {...restProps}>
      <Inner>{children}</Inner>
    </Container>
  );
}

Accordion.Title = function AccordionTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Accordion.Frame = function AccordionFrame({ children, ...restProps }) {
  return <Frame {...restProps}>{children}</Frame>;
};

Accordion.Item = function AccordionItem({ children, ...restProps }) {
  const [toggleShow, setToggleShow] = useState(false);

  return (
    <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
      <Item {...restProps}>{children}</Item>
    </ToggleContext.Provider>
  );
};

Accordion.Header = function AccordionHeader({ children, ...restProps }) {
  const { toggleShow, setToggleShow } = useContext(ToggleContext);

  return (
    <Header onClick={() => setToggleShow(!toggleShow)} {...restProps}>
      {children}
      {toggleShow ? (
        <img src="/images/icons/close.png" alt="Close" />
      ) : (
        <img src="/images/icons/add.png" alt="Open" />
      )}
    </Header>
  );
};

Accordion.Body = function AccordionBody({ children, ...restProps }) {
  const { toggleShow } = useContext(ToggleContext);

  return (
    <Body className={toggleShow ? 'open' : 'closed'} {...restProps}>
      <span>{children}</span>
    </Body>
  );
};

```

In the snippet of code above, we had created a `ToggleContext` with React's `createContext` solely for the scope of the `Accordion` component. We then use this `ToggleContext` as a *higher order component (HOC)*, pass it the state and wrapped it over its children so that anything nested below it can have access to this particular context created:- in this particular case, `AccordionHeader` & `AccordionBody`.

Inside `AccordionHeader` & `AccordionBody`, we then call `useContext` and destructure out `toggleShow` & `setToggleShow` to be used on the child components. With this sort of implementation, we have more options to access a more local version of state that is exposed to the parent components without the need of storing it in the global context. That's all for now, till the next one!