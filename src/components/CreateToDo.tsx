import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import styled from "styled-components";

interface IForm {
    toDo: string;
}
const InputToDo = styled.input`
    border: none;
    background: none;
    border-bottom: 2px solid ${(props) => props.theme.accentColor};
    width: 220px;
    height: 25px;
    font-size: 16px;
    margin-right: 10px;
    padding: 0 10px;
    &:focus {
        outline: none;
        border-bottom: 2px solid ${(props) => props.theme.textColor};
        transition: 2s linear;
    }
`;
const AddBtn = styled.button`
    background: #ff7675;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    color: whitesmoke;
    font-size: 16px;
    font-weight: 600;
    border: 2px solid #ff7675;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
    &:hover {
        cursor: pointer;
        background: whitesmoke;
        color: #ff7675;
        transition: 1s ease-in-out;
    }
`;

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const handleValid = ({ toDo }: IForm) => {
        setToDos((oldToDos) => [{ text: toDo, category, id: Date.now() }, ...oldToDos]);
        setValue("toDo", "");
    };
    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <InputToDo
                {...register("toDo", {
                    required: "Please Write a To Do.",
                })}
                placeholder="Write a to do"
            />
            <AddBtn>Add</AddBtn>
        </form>
    );
}
export default CreateToDo;
