import React, { Component } from 'react';

import TreeSvg from '../../public/tree.svg';

const Tree = ({
  color,
}) => {
  return (
    <object data={TreeSvg} type="image/svg+xml">
      <img src={TreeSvg} />
    </object>
  );
};

export default Tree;
