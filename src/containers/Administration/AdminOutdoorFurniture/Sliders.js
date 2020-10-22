import React from 'react';

import { SlidingBottomPanel } from '../components/SlidingBottomPanel/SlidingBottomPanel';
import { LocationCRUDForm } from './LocationCRUDForm';

export function AddSlider({sliderState}) {
  const addItem = (values) => {
    let parent = sliderState.caller.parent;
    let result;
    if (parent) {
      result = sliderState.caller.src.add({
        id: parent.selected.key,
        title: values.name
      })
    }
    else {
      result = sliderState.caller.src.add({ title: values.name })
    }

    sliderState.caller.showCRUDMessageAndRefetch(result, "Добавление");
  };

  return (
    <SlidingBottomPanel title={`Добавить ${sliderState.title[0]}`}
                        onClose={sliderState.closeAdd}
                        classNameSuffix={'loca'}
    >
      <LocationCRUDForm actionText={"Добавить"}
                        onFinish={addItem}
                        entityName={sliderState.title[1]}
      />
    </SlidingBottomPanel>
  )
}


export function EditSlider({sliderState}) {
  const saveChanges  = (values) => {
    let result = sliderState.caller.src.upd({
      title: values.name,
      id: sliderState.editedData.key
    })
    sliderState.caller.showCRUDMessageAndRefetch(result, "Изменение");
  };

  return (
    <SlidingBottomPanel title={`Редактировать ${sliderState.title[0]}`}
                        onClose={sliderState.closeEdit}
                        classNameSuffix={'loca'}
    >
      <LocationCRUDForm actionText={"Сохранить изменения"}
                        onFinish={saveChanges}
                        initialValues={sliderState.editedData}
                        entityName={sliderState.title[1]}
      />
    </SlidingBottomPanel>
  )
}
