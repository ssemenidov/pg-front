import React, { useRef, useState } from 'react';

import { Modal, Upload, message, Button } from 'antd';
import { Input } from 'antd';

import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { adminRoutesMap } from './adminRoutes';

import { gql, useMutation } from '@apollo/client';


const NEW_DESIGN_TEST = gql`
  mutation($img: Upload, $title: String) {
    createDesign(input: {
      img: $img,
      title: $title
    }) {
      design {
        id
        title
      }
    }
  }
`;


function BoardNewsInput(props) {
  let [stateImageFile, setStateImageFile] = useState(null)
  const [createDesignTest, { loading, error }] = useMutation(NEW_DESIGN_TEST);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <div style={{marginLeft: "20px"}}>
      <input
        type="file"
        name="image"
        onChange={
          (
            { target: { validity, files: [file] } }
          ) => validity.valid && setStateImageFile(file) }
      />
      <button onClick={() => {
        console.log(stateImageFile);
        console.log(stateImageFile)
        createDesignTest(  { variables: { file: stateImageFile, title: "TEST IMAGE" } }) }
      }>
        SEND API ADD WITH FILE
      </button>
    </div>
  );
}


function TestImageUpload(props) {
  return (
    <AdminTopLayout activeRoute={adminRoutesMap.test_image} >
      <BoardNewsInput/>
    </AdminTopLayout>
  );
};






export default TestImageUpload;
