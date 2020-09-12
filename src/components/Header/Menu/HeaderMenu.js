import React from 'react';
import { BaseHoverBlockLink, HeaderMenuLink, DropdownMenu, DropdownContent } from '../HeaderStyle';

const HeaderMenu = () => {
  return (
    <>
      <DropdownMenu>
        <HeaderMenuLink to={'/sales'}>Продажи</HeaderMenuLink>
        <DropdownContent>
          <BaseHoverBlockLink to="/">Справочник рекламных сторон</BaseHoverBlockLink>
          <BaseHoverBlockLink to="/sales/batch_placement">Пакетное размещение</BaseHoverBlockLink>
          <BaseHoverBlockLink to="/">Контрагенты</BaseHoverBlockLink>
          <BaseHoverBlockLink to="/sales/com_projects">Коммерческие проекты</BaseHoverBlockLink>
          <BaseHoverBlockLink to="/">Счета</BaseHoverBlockLink>
          <BaseHoverBlockLink to="/sales/project_card">Проект</BaseHoverBlockLink>
          <BaseHoverBlockLink to="/sales/application">Приложение</BaseHoverBlockLink>
        </DropdownContent>
      </DropdownMenu>
      <HeaderMenuLink to={'/installations/design'}>Монтажи</HeaderMenuLink>
      <DropdownMenu>
        <HeaderMenuLink to={'/base'}>Базы</HeaderMenuLink>
        <DropdownContent>
          <BaseHoverBlockLink to="/base/outdoor_furniture">Уличная мебель</BaseHoverBlockLink>
          <BaseHoverBlockLink to="/base/construction">Конструкции</BaseHoverBlockLink>
          <BaseHoverBlockLink to="/base/partners">Контрагенты</BaseHoverBlockLink>
          <BaseHoverBlockLink to="/base/locations">Список местоположений</BaseHoverBlockLink>
          <BaseHoverBlockLink to="/base/documents/agreements">Список проектов</BaseHoverBlockLink>
        </DropdownContent>
      </DropdownMenu>
      <HeaderMenuLink to={'/'}>Отчеты</HeaderMenuLink>
      <HeaderMenuLink to={'/'}>Администрация</HeaderMenuLink>
    </>
  );
};

export default HeaderMenu;
