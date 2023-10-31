import React from "react";
import { Categories, IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

const DelBtn = styled.button`
    background: #d63031;
    border: none;
    padding: 5px 10px;
    border-radius: 7px;
    color: #2d3436;
    font-size: 14px;
    font-weight: 600;
    border: 2px solid #d63031;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
    &:hover {
        cursor: pointer;
        background: whitesmoke;
        color: #2d3436;
        transition: 0.5s ease-in-out;
    }
`;
const ToDoBtn = styled.button`
    background: #0984e3;
    border: none;
    padding: 5px 10px;
    border-radius: 7px;
    color: whitesmoke;
    font-size: 14px;
    font-weight: 600;
    border: 2px solid #0984e3;
    margin-right: 5px;
    &:hover {
        cursor: pointer;
        background: whitesmoke;
        color: #0984e3;
        transition: 0.5s ease-in-out;
    }
`;
const DoingBtn = styled.button`
    background: #6c5ce7;
    border: none;
    padding: 5px 10px;
    border-radius: 7px;
    color: whitesmoke;
    font-size: 14px;
    font-weight: 600;
    border: 2px solid #6c5ce7;
    margin-right: 5px;
    &:hover {
        cursor: pointer;
        background: whitesmoke;
        color: #6c5ce7;
        transition: 0.5s ease-in-out;
    }
`;
const DoneBtn = styled.button`
    background: #576574;
    border: none;
    padding: 5px 10px;
    border-radius: 7px;
    color: whitesmoke;
    font-size: 14px;
    font-weight: 600;
    border: 2px solid #576574;
    margin-right: 5px;
    &:hover {
        cursor: pointer;
        background: whitesmoke;
        color: #576574;
        transition: 0.5s ease-in-out;
    }
`;
const TextBox = styled.div`
    width: 280px;
    height: 30px;
    font-size: 18px;
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
    margin-right: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid gray;
    padding: 0 5px;
`;
const ToDoLi = styled.li`
    list-style: none;
    margin-bottom: 10px;
    display: flex;
`;

function ToDo({ text, category, id }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            const newToDo = { text, category: name as any, id };
            return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];
        });
    };
    const delToDo = (event: React.MouseEvent<HTMLButtonElement>) => {
        setToDos((ToDos) => ToDos.filter((todo) => todo.id !== id));
    };
    return (
        <ToDoLi>
            {category !== Categories.TO_DO && (
                <ToDoBtn
                    name={Categories.TO_DO}
                    onClick={onClick}
                >
                    To Do
                </ToDoBtn>
            )}
            {category !== Categories.DOING && (
                <DoingBtn
                    name={Categories.DOING}
                    onClick={onClick}
                >
                    Doing
                </DoingBtn>
            )}
            {category !== Categories.DONE && (
                <DoneBtn
                    name={Categories.DONE}
                    onClick={onClick}
                >
                    Done
                </DoneBtn>
            )}
            <TextBox>
                <span>{text}</span>
            </TextBox>
            <DelBtn onClick={delToDo}>Del</DelBtn>
        </ToDoLi>
    );
}
export default ToDo;
