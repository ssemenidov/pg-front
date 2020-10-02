import React from 'react';
import AgreementsSearch from './AgreementsSearch';
import Table from '../../../components/Tablea';

const AgreementsTab = () => {
  const columns = [
    {
      title: 'Код договора',
      dataIndex: 'code',

      width: 130,
    },
    {
      title: 'Контрагент',
      dataIndex: 'agreement',

      width: 100,
    },
    {
      title: 'Проект',
      dataIndex: 'project',
      width: 100,
    },
    {
      title: 'Дата  заключения',
      dataIndex: 'date_start',
      width: 100,
    },
    {
      title: 'Дата окончания',
      dataIndex: 'date_end',
      width: 100,
    },
  ];

  const data = [
    {
      key: 1,
      code: '#2020050301323',
      agreement: 'ИП Агенство',

      project: 'CocaCola',
      date_start: '29.05.2021',
      date_end: '29.05.2021',
    },
    {
      key: 2,
      code: '#2020050301323',
      agreement: 'ИП Агенство',
      project: 'CocaCola',
      date_start: '29.05.2021',
      date_end: '29.05.2021',
    },
    {
      key: 3,
      code: '#2020050301323',
      agreement: 'ИП Агенство',
      project: 'CocaCola',
      date_start: '29.05.2021',
      date_end: '29.05.2021',
    },
    {
      key: 4,
      code: '#2020050301323',
      agreement: 'ИП Агенство',
      project: 'CocaCola',
      date_start: '29.05.2021',
      date_end: '29.05.2021',
    },
    {
      key: 5,
      code: '#2020050301323',
      agreement: 'ИП Агенство',
      project: 'CocaCola',
      date_start: '29.05.2021',
      date_end: '29.05.2021',
    },
    {
      key: 6,
      code: '#2020050301323',
      agreement: 'ИП Агенство',
      project: 'CocaCola',
      date_start: '29.05.2021',
      date_end: '29.05.2021',
    },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1 0 40%', margin: '0 1vw 1vw 0' }}>
        <AgreementsSearch />
      </div>
      <div style={{ width: '100%', overflowX: 'hidden' }}>
        <div style={{ width: '100%' }}>
          <Table columns={columns} data={data} notheader={true} />
        </div>
      </div>
    </div>
  );
};

export default AgreementsTab;
