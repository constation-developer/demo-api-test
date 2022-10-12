import React from 'react';
import './TabsArea.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Posts from '../Posts/Posts';
import Comments from '../Comments/Comments';
import Photos from '../Photos/Photos';
import Users from '../Users/Users';

function TabsArea() {
  return (
    <Tabs
      defaultActiveKey="posts"
      id="uncontrolled-tab-example"
      className="mb-3 custom-tabs mx-4"
    >
      <Tab eventKey="posts" title="Posts" className='mx-4'>
        <Posts />
      </Tab>
      <Tab eventKey="comments" title="Comments"  className='mx-4'>
        <Comments />
      </Tab>
      <Tab eventKey="photos" title="Photos"  className='mx-4'>
        <Photos />
      </Tab>
      <Tab eventKey="users" title="Users"  className='mx-4'>
        <Users />
      </Tab>
    </Tabs>
  );
}

export default TabsArea;