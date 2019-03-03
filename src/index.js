import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

const Container = styled.div`
    display: flex;
`;

class App extends React.Component {
    state = initialData;

    onDragStart = home => {
        const homeIndex = this.state.columnOrder.indexOf(home.source.droppableId);

        this.setState({
            homeIndex
        });
    };

    onDragEnd = result => {
        this.setState({
            homeIndex: null
        });

        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        if (type === 'column') {
            const newColumnOrder = Array.from(this.state.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...this.state,
                columnOrder: newColumnOrder
            };
            this.setState(newState);
            return;
        }

        const home = this.state.columns[source.droppableId];
        const foreign = this.state.columns[destination.droppableId];

        if(home === foreign) {
            const newTasksIds = Array.from(home.taskIds);
            newTasksIds.splice(source.index, 1);
            newTasksIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...home,
                taskIds: newTasksIds
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn
                }
            };

            this.setState(newState);
            return;
        }

        const startTaskIds = Array.from(home.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...home,
            taskIds: startTaskIds
        };

        const finishTaskIds = Array.from(foreign.taskIds);
        finishTaskIds.splice(source.index, 0, draggableId);
        const newFinish = {
            ...foreign,
            taskIds: finishTaskIds
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };
        this.setState(newState);
    };

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
                <Droppable droppableId="all-columns" direction="horizontal" type="column">
                    {(provided) => (
                        <Container {...provided.droppableProps} ref={provided.innerRef}>
                            {this.state.columnOrder.map((columnId, index) => {
                                const column = this.state.columns[columnId];
                                const tasks = column.taskIds.map(
                                    taskId => this.state.tasks[taskId]
                                );

                                return <Column key={column.id} column={column} tasks={tasks} index={index}/>;
                            })}
                            {provided.placeholder}
                        </Container>
                    )}
                </Droppable>
            </DragDropContext>
        );
    };
};

ReactDOM.render(<App />, document.getElementById('root'));
