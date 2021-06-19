import React, {useState} from 'react';
import styled from 'styled-components';
import ModalStyles from '../../SharedStyles/ModalStyles';

const Image = styled.img`
  // width: 140px;
  height: 120px;
  padding-right: 8px;
  padding-top: 5px;
`

const ModalImage = styled.img`
  width: 540px;
  // height: 550px;
  padding-right: 8px;
  padding-top: 5px;

`

const Photo = ({ photo }) => {

  const [clickImg, setClickImg] = useState(false);

  return (
    <>
      <Image src={photo} onClick={() => {setClickImg(true)}}/>

      {clickImg && (
        <ModalStyles.ModalBackground>
          <ModalStyles.ModalContent>
            <ModalStyles.CloseButton onClick={() => {setClickImg(false)}}>X</ModalStyles.CloseButton>
            <ModalImage src={[photo]}/>
          </ModalStyles.ModalContent>
        </ModalStyles.ModalBackground>
      )}
    </>
  )
}

export default Photo;
