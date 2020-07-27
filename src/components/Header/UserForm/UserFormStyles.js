import styled from "styled-components";


export const User = styled.div`
    display: flex;
    width: 28%;
    justify-content: flex-end;
    align-items: center;
`;

export const BlockUser = styled.div`
       display: flex;
       justify-content: flex-end;
       align-items: center;
       width: 100%;
       padding: 0 5%;
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 0 10%;
    justify-content: center;
    margin-right: 15px;
`;

export const UserName = styled.h4`
    margin: 0;
    color: #003360;
    white-space: nowrap;
    font-weight: 600;
    text-transform: capitalize;
    font-family: "SF UI Display Light", sans-serif;
    color: #003360;
    font-size: 16px;
    line-height: 19px;
`;

export const Law = styled.p`
      margin: 0;
      font-size: 0.6em;
      color: #8AA1C1;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 10px;
      line-height: 12px;
      text-align: right;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-top: 2px;
      
`;

export const UserAvatar = styled.div`
       width: 50px;
       height: 50px;
       margin-right:10px 
`;
export const AvatarImg = styled.img`
       width: 50px;
       height: 50px;
       border: 5px solid red;
       border-radius: 26px;
`