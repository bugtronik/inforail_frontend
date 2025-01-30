import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import logo from "./setraglogo.jpg";

function App() {

	const [users, setUsers] = React.useState([]);

	const currDate = new Date().toLocaleDateString();
	const currTime = new Date().toLocaleTimeString();

	const fetchDataUsers = () => {
		fetch("http://localhost:8090/api/users/")
		.then((response) => response.json())
		.then((data) => setUsers(data));
	}

	React.useEffect(() => {
		fetchDataUsers();
	}, []);

	const data_users = [];

	for (let i in users) {

		data_users.push({
			'createdby': users[i].createdby,
			'createdutc': users[i].createdutc,
			'modifiedby': users[i].modifiedby,
			'modifiedutc': users[i].modifiedutc,
			'active': users[i].active,
			'name': users[i].username,
		}
		);
	}

  return Object.keys(users).length > 0 ? (
    <div className="container">
		<div className="col-md-10">
			<img src={logo} className="rounded float-start" alt="Logo setrag" width="200" />
			<div className="offset-md-6"><strong>Date du jour: {currDate} - {currTime}</strong></div>
		</div>
      <table className="table table-bordered table-hover border-dark">
      <caption className="text-center"><strong>Liste des utilisateurs inforail</strong></caption>
      <thead>
      <tr className="table-info">
        <th>Créer par</th>
        <th>Date de création</th>
		<th>Modifier par</th>
		<th>Date de modification</th>
		<th>Activé</th>
        <th>Utilisateur</th>
      </tr>
      </thead>
      <tbody>
      {data_users && data_users.map((user) => (
        <tr>
          <td>{user.createdby}</td>
          <td>{user.createdutc}</td>
		  <td>{user.modifiedby}</td>
		  <td>{user.modifiedutc}</td>
		  <td>{user.active}</td>
          <td>{user.name}</td>
        </tr>
      ))}
      </tbody>
    </table>
	</div>
  ) : (
	<div className="container">
		<div className="row">
			<div className="col-md-6 offset-md-6">
				<div className="page-loader">
					<span className="spinner-border col align-self-center" role="status" style={{marginTop: "200px"}}>
						<span className="visually-hidden">Loading...</span>
					</span>
				</div>
			</div>
		</div>
	</div>
  );
}

export default App;
