import styled from 'styled-components';

const LikeThumb = styled.span`
  position: relative;
  display: inline-flex;
  justify-content: center;
  font-weight: 600;
  color: #606770;
  fill: #606770;
  padding: 5px 15px;
  height: 32px;
  border-radius: 100px;
  box-shadow: 0 0px 20px -2px rgba(0,0,0,0.2);
  cursor: pointer;
  &:after {
    position: absolute;
    content: '';
  }
`

export default LikeThumb;