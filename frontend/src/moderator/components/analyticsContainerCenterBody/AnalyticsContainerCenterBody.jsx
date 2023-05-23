import React from 'react';
import styled from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faPaperclip,
  faPaperPlane,
  faPlusSquare,
  faSmile,
  faTrash,
} from '@fortawesome/fontawesome-free-solid';
import { Link } from 'react-router-dom';

export const AnalyticsContainerCenterBody = () => {
  return (
    <div className={styled.analyticsContainerCenterBody}>
      <div className={styled.buttonCenter1}>
        <ul>
          <li>
            <Link to='/'>
              <FontAwesomeIcon icon={faHeart} />
              <p>lhr hobt ein Match!</p>
            </Link>
          </li>
          <li>
            <Link to='/'>
              <p>Geschickte Bilder</p>
            </Link>
          </li>
          <li>
            <Link to='/'>
              <p>Geschickte Geschenke</p>
            </Link>
          </li>
        </ul>
      </div>

      <div className={styled.buttonCenter2}>
        <div className={styled.buttonCenter2Inner}>
          <div className={styled.buttonCenter2Inner1}>
            <div className={styled.buttonCenter2Inners}>
              <p>asd</p>
              <FontAwesomeIcon icon={faTrash} />
            </div>
            <div className={styled.buttonCenter2Inners}>
              <p>asd</p>
              <FontAwesomeIcon icon={faTrash} />
            </div>
            <div className={styled.buttonCenter2Inners}>
              <p>asd</p>
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
          <h4>Von admin am 14.03.21 13:16: Myli mane</h4>
        </div>
        <div className={styled.buttonCenter2InnerAfter}>
          <input type='text' placeholder='Chat Hinwise' />
          <button>
            <FontAwesomeIcon icon={faPlusSquare} />
          </button>
        </div>
      </div>

      <div className={`${styled.pageContent} ${styled.pageContainer}`} id={styled.pageContent}>
        <div className='padding'>
          <div
            className={`${styled.row} ${styled.container} ${styled.dFlex} ${styled.justifyContentCenter}`}
          >
            <div className={styled.colMd6}>
              <div className={`${styled.card} ${styled.cardBordered}`}>
                <div className={styled.cardHeader}></div>

                <div
                  className={`${styled.psContainer} ${styled.psThemeDefault} ${styled.psActiveY}`}
                  id={styled.chatContent}
                  style={{ overflowY: 'scroll', height: '500px' }}
                >
                  <div className={`${styled.media} ${styled.mediaChat}`}>
                    <img
                      className={styled.avatar}
                      src='https://img.icons8.com/color/36/000000/administrator-male.png'
                      alt='...'
                    />
                    <div className={`${styled.mediaBody}`}>
                      <p>Hi</p>
                      <p>How are you ...???</p>
                      <p>
                        What are you doing tomorrow?
                        <br /> Can we come up a bar?
                      </p>
                      <p className={styled.meta}>
                        <time dateTime='2018'>23:58</time>
                      </p>
                    </div>
                  </div>

                  <div className={`${styled.media} ${styled.mediaMetaDay}`}>Today</div>

                  <div className={`${styled.media} ${styled.mediaChat} ${styled.mediaChatReverse}`}>
                    <div className={`${styled.mediaBody}`}>
                      <p>Hiii, I&apos;m good.</p>
                      <p>How are you doing?</p>
                      <p>Long time no see! Tomorrow office. will be free on sunday.</p>
                      <p className={styled.meta}>
                        <time dateTime='2018'>00:06</time>
                      </p>
                    </div>
                  </div>

                  <div className={`${styled.media} ${styled.mediaChat}`}>
                    <img
                      className={styled.avatar}
                      src='https://img.icons8.com/color/36/000000/administrator-male.png'
                      alt='...'
                    />
                    <div className={`${styled.mediaBody}`}>
                      <p>Okay</p>
                      <p>We will go on sunday? </p>
                      <p className={styled.meta}>
                        <time dateTime='2018'>00:07</time>
                      </p>
                    </div>
                  </div>

                  <div className={`${styled.media} ${styled.mediaChat} ${styled.mediaChatReverse}`}>
                    <div className={`${styled.mediaBody}`}>
                      <p>That&apos;s awesome!</p>
                      <p>I will meet you Sandon Square sharp at 10 AM</p>
                      <p>Is that okay?</p>
                      <p className={styled.meta}>
                        <time dateTime='2018'>00:09</time>
                      </p>
                    </div>
                  </div>

                  <div className={`${styled.media} ${styled.mediaChat}`}>
                    <img
                      className={styled.avatar}
                      src='https://img.icons8.com/color/36/000000/administrator-male.png'
                      alt='...'
                    />
                    <div className={`${styled.mediaBody}`}>
                      <p>Okay i will meet you on Sandon Square </p>
                      <p className={styled.meta}>
                        <time dateTime='2018'>00:10</time>
                      </p>
                    </div>
                  </div>

                  <div className={`${styled.media} ${styled.mediaChat} ${styled.mediaChatReverse}`}>
                    <div className={`${styled.mediaBody}`}>
                      <p>Do you have pictures of Matley Marriage?</p>
                      <p className={styled.meta}>
                        <time dateTime='2018'>00:10</time>
                      </p>
                    </div>
                  </div>

                  <div className={`${styled.media} ${styled.mediaChat}`}>
                    <img
                      className={styled.avatar}
                      src='https://img.icons8.com/color/36/000000/administrator-male.png'
                      alt='...'
                    />
                    <div className={`${styled.mediaBody}`}>
                      <p>Sorry I don&apos;t have. i changed my phone.</p>
                      <p className={styled.meta}>
                        <time dateTime='2018'>00:12</time>
                      </p>
                    </div>
                  </div>

                  <div className={`${styled.media} ${styled.mediaChat} ${styled.mediaChatReverse}`}>
                    <div className={`${styled.mediaBody}`}>
                      <p>Okay then see you on sunday!!</p>
                      <p className={styled.meta}>
                        <time dateTime='2018'>00:12</time>
                      </p>
                    </div>
                  </div>

                  <div className={styled.psScrollbarXRail} style={{ left: '0px', bottom: '0px' }}>
                    <div
                      className={styled.psScrollbarX}
                      tabIndex='0'
                      style={{ left: '0px', width: '0px' }}
                    ></div>
                  </div>
                  <div
                    className={styled.psScrollbarYRail}
                    style={{ top: '0px', height: '0px', right: '2px' }}
                  >
                    <div
                      className={styled.psScrollbarY}
                      tabIndex='0'
                      style={{ top: '0px', height: '2px' }}
                    ></div>
                  </div>
                </div>

                <div className={`${styled.publisher} ${styled.bt1} ${styled.borderLight}`}>
                  <img
                    className='avatar avatar-xs'
                    src='https://img.icons8.com/color/36/000000/administrator-male.png'
                    alt='...'
                  />
                  <textarea
                    className={styled.publisherInput}
                    placeholder='Write something'
                  ></textarea>
                  <span className={`${styled.publisherBtn} ${styled.fileGroup}`}>
                    <FontAwesomeIcon icon={faPaperclip} />
                    <input type='file' />
                  </span>
                  <Link className={styled.publisherBtn} to='' data-abc='true'>
                    <FontAwesomeIcon icon={faSmile} />
                  </Link>
                  <Link
                    className={`${styled.publisherBtn} ${styled.textInfo}`}
                    to=''
                    data-abc='true'
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
