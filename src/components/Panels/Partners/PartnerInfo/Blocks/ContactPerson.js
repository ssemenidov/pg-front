import React, {useContext, useState, useMemo, useEffect} from 'react';
import { BlockBody, BlockTitle, BlockTitleText, Large, Row } from '../../../../Styles/StyledBlocks';
import { BtnSuccess } from '../../../../Styles/ButtonStyles';
import ExtraRow from './Extras/ExtraRow';
import { sendContragentValues } from '../../../../../store/actions/actions';
import { useSelector } from 'react-redux';
import {partnerContext} from "../../../../../containers/Base/Partner/Partner";

export default function ContactPerson() {
  const [item, setItem] = useContext(partnerContext);

  const contactPerson = item.contactPerson.edges && item.contactPerson.edges;
  const initialList = contactPerson ? contactPerson.map((item) => item) : [{}];

  const [theList, setTheList] = useState(initialList);
  // const state = useSelector((state) => state.contragents.currentContragent);


  useEffect(() => {
    console.log('theListnew ', theList)
  }, [theList])


  const removeClickHandler = (e, index) => {
    e.preventDefault();
    let newList = [...theList];

    if (index > -1) {
      newList.splice(index, 1);
    }
    setTheList(newList);
  };

  const addClickHandler = (e) => {
    e.preventDefault();
    setTheList([...theList, ExtraRow]);
  };

  return (
    <Large>
      <BlockTitle style={{ padding: '10px 26px 15px 24px' }}>
        <BlockTitleText>Контактное лицо</BlockTitleText>
        <BtnSuccess onClick={addClickHandler}>Добавить еще</BtnSuccess>
      </BlockTitle>
      <BlockBody>

        {
          theList.map((row, index) => {
            return (
                <Row
                    key={index}
                    style={{ width: '100%' }}
                >
                  <div style={{ width: '100%' }} key={index}>
                    <ExtraRow
                        removeClickHandler={(e) => removeClickHandler(e, index)}
                        dataRow={row}
                        index={index}
                        theList={theList}
                        setTheList={(data) => setTheList(data)}
                    />
                  </div>
                </Row>
            );
          })
        }


        {/*{JSON.stringify(state) !== '{}'*/}
        {/*  ? state.phoneContact.map((contact) => {*/}
        {/*      return (*/}
        {/*        <div key={contact._id}>*/}
        {/*          <ExtraRow*/}
        {/*            sendContragentValues={sendContragentValues}*/}
        {/*            state={contact}*/}
        {/*            removeClickHandler={(e) => removeClickHandler(e, contact._id)}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*      );*/}
        {/*    })*/}
        {/*  : theList.map((row, index) => {*/}
        {/*      return (*/}
        {/*        <Row style={{ width: '100%' }}>*/}
        {/*          <div style={{ width: '100%' }} key={index}>*/}
        {/*            <ExtraRow*/}
        {/*                removeClickHandler={(e) => removeClickHandler(e, index)}*/}
        {/*            />*/}
        {/*          </div>*/}
        {/*        </Row>*/}
        {/*      );*/}
        {/*    })}*/}
      </BlockBody>
    </Large>
  );
}
