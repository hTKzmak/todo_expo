import { useEffect, useId, useState } from "react";
import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native"
import styled from 'styled-components';
import TodoItem from "../components/TodoItem";

const HomeView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 250px;
`;

const InputText = styled.TextInput`
    width: 80%;
    height: 50px;
    margin: 12px;
    border-color: #d4d4d4;
    background-color: #e9e9e9;
    border-radius: 5px;
    border-width: 3px;
    padding: 10px;
`;

const TodoList = styled.FlatList`
    margin-top: 30px;
    width: 80%;
`

export const HomeScreen = () => {

    // список задач
    const [todos, setTodos] = useState([]);

    // значение input
    const [text, setText] = useState('');

    // Функция для отправки запросов к Api
    async function sendApiRequest() {

        console.log("Загрузка данных..."); // Сообщение о начале загрузки

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const result = await response.json();

            setTodos(result)
        } catch (error) {
            console.error("Ошибка сети:", error);
        }
    }

    // выводим данные только 1 раз
    useEffect(() => {
        sendApiRequest()
    }, [])


    // добавление задачи (если название не пустое)
    function addTask(title) {
        if (title) {
            const obj = {
                id: Date.now(),
                title: title,
                completed: false,
            }

            todos.push(obj)
            setText('')
        }
    }


    // изменение статуса задачи
    function changeCompleted(id) {
        setTodos(todos.map(elem => {
            if (elem.id === id) {
                // Здесь мы меняем состояние completed на противоположное
                return { ...elem, completed: !elem.completed };
            }
            // Возвращаем элемент без изменений, если id не совпадает
            return elem;
        }));
    }
    

    return (
        <HomeView>
            <InputText
                onChangeText={setText}
                value={text}
            />
            <Button title="Add task" onPress={() => addTask(text)} />

            <TodoList
                data={todos}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => changeCompleted(item.id)}>
                        <TodoItem todos={todos} setTodos={setTodos} key={item.id} id={item.id} title={item.title} completed={item.completed} />
                    </TouchableOpacity>
                )}
            />
        </HomeView >
    )
}