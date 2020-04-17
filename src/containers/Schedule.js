import React, { Component } from "react";
import { Container, Row, Col, Card, Button, Accordion } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Chore from "../components/Chore";
import Cell from "../components/Cell";

const Schedule = (props) => {
  const { authUser, chores, users, isAdmin, onCompleteChore, onDeleteChore, onDragStart, draggable} = props;
  const week = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const userChores = (user) => {
    return chores.filter((chore) => {
      return chore.user_id === user.id;
    });
  };

  const findChoreByDay = (day, user) => {
    return userChores(user).filter((chore) => chore.day === day);
  };

  const buildChore = (chore) => {
    return <Chore 
              chore={chore}
              onCompleteChore={onCompleteChore}
              isAdmin={isAdmin}
              authUser={authUser}
              users={users}
              onDeleteChore={onDeleteChore}
              onDragStart={onDragStart}
              draggable
              />;
  };
  // onDragOver={e => e.preventDefault()}
  // onDrop={() => props.onDrop(day, user.id)}

  // true ?
  //     <><td value={day} >
  //     <Cell>{dayChores.length > 0
  //       ? <Accordion>{dayChores.map((chore) => buildChore(chore))}</Accordion>
  //       : null}
  //     </Cell>
  //     </td>
  //     </>
  //     :

  const buildTD = (day, user) => {
    let dayChores = findChoreByDay(day, user);
    return (
      <>
      <td value={day} onDrop={ (user.id === authUser.id) ? () => props.onDrop(day, user.id) : null } onDragOver={(user.id === authUser.id) ? e => e.preventDefault() : null}>
        <Cell>{dayChores.length > 0
          ? <Accordion>{dayChores.map((chore) => buildChore(chore))}</Accordion>
          : null}
        </Cell>
      </td>
      </>
    );
  };

  const buildSchedule = (users) => {
    return users.map((user) => renderUserRows(user));
  };

  const renderUserRows = (user) => {
    return (
      <tr>
        <td>{user.first_name}</td>
        {week.map((day) => buildTD(day, user))}
      </tr>
    );
  };

  // find <td> by ID and insert chore?

  const renderAssignedChores = (chores) => {
    chores.map((chore) => (chore.day ? console.log(chore) : null));
  };

  const transBG = {
    "background-color": "transparent",
  };
  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead className="chalk-font text-align-center" style={transBG}>
          <tr>
            <th></th>
            <th>MON</th>
            <th>TUE</th>
            <th>WED</th>
            <th>THUR</th>
            <th>FRI</th>
            <th>SAT</th>
            <th>SUN</th>
          </tr>
        </thead>
        {/* And below is rendering */}
        {/* render rows based on users in house */}
        {/* each user row renders 5 <td>s with value equal to each day */}
        {/* chores are checked for user and assigned day and are rendered on correspondings <td> */}
        <tbody className="chalk-font">
          {buildSchedule(users)}
          {renderAssignedChores(users)}
          <tr>
            <tr></tr>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Schedule;

// let userChores = chores.filter(chore=> chore.user_id == user.id)
// let week = []
// {userChores.map(chore => chore.day? week.push(<td value={chore.day} id={`${user.id + chore.day}`}><Chore chore={chore}/></td>) : null)}
// check chore if user_id == user.id
// if yes, check chore.day and find its corresponding <td>
// when found, include a <Chore chore=chore>
// ${user.id + chore.day}
