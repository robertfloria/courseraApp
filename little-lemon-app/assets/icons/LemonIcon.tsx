import React from "react";
import { Svg, Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
};

const LemonIcon = ({ width = 50, height = 50 }: Props) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 128 128"
      role="img"
      preserveAspectRatio="xMidYMid meet"
    >
      <Path
        d="M24 29.48L13.08 54.15l.91 29.83s6.07 19.56 6.37 19.77c.3.2 1.31-.25 3.74-4.6s8.6-13.05 9.1-15.17c.51-2.12.71-17.39.71-17.39l1.42-32.87L24 29.48z"
        fill="#757f3e"
      />
      <Path
        d="M24.03 30.48S4.09 49.65 4.08 68.11c0 12.85 6.27 19.92 7.79 22.45c1.52 2.53 5.06 7.99 5.87 9.1s1.79 3.21 2.49 4.02c.71.81-.07-5.34-.88-7.86c-.81-2.53-3.02-16.26-3.03-25.28c-.01-9.88.83-21.85 4.28-29.1c3.81-8 7.39-11.78 7.39-11.78l-3.96.82z"
        fill="#94a61d"
      />
      <Path
        d="M30.68 33.02s-5.87 2.93-6.07 6.47s1.62 7.18 2.33 12.03s.71 11.02.81 12.84C27.84 66.19 33 78.53 33 78.53l32.06 28.72l40.15 1.21s12.64.71 14.26-1.21s4.68-6.23 5.06-9.1c.71-5.36-1.21-8.19-2.63-16.79c-.6-3.66-.81-17.98-6.27-29.43c-6.17-12.94-18.41-24.27-43.18-27.51c-18.01-2.35-27.1 1.42-29.73 1.01c-2.63-.4-4.75-1.62-7.79-.2c-3.89 1.81-4.25 7.79-4.25 7.79z"
        fill="#fcc219"
      />
      <Path
        d="M110.77 112.2c4.77.16 7.28-2.53 8.29-3.64c1.01-1.11 3.04-4.93 3.04-4.93s-3.45 2.91-7.39 2.7c-3.94-.2-9.2-1.21-12.34-1.52s-13.05 1.92-25.08-.71c-12.03-2.63-25.31-9.28-34.08-17.9c-11.83-11.63-15.6-24.64-15.6-24.64s-.58 16.14 10.75 30.91s22.86 20.02 37.01 21.54c16 1.71 24.98-1.92 27.3-2.02c2.34-.09 5.17.11 8.1.21z"
        fill="#f7932a"
      />
      <Path
        d="M53.03 35.34c-.3 3.14 1.62 5.46 3.94 5.87c2.5.43 6.27-.2 11.83 2.93c5.56 3.14 13.37 10.96 18 6.78c4.25-3.84-2.63-10.92-5.06-13.05c-2.43-2.12-8.49-7.58-19.92-7.79c-6.57-.11-8.59 3.14-8.79 5.26z"
        fill="#ffebc9"
      />
      <Path
        d="M20.36 17.34c-.02-.75-.71-4.95-2.72-3.98c-3.47 1.66-4.78 4.1-3.65 6.92c1.42 3.54 3.8 5.84 6.37 8.49c1.97 2.04 5.87 6.17 7.28 7.38c1.42 1.21 3.51 2.86 5.97-.3c2.62-3.37.85-3.98-1.38-6.11S29 26.9 24.71 22.5c-2.15-2.21-4.33-4.41-4.35-5.16z"
        fill="#757f3e"
      />
    </Svg>
  );
};

export default LemonIcon;