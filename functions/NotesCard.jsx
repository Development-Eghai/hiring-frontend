import React from "react";

const NotesCard = () => {
  return (
    <div className="NotesCardContainer bg-white rounded-4 p-4 m-4 ">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-12 mb-4 mx-1" key={index}>
            <Card className="col-12 p-2 ">
              <div className="NotesCompontents">
                <div className="NotesHeader bg-inf border-bottom border-gray border-dashed">
                  <div className="NotesDate">
                    <p>{"date"}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="NotesTitle">
                      <p>{"title"}</p>
                    </div>
                    <div className="NotesButtons d-flex">
                      <div>
                        <input
                          type="checkbox"
                          id={`checkbox-${""}`}
                          onChange={() => toggleStar("_id")}
                          style={{ display: "none" }}
                        />
                        <label
                          htmlFor={`checkbox-${"_id"}`}
                          style={{ cursor: "pointer" }}
                        >
                          jhj
                        </label>
                      </div>
                      <div>
                        <button
                          type="button"
                          style={{
                            borderStyle: "none",
                            backgroundColor: "transparent",
                          }}
                        >
                          {"NotesEditIcon"}
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => handleDeleteNote(note.id)}
                          style={{
                            borderStyle: "none",
                            backgroundColor: "transparent",
                          }}
                        >
                          {"NotesDeleteIcon"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="NotesMainBody d-flex flex-column justify-content-center"
                  style={{ height: "35vh" }}
                >
                  <p>{"notes"}</p>
                </div>
                <div className="footer">
                  <p className="text-dark d-flex gap-1 ">
                    {"NotesTimer"}
                    {"time"} {"day"}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesCard;
