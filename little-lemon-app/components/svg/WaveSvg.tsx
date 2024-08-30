import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

type Props = {
  direction?: "top" | "bottom";
  color?: string;
};

// Get screen dimensions
const { width: screenWidth } = Dimensions.get("window");

// SVG aspect ratio
const viewBoxWidth = 1440;
const viewBoxHeight = 320;
const aspectRatio = viewBoxWidth / viewBoxHeight;

export const WaveSvg = ({ direction = "bottom", color = "blue" }: Props) => {
  const svgWidth = screenWidth;
  const svgHeight = Math.ceil(svgWidth / aspectRatio); // Maintain aspect ratio

  return (
    <Svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      width={svgWidth}
      height={svgHeight}
      style={styles(direction).svg}
    >
      <Path
        fill={color}
        fillOpacity="1"
        d="M0,0L40,21.3C80,43,160,85,240,101.3C320,117,400,107,480,133.3C560,160,640,224,720,218.7C800,213,880,139,960,106.7C1040,75,1120,85,1200,106.7C1280,128,1360,160,1400,176L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
      />
    </Svg>
  );
};

const styles = (direction: string) =>
  StyleSheet.create({
    svg: {
      transform: [{ rotate: direction === "top" ? "180deg" : "0deg" }],
      zIndex: -1,
      position: 'absolute',
      [direction]: -1,
    },
  });
