

import React, { useEffect, useState } from "react";
import './Todolist.css'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




const getLocalItem = () => {
    let list = localStorage.getItem('list');
    console.log(list);
    if (list) {
        return JSON.parse(localStorage.getItem('list'));
    } else {
        return [];
    }
}
const Todolist = () => {
    const [inputList, setInputList] = useState("");
    const [Item, setItem] = useState(getLocalItem());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEdit, setIsEdit] = useState(null);
    const [isChecked, setIsChecked] = useState(null);

    const formatDate_5 = (newDate) => {
        const date=new Date(newDate)
        return `${appendZero(date.getMonth()+1)}-${appendZero(date.getDate())}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }


    const Month = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    function appendZero(val){
        return val>10?val:'0'+val
    }

    // function appendAMPM(hr,min,sec){
    //     return hr<12 ? appendZero(hr)+":"+appendZero(min)+":"+appendZero(sec)+"AM" : appendZero(hr)+":"+appendZero(min)+":"+appendZero(sec)+"PM"
    // }

    const addItem = () => {
        let addinput = document.getElementById('addinput').value
        if (!addinput.trim()) {
            toast.error("Input Feild is empty,please First Fill it....")
            // document.getElementById('addinput').style.border='1px solid red'
            return
            // if (!inpuList) {
            //     toast.warning('Input field is empty')
        }
        else if (inputList && !toggleSubmit) {
            setItem(
                Item.map((elem) => {
                    if (elem.id === isEdit) {
                        return { ...elem, name: inputList }
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);
            setInputList('');
            setIsEdit(null);
        }
        else {
            const allInput = { id: new Date().getTime().toString(), name: inputList, checked: false,date:new Date() }
            setItem([...Item, allInput]);
            setInputList('')
            //  {formatDate(new Date())}
        }
    }
    console.log("item", Item)
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(Item))
    }, [Item]);

    const delItem = (id) => {

        const findData = Item.find(data => data.id === id)
        if (findData.checked) {
            const upitem = Item.filter((elem) => {
                return id !== elem.id
            });
            setItem(upitem);
        } else {
            toast.error("Please First,Check in box")
        }

    }
    const editItem = (id) => {
        let newEdititem = Item.find((elem) => {
            return elem.id === id
        });
        console.log(newEdititem);
        setToggleSubmit(false);
        setInputList(newEdititem.name);
        setIsEdit(id);
    }

    const checkItem = (e, id) => {
        // console.log("e",e.target.checked)
        setIsChecked(id)
        const newItemList = [...Item]
        const findData = newItemList.find(data => data.id === id)
        // console.log("findData",findData)
        findData.checked = Boolean(e.target.checked)
        setItem([...newItemList])
    }

    const removeall = () => {
        setItem([]);
    }

    // const changehandler=(e)=>{
        
    //     setInputList(e.target.value)
    // }

    return (
        <>
            <div className="main">
                <div className="center">
                    <h1>ToDo-List</h1>
                    <div className="addItem">
                        <input type='text' placeholder='Add item'
                            value={inputList}
                            id='addinput'
                            onChange={(e) => setInputList(e.target.value)}
                            // onChange={changehandler}
                        />
                        {
                            toggleSubmit ? <i className="fa fa-plus" onClick={addItem}></i> :
                                <i className="fa fa-edit" onClick={addItem}></i>
                        }

                    </div>
                    <div className="'showItem">
                        {
                            Item.map((elem) => {
                                return (
                                    <div className="eachitem d-flex" key={elem.id}>

                                        <p>{elem.name}</p>
                                        <div className="ms-auto">
                                            <input type='checkbox' checked={elem.checked} onChange={(e) => { checkItem(e, elem.id) }} />
                                            <i className="fa fa-edit" onClick={() => editItem(elem.id)} ></i>
                                            <i className="fa fa-trash" onClick={() => delItem(elem.id)} ></i>

                                        </div>
                                       
                                        <p id='date'>{formatDate_5(elem.date)}</p>
                                    </div>

                                )
                            })
                        }

                    </div>
                    <div className="showItem">
                        <button className="remove-all" onClick={removeall}><span>REMOVE ALL</span></button>

                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>


    );
};

export default Todolist;