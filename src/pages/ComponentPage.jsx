import React from 'react';
import Button from './Button';

const ComponentPage = () => {
  return (
    <div className="container">
      <Button text="Primary" />
      <Button text="Secondary" />
      <Button text="Success" />
      <Button text="Danger" />
      <Button text="Warning" />
      <Button text="Info" />
      <Button text="Light" />
      <Button text="Dark" />
      <Button text="Link" />
    </div>
  );
};

export default ComponentPage;