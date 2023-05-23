import { Routes, Route } from 'react-router-dom';

// Users
import User from './users/pages/user/User';
import Setting from './users/pages/setting/Setting';
import Profile from './users/pages/profile/Profile';
import ProfileVisit from './users/pages/userProfileVisior/ProfileVisit';
import UserHome from './users/pages/userHome/UserHome';
import UserFavourites from './users/pages/userFavourites/UserFavourites';
import UserAnnoucements from './users/pages/userAnnoucements/UserAnnoucements';
import UserMainRegister from './users/pages/userMainRegister/UserMainRegister';
import DataProtection from './users/pages/dataprotaction/DataProtection';
import TermOfUse from './users/pages/termofuse/TermOfUse';
import Imprint from './users/pages/imprint/Imprint';

// Moderator
import { Home } from './moderator/pages/home/Home';
import { Moderator } from './moderator/pages/moderator/Moderator';

// Admin
import Login from './admin/pages/login/Login';
import Register from './admin/pages/register/Register';
import DashboardPage from './admin/pages/dashboard/DashboardPage';
import AdminDashboardPage from './admin/pages/adminDashboard/AdminDashboardPage';
import AccountTypenPage from './admin/pages/accountTypen/AccountTypenPage';
import AlleAffiliatesPage from './admin/pages/alleAffiliates/AlleAffiliatesPage';
import AlleMedienPage from './admin/pages/alleMedien/AlleMedienPage]';
import AlleModsPage from './admin/pages/alleMods/AlleModsPage';
import AlleProfilePage from './admin/pages/alleProfile/AlleProfilePage';
import AlleSpezialuserPage from './admin/pages/alleSpezialuser/AlleSpezialuserPage';
import AlleTeamsPage from './admin/pages/alleTeams/AlleTeamsPage';
import AlleZahlungenPage from './admin/pages/alleZahlungen/AlleZahlungenPage';
import AllPluginsPage from './admin/pages/allPlugins/AllPluginsPage';
import AnkündigugenPage from './admin/pages/ankündigugen/AnkündigugenPage';
import AppsPage from './admin/pages/apps/AppsPage';
import AusstehendeÜberprüfungPage from './admin/pages/ausstehendeÜberprüfung/AusstehendeÜberprüfungPage';
import AutoNachrichtenPage from './admin/pages/autoNachrichten/AutoNachrichtenPage';
import BonusCodesPage from './admin/pages/bonusCodes/BonusCodesPage';
import EinstellungenPage from './admin/pages/einstellungen/EinstellungenPage';
import FakeusersPage from './admin/pages/fakeUsers/FakeusersPage';
import GebannteIPsPage from './admin/pages/gebannteIPs/GebannteIPsPage';
import GebannteProfilePage from './admin/pages/gebannteProfile/GebannteProfilePage';
import GelöschteProfilePage from './admin/pages/gelöschteProfile/GelöschteProfilePage';
import GemeldeteProfilePage from './admin/pages/gemeldeteProfile/GemeldeteProfilePage';
import GeperrteModsPage from './admin/pages/geperrteMods/GeperrteModsPage';
import GeschlechterEinstellungenPage from './admin/pages/geschlechterEinstellungen/GeschlechterEinstellungenPage';
import InBearbeitungPage from './admin/pages/inBearbeitung/InBearbeitungPage';
import KampagnenDashboardPage from './admin/pages/kampagnenDashboard/KampagnenDashboardPage';
import ModGaleriePage from './admin/pages/modGalerie/ModGaleriePage';
import ModsPage from './admin/pages/mods/ModsPage';
import MultiNachrichtenPage from './admin/pages/multiNachrichten/MultiNachrichtenPage';
import NachrichtenPage from './admin/pages/nachrichten/NachrichtenPage';
import PagesPage from './admin/pages/pages/PagesPage';
import PaymentGatewayPage from './admin/pages/paymentGateway/PaymentGatewayPage';
import PluginsPage from './admin/pages/plugins/PluginsPage';
import PostbackTrackingPage from './admin/pages/postbackTracking/PostbackTrackingPage';
import ProfilesPage from './admin/pages/profiles/ProfilesPage';
import ProfilfragenPage from './admin/pages/profilfragen/ProfilfragenPage';
import ProfilMedienPage from './admin/pages/profilMedien/ProfilMedienPage';
import SocialAuthPage from './admin/pages/socialAuth/SocialAuthPage';
import SoftwarePage from './admin/pages/software/SoftwarePage';
import SpezialUserPage from './admin/pages/spezialuser/SpezialUserPage';
import SprachenPage from './admin/pages/sprachen/SprachenPage';
import StatischeNachrichtenPage from './admin/pages/statischeNachrichten/StatischeNachrichtenPage';
import TeamwechselPage from './admin/pages/teamwechsel/TeamwechselPage';
import TemplatecheckPage from './admin/pages/templatecheck/TemplateCheckPage';
import ToolsPage from './admin/pages/tools/ToolsPage';
import UberweisungenPage from './admin/pages/uberweisungen/UberweisungenPage';
import VerifizierungenPage from './admin/pages/verifizierungen/VerifizierungenPage';
import WerbungPage from './admin/pages/werbung/WerbungPage';
import ZahlungenPage from './admin/pages/zahlungen/ZahlungenPage';
import ÜberweisungenPage from './admin/pages/uberweisungen/UberweisungenPage';
import AdminUserList from './admin/pages/adminUserList/AdminUserListPage';

import { ToastContainer } from 'react-toastify';
// user
import ProtectedRoutes from './users/authProtectedRoutes/ProtectedRoutes';
import AuthRoutes from './users/authProtectedRoutes/AuthRoutes';
// moderator
import ProtectedRoutesMod from './moderator/authProtectedRoutes/ProtectedRoutesMod';
import AuthRoutesMod from './moderator/authProtectedRoutes/AuthRoutesMod';
// admin
import ProtectedRoutesAdmin from './admin/authProtectedRoutes/ProtectedRoutesAdmin';
import AuthRoutesAdmin from './admin/authProtectedRoutes/AuthRoutesAdmin';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Users */}
        <Route
          path='/'
          element={
            <AuthRoutes redirectLink={'/user/userHome'}>
              <UserMainRegister />
            </AuthRoutes>
          }
        />
        <Route
          path='/users/user'
          element={
            <ProtectedRoutes>
              <User />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/user/setting'
          element={
            <ProtectedRoutes>
              <Setting />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/user/profile'
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/user/userProfileVisior'
          element={
            <ProtectedRoutes>
              <ProfileVisit />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/user/userHome'
          element={
            <ProtectedRoutes>
              <UserHome />
            </ProtectedRoutes>
          }
        />
        \
        <Route
          path='/user/userFavourites'
          element={
            <ProtectedRoutes>
              <UserFavourites />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/user/userAnnoucements'
          element={
            <ProtectedRoutes>
              <UserAnnoucements />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/user/data-protection'
          element={
            <ProtectedRoutes>
              <DataProtection />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/user/term-of-use'
          element={
            <ProtectedRoutes>
              <TermOfUse />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/user/imprint'
          element={
            <ProtectedRoutes>
              <Imprint />
            </ProtectedRoutes>
          }
        />
        {/* Moderator */}
        <Route
          path='/moderator/home'
          element={
            <AuthRoutesMod redirectLink={'/moderator/home'}>
              <Home />
            </AuthRoutesMod>
          }
        />
        <Route
          path='/moderator/moderator'
          element={
            <ProtectedRoutesMod>
              <Moderator />
            </ProtectedRoutesMod>
          }
        />
        {/* Admin */}
        <Route
          path='/'
          element={
            <AuthRoutesAdmin redirectLink={'/admin/Login'}>
              <Login />
            </AuthRoutesAdmin>
          }
        />
        <Route
          path='/'
          element={
            <ProtectedRoutesAdmin>
              <Register />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Dashboard'
          element={
            <ProtectedRoutesAdmin>
              <DashboardPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Admin-Dashboard'
          element={
            <ProtectedRoutesAdmin>
              <AdminDashboardPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Kampagnen-dashboard'
          element={
            <ProtectedRoutesAdmin>
              <KampagnenDashboardPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Profile'
          element={
            <ProtectedRoutesAdmin>
              <ProfilesPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Alle-Profile'
          element={
            <ProtectedRoutesAdmin>
              <AlleProfilePage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Profil-Medien'
          element={
            <ProtectedRoutesAdmin>
              <ProfilMedienPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Alle-Medien'
          element={
            <ProtectedRoutesAdmin>
              <AlleMedienPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Ausstehende-Überprüfung'
          element={
            <ProtectedRoutesAdmin>
              <AusstehendeÜberprüfungPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Verifizierungen'
          element={
            <ProtectedRoutesAdmin>
              <VerifizierungenPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Verifizierungen'
          element={
            <ProtectedRoutesAdmin>
              <VerifizierungenPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Gebannte-Profile'
          element={
            <ProtectedRoutesAdmin>
              <GebannteProfilePage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Gelöschte-Profile'
          element={
            <ProtectedRoutesAdmin>
              <GelöschteProfilePage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Profilfragen'
          element={
            <ProtectedRoutesAdmin>
              <ProfilfragenPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Account-Typen'
          element={
            <ProtectedRoutesAdmin>
              <AccountTypenPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Geschlechter-Einstellungen'
          element={
            <ProtectedRoutesAdmin>
              <GeschlechterEinstellungenPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Alle-Spezialuser'
          element={
            <ProtectedRoutesAdmin>
              <AlleSpezialuserPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/In-Bearbeitung'
          element={
            <ProtectedRoutesAdmin>
              <InBearbeitungPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Mods'
          element={
            <ProtectedRoutesAdmin>
              <ModsPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Alle-Mods'
          element={
            <ProtectedRoutesAdmin>
              <AlleModsPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Alle-Teams'
          element={
            <ProtectedRoutesAdmin>
              <AlleTeamsPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Geperrte-Mods'
          element={
            <ProtectedRoutesAdmin>
              <GeperrteModsPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Templatecheck'
          element={
            <ProtectedRoutesAdmin>
              <TemplatecheckPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Teamwechsel'
          element={
            <ProtectedRoutesAdmin>
              <TeamwechselPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Nachrichten'
          element={
            <ProtectedRoutesAdmin>
              <NachrichtenPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Auto-Nachrichten'
          element={
            <ProtectedRoutesAdmin>
              <AutoNachrichtenPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Statische-Nachrichten'
          element={
            <ProtectedRoutesAdmin>
              <StatischeNachrichtenPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Multi-Nachrichten'
          element={
            <ProtectedRoutesAdmin>
              <MultiNachrichtenPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Mod-Galerie'
          element={
            <ProtectedRoutesAdmin>
              <ModGaleriePage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Bonus-Codes'
          element={
            <ProtectedRoutesAdmin>
              <BonusCodesPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Werbung'
          element={
            <ProtectedRoutesAdmin>
              <WerbungPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Alle-Affiliates'
          element={
            <ProtectedRoutesAdmin>
              <AlleAffiliatesPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Postback-Tracking'
          element={
            <ProtectedRoutesAdmin>
              <PostbackTrackingPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Zahlungen'
          element={
            <ProtectedRoutesAdmin>
              <ZahlungenPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Alle-Zahlungen'
          element={
            <ProtectedRoutesAdmin>
              <AlleZahlungenPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Plugins'
          element={
            <ProtectedRoutesAdmin>
              <PluginsPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Alle-Plugins'
          element={
            <ProtectedRoutesAdmin>
              <AllPluginsPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Pages'
          element={
            <ProtectedRoutesAdmin>
              <PagesPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Tools'
          element={
            <ProtectedRoutesAdmin>
              <ToolsPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Payment-Gateway'
          element={
            <ProtectedRoutesAdmin>
              <PaymentGatewayPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Social-Auth'
          element={
            <ProtectedRoutesAdmin>
              <SocialAuthPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Fake-Users'
          element={
            <ProtectedRoutesAdmin>
              <FakeusersPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Software'
          element={
            <ProtectedRoutesAdmin>
              <SoftwarePage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Apps'
          element={
            <ProtectedRoutesAdmin>
              <AppsPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Einstellungen'
          element={
            <ProtectedRoutesAdmin>
              <EinstellungenPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Sprachen'
          element={
            <ProtectedRoutesAdmin>
              <SprachenPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Ankündigugen'
          element={
            <ProtectedRoutesAdmin>
              <AnkündigugenPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/GebannteIPs'
          element={
            <ProtectedRoutesAdmin>
              <GebannteIPsPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/GemeldeteProfile'
          element={
            <ProtectedRoutesAdmin>
              <GemeldeteProfilePage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/InBearbeitung'
          element={
            <ProtectedRoutesAdmin>
              <InBearbeitungPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/Uberweisungen'
          element={
            <ProtectedRoutesAdmin>
              <UberweisungenPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/SpezialUser'
          element={
            <ProtectedRoutesAdmin>
              <SpezialUserPage />
            </ProtectedRoutesAdmin>
          }
        />
        <Route
          path='/admin/user'
          element={
            <ProtectedRoutesAdmin>
              <AdminUserList />
            </ProtectedRoutesAdmin>
          }
        />
      </Routes>
    </>
  );
}
export default App;
