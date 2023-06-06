import React from 'react';
import AutoplaySlider from 'react-awesome-slider/hoc/autoplay';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/fold-out-animation.scss';


export default function CustomSlider() {

    return (
        <AutoplaySlider
            play={true}
            cancelOnInteraction={false}
            interval={6000}
            cssModule={AwesomeSliderStyles}
        >
            <div data-src="../assets/404.png" />
            <div data-src="../assets/404.png" />
            <div data-src="../assets/404.png" />
            <div data-src="../assets/404.png" />
            
        </AutoplaySlider>
    );
}
