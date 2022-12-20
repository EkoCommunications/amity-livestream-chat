import React, { useState } from "react";
import styled from "styled-components";
import { MessageRepository } from "@amityco/js-sdk";

// svg emojis
import like from "./Reaction/assets/like.svg";
import love from "./Reaction/assets/love.svg";
import wow from "./Reaction/assets/wow.svg";

// components
import ReactContainer from "./Reaction/ReactContainer";
import ReactionsWrapper from "./Reaction/ReactionsWrapper";
import Reaction from "./Reaction/Reaction";
import Like from "./Reaction/LikeButton";
import LikeThumb from "./Reaction/LikeThumb";
import ReactionCount from "./Reaction/ReactionCount";

const FBPost = styled.section`
  margin: auto;
`;

const list = {
  visible: {
    opacity: 1,
    y: 0,
    transformOrigin: "50%",
    scale: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.04,
    },
  },
  hidden: {
    opacity: 0,
    y: 50,
    transformOrigin: "50%",
    scale: 0,
  },
};

const Chat = ({ msg }) => {
  const [isHover, setIsHover] = useState(false);

  const formatDate = (date) => {
    return date.toLocaleTimeString();
  };
  
  const addReaction = (reaction) => {
    try {
      const isAdded = MessageRepository.addReaction({
        messageId: msg.messageId,
        reactionName: reaction,
      });

      if (isAdded) {
        console.log("reaction is added");
        setIsHover(false)
      }
    } catch (error) {
      console.error("can not add reaction", error);
    }
  };

  const removeReaction = (messageId, reaction) => {
    try {
      const isRemoved = MessageRepository.removeReaction({
        messageId: messageId,
        reactionName: reaction,
      });

      if (isRemoved) {
        console.log("reaction is removed");
      }
    } catch (error) {
      console.error("can not remove reaction", error);
    }
  }

  return (
    <div className="flex flex-row mt-5">
      <div className="overflow-hidden relative w-12 h-12 bg-gray-100 rounded-full dark:bg-gray-600">
        <svg
          className="absolute text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
        </svg>
      </div>
      <div className="flex flex-col my-1 px-3 rounded-lg text-left align-center">
        <div className="flex flex-row px-0 py-0 rounded-lg text-left align-center">
          <div className="flex flex-row px-0 py-0 rounded-lg text-left align-center">
            <span className="text-sm font-semibold text-black-700">
              {msg.user.displayName}
            </span>
          </div>
          <div className="flex flex-row px-3 py-0 rounded-lg text-left align-center">
            <span className="text-sm font-semibold text-gray-700">
              {formatDate(msg.user.createdAt)}
            </span>
          </div>
        </div>
        <span className="py-1 text-black-100 font-sm">{"" + msg.data.text}</span>
        <div className="flex flex-row px-0 py-0 align-center">
          <div className="flex flex-row text-left">
            {
              Object.keys(msg.reactions).map((r, index) => {
                let ic = r === 'like' ? like : (r === 'love' ? love : wow )
                return <ReactionCount key={index} icon={ic} count={msg.reactions[r]} selfReact={msg.myReactions.includes(r)} onClick={() => removeReaction(msg.messageId, r)}/>
              })
            }
          </div>
          <div className="text-right">
            <ReactContainer>
              <FBPost
                onMouseOver={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                <LikeThumb>
                  <Like />
                  &nbsp;Like
                  <ReactionsWrapper
                    initial="hidden"
                    animate={isHover ? "visible" : "hidden"}
                    variants={list}
                  >
                    <Reaction name="like" icon={like} clicked={() => addReaction('like')} />
                    <Reaction name="love" icon={love} clicked={() => addReaction('love')} />
                    <Reaction name="wow" icon={wow} clicked={() => addReaction('wow')} />
                  </ReactionsWrapper>
                </LikeThumb>
              </FBPost>
            </ReactContainer>
          </div>
        </div>
      </div>
      <div className="flex flex-row my-1 px-3 py-1 rounded-lg text-left align-center"></div>
    </div>
  );
};

export default Chat;
