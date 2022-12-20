import React from "react";
import styled from 'styled-components';

import like from "./assets/like.svg";
import love from "./assets/love.svg";
import wow from "./assets/wow.svg";

const ReactionImage = styled.img`
  width: 20px;
  height: 20px;
`

const ReactionCount = ({icon, count, selfReact, onClick}) => {
    return (
        <div onClick={onClick} className={'flex flex-row rounded-full w-15 align-center py-1 px-1 mx-1 ' + (selfReact ? 'bg-gray-200' : '')}>
            <ReactionImage src={icon} />
            <div className="px-1"> 
                {count}
            </div>
        </div>
    )
}

export default ReactionCount;