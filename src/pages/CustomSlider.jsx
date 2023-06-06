import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import "react-awesome-slider/dist/styles.css";
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';

function CustomSlider() {

    return (
        <AwesomeSlider
            play={true}
            cancelOnInteraction={false}
            interval={6000}
        >
            <div data-src="../assets/404.png" />
            <div data-src="../assets/404.png" />
            <div data-src="../assets/404.png" />
            <div data-src="../assets/404.png" />
            
        </AwesomeSlider>
    );
}
export default CustomSlider;
