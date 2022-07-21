import { useSelector } from 'react-redux';
import { Link, RootState, store } from 'umi';
import $ from './index.less';
var timezone = require('dayjs/plugin/timezone');
import dayjs from 'dayjs';
import moment from 'moment';
import { DatePicker } from 'antd';
import 'antd/lib/date-picker/style/index';

const time = dayjs('2022-07-14 18:21:15');
const time2 = moment('2022-07-14 18:21:15');

export default function IndexPage() {
  const { loading, count } = useSelector((state: RootState) => state.app);
  const { auth, num } = useSelector((state: RootState) => state.auth);

  return (
    <div className={$.page}>
      <div>auth num: {num}</div>
      <button
        onClick={() => {
          store.dispatch.auth.updateNum(999);
        }}
      >
        update auth num
      </button>
      <br />
      <br />
      <br />
      <Link to={'/slave'}>slave app</Link>
      {/* <DatePicker value={} showTime /> */}
      <div>{time.toString()}</div>
      <div>{time2.toString()}</div>
    </div>
  );
}
