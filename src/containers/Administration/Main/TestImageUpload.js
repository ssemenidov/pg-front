import React, { useRef, useState } from 'react';

import { Modal, Upload, message, Button } from 'antd';
import { Input } from 'antd';

import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { adminRoutesMap } from './adminRoutes';


function TestImageUpload(props) {
  let refInput = useRef(null);
  let refId = useRef(null);

  let [visible, setVisible] = useState(false)
  let [codeValue, setCodeValue] = useState("");
  let [title, setTitle] = useState("");

  const showModal = () => setVisible(true);
  const handleOk = e => setVisible(false);
  const handleCancel = e => setVisible(false);

  function handleResult(result, isError) {
    setTitle(isError ? "Error" : "Done");
    if (isError) {
      setCodeValue(`TypeError: ${result.name} ${result.message}`)
      showModal();
      return;
    }

    const reader = result.body.getReader();
    // read() returns a promise that resolves
    // when a value has been received
    let resultEncoded = ""
    reader.read().then(function processText({ done, value }) {
      const valueEncoded = new TextDecoder("utf-8").decode(value)
      resultEncoded = resultEncoded + valueEncoded;
      // Result objects contain two properties:
      // done  - true if the stream has already given you all its data.
      // value - some data. Always undefined when done is true.
      if (done) {
        resultEncoded = (
          `Type: ${result.type}\n`
        + `URL: ${result.url}\n`
        + `Ok: ${result.false}\n`
        + `Status: ${result.status}\n`
        + `StatusText: ${result.statusText}\n`
        + `Headers: ${JSON.stringify(result.headers)}\n`
        + `\n`
        + `Body:\n`
        + `${resultEncoded}`
        );
        setCodeValue(resultEncoded)
        console.log(resultEncoded);
        showModal();
        return;
      }
      return reader.read().then(processText);
    })
  }


  let clickHandler = (event) => {
    let construction_id = refId.current.state.value;
    let file = refInput.current.files[0];
    let formData = new FormData();
    formData.append('construction_id', construction_id);
    formData.append('construction_img', file);

    fetch(process.env.REACT_APP_BACKEND_URL + 'img/construction', {
      method: 'POST',
      body: formData
    })
      .then(result => { handleResult(result, false); })
      .catch(reason => { handleResult(reason, true); });
  };

  return (
    <AdminTopLayout activeRoute={adminRoutesMap.test_image} >
      <div>
        <input ref={refInput} type="file" id="input" multiple />
      </div>
      <div>
        <Input ref={refId} placeholder="Поле для ввода Id" />
      </div>
      <div>
        <Button onClick={clickHandler}>Отправить</Button>
      </div>
      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <pre>
          {codeValue}
        </pre>
      </Modal>
    </AdminTopLayout>
  );
};


export default TestImageUpload;
