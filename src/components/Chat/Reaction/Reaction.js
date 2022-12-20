import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const list = {
    visible: {
      opacity: 1,
      y: 0,
      transformOrigin: '50%',
      scale: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.04,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      transformOrigin: '50%',
      scale: 0,
    },
}

const ReactionWrapper = styled.div`
  position: relative;
  border-radius: 50%;
  background-color: white;
  transition: 0.2s;
  transform-origin: center bottom;
  cursor: pointer;
  &:hover {
    transform: scale(1.4);
    transition: 0.2s;
  }
  &:after {
    content: attr(data-reaction-name);
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    
    padding: 5px;
    font-size: 12px;
    background-color: white;
    color: #606770;
    border-radius: 5px;
    text-transform: capitalize;
    font-weight: 400;
  }
`
const ReactionImage = styled.img`
  width: 100%;
  height: 100%;
`

const Reaction = ({ icon, name, clicked }) => {
  return (
    <motion.div variants={list}>
      <ReactionWrapper>
        <ReactionImage src={icon} onClick={clicked} />
      </ReactionWrapper>
    </motion.div>
  )
}

export default Reaction;