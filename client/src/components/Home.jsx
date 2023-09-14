const Home = ({ userData }) => {
  console.log(userData);
  return <h1>Welcome {userData.username}!</h1>;
};

export default Home;
