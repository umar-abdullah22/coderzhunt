import React from 'react';
import { Link } from 'react-router-dom';
import styled from './style.module.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

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

  


  const handleClickDashboard = () => {
    setDashboard(!open);
    setOpen(false)
  };
  const handleClickProfile = () => {
    setProfile(!open);
  };
  const handleClickProfileMedien = () => {
    setProfileMedien(!open);
  };
  const handleClickSpezialUser = () => {
    setSpezialUser(!open);
  };
  const handleClickMods = () => {
    setMods(!open);
  };
  const handleClickNachrichten = () => {
    setNachrichten(!open);
  };
  const handleClickWerbung = () => {
    setWerbung(!open);
  };
  const handleClickZahlungen = () => {
    setZahlungen(!open);
  };
  const handleClickPlugins = () => {
    setPlugins(!open);
  };
  const handleClickFakeUser = () => {
    setFakeUser(!open);
  };
  const handleClickSubscription = () => {
    setSubscription(!open);
  };

  return (
    <div>
      <List>
        <ListItemButton onClick={handleClickDashboard} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Dashboard' />
          {dashboard ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={dashboard} timeout='auto' unmountOnExit>
          <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/Admin-Dashboard'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Admin Dashboard' />
              </ListItem>
            </ListItemButton>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/Kampagnen-Dashboard'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Kampagnen dashboard' />
              </ListItem>
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={handleClickProfile} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Profile' />
          {profile ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={profile} timeout='auto' unmountOnExit>
          <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/Alle-Profile'
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
                    to='/admin/Alle-Medien'
                    sx={{ pl: 2, pt: 0, pb: 0 }}
                  >
                    <ListItemText primary='Alle Medien' />
                  </ListItem>
                </ListItemButton>
                <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
                  <ListItem
                    button
                    component={Link}
                    to='/admin/Ausstehende-Überprüfung'
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
                to='/admin/Verifizierungen'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Verifizierungen' />
              </ListItem>
            </ListItemButton>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/Gebannte-Profile'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Gebannte Profile' />
              </ListItem>
            </ListItemButton>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/GebannteIPs'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Gebannte IPs' />
              </ListItem>
            </ListItemButton>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/Gelöschte-Profile'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Gelöschte Profile' />
              </ListItem>
            </ListItemButton>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/Profilfragen'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Profilfragen' />
              </ListItem>
            </ListItemButton>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/Account-Typen'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Account Typen' />
              </ListItem>
            </ListItemButton>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/Geschlechter-Einstellungen'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Geschlechter Einstellungen' />
              </ListItem>
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={handleClickSpezialUser} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Spezialuser' />
          {spezialUser ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={spezialUser} timeout='auto' unmountOnExit>
          <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/Alle-Spezialuser'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='Alle Spezialuser' />
              </ListItem>
            </ListItemButton>
            <ListItemButton sx={{ pl: 0, pt: 0, pb: 0 }}>
              <ListItem
                button
                component={Link}
                to='/admin/In-Bearbeitung'
                sx={{ pl: 2, pt: 0, pb: 0 }}
              >
                <ListItemText primary='In Bearbeitung' />
              </ListItem>
            </ListItemButton>
          </List>
        </Collapse>

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

















        <ListItemButton onClick={handleClickMods} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Mods' />
          {mods ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={mods} timeout='auto' unmountOnExit>
          <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItem button component={Link} to='/admin/Alle-Mods' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='Alle Mods' />
            </ListItem>
            <ListItem button component={Link} to='/admin/Alle-Teams' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='Alle Teams' />
            </ListItem>
            <ListItem
              button
              component={Link}
              to='/admin/Geperrte-Mods'
              sx={{ pl: 2, pt: 0, pb: 0 }}
            >
              <ListItemText primary='Geperrte Mods' />
            </ListItem>
            <ListItem
              button
              component={Link}
              to='/admin/Templatecheck'
              sx={{ pl: 2, pt: 0, pb: 0 }}
            >
              <ListItemText primary='Templatecheck' />
            </ListItem>
            <ListItem button component={Link} to='/admin/Teamwechsel' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='Teamwechsel' />
            </ListItem>
          </List>
        </Collapse>

        <ListItemButton onClick={handleClickNachrichten} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Nachrichten' />
          {nachrichten ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={nachrichten} timeout='auto' unmountOnExit>
          <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItem button component={Link} to='/admin/Ankündigugen' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='Ankündigugen' />
            </ListItem>
            <ListItem
              button
              component={Link}
              to='/admin/Auto-Nachrichten'
              sx={{ pl: 2, pt: 0, pb: 0 }}
            >
              <ListItemText primary='Auto Nachrichten' />
            </ListItem>
            <ListItem
              button
              component={Link}
              to='/admin/Statische-Nachrichten'
              sx={{ pl: 2, pt: 0, pb: 0 }}
            >
              <ListItemText primary='Statische Nachrichten' />
            </ListItem>
            <ListItem
              button
              component={Link}
              to='/admin/Multi-Nachrichten'
              sx={{ pl: 2, pt: 0, pb: 0 }}
            >
              <ListItemText primary='Multi Nachrichten' />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button component={Link} to='/admin/Mod-Galerie' sx={{ pl: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Mod Galerie' />
        </ListItem>
        <ListItem button component={Link} to='/admin/Bonus-Codes' sx={{ pl: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Bonus codes' />
        </ListItem>

        <ListItemButton onClick={handleClickWerbung} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Werbung' />
          {werbung ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={werbung} timeout='auto' unmountOnExit>
          <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItem
              button
              component={Link}
              to='/admin/Alle-Affiliates'
              sx={{ pl: 2, pt: 0, pb: 0 }}
            >
              <ListItemText primary='Alle Affiliates' />
            </ListItem>
            <ListItem
              button
              component={Link}
              to='/admin/Postback-Tracking'
              sx={{ pl: 2, pt: 0, pb: 0 }}
            >
              <ListItemText primary='Postback Tracking' />
            </ListItem>
          </List>
        </Collapse>

        <ListItemButton onClick={handleClickZahlungen} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Zahlungen' />
          {zahlungen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={zahlungen} timeout='auto' unmountOnExit>
          <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItem
              button
              component={Link}
              to='/admin/Alle-Zahlungen'
              sx={{ pl: 2, pt: 0, pb: 0 }}
            >
              <ListItemText primary='Alle Zahlungen' />
            </ListItem>
            <ListItem
              button
              component={Link}
              to='/admin/Überweisungen'
              sx={{ pl: 2, pt: 0, pb: 0 }}
            >
              <ListItemText primary='Überweisungen' />
            </ListItem>
          </List>
        </Collapse>

        <ListItemButton onClick={handleClickPlugins} sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Plugins' />
          {plugins ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={plugins} timeout='auto' unmountOnExit>
          <List component='div' sx={{ pl: 0, pr: 0, pt: 0, pb: 0 }}>
            <ListItem button component={Link} to='/admin/Alle-Plugins' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='All Plugins' />
            </ListItem>
            <ListItem button component={Link} to='/admin/Pages' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='Pages' />
            </ListItem>

            <ListItem button component={Link} to='/admin/Tools' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='Tools' />
            </ListItem>
            <ListItem
              button
              component={Link}
              to='/admin/Payment-Gateway'
              sx={{ pl: 2, pt: 0, pb: 0 }}
            >
              <ListItemText primary='Payment Gateway' />
            </ListItem>
            <ListItem button component={Link} to='/admin/Social-Auth' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='Social Auth' />
            </ListItem>
            <ListItem button component={Link} to='/admin/Fake-Users' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='Fake Users' />
            </ListItem>
            <ListItem button component={Link} to='/admin/Software' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='Software' />
            </ListItem>
            <ListItem button component={Link} to='/admin/Apps' sx={{ pl: 2, pt: 0, pb: 0 }}>
              <ListItemText primary='Apps' />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button component={Link} to='/admin/Einstellungen' sx={{ pl: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Einstellungen' />
        </ListItem>
        <ListItem button component={Link} to='/admin/Sprachen' sx={{ pl: 0, pt: 0, pb: 0 }}>
          <ListItemText primary='Sprachen' />
        </ListItem>
      </List>

      <div className={styled.aboveMenu}></div>
    </div>
  );
};

export default AdminLeft;
