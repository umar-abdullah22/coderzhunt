import React from 'react';
import styled from './style.module.css';
import ProfileImage from '../../../assets/images/profile_image.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faComment,
  faCopyright,
  faMapMarker,
  faSearch,
  faUser,
} from '@fortawesome/fontawesome-free-solid';

export const AnalyticsContainerRightBody = () => {
  return (
    <div className={styled.analyticsContainerRightBody}>
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
          <label>online</label>
        </div>
        <div className={styled.clear}></div>
      </div>
      <div className={styled.profileActiveUserDetails}>
        <ul>
          <li>
            <FontAwesomeIcon icon={faUser} />
            <h3>
              Kunde sieht: <span>User</span>
            </h3>
          </li>
          <li>
            <FontAwesomeIcon icon={faCalendar} />
            <h3>
              Name: <span>User</span>
            </h3>
          </li>
          <li>
            <FontAwesomeIcon icon={faSearch} />
            <h3>
              Nachname: <span>User</span>
            </h3>
          </li>
          <li>
            <FontAwesomeIcon icon={faMapMarker} />
            <h3>
              Beziehungsstatus: <span>User</span>
            </h3>
          </li>
          <li>
            <FontAwesomeIcon icon={faComment} />
            <h3>
              Größe: <span>User</span>
            </h3>
          </li>
          <li>
            <FontAwesomeIcon icon={faCopyright} />
            <h3>
              Raucher: <span>User</span>
            </h3>
          </li>
          <li>
            <FontAwesomeIcon icon={faCalendar} />
            <h3>
              Alkohol: <span>User</span>
            </h3>
          </li>
          <li>
            <FontAwesomeIcon icon={faUser} />
            <h3>
              Beruf: <span>User</span>
            </h3>
          </li>
          <li>
            <FontAwesomeIcon icon={faCalendar} />
            <h3>
              Schule: <span>User</span>
            </h3>
          </li>

          <li>
            <FontAwesomeIcon icon={faUser} />
            <h3>
              Registriert: <span>User</span>
            </h3>
          </li>
          <li>
            <FontAwesomeIcon icon={faUser} />
            <h3>
              Bio: <span>User</span>
            </h3>
          </li>
          <li>
            <FontAwesomeIcon icon={faUser} />
            <h3>
              Zitat: <span>User</span>
            </h3>
          </li>
          <li>
            <FontAwesomeIcon icon={faUser} />
            <h3>
              Charakter: <span>User</span>
            </h3>
          </li>
          <li>
            <FontAwesomeIcon icon={faUser} />
            <h3>
              Schule: <span>User</span>
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

      <div className={styled.profileActiveUserModerator}>
        <div className={styled.profileActive1}>
          <div className={styled.profileActiveLeft}>
            <img src={ProfileImage} alt='' />
            <div className={styled.userActiveProfile}>
              <h3>Moderator</h3>
              <h5>Moderator</h5>
            </div>
            <div className={styled.clear}></div>
          </div>
          <div className={styled.clear}></div>
        </div>

        <div className={styled.avtiveModerator}>
          <ul>
            <li>
              <h3>Coins (in)</h3>
              <h4>0</h4>
            </li>
            <li>
              <h3>Coins (out)</h3>
              <h4>0</h4>
            </li>
            <li>
              <h3>Active Chats</h3>
              <h4>7</h4>
            </li>
            <li>
              <h3>Offline Asa</h3>
              <h4>1</h4>
            </li>
          </ul>
          <button>Ausblenden</button>
          <ul style={{ display: 'none' }}>
            <li>
              <h3>Coins (in)</h3>
              <h4>0</h4>
            </li>
            <li>
              <h3>Coins (out)</h3>
              <h4>0</h4>
            </li>
            <li>
              <h3>Active Chats</h3>
              <h4>7</h4>
            </li>
            <li>
              <h3>Offline Asa</h3>
              <h4>1</h4>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
