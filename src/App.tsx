import {useEffect, useState} from 'react'
import './App.css'
import {getCookies, removeCookies, setCookies} from "./funcrtion/Cookie.tsx";

function App() {
    const [data, setData] = useState(String);
    const [todoList, setTodoList] = useState(Array<{id: number, number: number, detail: string}>)

    useEffect(() => {
        // 처음 렌더링 시 쿠키 설정
        let number = getCookies("ListNumber");

        if(number == undefined || null) {
            setCookies("ListNumber", "0")
        }

        // 데이터가 있을 경우 내용 저장
        const temp:Array<{id:number, number: number, detail: string}> = [];
        let seq = 1;
        for(let i = 1; i <= number; i++) {
            const data = getCookies(String(i))

            if(data) {
                const todo = {id: i, number: seq, detail: data};
                temp.push(todo);
                seq++;
            }
        }
        setTodoList(temp);
    }, []);

    const save = () => {
        const number = parseInt(getCookies("ListNumber")) + 1;
        setCookies("ListNumber", String(number))
        setCookies(String(number), data);
        window.location.reload();
    }

    const todoListRender = () => {
        const removeAll = () => {

            const number = (getCookies("ListNumber"));
            for(let i = 1; i <= number; i++) {
                removeCookies(String(i));
            }

            setCookies("ListNumber", "0");

            window.location.reload();
        }

        const remove = (id: number) => {
            removeCookies(String(id));
            window.location.reload();
        }

        return (
            <>
                <div>
                    <button onClick={removeAll}>remove all</button>
                </div>
                <div>
                    <table border={1}>
                        <thead>
                        <tr>
                            <th>고유값</th>
                            <th>번호</th>
                            <th>내용</th>
                            <th>삭제</th>
                        </tr>
                        </thead>
                        <tbody>
                        {todoList.map(value => {
                            return(
                                <tr key={value.id}>
                                    <td>{value.id}</td>
                                    <td>{value.number}</td>
                                    <td>{value.detail}</td>
                                    <td><button onClick={() => remove(value.id)}>🗑</button></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
    return (
        <div>
            <h1>TODO List</h1>
            <div>
                <input
                    type={"text"}
                    value={data}
                    onChange={(value) => setData(value.target.value)} placeholder={"내용을 입력해 주세요"}
                />
                <button type="submit" onClick={save}>+</button>
            </div>
            {
                parseInt(getCookies("ListNumber")) > 0 && todoListRender()
            }
        </div>
    );
}

export default App
