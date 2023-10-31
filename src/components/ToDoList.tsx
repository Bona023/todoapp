import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { Categories, categoryState, toDoSelector } from "../atoms";
import ToDo from "./ToDo";
import styled from "styled-components";

const Container = styled.div`
    width: 500px;
    padding: 0 15px;
    margin: 0 auto;
`;
const WriteBox = styled.div`
    display: flex;
    max-width: 480px;
    margin: 30px auto;
    justify-content: center;
    align-items: center;
`;
const CategorySelect = styled.select`
    width: 100px;
    height: 25px;
    border: 0.5px solid ${(props) => props.theme.textColor};
    border-radius: 15px;
    text-align: center;
    margin-right: 20px;
    font-size: 16px;
    font-weight: 700;
`;
const Title = styled.h1`
    margin: 20px auto;
    font-size: 35px;
    padding-left: 20px;
`;

function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };
    return (
        <Container>
            <Title>To Dos</Title>
            <hr />
            <WriteBox>
                <CategorySelect
                    value={category}
                    onInput={onInput}
                >
                    <option value={Categories.TO_DO}>To Do</option>
                    <option value={Categories.DOING}>Doing</option>
                    <option value={Categories.DONE}>Done</option>
                </CategorySelect>
                <CreateToDo />
            </WriteBox>
            {toDos?.map((toDo) => (
                <ToDo
                    key={toDo.id}
                    {...toDo}
                />
            ))}
        </Container>
    );
}

export default ToDoList;
