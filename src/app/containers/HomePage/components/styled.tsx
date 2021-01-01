import * as React from 'react';
import styled from 'styled-components/macro';

export const WebCamContainer = styled.div`
  display: 'flex';
  align-items: 'center';
`;

export const Wrapper = styled.div`
  padding: 4em;
  height: 100%;
  background: #000000;
  position: fixed;
  width: 100%;
  top: 0px;
  left: 0px;
  z-index: 1000;
`;

export const AppPageWrapper = styled.div`
  width: 100%;
  height: 93vh;
  position: relative;
  background: url('./backdrop.jpg') no-repeat center center/cover;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.6);
    box-shadow: inset 120px 100px 250px #000000,
      inset -120px -100px 250px #000000;
  }
`;

export const TopShowCase = styled.div`
  position: relative;
  z-index: 2;
  height: 90px;
`;

export const TopShowCaseImg = styled.img<{ isBig: boolean }>`
  width: ${props => (props.isBig ? '50%' : '25%')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-left: 0;
`;

export const ContentShowCase = styled.div<{ isBig: boolean }>`
  position: relative;
  z-index: 2;
  width: 65%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: ${props => (props.isBig ? '10rem' : '1rem')};
`;

export const ContentShowCaseH1 = styled.h1`
  font-weight: 700;
  font-size: 5.2rem;
  line-height: 1.1;
  margin: 0 0 2rem;
  color: #fff;
`;

export const LoadingLabel = styled.h2<{
  color?: string;
}>`
  font-weight: 700;
  font-size: 3rem;
  line-height: 100%;
  vertical-align: middle;
  text-align: center;
  color: ${props => props.color || '#fff'};
`;

export const ContentShowCaseP = styled.p`
  text-transform: uppercase;
  color: #fff;
  font-weight: 400;
  margin-top: 3rem;
  font-size: 1.9rem;
  line-height: 1.25;
  margin: 0 0 2rem;
`;

export const ContentShowCaseButton = styled.button<{
  isBig?: boolean;
  color?: string;
}>`
  font-size: ${props => (props.isBig ? '2rem' : '1rem')};
  text-transform: uppercase;
  display: inline-block;
  background: ${props => props.color || '#db0000'};
  color: #fff;
  padding: ${props => (props.isBig ? '2rem 3rem' : '1rem 1.5rem')};
  text-align: center;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
  margin-top: ${props => (props.isBig ? '5rem' : '2rem')};
  transition: opacity 0.2s ease-in;
  outline: none;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.45);
  border-radius: 2px;
  &:hover {
    opacity: 0.9;
  }
`;

export const Credits = styled.span<{ isBig: boolean }>`
  margin-top: ${props => (props.isBig ? '10rem' : '1.5rem')};
  color: #fff;
`;

export const CreditsLink = styled.a`
  color: #fff;
`;

export const DetectorContainer = styled.div`
  width: '1280px';
  height: '700px';
  justify-content: 'center';
  align-items: 'center';
  position: 'relative';
`;

export const DetectorElement = styled.div<{ zIndex: number }>`
  position: 'absolute';
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 'auto';
  max-width: '100%';
  max-height: '100%';
  overflow: 'auto';
  z-index: : 0.5rem;
  margin-top: ${props => props.zIndex};
`;

export const CreditComponent = ({ isBig }) => (
  <Credits isBig={isBig}>
    Photo by{' '}
    <CreditsLink href="https://unsplash.com/@heyerlein?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
      {' '}
      h heyerlein{' '}
    </CreditsLink>{' '}
    on{' '}
    <CreditsLink href="https://unsplash.com/s/photos/machine-learning?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
      {' '}
      Unsplash
    </CreditsLink>
  </Credits>
);
