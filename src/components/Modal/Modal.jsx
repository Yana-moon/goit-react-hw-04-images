import PropTypes from 'prop-types';
//import { Component } from 'react';
import { useEffect } from 'react';

import { OverlayWrapper, ModalWrapper } from './Modal.styled';

//export class Modal extends Component {
  //componentDidMount() {
    //window.addEventListener('keydown', this.handleKeyDown);
  //}


  //componentWillUnmount() {
    //window.removeEventListener('keydown', this.handleKeyDown);
  //}

  //handleKeyDown = e => {
    //if (e.code === 'Escape') {
      //this.props.onClose();
    //}
  //};

  export const Modal = ({ largeImage, onClose}) => {
    useEffect(() => {
    const handlePressESC = e => {
      if (e.code === 'Escape') {
        onClose();
  }
    };
    document.addEventListener('keydown', handlePressESC);
    return () => document.removeEventListener('keydown', handlePressESC);
  }, [onClose]);

  return (
      <OverlayWrapper onClick={onClose}>
        <ModalWrapper>
          <img src={largeImage} alt="Modal" width="960px"  />
        </ModalWrapper>
      </OverlayWrapper>
    );
  };


Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
