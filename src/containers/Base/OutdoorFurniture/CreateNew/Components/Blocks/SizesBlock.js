import React, {useState} from "react";import {BlockBody, BlockTitle, BlockTitleText, GreenAddBtn, Large} from "./Styles/StyledBlocks"import ExtraRow from "./Extras/ExtraRow";export default function SizesBlock() {    const initialList = [ExtraRow];    const [theList, setTheList] = useState(initialList);    const removeClickHandler = (e, index) => {        e.preventDefault()        let newList = [...theList];        newList.splice(index)        setTheList(newList);    };    const addClickHandler = (e) => {        e.preventDefault();        setTheList([...theList, ExtraRow]);    };    return (        <Large>            <BlockTitle>                <BlockTitleText>Стороны конструкции</BlockTitleText>                <GreenAddBtn                    onClick={addClickHandler}                >                    Добавить еще                </GreenAddBtn>            </BlockTitle>            <BlockBody>                {theList.map((row, index) => {                    return <div                        key={index}                    >                        {<ExtraRow                            removeClickHandler={(e) => removeClickHandler(e, index)}                        />}                    </div>                })}            </BlockBody>        </Large>    )}// import React, {useState} from "react";// import {BlockBody, BlockTitle, Large, BlockTitleText, GreenAddBtn} from "./Styles/StyledBlocks"// import ExtraRow from "./Styles/Extras/ExtraRow";// import context from "react-router/modules/RouterContext";////////// export default function SizesBlock() {//////     const removeClickHandler = (e) => {//         e.preventDefault()//         console.log('click')//         theArray.pop()//         // setTheArray(newList);//     }//////     const row = ExtraRow({removeClickHandler})////     const initialArray =[row];//     const [theArray, setTheArray] = useState(initialArray);////     const addClickHandler = (e) =>{//         e.preventDefault();//         setTheArray([...theArray, row]);//     };////////     return (//         <Large >//             <BlockTitle>//                 <BlockTitleText>Стороны конструкции</BlockTitleText>//                 <GreenAddBtn//                 onClick={addClickHandler}//                 >//                     Добавить еще//                 </GreenAddBtn>//             </BlockTitle>//             <BlockBody>//                 {theArray.map((row, index) => {//                     return <div//                     key={index}//                     >//                         {row}//                     </div>//                 })}//             </BlockBody>//         </Large>//     )// }