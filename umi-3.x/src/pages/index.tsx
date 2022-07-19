import { useSelector } from 'react-redux';
import { Link, RootState, store } from 'umi';
import $ from './index.less';

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
    </div>
  );
}
