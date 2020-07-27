import styled from "styled-components";export const Medium = styled.div`        width: 23%;        display: flex;        flex-direction: column;        background: #F5F7FA;        border: 1px solid #D3DFF0;        border-radius: 8px;        margin-bottom: 20px;        @media (max-width:1500px){                height:518px;        }`;export const MediumWell= styled.div`        width: 48%;        display: flex;        flex-direction: column;        background: #F5F7FA;        border: 1px solid #D3DFF0;        border-radius: 8px;        height: 431px;        margin-bottom: 20px;        @media(max-width:1500px){        height: 518px;        }`export const Large = styled.div`        width: 100%;        display: flex;        flex-direction: column;        background: #F5F7FA;        border: 1px solid #D3DFF0;        border-radius: 8px;        margin-bottom: 20px;`;export const BlockTitle = styled.h4`      padding: 0 33px;      min-height: 46px;      width: 100%;      border-bottom: 1px solid  #D3DFF0;      display: flex;      align-items: center;      justify-content: space-between;`;export const BlockTitleText = styled.h4`      font-size: 14px;      text-transform: uppercase;      color: #003360;`;export const BlockBody = styled.div`      min-height: 30px;      padding: 10px 20px;      display: flex;      flex-direction: column;      justify-content: space-between;`;export const Row = styled.div`        width: 100%;        display: flex;        align-items: center;        justify-content: space-between;        padding: 5px 5px 0 5px; `;export const AddressInputBlock= styled.div`        width: 45%;        marginBottom: 21px;        @media (max-width: 1500px){                width:100%;        }`export const MediaInput= styled.div`        display:flex;        justify-content:space-between;        @media (max-width: 1500px) {                 width: 100%;                 display: block;  }`;export const InputTitle = styled.h4`        font-size: 14px;        line-height: 16px;        font-weight: 800;        text-transform: capitalize;        color: #1A1A1A;        font-family: "SF UI Display Light", sans-serif;`;export const BlueButton = styled.button`        font-family: "SF UI Display Light", sans-serif;        width: 229px;        height: 40px;        background: #2C5DE5;        border-radius: 4px;        font-size: 14px;        color: #FFFFFF;        border: none;`export const PageWrap = styled.div`      font-family: "SF UI Display Light", sans-serif;      display: flex;      width: 100%;`;export const Container = styled.div`        font-family: "SF UI Display Light", sans-serif;        width: 100%;        display: flex;        flex-direction: column;        `;export const BlockWrapper = styled.div`        width: 100%;        display: flex;        justify-content: space-between;        align-items: center;`;export const GreenAddBtn = styled.button`        display: flex;        justify-content: center;        align-items: center;        font-family: "SF UI Display Light", sans-serif;        font-size: 12px;        line-height: 12px;        color: #FFFFFF;        width: 112px;        height: 32px;        background: #008556;        border-radius: 4px;        border: none;`;export const RedDeleteBtn = styled.button`        height: 40px;        border: 1px solid #D42D11;        box-sizing: border-box;        border-radius: 4px;`;export const ImageBody = styled.div`        width: 36%;        height: 154px;        border-radius: 4px;`;export const BlueBtnLoad = styled.button`        width: 156px;        height: 40px;        background: #2C5DE5;        border-radius: 4px;        font-family: "SF UI Display Light", sans-serif;        font-size: 14px;        line-height: 14px;        color: #FFFFFF;        border: none;`;