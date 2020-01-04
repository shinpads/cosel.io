import React, { Component } from 'react';

import Building1Svg from '../../public/building1.svg';
import Building2Svg from '../../public/building2.svg';
import Building3Svg from '../../public/building3.svg';
import Building4Svg from '../../public/building4.svg';
import Building5Svg from '../../public/building5.svg';
import MountainSvg from '../../public/mountain.svg';
import SunSvg from '../../public/sun.svg';
import CloudSvg from '../../public/cloud.svg';

export const Building1 = ({
  color,
  scale = 1,
  style = {},
  top = 0,
}) => {
  scale *= getScale();
  top -= (1 - getScale()) * 60;
  style.top = `${top}%`;
  style.transform = `scale(${scale})`;
  style.position = 'absolute';
  return (
    <div style={style}>
      <object data={Building1Svg} type="image/svg+xml">
        <img src={Building1Svg} />
      </object>
    </div>
  );
};

export const Building2 = ({
  color,
  scale = 1,
  style = {},
  top = 0,
}) => {
  scale *= getScale();
  top -= (1 - getScale()) * 60;
  style.top = `${top}%`;
  style.transform = `scale(${scale})`;
  style.position = 'absolute';
  return (
    <div style={style}>
      <object data={Building2Svg} type="image/svg+xml">
        <img src={Building2Svg} />
      </object>
    </div>
  );
};

export const Building3 = ({
  color,
  scale = 1,
  top = 0,
  style = {},
}) => {
  scale *= getScale();
  top -= (1 - getScale()) * 60;
  style.top = `${top}%`;
  style.transform = `scale(${scale})`;
  style.position = 'absolute';
  return (
    <div style={style}>
      <object data={Building3Svg} type="image/svg+xml">
        <img src={Building3Svg} />
      </object>
    </div>
  );
};

export const Building4 = ({
  color,
  scale = 1,
  style = {},
  top = 0,
}) => {
  scale *= getScale();
  top -= (1 - getScale()) * 60;
  style.top = `${top}%`;
  style.transform = `scale(${scale})`;
  style.position = 'absolute';
  return (
    <div style={style}>
      <object data={Building4Svg} type="image/svg+xml">
        <img src={Building4Svg} />
      </object>
    </div>
  );
};

export const Building5 = ({
  color,
  scale = 1,
  top = 0,
  style = {},
}) => {
  scale *= getScale();
  top -= (1 - getScale()) * 60;
  style.top = `${top}%`;
  style.transform = `scale(${scale})`;
  style.position = 'absolute';
  return (
    <div style={style}>
      <object data={Building5Svg} type="image/svg+xml">
        <img src={Building5Svg} />
      </object>
    </div>
  );
};

export const Sun = ({
  color,
  scale = 1,
  style = {},
}) => {
  scale *= getScale();

  style.height = 'fit-content';
  style.transform = `scale(${scale})`;
  style.width = 'fit-content';
  style.position = 'absolute';

  return (
    <div style={style}>
      <div style={{ width: 'fit-content', height: 'fit-content' }} className="sun">
        <object data={SunSvg} type="image/svg+xml">
          <img src={SunSvg} />
        </object>
      </div>
    </div>
  );
};

export const Cloud = ({
  color,
  scale = 1,
  style = {},
}) => {
  scale *= getScale();

  style.height = 100 * scale + 'px';
  style.width = 100 * scale + 'px';
  style.position = 'absolute';

  return (
    <div style={style}>
      <div style={{ width: '100%', height: '100%' }} className="cloud">
        <object style={{ width: '100%', height: '100%' }} data={CloudSvg} type="image/svg+xml">
          <img src={CloudSvg} />
        </object>
      </div>
    </div>
  );
};

export const Mountain = ({
  color,
  scale = 1,
  style = {},
}) => {
  scale *= getScale();
  style.transform = `scale(${scale})`;
  style.position = 'absolute';
  return (
    <div style={style}>
      <object data={MountainSvg} type="image/svg+xml">
        <img src={MountainSvg} />
      </object>
    </div>
  );
}

function getScale() {
  let scale = 1;
  if (window.innerWidth < 800) {
    scale *= 1.5;
  }
  const wh = window.innerWidth / window.innerHeight;
  const twh = 1400 / 800;
  if (wh < twh) {
    return scale * window.innerWidth / 1400;
  } else {
    return scale * 1.1 * 800 / window.innerHeight;
  }
}
