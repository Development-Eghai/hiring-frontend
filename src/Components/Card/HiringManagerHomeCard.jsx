import React from "react";
import { Card } from "react-bootstrap";

export const HiringManagerHomeCard = (params) => {

    return (
        <Card className="w-100 h-100">
            <Card.Body className="d-flex flex-wrap justify-content-between">
                <div className="col-3">
                    <span>Icon</span>
                </div>
                <div className="col">
                    <h5>{params?.data?.count || 0}</h5>
                    <p className="fs-14">{params?.data?.name || ''}</p>
                </div>
            </Card.Body>
        </Card>
    )
}