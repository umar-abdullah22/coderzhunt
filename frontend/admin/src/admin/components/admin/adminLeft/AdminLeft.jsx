import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from './style.module.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import MenuIcon from '../../../../assets/images/navMenu.png';
import MenuClose from '../../../../assets/images/navClose.png';

const AdminLeft = () => {
  const [open, setOpen] = React.useState(false);
  const [dashboard, setDashboard] = React.useState(false);
  const [profile, setProfile] = React.useState(false);
  const [profileMedien, setProfileMedien] = React.useState(false);
  const [spezialUser, setSpezialUser] = React.useState(false);
  const [mods, setMods] = React.useState(false);
  const [nachrichten, setNachrichten] = React.useState(false);
  const [werbung, setWerbung] = React.useState(false);
  const [zahlungen, setZahlungen] = React.useState(false);
  const [plugins, setPlugins] = React.useState(false);
  const [fakeUser, setFakeUser] = React.useState(false);
  const [subscription, setSubscription] = React.useState(false);
  const [coinManagement, setCoinManagement] = React.useState(false);
  const [gift, setGift] = React.useState(false);
  const [bonusCode, setBonusCode] = React.useState(false);
  const [moderator, setModerator] = React.useState(false);

  const [isMobileVersionVisible, setIsMobileVersionVisible] = useState(false);
  // coinManagement

  const handleClickDashboard = () => {
    setDashboard(!dashboard);
    setOpen(false);
  };
  const handleClickProfile = () => {
    setProfile(!profile);
  };
  const handleClickProfileMedien = () => {
    setProfileMedien(!profileMedien);
  };
  const handleClickSpezialUser = () => {
    setSpezialUser(!spezialUser);
  };
  const handleClickMods = () => {
    setMods(!mods);
  };
  const handleClickNachrichten = () => {
    setNachrichten(!nachrichten);
  };
  const handleClickWerbung = () => {
    setWerbung(!werbung);
  };
  const handleClickZahlungen = () => {
    setZahlungen(!zahlungen);
  };
  const handleClickPlugins = () => {
    setPlugins(!plugins);
  };
  const handleClickFakeUser = () => {
    setFakeUser(!fakeUser);
  };
  const handleClickSubscription = () => {
    setSubscription(!subscription);
  };
  const handleClickCoinManagement = () => {
    setCoinManagement(!coinManagement);
  };
  const handleClickGift = () => {
    setGift(!gift);
  };
  const handleBonusCode = () => {
    setBonusCode(!bonusCode);
  };
  const handleModerator = () => {
    setModerator(!moderator);
  };

  const toggleMobileVersion = () => {
    setIsMobileVersionVisible(!isMobileVersionVisible);
  };

  return (
    <div>
      <div className={styled.mobileVersion} onClick={toggleMobileVersion}>
        {isMobileVersionVisible ? <img src={MenuClose} alt='' /> : <img src={MenuIcon} alt='' />}
      </div>
      <div
        className={isMobileVersionVisible ? `${styled.desktopVersion}` : `${styled.mobileHidden}`}
      >
        <List>
          <ListItem
            button
            // component={Link}
            // to='/admin/admin-dashboard'
            sx={{ pl: 0, pt: 0, pb: 0 }}
          >
            <ListItemText primary='Dashboard' />
          </ListItem>

          {/* <ListItemButton onClick={handleClickDashboard} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Dashboard' />
          {dashboard ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={dashboard} timeout='auto' unmountOnExit>
          <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/admin-dashboard'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Admin Dashboard' />
              </ListItem>
            </ListItemButton>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/kampagnen-dashboard'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Kampagnen dashboard' />
              </ListItem>
            </ListItemButton>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/statistics'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Statistics' />
              </ListItem>
            </ListItemButton>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/online/moderators'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Online Moderators' />
              </ListItem>
            </ListItemButton>
          </List>
        </Collapse> */}

          {/* <ListItemButton onClick={handleClickProfile} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Profile' />
          {profile ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={profile} timeout='auto' unmountOnExit>
          <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/alle-profile'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Alle Profile' />
              </ListItem>
            </ListItemButton>
          </List>
          <List>
            <ListItemButton onClick={handleClickProfileMedien} sx={{ pl: 2, pr: 0, pt: 0, pb: 0 }}>
              <ListItemText primary='Profil Medien' />
              {profileMedien ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={profileMedien} timeout='auto' unmountOnExit>
              <List component='div' sx={{ pl: 2, pr: 0, pt: 0, pb: 0 }}>
                <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
                  <ListItem
                    button
                    component={Link}
                    to='/admin/alle-medien'
                    sx={{ pl: 2, pt: 0, pb: 0 }}
                  >
                    <ListItemText primary='Alle Medien' />
                  </ListItem>
                </ListItemButton>
                <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
                  <ListItem
                    button
                    component={Link}
                    to='/admin/ausstehende-uberprüfung'
                    sx={{ pl: 2, pt: 0, pb: 0 }}
                  >
                    <ListItemText primary='Ausstehende Überprüfung' />
                  </ListItem>
                </ListItemButton>
              </List>
            </Collapse>
          </List>

          <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/verifizierungen'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Verifizierungen' />
              </ListItem>
            </ListItemButton>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/gebannte-profile'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Gebannte Profile' />
              </ListItem>
            </ListItemButton>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/gebannteIPs'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Gebannte IPs' />
              </ListItem>
            </ListItemButton>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/gelöschte-profile'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Gelöschte Profile' />
              </ListItem>
            </ListItemButton>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/profilfragen'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Profilfragen' />
              </ListItem>
            </ListItemButton>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/account-typen'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Account Typen' />
              </ListItem>
            </ListItemButton>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/geschlechter-einstellungen'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Geschlechter Einstellungen' />
              </ListItem>
            </ListItemButton>
          </List>
        </Collapse> */}

          {/* <ListItemButton onClick={handleClickSpezialUser} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Spezialuser' />
          {spezialUser ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={spezialUser} timeout='auto' unmountOnExit>
          <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/alle-spezialuser'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Alle Spezialuser' />
              </ListItem>
            </ListItemButton>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/in-bearbeitung'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='In Bearbeitung' />
              </ListItem>
            </ListItemButton>
          </List>
        </Collapse> */}

          <ListItem button component={Link} to='/admin/statistics' sx={{ pl: 0, pt: 0, pb: 0 }}>
            <ListItemText primary='Analytics' />
          </ListItem>
          <ListItem
            button
            component={Link}
            to='/admin/online/moderators'
            sx={{ pl: 0, pt: 0, pb: 0 }}
          >
            <ListItemText primary='Online Users' />
          </ListItem>
          <ListItem button component={Link} to='/admin/user' sx={{ pl: 0, pt: 0, pb: 0 }}>
            <ListItemText primary='User' />
          </ListItem>

          <ListItemButton onClick={handleClickFakeUser} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItemText primary='FakeUser' />
            {fakeUser ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={fakeUser} timeout='auto' unmountOnExit>
            <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
              <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
                <ListItem
                  button
                  component={Link}
                  to='/admin/fake-user'
                  sx={{ pl: 2, pt: 0, pb: 0 }}
                >
                  <ListItemText primary='All Fake User' />
                </ListItem>
              </ListItemButton>
              <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
                <ListItem
                  button
                  component={Link}
                  to='/admin/create-fakeuser'
                  sx={{ pl: 2, pt: 0, pb: 0 }}
                >
                  <ListItemText primary='Create Fake user' />
                </ListItem>
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleClickCoinManagement} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItemText primary='Coin Management' />
            {coinManagement ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={coinManagement} timeout='auto' unmountOnExit>
            <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
              <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
                <ListItem
                  button
                  component={Link}
                  to='/admin/coin-management'
                  sx={{ pl: 2, pt: 0, pb: 0 }}
                >
                  <ListItemText primary='Coin Management' />
                </ListItem>
              </ListItemButton>
              <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
                <ListItem
                  button
                  component={Link}
                  to='/admin/create-coin-management'
                  sx={{ pl: 2, pt: 0, pb: 0 }}
                >
                  <ListItemText primary='Create Coin Management' />
                </ListItem>
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleClickGift} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItemText primary='Gift' />
            {gift ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={gift} timeout='auto' unmountOnExit>
            <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
              <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
                <ListItem
                  button
                  component={Link}
                  to='/admin/gift-screen'
                  sx={{ pl: 2, pt: 0, pb: 0 }}
                >
                  <ListItemText primary='All Gifts' />
                </ListItem>
              </ListItemButton>
              <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
                <ListItem
                  button
                  component={Link}
                  to='/admin/create-gift-screen'
                  sx={{ pl: 2, pt: 0, pb: 0 }}
                >
                  <ListItemText primary='Create Gift' />
                </ListItem>
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleClickSubscription} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItemText primary='Subscription' />
            {subscription ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={subscription} timeout='auto' unmountOnExit>
            <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
              <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
                <ListItem
                  button
                  component={Link}
                  to='/admin/subscription-list'
                  sx={{ pl: 2, pt: 0, pb: 0 }}
                >
                  <ListItemText primary='All Subscription' />
                </ListItem>
              </ListItemButton>
              <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
                <ListItem
                  button
                  component={Link}
                  to='/admin/create-subscription'
                  sx={{ pl: 2, pt: 0, pb: 0 }}
                >
                  <ListItemText primary='Create Subscription' />
                </ListItem>
              </ListItemButton>
            </List>
          </Collapse>

          {/* <ListItemButton onClick={handleClickMods} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Mods' />
          {mods ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={mods} timeout='auto' unmountOnExit>
          <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItem button component={Link} to='/admin/alle-mods' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='Alle Mods' />
            </ListItem>
            <ListItem button component={Link} to='/admin/alle-teams' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='Alle Teams' />
            </ListItem>
            <ListItem
              button
              component={Link}
              to='/admin/geperrte-mods'
              sx={{ pl: 2, pt: 0, pb: 0 }}
            >
              <ListItemText primary='Geperrte Mods' />
            </ListItem>
            <ListItem
              button
              component={Link}
              to='/admin/templatecheck'
              sx={{ pl: 2, pt: 0, pb: 0 }}
            >
              <ListItemText primary='Templatecheck' />
            </ListItem>
            <ListItem button component={Link} to='/admin/teamwechsel' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='Teamwechsel' />
            </ListItem>
          </List>
        </Collapse> */}

          {/* <ListItemButton onClick={handleClickNachrichten} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Nachrichten' />
          {nachrichten ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={nachrichten} timeout='auto' unmountOnExit>
          <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItem button component={Link} to='/admin/ankündigugen' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='Ankündigugen' />
            </ListItem>
            <ListItem
              button
              component={Link}
              to='/admin/auto-nachrichten'
              sx={{ pl: 2, pt: 0, pb: 0 }}
            >
              <ListItemText primary='Auto Nachrichten' />
            </ListItem>
            <ListItem
              button
              component={Link}
              to='/admin/statische-nachrichten'
              sx={{ pl: 2, pt: 0, pb: 0 }}
            >
              <ListItemText primary='Statische Nachrichten' />
            </ListItem>
            <ListItem
              button
              component={Link}
              to='/admin/multi-nachrichten'
              sx={{ pl: 2, pt: 0, pb: 0 }}
            >
              <ListItemText primary='Multi Nachrichten' />
            </ListItem>
          </List>
        </Collapse> */}

          <ListItem button component={Link} to='/admin/bulk-messages' sx={{ pl: 0, pt: 0, pb: 0 }}>
            <ListItemText primary='Bulk Messages' />
          </ListItem>

          <ListItemButton onClick={handleBonusCode} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItemText primary='Bonus codes' />
            {bonusCode ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={bonusCode} timeout='auto' unmountOnExit>
            <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
              <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
                <ListItem
                  button
                  component={Link}
                  to='/admin/bonus-codes'
                  sx={{ pl: 2, pt: 0, pb: 0 }}
                >
                  <ListItemText primary='All Bonus Code' />
                </ListItem>
              </ListItemButton>
              <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
                <ListItem
                  button
                  component={Link}
                  to='/admin/create-bonus-code'
                  sx={{ pl: 2, pt: 0, pb: 0 }}
                >
                  <ListItemText primary='Create Bonus Code' />
                </ListItem>
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleModerator} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItemText primary='Moderator' />
            {moderator ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={moderator} timeout='auto' unmountOnExit>
            <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
              <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
                <ListItem
                  button
                  component={Link}
                  to='/admin/moderator'
                  sx={{ pl: 2, pt: 0, pb: 0 }}
                >
                  <ListItemText primary='All Moderator' />
                </ListItem>
              </ListItemButton>
              <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
                <ListItem
                  button
                  component={Link}
                  to='/admin/create-moderator'
                  sx={{ pl: 2, pt: 0, pb: 0 }}
                >
                  <ListItemText primary='Create Moderator' />
                </ListItem>
              </ListItemButton>
            </List>
          </Collapse>

          {/* <ListItemButton onClick={handleClickWerbung} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Werbung' />
          {werbung ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={werbung} timeout='auto' unmountOnExit>
          <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItem
              button
              component={Link}
              to='/admin/alle-affiliates'
              sx={{ pl: 2, pt: 0, pb: 0 }}
            >
              <ListItemText primary='Alle Affiliates' />
            </ListItem>
            <ListItem
              button
              component={Link}
              to='/admin/postback-tracking'
              sx={{ pl: 2, pt: 0, pb: 0 }}
            >
              <ListItemText primary='Postback Tracking' />
            </ListItem>
          </List>
        </Collapse> */}

          {/* <ListItemButton onClick={handleClickZahlungen} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Zahlungen' />
          {zahlungen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={zahlungen} timeout='auto' unmountOnExit>
          <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItem
              button
              component={Link}
              to='/admin/alle-zahlungen'
              sx={{ pl: 2, pt: 0, pb: 0 }}
            >
              <ListItemText primary='Alle Zahlungen' />
            </ListItem>
            <ListItem
              button
              component={Link}
              to='/admin/uberweisungen'
              sx={{ pl: 2, pt: 0, pb: 0 }}
            >
              <ListItemText primary='Überweisungen' />
            </ListItem>
          </List>
        </Collapse> */}

          {/* <ListItemButton onClick={handleClickPlugins} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Plugins' />
          {plugins ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={plugins} timeout='auto' unmountOnExit>
          <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItem button component={Link} to='/admin/alle-plugins' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='All Plugins' />
            </ListItem>
            <ListItem button component={Link} to='/admin/pages' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='Pages' />
            </ListItem>

            <ListItem button component={Link} to='/admin/tools' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='Tools' />
            </ListItem>
            <ListItem
              button
              component={Link}
              to='/admin/payment-gateway'
              sx={{ pl: 2, pt: 0, pb: 0 }}
            >
              <ListItemText primary='Payment Gateway' />
            </ListItem>
            <ListItem button component={Link} to='/admin/social-auth' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='Social Auth' />
            </ListItem>
            <ListItem button component={Link} to='/admin/fake-users' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='Fake Users' />
            </ListItem>
            <ListItem button component={Link} to='/admin/software' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='Software' />
            </ListItem>
            <ListItem button component={Link} to='/admin/apps' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='Apps' />
            </ListItem>
          </List>
        </Collapse> */}
          {/* <ListItem button component={Link} to='/admin/einstellungen' sx={{ pl: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Einstellungen' />
        </ListItem> */}
          {/* <ListItem button component={Link} to='/admin/sprachen' sx={{ pl: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Sprachen' />
        </ListItem> */}
        </List>
      </div>

      <div className={styled.aboveMenu}></div>
    </div>
  );
};

export default AdminLeft;
