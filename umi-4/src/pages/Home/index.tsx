import $ from './index.less';
import { ReactComponent as IconBasicInfo } from '@/assets/BasicInfoFilled.svg';

export default function HomePage() {
  return (
    <div className={$.home}>
      <h3>master app home</h3>
      <IconBasicInfo className={$.icon} />
    </div>
  );
}
