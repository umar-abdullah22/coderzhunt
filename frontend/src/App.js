import React from 'react';
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
import ProtectedRoutes from './users/authProtectedRoutes/ProtectedRoutes';
import AuthRoutes from './users/authProtectedRoutes/AuthRoutes';
import HomeUserInner from './users/components/homeUserInner/HomeUserInner';
import Subscription from "./users/pages/subscription/Subscription"

// Moderator
import { Home } from './moderator/pages/home/Home';
import { Moderator } from './moderator/pages/moderator/Moderator';

// Admin
import Login from './admin/pages/login/Login';
import Register from './admin/pages/register/Register';
import DashboardPage from './admin/pages/dashboard/DashboardPage';
// import DashboardPage from "./admin/pages/dashboard/DashboardPage"
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
import FakeUserPage from './admin/pages/fakeUser/FakeUserPage';
import CreateFakeUserPage from './admin/pages/createFakeUser/CreateFakeUserPage';
import AdminCreateSubscriptionPage from './admin/pages/adminCreateSubscriptionPage/AdminCreateSubscriptionPage';
import AdmimnSubscriptionPage from './admin/pages/adminSubscriptionPage/AdmimnSubscriptionPage';

//toast
import { ToastContainer } from 'react-toastify';

// Socket
import { ConnectionProvider } from './socket/SocketConnection';


function App() {
  return (
    <>
      <ToastContainer />
    {/* <ConnectionProvider> */}
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
          path='/user/profile/:id'
          element={
            <ProtectedRoutes>
              <HomeUserInner />
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
        <Route path='/user/userHome' element={<UserHome />} />
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
          path='/user/userAnnoucements/:id'
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
<Route
          path='/user/subscription'
          element={
            <ProtectedRoutes>
              <Subscription/>
            </ProtectedRoutes>
          }
        />


        
        {/* Moderator */}
        <Route path='/moderator/home' element={<Home />} />
        <Route path='/moderator/moderator' element={<Moderator />} />
        {/* <Route
          path="/"
          element={
            <AuthRoutesMod redirectLink={"/moderator/home"}>
              <Home />
            </AuthRoutesMod>
          }
        /> */}
        {/* <Route
          path="/moderator/moderator"
          element={
            <ProtectedRoutesMod>
              <Moderator />
            </ProtectedRoutesMod>
          }
        /> */}
        {/* Admin */}
        <Route path='/admin/login' element={<Login />} />
        <Route path='/admin/Register' element={<Register />} />
        {/* <Route path="/admin/login" element={<Login />} /> */}
        <Route path='/admin/Dashboard' element={<DashboardPage />} />
        <Route path='/admin/Admin-Dashboard' element={<AdminDashboardPage />} />
        <Route path='/admin/Kampagnen-dashboard' element={<KampagnenDashboardPage />} />
        <Route path='/admin/Profile' element={<ProfilesPage />} />
        <Route path='/admin/Alle-Profile' element={<AlleProfilePage />} />
        <Route path='/admin/Profil-Medien' element={<ProfilMedienPage />} />
        <Route path='/admin/Alle-Medien' element={<AlleMedienPage />} />
        <Route path='/admin/Ausstehende-Überprüfung' element={<AusstehendeÜberprüfungPage />} />
        <Route path='/admin/Verifizierungen' element={<VerifizierungenPage />} />
        <Route path='/admin/Gebannte-Profile' element={<GebannteProfilePage />} />
        <Route path='/admin/Gelöschte-Profile' element={<GelöschteProfilePage />} />
        <Route path='/admin/Profilfragen' element={<ProfilfragenPage />} />
        <Route path='/admin/Account-Typen' element={<AccountTypenPage />} />
        <Route
          path='/admin/Geschlechter-Einstellungen'
          element={<GeschlechterEinstellungenPage />}
        />
        <Route path='/admin/Profilfragen' element={<ProfilfragenPage />} />
        <Route path='/admin/Alle-Spezialuser' element={<AlleSpezialuserPage />} />
        <Route path='/admin/In-Bearbeitung' element={<InBearbeitungPage />} />
        <Route path='/admin/Mods' element={<ModsPage />} />
        <Route path='/admin/Alle-Mods' element={<AlleModsPage />} />
        <Route path='/admin/Alle-Teams' element={<AlleTeamsPage />} />
        <Route path='/admin/Geperrte-Mods' element={<GeperrteModsPage />} />
        <Route path='/admin/Templatecheck' element={<TemplatecheckPage />} />
        <Route path='/admin/Teamwechsel' element={<TeamwechselPage />} />
        <Route path='/admin/Nachrichten' element={<NachrichtenPage />} />
        <Route path='/admin/Auto-Nachrichten' element={<AutoNachrichtenPage />} />
        <Route path='/admin/Statische-Nachrichten' element={<StatischeNachrichtenPage />} />
        <Route path='/admin/Multi-Nachrichten' element={<MultiNachrichtenPage />} />
        <Route path='/admin/Mod-Galerie' element={<ModGaleriePage />} />
        <Route path='/admin/Bonus-Codes' element={<BonusCodesPage />} />
        <Route path='/admin/Werbung' element={<WerbungPage />} />
        <Route path='/admin/Alle-Affiliates' element={<AlleAffiliatesPage />} />
        <Route path='/admin/Postback-Tracking' element={<PostbackTrackingPage />} />
        <Route path='/admin/Zahlungen' element={<ZahlungenPage />} />
        <Route path='/admin/Alle-Zahlungen' element={<AlleZahlungenPage />} />
        <Route path='/admin/Überweisungen' element={<ÜberweisungenPage />} />
        <Route path='/admin/Plugins' element={<PluginsPage />} />
        <Route path='/admin/Alle-Plugins' element={<AllPluginsPage />} />
        <Route path='/admin/Pages' element={<PagesPage />} />
        <Route path='/admin/Tools' element={<ToolsPage />} />
        <Route path='/admin/Payment-Gateway' element={<PaymentGatewayPage />} />
        <Route path='/admin/Social-Auth' element={<SocialAuthPage />} />
        <Route path='/admin/Fake-Users' element={<FakeusersPage />} />
        <Route path='/admin/Software' element={<SoftwarePage />} />
        <Route path='/admin/Apps' element={<AppsPage />} />
        <Route path='/admin/Einstellungen' element={<EinstellungenPage />} />
        <Route path='/admin/Sprachen' element={<SprachenPage />} />
        <Route path='/admin/Ankündigugen' element={<AnkündigugenPage />} />
        <Route path='/admin/GebannteIPs' element={<GebannteIPsPage />} />
        <Route path='/admin/GemeldeteProfile' element={<GemeldeteProfilePage />} />
        <Route path='/admin/InBearbeitung' element={<InBearbeitungPage />} />
        <Route path='/admin/Uberweisungen' element={<UberweisungenPage />} />
        <Route path='/admin/SpezialUser' element={<SpezialUserPage />} />
        <Route path='/admin/user' element={<AdminUserList />} />

        <Route path='/admin/fake-user' element={<FakeUserPage />} />
        <Route path='/admin/create-fakeuser' element={<CreateFakeUserPage />} />

        <Route path='/admin/subscription-list' element={<AdmimnSubscriptionPage/>} />
        <Route path='/admin/create-subscription' element={<AdminCreateSubscriptionPage />} />
        
      </Routes>
      {/* </ConnectionProvider> */}
    </>
  );
}
export default App;
