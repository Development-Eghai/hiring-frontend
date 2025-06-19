import React from 'react';
import DataTable from 'react-data-table-component';
import { FaTrash } from 'react-icons/fa';

const data = [
  {
    id: '01',
    reqId: 'B001',
    label: 'Interview Type',
    techStack: 'React Js',
    screeningtype: 'online',
    round1: 'Technical Screening',
    round2: 'Technical Screening',
    round3: 'Technical Descussion',
  },
  {
    id: '02',
    reqId: 'B001',
    label: 'Duration of Interview',
    techStack: 'Java',
    screeningtype: 'online',
    round1: '1 hour',
    round2: '1 hour',
    round3: '',
  },
  {
    id: '03',
    reqId: 'B001',
    label: 'Mode of Interview',
    techStack: 'Python',
    screeningtype: 'online',
    round1: 'Online',
    round2: '',
    round3: 'Face to face',
  },
  {
    id: '04',
    reqId: 'B001',
    label: 'Screening Type',
    techStack: '-',
    screeningtype: 'online',
    round1: 'Elimination',
    round2: '',
    round3: 'Debrief',
  },
  {
    id: '05',
    reqId: 'B001',
    label: 'Interview Parameters',
    techStack: '-',
    screeningtype: 'offline',
    round1: '-',
    round2: '-',
    round3: '-',
  },
  {
    id: '06',
    reqId: 'B001',
    label: 'Interview Guidelines',
    techStack: '',
    screeningtype: 'online',
    round1: 'Y',
    round2: '',
    round3: 'Y',
  },
];

const columns = [
  {
    name: 'S.No',
    selector: (row, index) => index + 1,
    width: '70px',
    center: true,
  },
  {
    name: 'Req ID',
    selector: row => row.reqId,
    wrap: true,
    grow: 1,
  },
  {
    name: 'Position / Role',
    selector: row => row.label,
    wrap: true,
    grow: 2,
  },
  {
    name: 'Tech Stack',
    selector: row => row.techStack,
    wrap: true,
    grow: 2,
  },
  {
    name: 'Screening Type',
    selector: row => row.screeningtype,
    wrap: true,
    grow: 2,
  },
  {
    name: 'Interview Round 1',
    selector: row => row.round1,
    wrap: true,
    grow: 2,
  },
  {
    name: 'Interview Round 2',
    selector: row => row.round2,
    wrap: true,
    grow: 2,
  },
  {
    name: 'Interview Round 3',
    selector: row => row.round3,
    wrap: true,
    grow: 2,
  },
  {
    name: 'Status',
    cell: () => <FaTrash className="delete-icon" />,
    button: true,
    width: '70px',
    center: true,
  },
];

const InterviewDesignDashboard = () => {
  return (
    <div className="interview-table-wrapper">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="interview-table-title mb-0">Select number of Rounds</h5>
        {/* <button className="btn btn-primary">+ Create Planning</button> */}
      </div>
      <div className="scroll-container bg-white rounded p-2">
      <DataTable 

        columns={columns}
        data={data}
        pagination
        striped
        dense
        persistTableHead
        customStyles={{
          tableWrapper: {
            style: {
              display: 'block',
              maxWidth: '100%',
              overflowY: 'auto',
              overflowX: 'auto',
            },
          },
          headCells: {
            style: {
              backgroundColor: '#e8edff',
              fontWeight: '600',
              fontSize: '14px',
              color: '#1d1d1f',
              paddingTop: '20px',
              paddingBottom: '20px',
              whiteSpace: 'nowrap',
              
            },
          },
          cells: {
            style: {
              fontSize: '14px',
              paddingTop: '15px',
              paddingBottom: '15px',
              whiteSpace: 'nowrap',
            },
          },
        }}
      />
      </div>
    </div>
  );
};

export default InterviewDesignDashboard;
