import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'

const withSmallModal = <P extends SmallModalProps & object>(Component: React.ComponentType<P>) => 
    class WithSmallModal extends React.Component<P & SmallModalProps> {
        render() {
            const { show, onHide, label } = this.props
            return (
                <div>
                    <Modal
                        show={show}
                        onHide={onHide}
                        size="sm"
                        centered>
                        <Modal.Header closeButton><strong>{label}</strong></Modal.Header>
                        <Modal.Body>
                            <Component {...this.props as P} />
                        </Modal.Body>
                    </Modal>
                </div>                
            )
        }
    }




    // return (props:P) => (
    //             <div>
    //                 <Modal
    //                     show={props.show}
    //                     onHide={props.onHide}
    //                     size="sm"
    //                     centered>
    //                     <Modal.Header closeButton><strong>{props.label}</strong></Modal.Header>
    //                     <Modal.Body>
    //                         <Component {...props as P} />
    //                     </Modal.Body>
    //                 </Modal>
    //             </div>
    // )


    // return class WithSmallModal extends React.ComponentType<P & SmallModalProps> {
    //     render() {
    //         const { label, show, onHide, ...props } = this.props
    //         return (
    //             <div>
    //                 <Modal
    //                     show={show}
    //                     onHide={onHide}
    //                     size="sm"
    //                     centered>
    //                     <Modal.Header closeButton><strong>{label}</strong></Modal.Header>
    //                     <Modal.Body>
    //                         <Component {...props as P} />
    //                     </Modal.Body>
    //                 </Modal>
    //             </div>
    //         );
    //     }
    // }


    interface SmallModalProps {
        label: string
        show: boolean
        onHide: () => void
    }

    export default withSmallModal;