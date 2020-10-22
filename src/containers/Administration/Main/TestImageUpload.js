import React, { useRef } from 'react';

import { Upload, message, Button } from 'antd';
import { Input } from 'antd';

import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { adminRoutesMap } from './adminRoutes';

const uploadProps = {
  name: 'file',
  action: 'https://allbot.online/',
  headers: {
    // authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function TestImageUpload(props) {
  let refInput = useRef(null);
  let refId = useRef(null);

  let clickHandler = (event) => {
    let construction_id = refId.current.state.value;
    let file = refInput.current.files[0];
    let formData = new FormData();
    formData.append('construction_id', construction_id);
    formData.append('construction_img', file);

    fetch('https://allbot.online/', {
      method: 'POST',
      body: formData
    })
      .then(result => message.success(`Done: ${result}`))
      .catch(reason => message.error(`Error: ${reason}`));
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
    </AdminTopLayout>
  );
};


export default TestImageUpload;
