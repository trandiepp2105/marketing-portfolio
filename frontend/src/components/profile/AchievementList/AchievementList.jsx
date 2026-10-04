import AchievementCard from '../AchievementCard/AchievementCard';
import './AchievementList.scss';

function AchievementList({ achievements }) {
  return (
    <div className="achievement-list">
      {achievements.map((achievement) => (
        <AchievementCard key={achievement.id} achievement={achievement} />
      ))}
    </div>
  );
}

export default AchievementList;
