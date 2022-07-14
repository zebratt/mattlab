import svgs from '../svgs';
import $ from './index.less';

export default function HomePage() {
  return (
    <div className={$.home}>
      <h3>home</h3>
      <div className={$.container}>
        {svgs.map((SvgItem, idx) => {
          return <SvgItem key={idx} className={$.svg} />;
        })}
      </div>
    </div>
  );
}
