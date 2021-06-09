import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import getQtyList from './helpers/getQtyList';

const Select = styled.select`
  width: 70px;
  height: 35px;
  background: #fff;
  color: #000;
  padding-left: 5px;
  font-size: 14px;
  border: solid 1px #000;
  margin-left: 10px;
  text-align-last: center;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

function Quantity({ selectedSku, selectedStyle }) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const qty = selectedSku === '' ? 0 : selectedStyle.skus[selectedSku].quantity;
    setQuantity(qty)
  }, [selectedSku])

  const options = quantity > 0 ? getQtyList(quantity) : ['---'];

  return (
    <div>
      <Select>
        {options.map((option, index) => {
          return <option key={index} value={option}>{option}</option>
        })}
      </Select>
    </div>
  )
}

export default Quantity;