import React from 'react';
import styled from './style.module.css';
import ProfileImage from '../../../assets/images/profile_image.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faComment,
  faCopyright,
  faExclamationTriangle,
  faMapMarker,
  faSearch,
  faUser,
} from '@fortawesome/fontawesome-free-solid';

export const AnalyticsContainerLeftBody = () => {
  return (
    <div className={styled.analyticsContainerleftBody}>
      <div className={styled.profileActive}>
        <div className={styled.profileActiveLeft}>
          <img src={ProfileImage} alt='' />
          <div className={styled.userActiveProfile}>
            <h3>
              User, <span>21</span>
            </h3>
            <h5>user</h5>
          </div>
          <div className={styled.clear}></div>
        </div>
        <div className={styled.profileActiveright}>
          <label>offline</label>
        </div>
        <div className={styled.clear}></div>
      </div>
      <div className={styled.profileActiveUser}>
        <img src={ProfileImage} alt='' />
      </div>
      <div className={styled.profileActiveUserDetails}>
        <ul>
          <li>
            <FontAwesomeIcon icon={faUser} />
            <h3>
              Name: <span>User</span>
            </h3>
          </li>
          <li>
            <FontAwesomeIcon icon={faCalendar} />
            <h3>
              Geburtstag: <span>User</span>
            </h3>
          </li>
          <li>
            <FontAwesomeIcon icon={faSearch} />
            <h3>
              Sucht nach: <span>User</span>
            </h3>
          </li>
          <li>
            <FontAwesomeIcon icon={faMapMarker} />
            <h3>
              Sucht in: <span>User</span>
            </h3>
          </li>
          <li>
            <FontAwesomeIcon icon={faComment} />
            <h3>
              Ins: <span>User</span>
            </h3>
          </li>
          <li>
            <FontAwesomeIcon icon={faCopyright} />
            <h3>
              Credit: <span>User</span>
            </h3>
          </li>
          <li>
            <FontAwesomeIcon icon={faCalendar} />
            <h3>
              Registriert: <span>User</span>
            </h3>
          </li>
          <li>
            <FontAwesomeIcon icon={faCalendar} />
            <h3>
              Erster Kontakt: <span>User</span>
            </h3>
          </li>
          <li>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <h3>
              Kunde melden: <span>User</span>
            </h3>
          </li>
        </ul>
      </div>
      <div className={styled.profileActiveUserAdd}>
        <form>
          <div className={styled.formModratorGroup}>
            <input type='text' name='beruf' placeholder='Beruf' />
          </div>
          <div className={styled.formModratorGroup}>
            <input type='text' name='beruf' placeholder='Status' />
          </div>
          <div className={styled.formModratorGroup}>
            <input type='text' name='beruf' placeholder='Name' />
          </div>
          <div className={styled.formModratorGroup}>
            <input type='text' name='beruf' placeholder='Ort' />
          </div>
          <div className={styled.formModratorGroup}>
            <input type='text' name='beruf' placeholder='Geschwister' />
          </div>
          <div className={styled.formModratorGroup}>
            <input type='text' name='beruf' placeholder='Kinder' />
          </div>
          <div className={styled.formModratorGroup}>
            <input type='text' name='beruf' placeholder='Houstiere' />
          </div>
          <div className={styled.formModratorGroup}>
            <input type='text' name='beruf' placeholder='Hobbys' />
          </div>
          <div className={styled.formModratorGroup}>
            <input type='text' name='beruf' placeholder='Sternzeichen' />
          </div>
          <div className={styled.formModratorGroup}>
            <button>Speichern</button>
          </div>
        </form>
      </div>
    </div>
  );
};
