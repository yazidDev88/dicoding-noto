import React from 'react';

export function Card({ children, header, title, description, ...props }) {
    return (
        <div className="card" {...props}>
            {header ? (
                <div className="card-header note-header">
                    <div>
                        <h3>{title}</h3>
                        <small>{description}</small>
                    </div>
                    {header}
                </div>
            ) : (
                <div className="card-header">
                    <h3>{title}</h3>
                    <small>{description}</small>
                </div>
            )}
            <div className="card-body">
                {children}
            </div>
        </div>
    );
}
