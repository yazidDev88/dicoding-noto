import React from "react";
import parse from 'html-react-parser';
import { formatDateDay, formatDateMonth, showFormattedDate } from "../utils";

export function Notes({ title, body, date, onClick }) {
    return (
        <div className="notes" onClick={onClick}>
            <div className="notes-date">
                <div className="notes-date-wrap">
                    <h2>{formatDateDay(date)}</h2>
                    <span>{formatDateMonth(date)}</span>
                </div>
            </div>
            <div className="notes-description">
                <h4>{title}</h4>
                <div className="notes-decription-content">
                    { parse(body) }
                    <div className="notes-footer">
                        <span>{showFormattedDate(date)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
