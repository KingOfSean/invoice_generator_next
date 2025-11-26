import React, {useState, useEffect} from "react";
import {Dialog} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {Zoom} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom in="checked" ref={ref} {...props} />;
});

export default function CustomDialog({ showDialog, handleClose, title, content }) {
  return (
    <Dialog
            open={showDialog}
            onClose={handleClose}
            slots={{
                transition: Transition,
            }}
    >
        <div
            style={{
                margin: ".5rem",
                position: 'relative'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    // margin: '.3rem .3rem 0 0',
                }}
                className="close-estimates-modal"
                onClick={handleClose}
            >
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    style={{
                        color: '#ba0404',
                        // margin: '.3rem .3rem 0 0'
                    }}
                    size="2x"
                />
            </div>
            <div className="centered-flex-column">
                <div style={{margin: "2.5rem 2rem 1rem 2.5rem "}}>
                    <h3 style={{color: '#233973', textAlign: "center", fontWeight: 'bold'}}>{title}</h3>
                </div>
                <div style={{borderBottom: "1px solid #d3d3d3", width: "100%", marginBottom: '2rem'}}></div>
                <div style={{margin: "0rem 2rem 1rem 2rem "}}>
                    {content}
                </div>
            </div>
        </div>
    </Dialog>
  );
}