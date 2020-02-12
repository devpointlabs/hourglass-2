import React, { useState } from 'react';
import { Header, Container, Button, Card, CardHeader, CardContent} from "semantic-ui-react"

const Team = () => {
	const [teammates, setTeammates] = useState([]);
	const [hasTeam, setHasTeam] = useState(false);
	return (
    <Container>
        <br />
				{
					hasTeam?
						<>
						<Header as='h1'>Your Team</Header>
						{
							teammates.map(t => {
								return <Card>
									<CardHeader>
										{t.name}
									</CardHeader>
									<CardContent>
										{t.nickname}
									</CardContent>
								</Card>
							})
						}
						</>
					:
						<>
							<Header center as='h3'>No Active Teams</Header>
							<Button basic>Create New</Button>
						</>
				}
    </Container>
    )
};

export default Team;