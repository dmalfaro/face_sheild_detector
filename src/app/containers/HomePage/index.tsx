import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import Webcam from 'react-webcam';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import homepageSaga from './saga';
import { homepageSelector } from './selector';
import {
  sliceKey,
  reducer,
  actions,
  setClassificationRequested,
} from './slice';
import {
  AppPageWrapper,
  CreditComponent,
  ContentShowCase,
  ContentShowCaseButton,
  ContentShowCaseH1,
  ContentShowCaseP,
  LoadingLabel,
  TopShowCase,
  TopShowCaseImg,
  WebCamContainer,
  Wrapper,
} from './components/styled';

const videoConstraints = {
  width: 1080,
  height: 1080,
  facingMode: 'user',
};

export function HomePage() {
  const [detector, setDetector] = React.useState(false);
  const [feedback, setFeedBack] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState('');
  const webcamRef = React.useRef(null);
  const dispatch = useDispatch();
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homepageSaga });
  const homepageRedux = useSelector(homepageSelector);
  const { vgg16, vgg19, densenet } = homepageRedux.classification;

  console.log('homepageRedux: ', homepageRedux);

  const capture = () => {
    // @ts-ignore
    const src = webcamRef.current.getScreenshot();
    const base64 = src.replace('data:image/jpeg;base64,', '');
    setImgSrc(src);
    dispatch(
      setClassificationRequested({
        base64,
        url: homepageRedux.APP_API,
      }),
    );
  };

  const Detector = () => (
    <WebCamContainer>
      <div
        style={{
          width: '1280px',
          height: '700px',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            margin: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
            overflow: 'auto',
            zIndex: 1,
          }}
        >
          <LoadingLabel>Loading Camera...</LoadingLabel>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            margin: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
            overflow: 'auto',
            zIndex: 2,
          }}
        >
          <Webcam
            audio={false}
            height={700}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            width={1280}
          />
        </div>
        {!!(densenet && vgg16 && vgg19) && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              margin: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
              overflow: 'auto',
              zIndex: 4,
            }}
          >
            <LoadingLabel color="#27f62d"> VGG16: {vgg16} </LoadingLabel>
            <LoadingLabel color="#27f62d"> VGG19: {vgg19} </LoadingLabel>
            <LoadingLabel color="#27f62d"> DENSENET: {densenet} </LoadingLabel>
          </div>
        )}
        {imgSrc && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              margin: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
              overflow: 'auto',
              zIndex: 3,
            }}
          >
            <img src={imgSrc} alt="captured" width="1100px" height="700px" />
          </div>
        )}
        {feedback && (
          <div
            style={{
              position: 'absolute',
              background: '#808080',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              margin: 'auto',
              width: '80%',
              height: '50%',
              overflow: 'auto',
              zIndex: 5,
              boxShadow: 'rgba(0, 0, 0, 0.7) 2px 30px 90px',
              borderRadius: '20px',
            }}
          >
            <LoadingLabel>Thank you for your feedback!</LoadingLabel>
            <ContentShowCaseButton
              isBig={false}
              onClick={() => {
                setFeedBack(false);
                setImgSrc('');
              }}
            >
              Close
            </ContentShowCaseButton>
          </div>
        )}
      </div>
    </WebCamContainer>
  );

  const handleNavigate = () => {
    setDetector(!detector);
    setImgSrc('');
    setFeedBack(false);
    dispatch(actions.resetSlice());
  };

  const handleFeedback = () => {
    setFeedBack(true);
    dispatch(actions.resetSlice());
  };

  const handleReset = () => {
    setImgSrc('');
    setFeedBack(false);
    dispatch(actions.resetSlice());
  };

  return (
    <>
      <Helmet>
        <title>Face Shield Detector</title>
        <meta
          name="description"
          content="A face shield detector application homepage"
        />
      </Helmet>
      <Wrapper>
        <AppPageWrapper>
          <TopShowCase>
            {detector && (
              <ContentShowCaseButton onClick={handleNavigate}>
                Back
              </ContentShowCaseButton>
            )}
            <TopShowCaseImg
              src="./logo.png"
              isBig={!detector}
              onClick={handleNavigate}
            />
          </TopShowCase>
          <ContentShowCase isBig={!detector}>
            {detector ? (
              <Detector />
            ) : (
              <>
                <ContentShowCaseH1>Data Mining Project</ContentShowCaseH1>
                <ContentShowCaseP>
                  Joshua Isanan & Darwayne Alfaro
                </ContentShowCaseP>
              </>
            )}
            {!detector ? (
              <ContentShowCaseButton isBig={!detector} onClick={handleNavigate}>
                Go to Detector
              </ContentShowCaseButton>
            ) : (
              <>
                {!imgSrc ? (
                  <ContentShowCaseButton isBig={!detector} onClick={capture}>
                    Detect Face Shield
                  </ContentShowCaseButton>
                ) : (
                  <div style={{ display: 'inline-flex' }}>
                    <ContentShowCaseButton
                      isBig={!detector}
                      color="#27f62d"
                      onClick={handleFeedback}
                    >
                      Correct
                    </ContentShowCaseButton>
                    <ContentShowCaseButton
                      isBig={!detector}
                      onClick={handleFeedback}
                    >
                      Wrong
                    </ContentShowCaseButton>
                    <ContentShowCaseButton
                      isBig={!detector}
                      color="#808080"
                      onClick={handleReset}
                    >
                      Detect Again
                    </ContentShowCaseButton>
                  </div>
                )}
              </>
            )}
            <CreditComponent isBig={!detector} />
          </ContentShowCase>
        </AppPageWrapper>
      </Wrapper>
    </>
  );
}
