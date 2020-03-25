import React from 'react';
const { Table } = require('react-bootstrap');

const CandidateTable = (props) => {
    return (
        <React.Fragment>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Votes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Candidate 1</td>
                        <td>{props.candidate1Votes}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Candidate 2</td>
                        <td>{props.candidate2Votes}</td>
                    </tr>
                </tbody>
            </Table>
        </React.Fragment>
    )
} 


export default CandidateTable;