
import HomeIcon from '@mui/icons-material/Home';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Home]: {
    component: asyncComponentLoader(() => import('@/pages/Home')),
    path: '/',
    title: 'Home',
    icon: HomeIcon,
  },
  [Pages.Monitoring]: {
    component: asyncComponentLoader(() => import('@/pages/Monitoring')),
    path: '/monitoring',
    title: 'Monitoring',
    icon: HomeIcon,
  },
  [Pages.Chat]: {
    component: asyncComponentLoader(() => import('@/pages/Chat')),
    path: '/chat',
    title: 'Chat',
    icon: HomeIcon,
  },
  [Pages.Stock]: {
    component: asyncComponentLoader(() => import('@/pages/Stock')),
    path: '/stock',
    title: 'Stock',
    icon: HomeIcon,
  },
  [Pages.Benchmark]: {
    component: asyncComponentLoader(() => import('@/pages/Benchmark')),
    path: '/benchmark',
    title: 'Benchmark',
    icon: HomeIcon,
  },
  [Pages.Test]: {
    component: asyncComponentLoader(() => import('@/pages/Test')),
    path: '/test',
    title: 'Test',
    icon: HomeIcon,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
