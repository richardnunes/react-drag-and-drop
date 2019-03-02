const initialData = {
    tasks: {
        task1: { id: 'task1', content: 'Take out the garbage' },
        task2: { id: 'task2', content: 'Watch my favourite show' },
        task3: { id: 'task3', content: 'Charge my phone' },
        task4: { id: 'task4', content: 'Cook dinner' },
    },
    columns : {
        column1: {
            id: 'column1',
            title: 'To do',
            taskIds: ['task1', 'task2', 'task3', 'task4']
        },
        column2: {
            id: 'column2',
            title: 'In progress',
            taskIds: []
        },
        column3: {
            id: 'column3',
            title: 'Done',
            taskIds: []
        }
    },
    columnOrder: ['column1', 'column2', 'column3']
};

export default initialData;
