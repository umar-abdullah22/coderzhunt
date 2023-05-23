// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

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
import CreateBonusCodePage from './admin/pages/createBonusCode/CreateBonusCodePage';
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
import Statistics from './admin/pages/statistics/userStatistics';
import StatisticsOnlineDetails from './admin/pages/statisticsOnline/modOnlineStats';
import StatisticsDetails from './admin/pages/statisticsDetails/userStatisticsDetails';
// import ModGaleriePage from './admin/pages/modGalerie/ModGaleriePage';
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

import CoinManagementPage from './admin/pages/coinManagementPage/CoinManagementPage';
import CoinManagementCreatedPage from './admin/pages/coinManagementCreatedPage/CoinManagementCreatedPage';

import GiftScreenPage from './admin/pages/giftScreen/GiftScreenPage';
import GiftScreenCreatePage from './admin/pages/giftScreenCreate/GiftScreenCreatePage';

import Moderator from './admin/pages/moderator/ModeratorPage';
import CreateModerator from './admin/pages/createModerator/CreateModeratorPage';

//toast
import { ToastContainer } from 'react-toastify';

// Socket
import { ConnectionProvider } from './socket/SocketConnection';
import BulkMessagesPage from './admin/pages/modGalerie/BulkMessagesPage';

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        {/* Admin */}
        {/* <Route path='/admin/login' element={<Login />} /> */}
        <Route path='/' element={<Login />} />
        <Route path='/admin/register' element={<Register />} />
        {/* <Route path="/admin/login" element={<Login />} /> */}
      </Routes>
      {/* <ConnectionProvider> */}
      <Routes>
        <Route path='/admin/dashboard' element={<DashboardPage />} />
        <Route path='/admin/admin-dashboard' element={<AdminDashboardPage />} />
        <Route path='/admin/kampagnen-dashboard' element={<KampagnenDashboardPage />} />
        <Route path='/admin/statistics' element={<Statistics />} />
        <Route path='/admin/online/moderators' element={<StatisticsOnlineDetails />} />
        <Route path='/admin/statistics/details' element={<StatisticsDetails />} />
        <Route path='/admin/profile' element={<ProfilesPage />} />
        <Route path='/admin/alle-profile' element={<AlleProfilePage />} />
        <Route path='/admin/profil-medien' element={<ProfilMedienPage />} />
        <Route path='/admin/alle-medien' element={<AlleMedienPage />} />
        <Route path='/admin/ausstehende-uberprüfung' element={<AusstehendeÜberprüfungPage />} />
        <Route path='/admin/verifizierungen' element={<VerifizierungenPage />} />
        <Route path='/admin/gebannte-profile' element={<GebannteProfilePage />} />
        <Route path='/admin/gelöschte-profile' element={<GelöschteProfilePage />} />
        <Route path='/admin/profilfragen' element={<ProfilfragenPage />} />
        <Route path='/admin/account-typen' element={<AccountTypenPage />} />
        <Route
          path='/admin/geschlechter-einstellungen'
          element={<GeschlechterEinstellungenPage />}
        />
        <Route path='/admin/profilfragen' element={<ProfilfragenPage />} />
        <Route path='/admin/alle-spezialuser' element={<AlleSpezialuserPage />} />
        <Route path='/admin/in-bearbeitung' element={<InBearbeitungPage />} />
        <Route path='/admin/mods' element={<ModsPage />} />
        <Route path='/admin/alle-mods' element={<AlleModsPage />} />
        <Route path='/admin/alle-teams' element={<AlleTeamsPage />} />
        <Route path='/admin/geperrte-mons' element={<GeperrteModsPage />} />
        <Route path='/admin/templatecheck' element={<TemplatecheckPage />} />
        <Route path='/admin/teamwechsel' element={<TeamwechselPage />} />
        <Route path='/admin/nachrichten' element={<NachrichtenPage />} />
        <Route path='/admin/auto-nachrichten' element={<AutoNachrichtenPage />} />
        <Route path='/admin/statische-nachrichten' element={<StatischeNachrichtenPage />} />
        <Route path='/admin/multi-nachrichten' element={<MultiNachrichtenPage />} />
        {/* <Route path='/admin/mod-galerie' element={<ModGaleriePage />} /> */}
        <Route path='/admin/bulk-messages' element={<BulkMessagesPage />} />
        <Route path='/admin/werbung' element={<WerbungPage />} />
        <Route path='/admin/alle-affiliates' element={<AlleAffiliatesPage />} />
        <Route path='/admin/postback-tracking' element={<PostbackTrackingPage />} />
        <Route path='/admin/zahlungen' element={<ZahlungenPage />} />
        <Route path='/admin/alle-zahlungen' element={<AlleZahlungenPage />} />
        <Route path='/admin/uberweisungen' element={<ÜberweisungenPage />} />
        <Route path='/admin/plugins' element={<PluginsPage />} />
        <Route path='/admin/alle-plugins' element={<AllPluginsPage />} />
        <Route path='/admin/pages' element={<PagesPage />} />
        <Route path='/admin/tools' element={<ToolsPage />} />
        <Route path='/admin/payment-gateway' element={<PaymentGatewayPage />} />
        <Route path='/admin/social-auth' element={<SocialAuthPage />} />
        <Route path='/admin/fake-users' element={<FakeusersPage />} />
        <Route path='/admin/software' element={<SoftwarePage />} />
        <Route path='/admin/apps' element={<AppsPage />} />
        <Route path='/admin/einstellungen' element={<EinstellungenPage />} />
        <Route path='/admin/sprachen' element={<SprachenPage />} />
        <Route path='/admin/ankündigugen' element={<AnkündigugenPage />} />
        <Route path='/admin/gebannteIPs' element={<GebannteIPsPage />} />
        <Route path='/admin/gemeldeteProfile' element={<GemeldeteProfilePage />} />
        <Route path='/admin/inBearbeitung' element={<InBearbeitungPage />} />
        <Route path='/admin/uberweisungen' element={<UberweisungenPage />} />
        <Route path='/admin/spezialUser' element={<SpezialUserPage />} />
        <Route path='/admin/user' element={<AdminUserList />} />

        <Route path='/admin/fake-user' element={<FakeUserPage />} />
        <Route path='/admin/create-fakeuser' element={<CreateFakeUserPage />} />

        <Route path='/admin/subscription-list' element={<AdmimnSubscriptionPage />} />
        <Route path='/admin/create-subscription' element={<AdminCreateSubscriptionPage />} />

        <Route path='/admin/coin-management' element={<CoinManagementPage />} />
        <Route path='/admin/create-coin-management' element={<CoinManagementCreatedPage />} />

        <Route path='/admin/gift-screen' element={<GiftScreenPage />} />
        <Route path='/admin/create-gift-screen' element={<GiftScreenCreatePage />} />

        <Route path='/admin/bonus-codes' element={<BonusCodesPage />} />
        <Route path='/admin/create-bonus-code' element={<CreateBonusCodePage />} />

        <Route path='/admin/moderator' element={<Moderator />} />
        <Route path='/admin/create-moderator' element={<CreateModerator />} />
      </Routes>
      {/* </ConnectionProvider> */}
    </>
  );
}

export default App;
