import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useConstructor from './../../../custom-hooks/useConstructor';

// Constructor sẽ được chạy lần đầu trong FC, và nó chạy cả client lẫn server 
// Cách tạo constructor trong hooks
// Cách 1: Tạo biến global isRun -> Check điều kiện

let isRun = false;
export default function PlayGround() {
    useConstructor(()=>{
        console.log("constructor cách 4");
    })
    // Tuong ung voi Constructor
    useMemo(() => {
        console.log('constructor cách 3');
    }, []);

    const isRunHook = useRef(false);
    const inputFileEl = useRef(null);
    const [counter, setCounter] = useState(0);
    const [user, setUser] = useState({
        firstName: 'Jone',
        lastName: 'Smith'
    });

    if (!isRun) {
        //code for constructor
        console.log("Constructor cách 1");
        isRun = true;
    }

    if (!isRunHook.current) {
        //code for constructor
        console.log("Constructor cách 2");
        isRunHook.current = true;
    }

    useEffect(() => {
        //  console.log('useEffect run');   

        return () => {
            // componentWillUnmount <=> Component sẽ bị remove khỏi cấu trúc DOM
        }
    })

    // Hàm useMemo giống như useEffect, chỉ khác là useMemo trả về giá trị còn effect thì k
    // Chỉ nên sử dụng những TH phức tạp, TH cộng chuỗi bình thường k nên sử dụng
    const fullName = useMemo(() => `${user.firstName} ${user.lastName}`, [user]);

    // Hàm useCallback giống như useMemo nhưng nó trả về 1 fc
    const handleClick = useCallback(() => {
        setCounter(counter + 1);
    }, [counter]);

    const handleUpload = () => {
        const input = document.querySelector('input[type="file"]') as HTMLInputElement;
        input.click();
        // inputFileEl.current.click();
    }

    return (
        <div className='container'>
            <h1>Play Ground - Life Cycle- React Hooks {fullName}</h1>
            <button onClick={handleClick}>Counter Add</button>
            <p>{counter}</p>

            <input type="file" ref={inputFileEl} style={{
                visibility: "hidden",
                opacity: 0,
                position: "fixed",
                left: "-1000px"
            }} />
            <button className='upload' onClick={handleUpload}>Upload</button>
        </div>
    )
}