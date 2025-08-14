import React from "react";

const PdfCard = ({ params }) => {
  return (
    <Col key={""} xs={12} sm={6} md={4} lg={3}>
      <Card className="cardshape p-1">
        <Card.Header
          className="bg-white d-flex justify-content-between flex-wrap BooksCardHeader"
          style={{ minHeight: "14vh" }}
        >
          <div className="BookcardTitle col-10">
            <p>{"book_name"}</p>
          </div>
          <div className="col-2 d-flex flex-column align-items-end justify-content-start">
            <button className="deletebackground">{"deleteIcon"}</button>
          </div>
        </Card.Header>
        <Card.Body
          className="d-flex flex-column justify-content-center"
          style={{ minHeight: "25vh" }}
        >
          <div className="d-flex">
            <div className="d-flex align-items-center mb-3">
              <span>{"pdfIcon"}</span>
            </div>
            <div className="ms-3 text-muted" style={{ fontSize: "14px" }}>
              <div>Chapters: {"chapters"}</div>
              <div>Question sets: {"question_sets"}</div>
              <div>
                Performance: <strong>{"performance"}</strong>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PdfCard;
