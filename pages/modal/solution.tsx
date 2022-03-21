import React, { useState } from "react";
import ModalTest from '../../components/ModalSolution';

export default function Solution() {
    const [openModal, setOpenModal] = useState(false);
    return (
        <div className="container">
            {
                openModal &&
                <ModalTest
                    isVisible={openModal}
                    // onCancel={() => setOpenModal(false)}
                    // onOK={() => console.log('submit form')}
                    // isRenderHeader = {false}
                    // // buttonCancelText={"thoát"}
                    // buttonOkText={'submit'}
                >
                    <h2>Demo Modal</h2>
                    <form>
                        <input type="text" name="" id="" />
                    </form>
                </ModalTest>
            }
            <button onClick={() => {
                setOpenModal(true);
            }}>Open Modal</button>
        </div>
    )
}