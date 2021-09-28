import React from 'react';
import { Link } from 'react-router-dom';

import Logo from './Logo';
import Button from './Button';

const Card = ({ title, subtitle, link, button }) => (
  <div className="bg-qgrey p-5 space-y-10 border-qlight border-2 pt-14 h-full flex flex-col justify-between">
    <h2 className="font-badaboombb font-normal text-5xl text-center">{title}</h2>
    <h3 className="font-semibold text-lg text-center">{subtitle}</h3>
    <Link to={link}>
      <Button>{button}</Button>
    </Link>
  </div>
);

const Home = () => {
  return (
    <div className="container space-y-8 mx-auto">
      <Logo center />
      <div className="lg:grid lg:grid-cols-3 md:gap-4 lg:gap-7 md:flex flex-col">
        <div className="hidden md:block">
          <Card
            title="Quizz Master"
            subtitle="Become a Quizz Master and host a Quizz Night!"
            link="/master"
            button="Start!"
          />
        </div>
        <div>
          <Card
            title="Team"
            subtitle="Apply as a Team to join a Quizz Night!"
            link="/team"
            button="Join!"
          />
        </div>
        <div className="hidden md:block">
          <Card
            title="Scoreboard"
            subtitle="Set up a scoreboard of your Quizz and view the rankings!"
            link="/scoreboard"
            button="View!"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
