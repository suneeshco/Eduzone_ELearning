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

export const InstructorSidebar = () => {
 return (
    <>
<Card className=" h-[calc(100vh-2rem)] w-full max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5  "  placeholder={undefined}>
      
      <List  placeholder={undefined}>
        <Link to={'/instructor'}> <ListItem  placeholder={undefined} className='text-black'>
          <ListItemPrefix  placeholder={undefined}>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        </Link>
        <Link to={'/instructor/myCourses'}><ListItem  placeholder={undefined} className='text-black'>
          <ListItemPrefix  placeholder={undefined}>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          My Courses
        </ListItem>
        </Link>
        <Link to={'/instructor/addCourse'}>
        <ListItem  placeholder={undefined} className='text-black'>
          <ListItemPrefix  placeholder={undefined}>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Add New Course
          
        </ListItem>
        </Link>
        <ListItem  placeholder={undefined} className='text-black'>
          <ListItemPrefix  placeholder={undefined}>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem  placeholder={undefined} className='text-black'>
          <ListItemPrefix  placeholder={undefined}>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem  placeholder={undefined} className='text-black'>
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
