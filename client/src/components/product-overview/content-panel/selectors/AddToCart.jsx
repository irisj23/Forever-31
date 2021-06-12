import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import CartModal from './CartModal';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 2s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid #e7e7e7;
  border-right: 2px solid #e7e7e7;
  border-bottom: 2px solid #e7e7e7;
  border-left: 4px solid #e7e7e7;
  background: transparent;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: fixed;
  top: 50%;
  left: 50%;
`;

const OuterContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid #e2e2e2;
  margin-top: 20px;
`;

const Container = styled.form`
  margin: 10px;
`;

const Button = styled.button`
  background-color: #27231F;
  color: #fff;
  margin: 2.5px;
  border: solid 1px #27231F;
  padding: 5px;
  display: inline-block;
  width: 200px;
  line-height: 40px;
  letter-spacing: 1px;
  position: relative;
  -webkit-transition: all 0.3s;
     -moz-transition: all 0.3s;
          transition: all 0.3s;

  :after {
    content: '';
    position: absolute;
    z-index: -1;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
         transition: all 0.3s;
  }

  :before {
    speak: none;
    line-height: 1;
    position: relative;
    -webkit-font-smoothing: antialiased;
  }

  :active {
    background: #000;
    top: 2px;
  }

  :hover {
    cursor: pointer;
    background-color: #000;
    border: solid 1px #000;
  }
`;

function AddToCart({ product, currentStyle, sku, qty }) {
  const [items, setItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isMissingSku, setIsMissingSku] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsMissingSku(false);
  }, [sku]);

  function addToCart() {
    setIsLoading(true);
    return axios.post('http://localhost:3000/api/cart', { sku_id: sku });
  }

  function revealModal() {
    setShowModal(true);
  }

  function addAllItems(quantity) {
    const promises = [];

    for (let i = 0; i < quantity; i++) {
      promises.push(addToCart());
    }

    Promise.all(promises)
      .then((responses) => (
        Promise.all(responses.map((response) => response))
      ))
      .then((data) => {
        setItems(data.length);
        setIsLoading(false);
        revealModal();
      })
      .then(() => {
        // clear items
      })
      .catch(() => setIsError(true));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (sku === '') {
      setIsMissingSku(true);
    } else {
      addAllItems(qty);
      revealModal();
    }
  }

  return (
    <OuterContainer>
      <Container onSubmit={handleSubmit}>
        <Button>{isLoading ? <Spinner /> : 'ADD TO BAG'}</Button>
        {isMissingSku ? <h5>Please select a size</h5> : <h5> </h5>}
      </Container>
      {!isMissingSku && sku > 0 ? (
        <CartModal showModal={showModal}
                   setShowModal={setShowModal}
                   currentStyle={currentStyle}
                   product={product}
                   items={items}
                   sku={sku}
                   qty={qty}
                   isError={isError} />
      ) : null}
    </OuterContainer>
  );
}

export default AddToCart;
