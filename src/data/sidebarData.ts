import { createElement } from 'react';
import { FaSchool, FaTasks } from 'react-icons/fa';

export const sidebarData = [
   {
      name: 'subjects',
      icon: createElement(FaSchool),
   },
   {
      name: 'tasks',
      icon: createElement(FaTasks),
   },
];
