import React, { useEffect, useState } from "react";
// import './modal.scss';

type ModalProps = {
    isRenderHeader?: boolean;
    isVisible?: boolean;
    isRenderCloseIcon?: boolean;
    onOK?: () => void;
    onCancel?: () => void;
    renderFooter?: () => JSX.Element;
    title?: string;
    buttonOkText?: string;
    buttonCancelText?: string;
}

const CLASS_DEFAULT = "tcl-modal__wrapper";

const ModalSolution: React.FC<ModalProps> = ({
    children,
    isVisible: isVisibleOutside,
    isRenderHeader,
    isRenderCloseIcon,
    renderFooter,
    onCancel,
    onOK,
    title,
    buttonCancelText,
    buttonOkText
}) => {
    const [className, setClassName] = useState(CLASS_DEFAULT);
    const [isVisible, setIsVisible] = useState(false);

    // Tạo event nhận key từ bàn phím
    useEffect(() => {
        function handler(e) {
            // keycode.info
            // console.log(e.key);
            if (e.key === 'Escape')
                _onCancel();
        }
        document.addEventListener('keyup', handler)
        return () => {
            document.removeEventListener("keyup", handler)
        };
    }, [])

    useEffect(()=>{
        setIsVisible(isVisibleOutside);
    },[isVisibleOutside])

    // thêm class cho body khi hiện hoặc ẩn modal
    useEffect(() => {
        if (isVisible) {
            setClassName((preClass) => preClass + ' show');
            document.querySelector('body').classList.add('tcl-modal__open');
        }
        else {
            setClassName(CLASS_DEFAULT);
            document.querySelector('body').classList.remove('tcl-modal__open');
            console.log('xoa tcl-modal');
        }
    }, [isVisible])

    const _onCancel = ():void =>{
        if (onCancel){
            onCancel();
        } else{
            setIsVisible(false);
        }
    }

    const _renderFooter = (): JSX.Element => {
        if (renderFooter) {
            return renderFooter();
        }

        return (
            <>
                <button className='tcl-modal__cancel' onClick={_onCancel}>{buttonCancelText}</button>
                <button className='tcl-modal__ok' onClick={onOK}>{buttonOkText}</button>
            </>
        );
    }

    if (isVisible === false)
        return null;

    return (
        <div className={className}>
            <div className="tcl-mask" onClick={_onCancel}></div>
            <div className="tcl-dialog">
                <div className="tcl-modal__content">
                    {
                        isRenderHeader &&
                        <div className="tcl-modal__header">
                            {title ? title : "Title demo"}
                            {
                                isRenderCloseIcon &&
                                <button className="tcl-modal__close" onClick={_onCancel}>X</button>
                            }
                        </div>
                    }

                    <div className="tcl-modal__body">
                        {children}
                    </div>

                    <div className="tcl-modal__footer">
                        {_renderFooter()}
                    </div>
                </div>
            </div>
        </div>
    );
}

ModalSolution.defaultProps = {
    isVisible: false,
    isRenderCloseIcon: true,
    isRenderHeader: true,
    buttonOkText: "OK",
    buttonCancelText: "Cancel",
}

export default ModalSolution;