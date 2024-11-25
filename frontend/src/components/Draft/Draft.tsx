import React, { useState } from "react";
import { DndProvider, useDrop, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { UserTermModel } from "../../models/user.interface";
import Term from "../Term/Term";
import "./Draft.css"

interface TermItemProps {
    termIndex: number;
    termList: UserTermModel[];
    setTermList: React.Dispatch<React.SetStateAction<UserTermModel[]>>;
}

const TermItem: React.FC<TermItemProps> = ({
    termIndex, 
    termList, 
    setTermList
}) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'TERM',
        item: { index: termIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [{ isOver }, drop] = useDrop({
        accept: 'TERM',
        drop: (draggedItem: { index: number }) => {
            const draggedIndex = draggedItem.index;
            if (draggedIndex !== termIndex) {
                const updatedTermList = [...termList];
                [updatedTermList[draggedIndex], updatedTermList[termIndex]] =
                    [updatedTermList[termIndex], updatedTermList[draggedIndex]];
                setTermList(updatedTermList);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <div
            ref={(node) => drag(drop(node))}
            className="term-container"
            style={{
                opacity: isDragging ? 0.5 : 1,
                backgroundColor: isOver ? '#f0f0f0' : ''
            }}
        >
            <Term term={termList[termIndex]} termIndex={termIndex} setTermList={setTermList}/>
        </div>
    );
};

interface DraftProps {
    termList: UserTermModel[];
    setTermList: (draftId: number, termList: UserTermModel[]) => Promise<void>;
}

const Draft: React.FC<DraftProps> = ({ termList, setTermList }) => {

    return (
        <div className="table-container">
            <DndProvider backend={HTML5Backend}>
                <table id="draft-table">
                    <thead>
                        <tr>
                            <th> </th>
                            <th><div className="season">fall</div></th>
                            <th><div className="season">winter</div></th>
                            <th><div className="season">spring</div></th>
                            <th><div className="season">summer</div></th>
                        </tr>
                    </thead> 
                    <tbody>
                        {Array.from({ length: 4 }, (_, year) => (
                            <tr className="term-rows" key={`year-${year}`}>
                                <td><div className="term-holder year-column">{year + 1}</div></td>
                                {Array.from({ length: 4 }, (_, term) => {
                                    const termIndex = year * 4 + term;
                                    const termData = termList[termIndex];
                                    return (
                                        <td key={`term-${termIndex}`}>
                                            {termData && (
                                                <TermItem
                                                    termIndex={termIndex}
                                                    termList={termList}
                                                    setTermList={setTermList}
                                                />
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </DndProvider>
        </div>
    );
}

export default Draft;