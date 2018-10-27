import React, { Component } from 'react';
import { Box, Layer } from 'grommet';

const PopUpChallenge = (props) => (
    <Layer margin="large" full= 'true' onClickOutside={() => {props.onClose()}} onEsc={() => {props.onClose()}}>
        <Box overflow="auto" border={{ color: 'brand', size: 'large' }} pad='xlarge' elevation = 'medium' basis= 'xlarge'>
              <Box pad="xlarge">Challenge List</Box>
        </Box>
    </Layer>);

export default PopUpChallenge;