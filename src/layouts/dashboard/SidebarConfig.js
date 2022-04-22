import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import amazon from '@iconify/icons-ant-design/amazon';
import fileTextFill from '@iconify/icons-eva/file-text-fill';

import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'connect',
    path: '/dashboard/connect',
    icon: getIcon(amazon)
  },
  {
    title: 'Orders',
    path: '/dashboard/orders',
    icon: getIcon(peopleFill)
  },
  {
    title: 'explore',
    path: '/dashboard/explore',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'home',
    path: '/dashboard/home',
    icon: getIcon(lockFill)
  },
  {
    title: 'product',
    path: '/dashboard/product',
    icon: getIcon(personAddFill)
  },
  {
    title: 'categories',
    path: '/dashboard/categories',
    icon: getIcon(alertTriangleFill)
  }
];

export default sidebarConfig;
