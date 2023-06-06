import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Masteradmin',
    path: '/admin',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text pcoded-hasmenu',
    child: 1,
    submenu: [

      {
        title: 'User',
        path: '/admin/user',
      },
      {
        title: 'Vendor',
        path: '/admin/vendor',
      },
      
      {
        title: 'Roles',
        path: '/admin/roles',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text',
        child: 0,
        submenu: []
      },
      {
        title: 'Permission',
        path: '/admin/permission',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text',
        child: 0,
        submenu: []
      },

    ]
  },




  {
    title: 'Material',
    path: '/admin',
    icon: <AiIcons.AiFillProject />,
    cName: 'nav-text pcoded-hasmenu',
    child: 1,
    submenu: [

      {
        title: 'Add Material',
        path: '/add_material',
        icon: <AiIcons.AiFillUnlock />,
        cName: 'nav-text',
        child: 0,
        submenu: []
      },
      {
        title: 'Show Material',
        path: '/show_material',
        icon: <AiIcons.AiFillUnlock />,
        cName: 'nav-text',
        child: 0,
        submenu: []
      },


    ]
  },




  {
    title: 'Inventory',
    path: '/admin',
    icon: <AiIcons.AiFillShop />,
    cName: 'nav-text pcoded-hasmenu',
    child: 1,
    submenu: [
      {
        title: 'Add Inventory',
        path: '/AddInventory',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text',
        child: 0,
        submenu: []
      },


      {
        title: 'Show Inventory',
        path: '/ShowInventory',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text',
        child: 0,
        submenu: []
      },

    ]
  },



  {
    title: 'Project',
    // path: '/admin',
    icon: <AiIcons.AiFillProject />,
    cName: 'nav-text pcoded-hasmenu',
    child: 1,
    submenu: [

      {
        title: 'Incoming BOQ',
        path: '/incoming_boq',
      },

    ]
  },

  {
    title: 'Example',
    path: '/example',
    icon: <AiIcons.AiFillUnlock />,
    cName: 'nav-text',
    child: 1,
    submenu: [
      {
        title: 'Login',
        path: '/login',
        icon: <AiIcons.AiFillUnlock />,
        cName: 'nav-text',
      },
      {
        title: 'Sign Up',
        path: '/sign_up',
        icon: <AiIcons.AiFillUnlock />,
        cName: 'nav-text',
      },

      {
        title: 'Modal',
        path: '/modal',
        icon: <AiIcons.AiFillUnlock />,
        cName: 'nav-text',

      },
      {
        title: 'Demo',
        path: '/demo',
        icon: <AiIcons.AiFillUnlock />,
        cName: 'nav-text',
      },
      {
        title: 'Swagger',
        path: '/swagger',
        icon: <AiIcons.AiFillUnlock />,
        cName: 'nav-text',
      },
      {
        title: 'datatable',
        path: '/datatable',
        icon: <AiIcons.AiFillUnlock />,
        cName: 'nav-text',
      },
    ]
  }

];
