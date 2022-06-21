import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import QuizList from '../components/QuizList';
import Chart from '../components/Chart';
import { Container, makeStyles, Box, Grid } from '@material-ui/core';
import Auth from '../utils/auth';
import HelpCard from '../components/Elements/HelpLineCard';


const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: '#18344A',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100vw',
		marginTop: '60px',
		padding: '0, 10px',
		marginBottom: 300,
	},
	title: {
		fontSize: '4rem',
		textAlign: 'center',
		color: 'white',
		paddingBottom: theme.spacing(3),
		[theme.breakpoints.down('md')]: {
			fontSize: '2rem',
		},
	},
	text: {
		fontSize: '1.3rem',
		textAlign: 'center',
		color: '#f5f5f5',
		paddingBottom: theme.spacing(3),
		[theme.breakpoints.down('md')]: {
			fontSize: '1rem',
		},
	},
	hero: {
		width: '50%',
		marginTop: theme.spacing(4),
		[theme.breakpoints.down('sm')]: {
			width: '75%',
		},
	},
	img: {
		aspectRatio: 4 / 5,
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
	card: {
		backgroundColor: '#255070',
		display: 'flex',
		flexDirection: 'column',
	},
	cardButtons: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#255070',
		justifyContent: 'space-evenly',
		alignItems: 'center',

	},
	cardTitle: {
		color: '#f5f5f5',
		fontSize: '2.5rem',
		textAlign: 'center',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.5rem',
		},
	},
	cardText: {
		fontSize: '1.3rem',
		textAlign: 'center',
		color: 'white',
		[theme.breakpoints.down('md')]: {
			fontSize: '1rem',
		},
	},
	button: {
		backgroundColor: '#18344A',
		padding: '15px',
		fontSize: '1rem',
	},
	buttonTitle: {
		color: 'white'
	}
}));


const Dashboard = () => {
	if (!Auth.loggedIn()) {
		window.location.replace('/login');
	}

	const classes = useStyles();

	const { loading, data } = useQuery(QUERY_USER);

	const user = data?.user || {};

	if (loading) {
		return <div>Loading...</div>;
	}



	let count = [];
	let quizCount = []
	if (user.quizzes.length > 0) {
		let depCount = 0
		let depQuizCount = 0
		for (let i = 0; i < user.quizzes.length; i++) {
			for (let j = 0; j < user.quizzes[i].quizResults.length; j++) {
				if (user.quizzes[i].quizResults[j].quizAnswer === 'positive for depression') {
					depCount++
					depQuizCount++
				} else if (user.quizzes[i].quizResults[j].quizAnswer === 'negative for depression') {
					depQuizCount++
				}
			}
		}

		let anxCount = 0
		let anxQuizCount = 0
		for (let i = 0; i < user.quizzes.length; i++) {
			for (let j = 0; j < user.quizzes[i].quizResults.length; j++) {
				if (user.quizzes[i].quizResults[j].quizAnswer === 'positive for anxiety') {
					anxCount++
					anxQuizCount++
				} else if (user.quizzes[i].quizResults[j].quizAnswer === 'negative for anxiety') {
					anxQuizCount++
				}
			}
		}

		let ptsdCount = 0
		let ptsdQuizCount = 0
		for (let i = 0; i < user.quizzes.length; i++) {
			for (let j = 0; j < user.quizzes[i].quizResults.length; j++) {
				if (user.quizzes[i].quizResults[j].quizAnswer === 'positive for ptsd') {
					ptsdCount++
					ptsdQuizCount++
				} else if (user.quizzes[i].quizResults[j].quizAnswer === 'negative for ptsd') {
					ptsdQuizCount++
				}
			}
		}

		let schCount = 0
		let schQuizCount = 0
		for (let i = 0; i < user.quizzes.length; i++) {
			for (let j = 0; j < user.quizzes[i].quizResults.length; j++) {
				if (user.quizzes[i].quizResults[j].quizAnswer === 'positive for schizophrenia') {
					schCount++
					schQuizCount++
				} else if (user.quizzes[i].quizResults[j].quizAnswer === 'negative for schizophrenia') {
					schQuizCount++
				}
			}
		}

		let addictionCount = 0
		let addictionQuizCount = 0
		for (let i = 0; i < user.quizzes.length; i++) {
			for (let j = 0; j < user.quizzes[i].quizResults.length; j++) {
				if (user.quizzes[i].quizResults[j].quizAnswer === 'positive for addiction') {
					addictionCount++
					addictionQuizCount++
				} else if (user.quizzes[i].quizResults[j].quizAnswer === 'negative for addiction') {
					addictionQuizCount++
				}
			}
		}
		count = [depCount, anxCount, ptsdCount, schCount, addictionCount]
		quizCount = [depQuizCount, anxQuizCount, ptsdQuizCount, schQuizCount, addictionQuizCount]
	}

	const chartHandler = (len) => {
		if (len > 0) {
			return (
				<Box sx={{
					backgroundColor: 'white',
					position: 'relative',
					width: '30vw',
				}}>
					<Chart count={count} quizCount={quizCount} />
				</Box>)
		}
	}

	return (
		<Container className={classes.container}>
			<h2 className="bg-dark text-primary p-3">
				Dashboard
			</h2>
			{chartHandler(user.quizzes.length)}
			<div className='flex-row text-primary justify-space-between'>
				<div className='col-12 col-lg-8 mb-3'>
					<Grid container spacing={3} >
						<QuizList quizzes={user.quizzes} />
					</Grid>
				</div>
			</div>
			<HelpCard />
		</Container>
	);
};

export default Dashboard;