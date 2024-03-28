import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

export const AdminSidebar = () => {
 return (

    <>
<Card className="h-screen md:h-[calc(100vh-2rem)] w-full md:max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5"  placeholder={undefined}>
  <List  placeholder={undefined}>
    <Link to={'/admin'}>
      <ListItem className='text-black'  placeholder={undefined}>
        <ListItemPrefix  placeholder={undefined}>
          <PresentationChartBarIcon className="h-5 w-5" />
        </ListItemPrefix>
        Dashboard
      </ListItem>
    </Link>
    <Link to={'/admin/category'}>
      <ListItem className='text-black'  placeholder={undefined}>
        <ListItemPrefix  placeholder={undefined}>
          <ShoppingBagIcon className="h-5 w-5" />
        </ListItemPrefix>
        Category Management
      </ListItem>
    </Link>
    <Link to={'/admin/studentList'}>
      <ListItem className='text-black'  placeholder={undefined}>
        <ListItemPrefix  placeholder={undefined}>
          <UserCircleIcon className="h-5 w-5" />
        </ListItemPrefix>
        Student List
      </ListItem>
    </Link>
    <Link to={'/admin/instructorList'}>
      <ListItem className='text-black'  placeholder={undefined}>
        <ListItemPrefix  placeholder={undefined}>
          <UserCircleIcon className="h-5 w-5" />
        </ListItemPrefix>
        Instructor List
      </ListItem>
    </Link>
    <Link to={'/admin/courseList'}>
      <ListItem className='text-black'  placeholder={undefined}>
        <ListItemPrefix  placeholder={undefined}>
          <ShoppingBagIcon className="h-5 w-5" />
        </ListItemPrefix>
        Course List
      </ListItem>
    </Link>
    <ListItem className='text-black'  placeholder={undefined}>
      <ListItemPrefix  placeholder={undefined}>
        <PowerIcon className="h-5 w-5" />
      </ListItemPrefix>
      Log Out
    </ListItem>
  </List>
</Card>

</>
 );
};
