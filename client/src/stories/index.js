import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';

import {Button, Welcome} from '@storybook/react/demo';
import Home from "../views/Home";
import Login from "../views/Login";
import RoboList from '../components/RoboList'
import RoboListItem from '../components/RoboListItem'
import RoboPic from '../components/RoboPic'


storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')}/>);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
     <span role="img" aria-label="so cool">
       😀 😎 👍 💯
    </span>
    </Button>
  ));

storiesOf('Home', module)
  .add('Basic', () => <Home/>)

storiesOf('Login', module)
  .add('Basic', () => <Login onChangeName={action('changed name')} onClickGo={action('clicked go')}/>)

storiesOf('RoboPic', module)
  .add('Robot 1', () => <RoboPic roboId={1234}/>)

storiesOf('RoboList', module)
  .add('Robot List', () => <RoboList robots={[]}/>)

storiesOf('RoboListItem', module)
  .add('Robot List Item', () => <RoboListItem roboId={1234} owner={'bob.domain.eth'} />)
