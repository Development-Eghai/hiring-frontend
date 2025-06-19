import React from "react";
import { Card } from "react-bootstrap";

export const HiringManagerHomeCard = (params) => {

    return (
        <Card className="w-100 h-100 border-0">
            <Card.Body className="d-flex flex-wrap align-items-center">
                <div className="col-3">
                    <span className=" d-flex align-items-center justify-content-center" style={{ width: '52px', height: '52px' }}>
                        {params?.data?.icon}
                    </span>
                </div>
                <div className="col d-flex flex-column ">
                    <h5 className="mb-0">{params?.data?.count || 0}</h5>
                    <p className="fs-14 mb-0">{params?.data?.name || ''}</p>
                </div>
            </Card.Body>
        </Card>
    )
}