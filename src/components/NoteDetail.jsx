import React from "react";
import { Card } from "./Card";
import parse from 'html-react-parser'
export function NoteDetail({children,...props}) {
    return (
        <Card title={props.title} header={children} description={props.date}>
            <div className="notes-content">
                {parse(props.body)}
            </div>
        </Card>
    )

}
