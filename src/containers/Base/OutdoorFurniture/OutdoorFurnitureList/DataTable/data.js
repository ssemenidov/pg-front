const data = [    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Подкартник',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Подкартник',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '105001',        col4: 'Ул. Рыскулова д. 12',        col5: 'Ул. Рыскулова д. 12',        col6: 'Антивандальная',        col7: '23.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Уральск',        col3: '150000',        col4: 'Мрн 5, д.12',        col5: 'Мрн 5, д.12',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт Decaux MUPI',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Сениор',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Двойной ситилайт',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Усть-Каменогорск',        col3: '101001',        col4: 'Ул Красных партизанских орлов, д, 70',        col5: 'Ул. Набережная, д.22, кв.3',        col6: 'Двойной ситилайт',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Сениор',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Уральск',        col3: '150000',        col4: 'Мрн 5, д.12',        col5: 'Мрн 5, д.12',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Подкартник',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Подкартник',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '105001',        col4: 'Ул. Рыскулова д. 12',        col5: 'Ул. Рыскулова д. 12',        col6: 'Антивандальная',        col7: '23.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Уральск',        col3: '150000',        col4: 'Мрн 5, д.12',        col5: 'Мрн 5, д.12',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт Decaux MUPI',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Сениор',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Двойной ситилайт',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Усть-Каменогорск',        col3: '101001',        col4: 'Ул Красных партизанских орлов, д, 70',        col5: 'Ул. Набережная, д.22, кв.3',        col6: 'Двойной ситилайт',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Сениор',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Уральск',        col3: '150000',        col4: 'Мрн 5, д.12',        col5: 'Мрн 5, д.12',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Подкартник',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Подкартник',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '105001',        col4: 'Ул. Рыскулова д. 12',        col5: 'Ул. Рыскулова д. 12',        col6: 'Антивандальная',        col7: '23.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Уральск',        col3: '150000',        col4: 'Мрн 5, д.12',        col5: 'Мрн 5, д.12',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт Decaux MUPI',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Сениор',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Двойной ситилайт',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Усть-Каменогорск',        col3: '101001',        col4: 'Ул Красных партизанских орлов, д, 70',        col5: 'Ул. Набережная, д.22, кв.3',        col6: 'Двойной ситилайт',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Сениор',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Уральск',        col3: '150000',        col4: 'Мрн 5, д.12',        col5: 'Мрн 5, д.12',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Подкартник',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Подкартник',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '105001',        col4: 'Ул. Рыскулова д. 12',        col5: 'Ул. Рыскулова д. 12',        col6: 'Антивандальная',        col7: '23.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Уральск',        col3: '150000',        col4: 'Мрн 5, д.12',        col5: 'Мрн 5, д.12',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт Decaux MUPI',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Сениор',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Двойной ситилайт',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Усть-Каменогорск',        col3: '101001',        col4: 'Ул Красных партизанских орлов, д, 70',        col5: 'Ул. Набережная, д.22, кв.3',        col6: 'Двойной ситилайт',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Сениор',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Уральск',        col3: '150000',        col4: 'Мрн 5, д.12',        col5: 'Мрн 5, д.12',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Подкартник',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Подкартник',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '105001',        col4: 'Ул. Рыскулова д. 12',        col5: 'Ул. Рыскулова д. 12',        col6: 'Антивандальная',        col7: '23.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Уральск',        col3: '150000',        col4: 'Мрн 5, д.12',        col5: 'Мрн 5, д.12',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт Decaux MUPI',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Сениор',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Двойной ситилайт',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Усть-Каменогорск',        col3: '101001',        col4: 'Ул Красных партизанских орлов, д, 70',        col5: 'Ул. Набережная, д.22, кв.3',        col6: 'Двойной ситилайт',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Сениор',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Уральск',        col3: '150000',        col4: 'Мрн 5, д.12',        col5: 'Мрн 5, д.12',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Подкартник',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Подкартник',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '105001',        col4: 'Ул. Рыскулова д. 12',        col5: 'Ул. Рыскулова д. 12',        col6: 'Антивандальная',        col7: '23.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Уральск',        col3: '150000',        col4: 'Мрн 5, д.12',        col5: 'Мрн 5, д.12',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт Decaux MUPI',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Сениор',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Двойной ситилайт',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Усть-Каменогорск',        col3: '101001',        col4: 'Ул Красных партизанских орлов, д, 70',        col5: 'Ул. Набережная, д.22, кв.3',        col6: 'Двойной ситилайт',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Сениор',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Уральск',        col3: '150000',        col4: 'Мрн 5, д.12',        col5: 'Мрн 5, д.12',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Подкартник',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Подкартник',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '105001',        col4: 'Ул. Рыскулова д. 12',        col5: 'Ул. Рыскулова д. 12',        col6: 'Антивандальная',        col7: '23.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Уральск',        col3: '150000',        col4: 'Мрн 5, д.12',        col5: 'Мрн 5, д.12',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт Decaux MUPI',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Сениор',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Двойной ситилайт',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Усть-Каменогорск',        col3: '101001',        col4: 'Ул Красных партизанских орлов, д, 70',        col5: 'Ул. Набережная, д.22, кв.3',        col6: 'Двойной ситилайт',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Сениор',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Уральск',        col3: '150000',        col4: 'Мрн 5, д.12',        col5: 'Мрн 5, д.12',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Подкартник',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Подкартник',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '105001',        col4: 'Ул. Рыскулова д. 12',        col5: 'Ул. Рыскулова д. 12',        col6: 'Антивандальная',        col7: '23.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Уральск',        col3: '150000',        col4: 'Мрн 5, д.12',        col5: 'Мрн 5, д.12',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Алматы',        col3: '101001',        col4: 'Пр. Достык д. 25',        col5: 'Пр. Достык д. 25',        col6: 'Ситилайт Decaux MUPI',        col7: '43.252502°76.953135°',        col8: 'Да',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Сениор',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Двойной ситилайт',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Усть-Каменогорск',        col3: '101001',        col4: 'Ул Красных партизанских орлов, д, 70',        col5: 'Ул. Набережная, д.22, кв.3',        col6: 'Двойной ситилайт',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Шымкент',        col3: '101001',        col4: 'Пр. Тауке Хана д. 125',        col5: 'Пр. Тауке Хана д. 125',        col6: 'Сениор',        col7: '23.252502°126.953135°',        col8: 'Нет',    },    {        col1: '204845847',        col2: 'Уральск',        col3: '150000',        col4: 'Мрн 5, д.12',        col5: 'Мрн 5, д.12',        col6: 'Сениор',        col7: '43.252502°76.953135°',        col8: 'Да',    },]export default data