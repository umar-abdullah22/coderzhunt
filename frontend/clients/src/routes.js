import { Navigate, useRoutes } from 'react-router-dom';

import UserMainRegister from '../src/users/pages/userMainRegister/UserMainRegister';
// import User from '../src/users/pages/User/User.jsx';
import Page404 from '../src/users/pages/page404/Page404';
// import Setting from '../src/users/pages/Setting/Setting';
import Profile from '../src/users/pages/profile/Profile';
import UserHome from '../src/users/pages/userHome/UserHome';
import PaymentStripe from './users/components/paymentStripe/PaymentStripe';
import ProfileVisit from '../src/users/pages/userProfileVisior/ProfileVisit';
import UserFavourites from '../src/users/pages/userFavourites/UserFavourites';
import UserAnnoucements from '../src/users/pages/userAnnoucements/UserAnnoucements';
import DataProtection from '../src/users/pages//dataprotaction/DataProtection';
import TermOfUse from '../src/users/pages/termofuse/TermOfUse';
import Imprint from '../src/users/pages/imprint/Imprint';
import Subscription from '../src/users/pages/subscription/Subscription';
import Subscriptionpurchased from '../src/users/pages/subscriptionPurchased/Subscription';
import FQA from '../src/users/pages/fqa/FQA';
import ContactSupport from '../src/users/pages/contactSupport/ContactSupport';
import PaymentMethodScreen from '../src/users/pages/paymentScreen/PaymentScreen';
import RandomUser from '../src/users/pages/randomUsers/RandomUser';
import BlockPage from '../src/users/pages/blockPage/BlockPage';
// import ProtectedRoutes from './users/authProtectedRoutes/ProtectedRoutes';
// import AuthRoutes from './users/authProtectedRoutes/AuthRoutes';
import HomeUserInner from './users/components/homeUserInner/HomeUserInner';
import PageWrapper from './users/components/userLeftContent/UserLeftContent';
import { useUser } from './providers/useUser';
import UserMainSocialRegister from './users/components/userMainRegister/UserMainSocialRegister';
import PaymentPayPal from './users/components/paymentPayPal/PaymentPayPal';
// ----------------------------------------------------------------------

export default function Router() {
  const { token } = useUser();
  const routes = useRoutes([
    {
      path: '/login',
      element: <UserMainRegister />,
    },
    {
      path: '/userSocialRegister',
      element: <UserMainSocialRegister />,
    },
    {
      path: '/imprint',
      element: <Imprint />,
    },
    {
      path: '/data-protection',
      element: <DataProtection />,
    },
    {
      path: '/term-of-use',
      element: <TermOfUse />,
    },
    {
      element: <PageWrapper />,
      children: [
        // { path: 'imprint', element: <Imprint /> },
        // { path: 'data-protection', element: <DataProtection /> },
        // { path: 'term-of-use', element: <TermOfUse /> },
        { path: '/', element: <UserMainRegister /> },
        { element: token === null ? <UserMainRegister /> : <UserHome /> },
        { path: 'userHome', element: <UserHome /> },
        { path: 'paymentStripe', element: <PaymentStripe /> },
        { path: 'paymentPayPal', element: <PaymentPayPal /> },
        { path: 'userAnnoucements', element: <UserAnnoucements /> },
        { path: 'userFavourites', element: <UserFavourites /> },
        { path: 'userProfileVisior', element: <ProfileVisit /> },
        { path: 'subscription', element: <Subscription /> },
        { path: 'subscriptionpurchased', element: <Subscriptionpurchased /> },
        { path: 'profile', element: <Profile /> },
        { path: 'profile/:id', element: <HomeUserInner /> },
        { path: 'block-members', element: <BlockPage /> },
        { path: 'fqa', element: <FQA /> },
        { path: 'contact-support', element: <ContactSupport /> },
        { path: 'payment-method-screen', element: <PaymentMethodScreen /> },
        { path: 'random-user', element: <RandomUser /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to='/404' replace />,
    },
    {
      path: '/logout',
      element: <UserMainRegister />,
    },
  ]);

  return routes;
}
