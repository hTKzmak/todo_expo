import { View, Text, Button } from "react-native";
import styled from "styled-components";

const TodoView = styled.View`
    flex-direction: row;
    border-radius: 5px;
    padding: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: left;
    align-items: center;
    background-color: #e9e9e9;

    justify-content: space-between;
`

const TodoText = styled.Text`
    width: 200px;
`

function TodoItem({ todos, setTodos, id, title, completed }) {

    // удаление задачи
    function removeTask() {
        setTodos(todos.filter(elem => elem.id !== id))
    }


    return (
        <TodoView>
            <TodoText style={{ textDecorationLine: completed ? 'none' : 'line-through' }}>{title}</TodoText>
            <Button title="Delete" onPress={removeTask} />
        </TodoView>
    )
}

export default TodoItem